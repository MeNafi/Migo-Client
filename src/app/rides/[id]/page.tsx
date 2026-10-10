"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, MessageCircle, Navigation, Star } from "lucide-react";
import { AppShell } from "@/components/migo/app-shell";
import { MapCard } from "@/components/migo/map-card";
import { StatusPill } from "@/components/migo/status-pill";
import { confirmAsync } from "@/components/ui/confirm";
import { Button } from "@/components/ui/button";
import { Card, H, inp, Load, useAct, useData } from "@/components/migo/kit";
import { useRealtime } from "@/hooks/use-realtime";
import { useAuth } from "@/lib/migo/auth";
import { chatService, paymentService, reviewService, rideService, safetyService } from "@/lib/migo/services";
import { list, rv } from "@/lib/migo/util";

const STEPS = ["REQUESTED", "ACCEPTED", "CONFIRMED", "IN_PROGRESS", "COMPLETED"];
const LABEL = ["Requested", "Accepted", "Confirmed", "Riding", "Done"];

export default function RideDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const isDriver = user?.role === "COMMUTER";
  const live = useRealtime([`ride:${id}`], [["ride", id], ["loc", id], ["tl", id]]);
  const q = useData(["ride", id], () => rideService.get(id), { poll: live ? 30000 : 6000 });
  const r = q.data?.ride ?? q.data;
  const status: string = r?.status ?? "";
  const inv = [["ride", id], ["rides"]];
  const [code, setCode] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const last = useRef(0);

  const accept = useAct(() => rideService.accept(id), inv, "Ride accepted");
  const reject = useAct(() => rideService.reject(id), inv, "Request declined");
  const confirm = useAct(() => rideService.confirm(id), inv, "Confirmed");
  const verify = useAct(() => rideService.verifyOtp(id, code), inv, "Trip started");
  const complete = useAct(() => rideService.complete(id), inv, "Trip completed");
  const cancel = useAct(() => rideService.cancel(id), inv, "Ride cancelled");
  const share = useAct(() => rideService.shareLocation(id), [], "Live location shared");
  const sos = useAct(() => safetyService.emergency({ rideId: id, note: "Need help" }), [], "Emergency alert sent");
  const chat = useAct(() => chatService.open(id), [], undefined, (c) => router.push(`/messages?c=${c?.id ?? c?.conversation?.id ?? ""}`));
  const review = useAct(() => reviewService.create({ rideId: id, targetId: isDriver ? r?.passengerId : r?.commuterId, rating, comment }), [["review", id]], "Thanks for your review");
  const pay = useAct(() => paymentService.checkout(id), [["payments"]], undefined, (p) => {
    const url = p?.gatewayUrl ?? p?.payment?.gatewayUrl;
    if (url) location.href = url; else toast.info("Payment created — pending gateway");
  });

  const otp = useData(["otp", id], () => rideService.otp(id), { enabled: !isDriver && ["ACCEPTED", "CONFIRMED"].includes(status) });
  const loc = useData(["loc", id], () => rideService.location(id), { poll: live ? 20000 : 5000, enabled: status === "IN_PROGRESS" });
  const tl = useData(["tl", id], () => rideService.timeline(id), { enabled: !!r });
  const done = useData(["review", id], () => reviewService.forRide(id), { enabled: status === "COMPLETED" });

  // Driver streams GPS while the trip is running.
  useEffect(() => {
    if (!isDriver || status !== "IN_PROGRESS" || !navigator.geolocation) return;
    const w = navigator.geolocation.watchPosition((p) => {
      if (Date.now() - last.current < 8000) return;
      last.current = Date.now();
      rideService.pushLocation(id, { lat: p.coords.latitude, lng: p.coords.longitude, speed: p.coords.speed ?? 0, heading: p.coords.heading ?? 0 }).catch(() => {});
    }, () => {}, { enableHighAccuracy: true });
    return () => navigator.geolocation.clearWatch(w);
  }, [isDriver, status, id]);

  const v = r ? rv(r, user?.role) : null;
  const myReview = list(done.data).some((x: any) => x.authorId === user?.id || x.reviewerId === user?.id);
  const code6 = otp.data?.otp ?? otp.data?.code ?? otp.data?.otpCode;
  const pt = loc.data?.location ?? loc.data;

  return (
    <AppShell title="Trip">
      <Load q={q}>{() => v && (
        <div className="space-y-3">
          <MapCard from={v.from} to={v.to} />
          {STEPS.includes(status) && <ul className="steps w-full text-xs font-semibold">{STEPS.map((st, i) => <li key={st} className={`step ${i <= STEPS.indexOf(status) ? "step-primary" : ""}`}>{LABEL[i]}</li>)}</ul>}
          <Card className="space-y-2">
            <div className="flex items-center justify-between"><b className="text-xl">{v.other}</b><StatusPill value={v.status} /></div>
            <p className="text-sm">{v.from} → {v.to}</p>
            <p className="text-sm text-muted">{[v.date?.slice?.(0, 10), v.time].filter(Boolean).join(" · ")}{v.price != null && ` · ৳${v.price}`}</p>
          </Card>

          {!isDriver && code6 && <Card className="text-center"><p className="text-xs font-semibold uppercase text-muted">Share this code with your driver</p><p className="text-4xl font-extrabold tracking-[0.3em]">{code6}</p></Card>}

          {pt?.lat != null && <Card><a className="flex items-center gap-2 font-bold text-primary" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${pt.lat},${pt.lng}`}><Navigation className="h-4 w-4" />Driver is live — open in Maps</a></Card>}

          <div className="space-y-2">
            {isDriver && status === "REQUESTED" && <div className="grid grid-cols-2 gap-2"><Button variant="secondary" disabled={reject.isPending} onClick={() => reject.mutate(undefined)}>Decline</Button><Button disabled={accept.isPending} onClick={() => accept.mutate(undefined)}>Accept</Button></div>}
            {status === "ACCEPTED" && <Button className="w-full" disabled={confirm.isPending} onClick={() => confirm.mutate(undefined)}>Confirm trip</Button>}
            {isDriver && ["ACCEPTED", "CONFIRMED"].includes(status) && (
              <Card className="space-y-2"><H>Start with passenger code</H>
                <input className={inp} inputMode="numeric" maxLength={6} placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value)} />
                <Button className="w-full" disabled={code.length < 4 || verify.isPending} onClick={() => verify.mutate(undefined)}>Start trip</Button></Card>)}
            {isDriver && status === "IN_PROGRESS" && <Button variant="success" className="w-full" disabled={complete.isPending} onClick={() => complete.mutate(undefined)}>Complete trip</Button>}
            {!isDriver && status === "IN_PROGRESS" && <Button variant="secondary" className="w-full" onClick={() => share.mutate(undefined)}>Share live location</Button>}
            {!isDriver && status === "COMPLETED" && <Button size="lg" className="w-full" disabled={pay.isPending} onClick={() => pay.mutate(undefined)}>{pay.isPending ? "Opening…" : `Pay ৳${v.price ?? ""} with SSLCommerz`}</Button>}
            {["REQUESTED", "ACCEPTED", "CONFIRMED"].includes(status) && <Button variant="ghost" className="w-full text-danger" disabled={cancel.isPending} onClick={async () => (await confirmAsync("Cancel this ride?")) && cancel.mutate(undefined)}>Cancel ride</Button>}
            {!["REQUESTED", "CANCELLED", "REJECTED"].includes(status) && <Button variant="secondary" className="w-full" onClick={() => chat.mutate(undefined)}><MessageCircle className="h-4 w-4" />Message</Button>}
          </div>

          {status === "COMPLETED" && !myReview && (
            <Card className="space-y-2"><H>Rate your trip</H>
              <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} aria-label={`${n} stars`} onClick={() => setRating(n)}><Star className={`h-8 w-8 ${n <= rating ? "fill-warning text-warning" : "text-line"}`} /></button>)}</div>
              <input className={inp} placeholder="Add a comment (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
              <Button className="w-full" disabled={review.isPending} onClick={() => review.mutate(undefined)}>Submit review</Button></Card>)}

          {list(tl.data).length > 0 && <Card><H>Timeline</H><ol className="mt-2 space-y-2 border-l-2 border-line pl-4">{list(tl.data).map((e: any, i: number) => <li key={e.id ?? i} className="text-sm"><b>{(e.status ?? e.type ?? e.event ?? "").toString().replace(/_/g, " ")}</b><span className="ml-2 text-xs text-muted">{e.createdAt ? new Date(e.createdAt).toLocaleString() : ""}</span></li>)}</ol></Card>}

          {["ACCEPTED", "CONFIRMED", "IN_PROGRESS"].includes(status) && <Button variant="danger" className="w-full" disabled={sos.isPending} onClick={async () => (await confirmAsync("Send an emergency alert to Migo safety and your contact?")) && sos.mutate(undefined)}><AlertTriangle className="h-4 w-4" />Emergency SOS</Button>}
        </div>
      )}</Load>
    </AppShell>
  );
}
