"use client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/migo/socket";

const EVENTS = ["ride:update", "ride:status", "ride:location", "location:update", "message:new", "chat:message", "notification:new", "notification"];

/**
 * Joins `rooms` and refetches `keys` whenever the server pushes an event.
 * Returns `live` — callers slow their polling down while the socket is connected.
 */
export function useRealtime(rooms: string[], keys: any[][]) {
  const qc = useQueryClient();
  const [live, setLive] = useState(false);
  const roomKey = rooms.join("|");
  useEffect(() => {
    const s = getSocket();
    if (!s) return;
    const refresh = () => keys.forEach((k) => qc.invalidateQueries({ queryKey: k }));
    const up = () => { setLive(true); rooms.forEach((r) => s.emit("join", r)); };
    const down = () => setLive(false);
    if (s.connected) up();
    s.on("connect", up); s.on("disconnect", down);
    EVENTS.forEach((e) => s.on(e, refresh));
    return () => { s.off("connect", up); s.off("disconnect", down); EVENTS.forEach((e) => s.off(e, refresh)); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomKey, qc]);
  return live;
}
