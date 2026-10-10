"use client";
import { AppShell } from "@/components/migo/app-shell";
import { H, Load, Stats, useData } from "@/components/migo/kit";
import { Chart, toSeries } from "@/components/migo/charts";
import { adminService } from "@/lib/migo/services";

function Block({ name }: { name: string }) {
  const q = useData(["admin", "analytics", name], () => adminService.list(`analytics/${name}`));
  return <><H>{name}</H><Load q={q}>{(d) => <div className="space-y-3"><Chart title={`${name} overview`} data={toSeries(d)} /><Stats o={d} /></div>}</Load></>;
}
export default function Analytics() {
  return <AppShell title="Analytics" wide><div className="space-y-3">{["users", "rides", "matching", "payments", "routes"].map((n) => <Block key={n} name={n} />)}</div></AppShell>;
}
