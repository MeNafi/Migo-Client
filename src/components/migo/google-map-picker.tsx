"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Search, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/migo/cn";

declare global {
  interface Window {
    google?: any;
    __migoMapsInit?: () => void;
  }
}

const DHAKA = { lat: 23.8103, lng: 90.4125 };
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

function loadGoogleMaps(key: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-migo-maps]');
    if (existing) {
      window.__migoMapsInit = () => resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=__migoMapsInit`;
    s.async = true;
    s.defer = true;
    s.dataset.migoMaps = "1";
    window.__migoMapsInit = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(s);
  });
}

export type PickedPlace = {
  place: string;
  lat: number;
  lng: number;
  address?: string;
};

type Props = {
  value?: string;
  onPick: (p: PickedPlace) => void;
  className?: string;
  height?: number;
  label?: string;
};

/**
 * Google Maps location picker — click map or search Places to select a point in Dhaka.
 * Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. Falls back to text search when key is missing.
 */
export function GoogleMapPicker({ value, onPick, className, height = 280, label = "Pick location on map" }: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [query, setQuery] = useState(value ?? "");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<PickedPlace | null>(null);

  const placeMarker = useCallback((lat: number, lng: number, title?: string) => {
    if (!mapRef.current || !window.google) return;
    const pos = { lat, lng };
    if (markerRef.current) markerRef.current.setMap(null);
    markerRef.current = new window.google.maps.Marker({
      position: pos,
      map: mapRef.current,
      title: title || "Selected",
      animation: window.google.maps.Animation.DROP,
    });
    mapRef.current.panTo(pos);
  }, []);

  useEffect(() => {
    if (!MAPS_KEY) {
      setError("Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the interactive map.");
      return;
    }
    let cancelled = false;
    loadGoogleMaps(MAPS_KEY)
      .then(() => {
        if (cancelled || !mapEl.current || !window.google) return;
        const map = new window.google.maps.Map(mapEl.current, {
          center: DHAKA,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: undefined,
        });
        mapRef.current = map;
        map.addListener("click", (e: any) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          placeMarker(lat, lng);
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results: any[], status: string) => {
            const address = status === "OK" && results?.[0] ? results[0].formatted_address : `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            const place = results?.[0]?.address_components?.find((c: any) => c.types.includes("neighborhood") || c.types.includes("sublocality") || c.types.includes("locality"))?.long_name || address.split(",")[0];
            const p = { place, lat, lng, address };
            setPicked(p);
            setQuery(place);
            onPick(p);
          });
        });
        setReady(true);
      })
      .catch(() => setError("Could not load Google Maps. Check your API key."));
    return () => {
      cancelled = true;
    };
  }, [onPick, placeMarker]);

  function searchPlace() {
    if (!query.trim()) return;
    if (!window.google?.maps || !mapRef.current) {
      // fallback without maps
      onPick({ place: query.trim(), lat: DHAKA.lat, lng: DHAKA.lng });
      setPicked({ place: query.trim(), lat: DHAKA.lat, lng: DHAKA.lng });
      return;
    }
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    service.textSearch({ query: `${query} Dhaka Bangladesh`, location: DHAKA, radius: 40000 }, (results: any[], status: string) => {
      if (status !== "OK" || !results?.[0]) return;
      const r = results[0];
      const lat = r.geometry.location.lat();
      const lng = r.geometry.location.lng();
      placeMarker(lat, lng, r.name);
      mapRef.current.setZoom(15);
      const p = { place: r.name || query, lat, lng, address: r.formatted_address };
      setPicked(p);
      setQuery(r.name || query);
      onPick(p);
    });
  }

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        placeMarker(lat, lng, "You");
        if (mapRef.current) mapRef.current.setZoom(15);
        const p = { place: "Current location", lat, lng };
        setPicked(p);
        setQuery("Current location");
        onPick(p);
      },
      () => setError("Location permission denied"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold text-muted">{label}</p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), searchPlace())}
            placeholder="Search place in Dhaka…"
            className="pl-9"
          />
        </div>
        <Button type="button" size="sm" variant="secondary" onClick={searchPlace}>
          Search
        </Button>
        <Button type="button" size="sm" variant="ghost" aria-label="Use my location" onClick={useMyLocation}>
          <Crosshair className="h-4 w-4" />
        </Button>
      </div>
      {error && !MAPS_KEY ? (
        <div className="flex min-h-[8rem] items-center justify-center rounded-2xl border border-dashed border-line bg-cream p-4 text-center text-sm text-muted">
          <div>
            <MapPin className="mx-auto mb-2 h-6 w-6" />
            <p>{error}</p>
            <p className="mt-1 text-xs">You can still type a place name above and save it.</p>
          </div>
        </div>
      ) : (
        <div
          ref={mapEl}
          className="w-full overflow-hidden rounded-2xl border border-line bg-[#e6eaee]"
          style={{ height }}
          aria-label="Google Map"
        />
      )}
      {picked && (
        <p className="flex items-start gap-1.5 text-xs text-muted">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            <b className="text-ink">{picked.place}</b>
            {picked.address ? ` · ${picked.address}` : ""}
          </span>
        </p>
      )}
      {!ready && MAPS_KEY && !error && (
        <p className="text-center text-xs text-muted">Loading map…</p>
      )}
    </div>
  );
}
