"use client";
import { AppShell } from "./app-shell";
import { Load, RideCard, useData } from "./kit";
import { useAuth } from "@/lib/migo/auth";
import { rideService } from "@/lib/migo/services";
import { list } from "@/lib/migo/util";
 
export const DONE = ["COMPLETED", "CANCELLED", "REJECTED", "NO_SHOW"];
export function RideRows({ mode }: { mode: "active" | "past" | "requests" }) {
  const role = useAuth((s) => s.user?.role);
  const q = useData(["rides"], () => rideService.list(), { poll: 15000 });
  const rows = list(q.data).filter((r) => (mode === "requests" ? r.status === "REQUESTED" : (mode === "past") === DONE.includes(r.status)));
  const empty = { active: "No active trips. Book a ride to get going.", past: "No past trips yet.", requests: "No pending requests." }[mode];
  return (
    <div className="cards">
      <Load q={{ ...q, data: rows } as any} isList empty={empty}>{(d) => d.map((r: any) => <RideCard key={r.id} r={r} role={role} />)}</Load>
    </div>
  );
}

export function RideList({ title, mode }: { title: string; mode: "active" | "past" | "requests" }) {
  return <AppShell title={title} wide><RideRows mode={mode} /></AppShell>;
}
