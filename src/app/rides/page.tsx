"use client";
import { useState } from "react";
import { AppShell } from "@/components/migo/app-shell";
import { RideRows } from "@/components/migo/ride-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Rides() {
  const [tab, setTab] = useState<"active" | "past">("active");
  return (
    <AppShell title="Trips" wide>
      <Tabs value={tab} onValueChange={(v) => setTab(v as "active" | "past")} className="space-y-4">
        <TabsList className="max-w-sm"><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="past">Past</TabsTrigger></TabsList>
        <RideRows mode={tab} />
      </Tabs>
    </AppShell>
  );
}
