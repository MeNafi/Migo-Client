"use client";
import type { ReactNode } from "react";
import { AppShell } from "./app-shell";
import { Item, Load, useData } from "./kit";
import { adminService } from "@/lib/migo/services";

export function AdminList({ title, path, actions, empty }: { title: string; path: string; actions?: (o: any, refresh: string[]) => ReactNode; empty?: string }) {
  const key = ["admin", path];
  const q = useData(key, () => adminService.list(path));
  return (
    <AppShell title={title} wide>
      <div className="cards"><Load q={q} isList empty={empty ?? "No records."}>{(d) => d.map((o: any, i: number) => <Item key={o.id ?? i} o={o} actions={actions?.(o, key)} />)}</Load></div>
    </AppShell>
  );
}
