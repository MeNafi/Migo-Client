"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { AppShell } from "@/components/migo/app-shell";
import { ActBtn } from "@/components/migo/admin-act";
import { Card, H, Item, Load, useAct, useData } from "@/components/migo/kit";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import { useAuth } from "@/lib/migo/auth";
import { routeSchema } from "@/lib/migo/schemas";
import { routeService, vehicleService } from "@/lib/migo/services";
import { km, list, PLACES } from "@/lib/migo/util";

type Form = z.infer<typeof routeSchema>;
const names = Object.keys(PLACES);

export default function Routes() {
  const me = useAuth((s) => s.user?.id);
  const q = useData(["routes"], routeService.list);
  const vehicles = list(useData(["vehicles"], vehicleService.list).data);
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(routeSchema), defaultValues: { from: names[1], to: names[2], time: "08:00", back: "18:30", seats: 3, fee: 80, vehicleId: "" } });
  const create = useAct(async (f: Form) => {
    const a = PLACES[f.from], b = PLACES[f.to], d = +(km(a, b) * 1.3).toFixed(1);
    const route = await routeService.create({
      title: `${f.from} → ${f.to}`, originName: `${f.from}, Dhaka`, originLat: a[0], originLng: a[1],
      destinationName: `${f.to}, Dhaka`, destinationLat: b[0], destinationLng: b[1],
      distanceKm: d, durationMin: Math.round(d * 4.2), seats: f.seats, contributionBdt: f.fee, vehicleId: f.vehicleId || vehicles[0]?.id,
    });
    const id = route?.id ?? route?.route?.id;
    if (id) await routeService.addSchedule(id, { daysOfWeek: [1, 2, 3, 4, 5], departureTime: f.time, returnTime: f.back });
    return route;
  }, [["routes"]], "Route published");
  const mine = list(q.data).filter((r) => !r.ownerId || r.ownerId === me);
  return (
    <AppShell title="My routes">
      <div className="space-y-3">
        <Card><form className="space-y-3" noValidate onSubmit={handleSubmit((v) => create.mutate(v))}>
          <H>New daily route</H>
          <div className="grid grid-cols-2 gap-3">
            <Field label="From"><Select {...register("from")}>{names.map((n) => <option key={n}>{n}</option>)}</Select></Field>
            <Field label="To" error={errors.to}><Select {...register("to")}>{names.map((n) => <option key={n}>{n}</option>)}</Select></Field>
            <Field label="Depart" error={errors.time}><Input type="time" {...register("time")} /></Field>
            <Field label="Return" error={errors.back}><Input type="time" {...register("back")} /></Field>
            <Field label="Seats" error={errors.seats}><Input type="number" {...register("seats", { valueAsNumber: true })} /></Field>
            <Field label="Fee per seat (৳)" error={errors.fee}><Input type="number" {...register("fee", { valueAsNumber: true })} /></Field>
          </div>
          {vehicles.length > 0 && <Field label="Vehicle"><Select {...register("vehicleId")}>{vehicles.map((v) => <option key={v.id} value={v.id}>{v.make} {v.model} · {v.registrationNo}</option>)}</Select></Field>}
          <Button className="w-full" loading={create.isPending}>Publish route</Button>
        </form></Card>
        <Load q={{ ...q, data: mine } as any} isList empty="No routes yet.">{(d) => d.map((r: any) => (
          <Item key={r.id} o={{ title: r.title, status: r.status, contributionBdt: r.contributionBdt, seats: r.seats, distanceKm: r.distanceKm }} actions={
            <ActBtn label={r.status === "PAUSED" ? "Resume" : "Pause"} keyOf={["routes"]} fn={() => (r.status === "PAUSED" ? routeService.resume(r.id) : routeService.pause(r.id))} />} />))}</Load>
      </div>
    </AppShell>
  );
}
