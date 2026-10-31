"use client";
import { io, type Socket } from "socket.io-client";
import { API_ROOT, tokenStore } from "./api";

let socket: Socket | null = null;
  
/** Lazy Socket.IO client. Returns null when logged out. Fails silently (polling takes over). */
export function getSocket(): Socket | null {
  if (typeof window === "undefined") return null;
  const token = tokenStore.get();
  if (!token) return null;
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || API_ROOT, {
      auth: { token }, transports: ["websocket", "polling"], reconnectionAttempts: 3, timeout: 5000,
    });
    socket.on("connect_error", () => {});
  }
  return socket;
}
export function closeSocket() { socket?.disconnect(); socket = null; }
