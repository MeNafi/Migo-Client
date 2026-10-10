"use client";
import { useState } from "react";
import { AppShell } from "@/components/migo/app-shell";
import { Card, inp, Load, useAct, useData } from "@/components/migo/kit";
import { StatusPill } from "@/components/migo/status-pill";
import { Button } from "@/components/ui/button";
import { vehicleService } from "@/lib/migo/services";

function Row({ v }: { v: any }) {
  const [url, setUrl] = useState("");
  const up = useAct(() => vehicleService.documents(v.id, [url]), [["vehicles"]], "Document submitted", () => setUrl(""));
  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between"><b>{v.make} {v.model}</b><StatusPill value={v.verificationStatus ?? "PENDING"} /></div>
      {v.verificationStatus !== "APPROVED" && <><input className={inp} placeholder="Registration document URL" value={url} onChange={(e) => setUrl(e.target.value)} /><Button className="w-full" disabled={!url || up.isPending} onClick={() => up.mutate(undefined)}>Submit for review</Button></>}
    </Card>
  );
}
export default function Verification() {
  const q = useData(["vehicles"], vehicleService.list);
  return <AppShell title="Verification"><div className="space-y-3"><Load q={q} isList empty="Add a vehicle first, then submit documents here.">{(d) => d.map((v: any) => <Row key={v.id} v={v} />)}</Load></div></AppShell>;
}
