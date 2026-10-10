"use client";
import { AppShell } from "@/components/migo/app-shell";
import { Card, Load, RideCard, useData } from "@/components/migo/kit";
import { Chart } from "@/components/migo/charts";
import { rideService } from "@/lib/migo/services";
import { list, rv } from "@/lib/migo/util";

export default function Earnings() {
  const q = useData(["rides"], () => rideService.list());
  const done = list(q.data).filter((r) => r.status === "COMPLETED");
  const total = done.reduce((s, r) => s + Number(r.contributionBdt ?? r.route?.contributionBdt ?? 0), 0);
  const byDay: Record<string, number> = {};
  done.forEach((r) => { const d = String(rv(r).date).slice(0, 10); if (d) byDay[d] = (byDay[d] ?? 0) + Number(r.contributionBdt ?? r.route?.contributionBdt ?? 0); });
  const series = Object.entries(byDay).sort().slice(-14).map(([label, value]) => ({ label, value }));
  return (
    <AppShell title="Earnings" wide>
      <div className="space-y-3">
        <Card className="bg-primary text-white"><p className="text-xs font-semibold uppercase text-white/70">Total contributions</p><p className="text-4xl font-extrabold">৳{total}</p><p className="text-sm text-white/70">{done.length} completed trips</p></Card>
        <Chart title="Earnings by day" data={series} money />
        <div className="cards"><Load q={{ ...q, data: done } as any} isList empty="Completed trips will show here.">{(d) => d.map((r: any) => <RideCard key={r.id} r={r} role="COMMUTER" />)}</Load></div>
      </div>
    </AppShell>
  );
}
