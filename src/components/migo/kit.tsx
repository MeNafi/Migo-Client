"use client";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/migo/cn";
import { errMsg } from "@/lib/migo/api";
import { human, list, nameOf, rv } from "@/lib/migo/util";
import { StatusPill } from "./status-pill";

export const inp = "h-12 w-full rounded-xl bg-cream px-4 text-base outline-none focus:ring-2 focus:ring-primary";
export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section className={cn("rounded-3xl bg-surface p-4 shadow-sm", className)}>{children}</section>
);
export const H = ({ children }: { children: ReactNode }) => <h2 className="px-1 pt-2 text-sm font-extrabold uppercase tracking-wide text-muted">{children}</h2>;

export function useData(key: any[], fn: () => Promise<any>, o: { poll?: number; enabled?: boolean } = {}) {
  return useQuery({ queryKey: key, queryFn: fn, staleTime: 10000, refetchInterval: o.poll, enabled: o.enabled });
}
export function useAct<T = any>(fn: (a: T) => Promise<any>, keys: any[][] = [], ok?: string, then?: (d: any) => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (d) => { if (ok) toast.success(ok); keys.forEach((k) => qc.invalidateQueries({ queryKey: k })); then?.(d); },
    onError: (e) => toast.error(errMsg(e)),
  });
}

export function Load({ q, isList, empty = "Nothing here yet.", children }: { q: UseQueryResult<any>; isList?: boolean; empty?: string; children: (d: any) => ReactNode }) {
  if (q.isLoading) return <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-24" />)}</div>;
  if (q.isError) return <Card className="text-center"><p className="mb-3 text-sm text-muted">{errMsg(q.error)}</p><Button size="sm" onClick={() => q.refetch()}>Try again</Button></Card>;
  const d = isList ? list(q.data) : q.data;
  if (isList && d.length === 0) return <Card className="text-center text-muted">{empty}</Card>;
  return <>{children(d)}</>;
}

export function RideCard({ r, role, children }: { r: any; role?: string; children?: ReactNode }) {
  const v = rv(r, role);
  return (
    <Card className="space-y-3">
      <Link href={`/rides/${v.id}`} className="press block space-y-1">
        <div className="flex items-center justify-between gap-2"><b className="text-lg">{v.other}</b>{v.price != null && <b className="text-xl">৳{v.price}</b>}</div>
        <p className="text-sm">{v.from} → {v.to}</p>
        <div className="flex items-center justify-between text-xs text-muted"><span>{[v.date?.slice?.(0, 10), v.time].filter(Boolean).join(" · ")}</span><StatusPill value={v.status} /></div>
      </Link>
      {children}
    </Card>
  );
}

export function Item({ o, actions }: { o: any; actions?: ReactNode }) {
  const title = o.title ?? o.subject ?? o.email ?? (nameOf(o) || o.reason || o.action || o.id);
  const rows = Object.entries(o).filter(([k, v]) => v != null && typeof v !== "object" && !["id", "title", "subject"].includes(k) && !/token|password|hash/i.test(k)).slice(0, 5);
  return (
    <Card className="space-y-2">
      <div className="flex items-start justify-between gap-2"><b className="break-all">{String(title)}</b>{o.status && <StatusPill value={o.status} />}</div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        {rows.filter(([k]) => k !== "status").map(([k, v]) => <div key={k} className="min-w-0"><dt className="text-muted">{human(k)}</dt><dd className="truncate font-semibold">{String(v)}</dd></div>)}
      </dl>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </Card>
  );
}

export function Stats({ o }: { o: any }) {
  if (Array.isArray(o)) return null;
  const rows: [string, string | number][] = [];
  Object.entries(o ?? {}).forEach(([k, v]: [string, any]) => {
    if (typeof v === "number" || (typeof v === "string" && v.length < 18)) rows.push([k, v]);
    else if (Array.isArray(v)) rows.push([k, v.length]);
    else if (v && typeof v === "object") Object.entries(v).forEach(([k2, v2]) => typeof v2 === "number" && rows.push([`${k} ${k2}`, v2]));
  });
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{rows.map(([k, v]) => <Card key={k}><p className="text-xs font-semibold text-muted">{human(k)}</p><p className="text-2xl font-extrabold">{v}</p></Card>)}</div>;
}
