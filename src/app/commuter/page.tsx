"use client";
import Link from "next/link";
import { AppShell, MoreLinks } from "@/components/migo/app-shell";
import { Card, H, useData } from "@/components/migo/kit";
import { DONE } from "@/components/migo/ride-list";
import { rideService, routeService } from "@/lib/migo/services";
import { list } from "@/lib/migo/util";

export default function Commuter() {
  const rides = list(useData(["rides"], () => rideService.list(), { poll: 15000 }).data);
  const routes = list(useData(["routes"], routeService.list).data);
  const pending = rides.filter((r) => r.status === "REQUESTED").length;
  const tile = (l: string, v: number, to: string) => <Link href={to} className="press"><Card><p className="text-xs font-semibold text-muted">{l}</p><p className="text-3xl font-extrabold">{v}</p></Card></Link>;
  return (
    <AppShell title="Driver home" wide>
      <div className="space-y-3">
        {pending > 0 && <Link href="/commuter/requests" className="press block rounded-3xl bg-primary p-5 text-white shadow-lg"><b className="text-lg">{pending} new ride request{pending > 1 ? "s" : ""}</b><p className="text-sm text-white/70">Tap to review</p></Link>}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{tile("Pending requests", pending, "/commuter/requests")}{tile("Active trips", rides.filter((r) => !DONE.includes(r.status)).length, "/commuter/rides")}{tile("Routes", routes.length, "/commuter/routes")}{tile("Completed", rides.filter((r) => r.status === "COMPLETED").length, "/commuter/contributions")}</div>
        <H>More</H><MoreLinks />
      </div>
    </AppShell>
  );
}
