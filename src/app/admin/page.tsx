"use client";
import { AppShell, MoreLinks } from "@/components/migo/app-shell";
import { H, Load, Stats, useData } from "@/components/migo/kit";
import { Chart, toSeries } from "@/components/migo/charts";
import { adminService } from "@/lib/migo/services";

export default function Admin() {
  const q = useData(["admin", "dashboard"], adminService.dashboard, { poll: 30000 });
  return <AppShell title="Admin" wide><div className="space-y-3"><Load q={q}>{(d) => <><Chart title="Platform overview" data={toSeries(d?.stats ?? d)} /><Stats o={d?.stats ?? d} /></>}</Load><H>Manage</H><MoreLinks /></div></AppShell>;
}
