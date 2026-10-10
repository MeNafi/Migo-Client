"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { homeFor, useAuth } from "@/lib/migo/auth";

export function SiteHeader({ invert = false }: { invert?: boolean }) {
  const [open, setOpen] = useState(false);
  const { user, hydrate } = useAuth();
  useEffect(() => { hydrate(); }, [hydrate]);
  const router = useRouter();
  const btn = invert ? "bg-white text-primary hover:bg-cream" : "";
  const home = user ? homeFor(user.role) : "/";
  return (
    <header className={`relative z-30 ${invert ? "text-white" : "text-ink"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href={home} className="shrink-0">
          <Logo invert={invert} />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <ThemeToggle onDark={invert} />
          <Link href="/how-it-works">How it works</Link>
          <Link href="/safety">Safety</Link>
          {user ? (
            <Button size="sm" className={btn} onClick={() => router.push(home)}>Open app</Button>
          ) : (
            <>
              <Link href="/login">Sign in</Link>
              <Button size="sm" className={btn} onClick={() => router.push("/register")}>Get started</Button>
            </>
          )}
        </nav>
        <ThemeToggle onDark={invert} className="md:hidden" />
        <button className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="mx-4 mb-4 rounded-2xl border border-line bg-surface p-4 text-ink md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/safety">Safety</Link>
            {user ? <Button onClick={() => router.push(home)}>Open app</Button> : <><Link href="/login">Sign in</Link><Button onClick={() => router.push("/register")}>Get started</Button></>}
          </div>
        </div>
      ) : null}
    </header>
  );
}
