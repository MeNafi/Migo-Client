"use client";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, H } from "./kit";
import { human } from "@/lib/migo/util";

export type Point = { label: string; value: number };
const tick = { fontSize: 12, fill: "#6b6b6b" };
const short = (l: string) => (l.length > 9 ? `${l.slice(0, 8)}…` : l);

/** Turns an analytics payload into chart points: a dated array if present, else numeric fields. */
export function toSeries(o: any): Point[] {
  if (Array.isArray(o)) return [];
  const arr = Object.values(o ?? {}).find((v: any) => Array.isArray(v) && v.length > 1 && v[0] && typeof v[0] === "object") as any[] | undefined;
  if (arr) {
    const lk = ["date", "day", "label", "name", "period", "month", "status"].find((k) => k in arr[0]);
    const vk = Object.keys(arr[0]).find((k) => typeof arr[0][k] === "number" && k !== lk);
    if (lk && vk) return arr.map((r) => ({ label: String(r[lk]).slice(0, 10), value: r[vk] }));
  }
  const pts: Point[] = [];
  Object.entries(o ?? {}).forEach(([k, v]: [string, any]) => {
    if (typeof v === "number") pts.push({ label: human(k), value: v });
    else if (v && typeof v === "object" && !Array.isArray(v)) Object.entries(v).forEach(([k2, v2]) => typeof v2 === "number" && pts.push({ label: `${human(k)} ${human(k2)}`, value: v2 }));
  });
  return pts.slice(0, 12);
}

export function Chart({ title, data, money }: { title: string; data: Point[]; money?: boolean }) {
  if (data.length === 0) return null;
  const line = data.length > 2 && data.every((d) => /^\d{4}-\d\d/.test(d.label));
  const fmt = (v: unknown) => (money ? `৳${v}` : String(v));
  const common = { data, margin: { top: 8, right: 8, left: -12, bottom: 0 } };
  const axes = (<>
    <CartesianGrid vertical={false} stroke="#e2e2e2" />
    <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} tickFormatter={line ? (l: string) => l.slice(5) : short} interval="preserveStartEnd" />
    <YAxis tick={tick} tickLine={false} axisLine={false} allowDecimals={false} width={48} tickFormatter={fmt} />
    <Tooltip cursor={{ fill: "#f6f6f6" }} formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, border: "1px solid #e2e2e2", boxShadow: "0 8px 24px rgba(0,0,0,.12)" }} />
  </>);
  return (
    <Card>
      <H>{title}</H>
      <div className="mt-3 h-56 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          {line ? <LineChart {...common}>{axes}<Line type="monotone" dataKey="value" stroke="#276ef1" strokeWidth={3} dot={{ r: 3 }} /></LineChart>
            : <BarChart {...common}>{axes}<Bar dataKey="value" fill="#000" radius={[6, 6, 0, 0]} maxBarSize={44} /></BarChart>}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
