"use client";
import { create } from "zustand";
import { tokenStore } from "./api";
import { authService } from "./services";
 
export const displayName = (u: any) => u?.profile?.fullName ?? u?.fullName ?? u?.email ?? "Rider";
const pickUser = (d: any) => d?.user ?? d;

interface AuthState {
  user: any | null;
  ready: boolean;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  register: (role: "PASSENGER" | "COMMUTER", b: { fullName: string; email: string; phone: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  ready: false,
  hydrate: async () => {
    if (get().ready) return;
    if (!tokenStore.get()) return set({ ready: true });
    try {
      const user = pickUser(await authService.me());
      set({ user, ready: true });
    } catch {
      tokenStore.clear();
      set({ user: null, ready: true });
    }
  },
  login: async (email, password) => {
    const d = await authService.login({ email, password });
    tokenStore.set(d.accessToken, d.refreshToken);
    const user = d.user ?? pickUser(await authService.me());
    set({ user, ready: true });
    return user;
  },
  register: async (role, b) => {
    await (role === "COMMUTER" ? authService.registerCommuter(b) : authService.registerPassenger(b));
    return get().login(b.email, b.password);
  },
  logout: async () => {
    try { await authService.logout(); } catch {}
    tokenStore.clear();
    set({ user: null });
  },
}));

export const homeFor = (role?: string) => (role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin" : role === "COMMUTER" ? "/commuter" : "/find-ride");
