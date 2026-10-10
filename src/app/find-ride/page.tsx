"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { z } from "zod";
import { Clock, Minus, Plus, Star, Users } from "lucide-react";
import { AppShell } from "@/components/migo/app-shell";
import { SavedLocationChips } from "@/components/migo/saved-locations";
import { MapCard } from "@/components/migo/map-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import { errMsg } from "@/lib/migo/api";
import { searchSchema } from "@/lib/migo/schemas";
import { matchService } from "@/lib/migo/services";
import { PLACES } from "@/lib/migo/util";

type Form = z.infer<typeof searchSchema>;
const names = Object.keys(PLACES);
const today = () => new Date().toISOString().slice(0, 10);
const tomorrow = () => new Date(Date.now() + 864e5).toISOString().slice(0, 10);

// The backend envelope varies by endpoint; read it defensively.
const toList = (r: any): any[] => (Array.isArray(r) ? r : r?.matches ?? r?.items ?? r?.results ?? []);
const view = (m: any) => {
  const route = m.route ?? {};
  const score = m.score ?? 0;
  return {
    id: m.id ?? m.matchId,
    driver: route.owner?.profile?.fullName ?? m.commuter?.profile?.fullName ?? route.title ?? "Commuter",
    rating: route.owner?.profile?.ratingAverage ?? m.commuter?.profile?.ratingAverage,
    car: [route.vehicle?.color, route.vehicle?.make, route.vehicle?.model].filter(Boolean).join(" "),
    time: route.schedules?.[0]?.departureTime ?? route.departureTime ?? m.departureTime,
    price: m.contributionBdt ?? route.contributionBdt,
    km: m.estimatedPickupKm,
    fit: Math.round(score <= 1 ? score * 100 : score),
  };
};

export default function FindRide() {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(searchSchema),
    defaultValues: { from: names[0], to: names[2], date: tomorrow(), time: "08:10", seats: 1 },
  });
  const [from, to, seats] = watch(["from", "to", "seats"]);

  // Prefill from the landing-page widget (?from=…&to=…)
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const f = q.get("from"), t = q.get("to");
    if (f && t && PLACES[f] && PLACES[t] && f !== t) reset({ from: f, to: t, date: tomorrow(), time: "08:10", seats: 1 });
  }, [reset]);

  const search = useMutation({
    mutationFn: (v: Form) => matchService.search({
      pickupName: `${v.from}, Dhaka`, pickupLat: PLACES[v.from][0], pickupLng: PLACES[v.from][1],
      destinationName: `${v.to}, Dhaka`, destinationLat: PLACES[v.to][0], destinationLng: PLACES[v.to][1],
      date: v.date, time: v.time, seats: v.seats,
    }),
    onError: (e) => toast.error(errMsg(e)),
  });
  const book = useMutation({
    mutationFn: async (id: string) => { await matchService.select(id); return matchService.request(id); },
    onSuccess: (r: any) => { toast.success("Request sent to driver"); router.push(`/rides/${r?.id ?? r?.ride?.id ?? ""}`); },
    onError: (e) => toast.error(errMsg(e)),
  });
  const results = toList(search.data).map(view);

  return (
    <AppShell title="Where to?" wide>
      <div className="grid gap-4 lg:grid-cols-[26rem_minmax(0,1fr)] lg:gap-6">
        <div className="lg:col-start-2 lg:row-start-1"><MapCard from={`${from}, Dhaka`} to={`${to}, Dhaka`} tall /></div>
        <form noValidate onSubmit={handleSubmit((v) => search.mutate(v))} className="space-y-3 rounded-3xl bg-surface p-4 shadow-sm lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start lg:p-5">
          <SavedLocationChips onPick={(place, field) => setValue(field, place)} />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
            <Field label="Pickup"><Select {...register("from")}>{names.map((n) => <option key={n}>{n}</option>)}</Select></Field>
            <Field label="Drop-off" error={errors.to}><Select {...register("to")}>{names.map((n) => <option key={n}>{n}</option>)}</Select></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date" error={errors.date}><Input type="date" min={today()} {...register("date")} /></Field>
            <Field label="Time" error={errors.time}><Input type="time" {...register("time")} /></Field>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-cream px-4 py-2">
            <span className="flex items-center gap-2 font-semibold"><Users className="h-4 w-4" />Seats</span>
            <span className="flex items-center gap-4">
              <button type="button" aria-label="Fewer seats" className="press h-9 w-9 rounded-full bg-surface" onClick={() => setValue("seats", Math.max(1, seats - 1))}><Minus className="mx-auto h-4 w-4" /></button>
              <b className="w-4 text-center">{seats}</b>
              <button type="button" aria-label="More seats" className="press h-9 w-9 rounded-full bg-surface" onClick={() => setValue("seats", Math.min(4, seats + 1))}><Plus className="mx-auto h-4 w-4" /></button>
            </span>
          </div>
          <Button size="lg" className="h-14 w-full text-base" loading={search.isPending}>{search.isPending ? "Finding rides…" : "Find rides"}</Button>
        </form>

        <div className="space-y-4 lg:col-start-2 lg:row-start-2">
          {search.isPending && [0, 1].map((i) => <div key={i} className="skeleton h-28" />)}
          {search.isSuccess && results.length === 0 && <p className="rounded-2xl bg-surface p-6 text-center text-muted">No commuters on this route yet. Try another time or pickup.</p>}
          {results.map((m) => (
            <article key={m.id} className="space-y-3 rounded-3xl bg-surface p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="text-lg font-extrabold">{m.driver}</h3><p className="text-sm text-muted">{m.car || "Verified commuter"}</p></div>
                <p className="text-2xl font-extrabold">৳{m.price ?? "—"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {m.time && <Badge><Clock className="mr-1 h-3 w-3" />{m.time}</Badge>}
                {m.rating ? <Badge><Star className="mr-1 h-3 w-3" />{Number(m.rating).toFixed(1)}</Badge> : null}
                {m.km != null && <Badge>{Number(m.km).toFixed(1)} km away</Badge>}
                {m.fit > 0 && <Badge tone="success">{m.fit}% match</Badge>}
              </div>
              <Button className="w-full" loading={book.isPending && book.variables === m.id} disabled={book.isPending} onClick={() => book.mutate(m.id)}>Request seat</Button>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
