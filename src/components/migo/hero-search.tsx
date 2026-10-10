"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CircleDot, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/input";
import { PLACES } from "@/lib/migo/util";

const names = Object.keys(PLACES);
const schema = z.object({ from: z.string(), to: z.string() }).refine((v) => v.from !== v.to, { path: ["to"], message: "Pickup and drop-off must differ" });

/** Uber-style "Where to?" card on the landing hero. */
export function HeroSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { from: names[0], to: names[2] } });
  return (
    <form noValidate onSubmit={handleSubmit((v) => router.push(`/find-ride?from=${encodeURIComponent(v.from)}&to=${encodeURIComponent(v.to)}`))} className="w-full max-w-md space-y-3 rounded-3xl bg-surface p-5 text-ink shadow-2xl">
      <h2 className="text-lg font-extrabold">Find a ride</h2>
      <div className="relative space-y-3 pl-8">
        <span className="absolute left-2 top-5 bottom-5 w-px bg-ink/30" aria-hidden />
        <CircleDot className="absolute left-0 top-3 h-4 w-4" aria-hidden /><Square className="absolute bottom-3 left-0 h-4 w-4 fill-ink" aria-hidden />
        <Field><Select aria-label="Pickup" {...register("from")}>{names.map((n) => <option key={n}>{n}</option>)}</Select></Field>
        <Field error={errors.to}><Select aria-label="Drop-off" {...register("to")}>{names.map((n) => <option key={n}>{n}</option>)}</Select></Field>
      </div>
      <Button size="lg" className="h-14 w-full text-base">See rides <ArrowRight className="h-4 w-4" /></Button>
    </form>
  );
}
