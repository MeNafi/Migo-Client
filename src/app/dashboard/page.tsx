"use client";
import Link from "next/link";
import { MapPinned } from "lucide-react";
import { AppShell, MoreLinks } from "@/components/migo/app-shell";
import { Card, H, Load, RideCard, useData } from "@/components/migo/kit";
import { DONE } from "@/components/migo/ride-list";
import { displayName, useAuth } from "@/lib/migo/auth";
import { rideService } from "@/lib/migo/services";
import { list } from "@/lib/migo/util";

export default function Dashboard() {
  const user = useAuth((s) => s.user);
  const q = useData(["rides"], () => rideService.list(), { poll: 15000 });
  const rides = list(q.data);
  const active = rides.filter((r) => !DONE.includes(r.status));
  return (
    <AppShell title={`Hi, ${displayName(user).split(" ")[0]}`} wide>
      <div className="space-y-3">
        <Link href="/find-ride" className="press flex items-center gap-3 rounded-3xl bg-primary p-5 text-white shadow-lg"><MapPinned className="h-6 w-6" /><div><b className="text-lg">Where to?</b><p className="text-sm text-white/70">Find a daily commute match</p></div></Link>
        <div className="grid grid-cols-2 gap-3"><Card><p className="text-xs font-semibold text-muted">Active trips</p><p className="text-3xl font-extrabold">{active.length}</p></Card><Card><p className="text-xs font-semibold text-muted">Completed</p><p className="text-3xl font-extrabold">{rides.filter((r) => r.status === "COMPLETED").length}</p></Card></div>
        <H>Active</H>
        <div className="cards"><Load q={{ ...q, data: active } as any} isList empty="Nothing in progress.">{(d) => d.map((r: any) => <RideCard key={r.id} r={r} role={user?.role} />)}</Load></div>
        <H>More</H><MoreLinks />
      </div>
    </AppShell>
  );
}
