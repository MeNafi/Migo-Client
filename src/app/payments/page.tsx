"use client";
import { AppShell } from "@/components/migo/app-shell";
import { Card, Load, useAct, useData } from "@/components/migo/kit";
import { StatusPill } from "@/components/migo/status-pill";
import { Button } from "@/components/ui/button";
import { paymentService } from "@/lib/migo/services";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function Payments() {
  const q = useData(["payments"], paymentService.list);
  const pay = useAct(
    (rideId: string) => paymentService.checkout(rideId),
    [["payments"]],
    undefined,
    (p) => {
      const u = p?.gatewayUrl ?? p?.payment?.gatewayUrl ?? p?.url;
      if (u) {
        window.location.href = u;
      }
    },
  );

  return (
    <AppShell title="Wallet" wide>
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Card className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream">
            <CreditCard className="h-5 w-5 text-primary" />
          </span>
          <div>
            <b className="text-sm">SSLCommerz</b>
            <p className="text-xs text-muted">Cards, bKash, Nagad &amp; bank — secure checkout hosted by SSLCommerz.</p>
          </div>
        </Card>
        <Card className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream">
            <ShieldCheck className="h-5 w-5 text-success" />
          </span>
          <div>
            <b className="text-sm">Protected payments</b>
            <p className="text-xs text-muted">Pay only after the trip. Refunds are handled from the same receipt.</p>
          </div>
        </Card>
      </div>

      <div className="cards">
        <Load q={q} isList empty="No payments yet. Finish a trip to see receipts here.">
          {(d) =>
            d.map((p: any) => (
              <Card key={p.id} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <b className="text-xl">৳{p.amount ?? p.amountBdt ?? "—"}</b>
                  <StatusPill value={p.status} />
                </div>
                <p className="text-xs text-muted">
                  {p.method ?? "SSLCommerz"}
                  {p.createdAt ? ` · ${new Date(p.createdAt).toLocaleDateString()}` : ""}
                  {p.rideId ? ` · Ride ${String(p.rideId).slice(0, 8)}…` : ""}
                </p>
                {p.status === "PENDING" && p.rideId && (
                  <Button size="sm" disabled={pay.isPending} loading={pay.isPending} onClick={() => pay.mutate(p.rideId)}>
                    Pay with SSLCommerz
                  </Button>
                )}
                {p.status === "COMPLETED" || p.status === "PAID" || p.status === "SUCCESS" ? (
                  <p className="text-xs font-semibold text-success">Paid successfully</p>
                ) : null}
              </Card>
            ))
          }
        </Load>
      </div>
    </AppShell>
  );
}
