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
import { vehicleSchema } from "@/lib/migo/schemas";
import { vehicleService } from "@/lib/migo/services";

type Form = z.infer<typeof vehicleSchema>;
const blank: Form = { type: "CAR", make: "", model: "", color: "", registrationNo: "", year: 2020, seats: 3 };

export default function Vehicle() {
  const q = useData(["vehicles"], vehicleService.list);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({ resolver: zodResolver(vehicleSchema), defaultValues: blank });
  const add = useAct((v: Form) => vehicleService.create(v), [["vehicles"]], "Vehicle added — pending verification", () => reset(blank));
  return (
    <AppShell title="Vehicle">
      <div className="space-y-3">
        <Load q={q} isList empty="Add your vehicle to start offering rides.">{(d) => d.map((v: any) => (
          <Item key={v.id} o={{ title: `${v.make} ${v.model}`, status: v.verificationStatus, color: v.color, registrationNo: v.registrationNo, year: v.year, seats: v.seats }}
            actions={<ActBtn label="Remove" variant="danger" ask="Remove this vehicle?" keyOf={["vehicles"]} fn={() => vehicleService.remove(v.id)} />} />))}</Load>
        <Card><form className="space-y-3" noValidate onSubmit={handleSubmit((v) => add.mutate(v))}>
          <H>Add vehicle</H>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type" error={errors.type}><Select {...register("type")}><option value="CAR">Car</option><option value="BIKE">Bike</option></Select></Field>
            <Field label="Seats" error={errors.seats}><Input type="number" {...register("seats", { valueAsNumber: true })} /></Field>
            <Field label="Make" error={errors.make}><Input placeholder="Toyota" {...register("make")} /></Field>
            <Field label="Model" error={errors.model}><Input placeholder="Axio" {...register("model")} /></Field>
            <Field label="Color" error={errors.color}><Input placeholder="Silver" {...register("color")} /></Field>
            <Field label="Year" error={errors.year}><Input type="number" {...register("year", { valueAsNumber: true })} /></Field>
            <Field label="Registration no." error={errors.registrationNo} className="col-span-2"><Input placeholder="DHAKA-METRO-GA-0000" {...register("registrationNo")} /></Field>
          </div>
          <Button className="w-full" loading={add.isPending}>Add vehicle</Button>
        </form></Card>
      </div>
    </AppShell>
  );
}
