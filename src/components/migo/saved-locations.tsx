"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, GraduationCap, Heart, Home, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/input";
import { savedLocationSchema } from "@/lib/migo/schemas";
import { userService } from "@/lib/migo/services";
import { PLACES } from "@/lib/migo/util";
import { GoogleMapPicker, type PickedPlace } from "./google-map-picker";

export type SavedLocation = { id: string; label: string; place: string; lat?: number; lng?: number };

const LABELS = ["Home", "Office", "School", "Other"];
const names = Object.keys(PLACES);
const LS_KEY = "migo_saved_locations";
const labelIcon = (l: string) => (l === "Home" ? Home : l === "Office" ? Briefcase : l === "School" ? GraduationCap : Heart);

const readLocal = (): SavedLocation[] => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}; 

/** Saved places — stored in backend preferences; falls back to this device if the API drops the key. */
function useSavedLocations() {
  const qc = useQueryClient();
  const [fallback, setFallback] = useState(false);
  const [local, setLocal] = useState<SavedLocation[]>([]);
  useEffect(() => setLocal(readLocal()), []);
  const q = useQuery({ queryKey: ["prefs"], queryFn: userService.prefs, staleTime: 10_000 });
  const prefs = (q.data as any)?.preferences ?? (q.data as any) ?? {};
  const backend = Array.isArray(prefs.savedLocations) ? (prefs.savedLocations as SavedLocation[]) : null;
  const locations = backend ?? local;

  async function persist(next: SavedLocation[]) {
    try {
      await userService.updatePrefs({ savedLocations: next });
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      setFallback(false);
      qc.invalidateQueries({ queryKey: ["prefs"] });
    } catch {
      setLocal(next);
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      setFallback(true);
      toast.error("Couldn't reach the server — saved on this device only");
    }
  }
  return { locations, persist, fallback };
}

/** Full manager — used on the profile page ("set a location as my preference"). */
export function SavedLocationsManager() {
  const { locations, persist } = useSavedLocations();
  const [mapPlace, setMapPlace] = useState<PickedPlace | null>(null);
  const f = useForm<z.infer<typeof savedLocationSchema>>({
    resolver: zodResolver(savedLocationSchema),
    defaultValues: { label: "Home", place: names[0] },
  });

  const add = f.handleSubmit((v) => {
    if (locations.some((l) => l.label === v.label)) return toast.error(`You already saved a "${v.label}" place`);
    if (locations.length >= 6) return toast.error("You can save up to 6 places");
    const place = mapPlace?.place || v.place;
    persist([
      ...locations,
      {
        id: crypto.randomUUID(),
        label: v.label,
        place,
        lat: mapPlace?.lat,
        lng: mapPlace?.lng,
      },
    ]);
    toast.success(`${v.label} saved`);
    setMapPlace(null);
  });
  const remove = (id: string) => persist(locations.filter((l) => l.id !== id));

  return (
    <div className="space-y-4">
      {locations.length > 0 ? (
        <ul className="space-y-2">
          {locations.map((l) => {
            const I = labelIcon(l.label);
            return (
              <li key={l.id} className="flex items-center gap-3 rounded-2xl bg-cream p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface">
                  <I className="h-4 w-4 text-primary" />
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block text-sm">{l.label}</b>
                  <span className="block truncate text-xs text-muted">
                    {l.place}, Dhaka
                    {l.lat != null ? ` · ${l.lat.toFixed(4)}, ${l.lng?.toFixed(4)}` : ""}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${l.label}`}
                  className="press flex h-9 w-9 items-center justify-center rounded-full text-danger hover:bg-line"
                  onClick={() => remove(l.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-muted">Save home, office or school to book a ride in two taps.</p>
      )}

      <GoogleMapPicker
        label="Select on Google Map"
        height={220}
        onPick={(p) => {
          setMapPlace(p);
          f.setValue("place", p.place, { shouldValidate: true });
        }}
      />

      <form onSubmit={add} noValidate className="grid grid-cols-[6.5rem_1fr_auto] items-start gap-2">
        <Field error={f.formState.errors.label}>
          <Select {...f.register("label")}>
            {LABELS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </Select>
        </Field>
        <Field error={f.formState.errors.place}>
          <Select {...f.register("place")}>
            {mapPlace && !names.includes(mapPlace.place) && (
              <option value={mapPlace.place}>{mapPlace.place} (map)</option>
            )}
            {names.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </Select>
        </Field>
        <Button type="submit" className="h-12 px-3" aria-label="Add saved place">
          <Plus className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

/** Quick-pick chips — used on the find-ride page. */
export function SavedLocationChips({ onPick }: { onPick: (place: string, field: "from" | "to") => void }) {
  const { locations } = useSavedLocations();
  if (locations.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Saved places</p>
      <div className="flex flex-wrap gap-2">
        {locations.map((l) => {
          const I = labelIcon(l.label);
          return (
            <span key={l.id} className="flex items-center gap-1 rounded-full border border-line bg-cream py-1 pl-3 pr-1 text-sm font-semibold">
              <I className="h-4 w-4 text-muted" />
              {l.label}
              <button type="button" className="rounded-full px-2 py-0.5 text-xs font-bold text-primary hover:bg-line" onClick={() => onPick(l.place, "from")}>
                From
              </button>
              <button type="button" className="rounded-full px-2 py-0.5 text-xs font-bold text-primary hover:bg-line" onClick={() => onPick(l.place, "to")}>
                To
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
