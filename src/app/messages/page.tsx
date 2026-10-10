"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { AppShell } from "@/components/migo/app-shell";
import { Card, inp, Load, useAct, useData } from "@/components/migo/kit";
import { Button } from "@/components/ui/button";
import { useRealtime } from "@/hooks/use-realtime";
import { useAuth } from "@/lib/migo/auth";
import { chatService } from "@/lib/migo/services";
import { list, nameOf } from "@/lib/migo/util";
import { cn } from "@/lib/migo/cn";

function Thread({ id }: { id: string }) {
  const router = useRouter();
  const me = useAuth((s) => s.user?.id);
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const live = useRealtime([`conversation:${id}`], [["msgs", id], ["convs"]]);
  const q = useData(["msgs", id], () => chatService.messages(id), { poll: live ? 30000 : 4000 });
  const send = useAct(() => chatService.send(id, text), [["msgs", id]], undefined, () => setText(""));
  const msgs = list(q.data);
  useEffect(() => { chatService.markRead(id).catch(() => {}); }, [id, msgs.length]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs.length]);
  return (
    <div className="flex h-[calc(100dvh-14rem)] flex-col md:h-[calc(100dvh-9rem)]">
      <button className="mb-2 flex items-center gap-1 text-sm font-bold" onClick={() => router.push("/messages")}><ArrowLeft className="h-4 w-4" />All chats</button>
      <div className="flex-1 space-y-2 overflow-y-auto rounded-3xl bg-surface p-3">
        <Load q={q} isList empty="Say hello 👋">{(d) => d.map((m: any) => (
          <div key={m.id} className={cn("flex", m.senderId === me ? "justify-end" : "justify-start")}>
            <p className={cn("max-w-[80%] rounded-2xl px-4 py-2 text-sm", m.senderId === me ? "bg-primary text-white" : "bg-cream")}>{m.content}</p>
          </div>))}</Load>
        <div ref={end} />
      </div>
      <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); text.trim() && send.mutate(undefined); }}>
        <input className={inp} placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} />
        <Button aria-label="Send" className="w-14 px-0" disabled={send.isPending}><Send className="h-5 w-5" /></Button>
      </form>
    </div>
  );
}

function Inner() {
  const id = useSearchParams().get("c");
  const router = useRouter();
  const me = useAuth((s) => s.user?.id);
  const q = useData(["convs"], chatService.list, { poll: 10000, enabled: !id });
  return (
    <AppShell title="Messages">
      {id ? <Thread id={id} /> : (
        <div className="space-y-3">
          <Load q={q} isList empty="No conversations yet. Open a trip and tap Message.">{(d) => d.map((c: any) => {
            const other = nameOf(c.other ?? c.participants?.find((p: any) => (p.user?.id ?? p.userId) !== me)?.user);
            return <Card key={c.id}><button className="press w-full text-left" onClick={() => router.push(`/messages?c=${c.id}`)}>
              <b>{other || "Ride chat"}</b><p className="truncate text-sm text-muted">{c.lastMessage?.content ?? c.messages?.[0]?.content ?? "Open conversation"}</p></button></Card>;
          })}</Load>
        </div>
      )}
    </AppShell>
  );
}
export default function Messages() { return <Suspense><Inner /></Suspense>; }
