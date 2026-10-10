"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
 
export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  set: (t: Theme) => void;
  toggle: () => void;
};

const apply = (t: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
  // Keep daisy data-theme in sync so form controls (toggle, etc.) follow mode
  root.setAttribute("data-theme", t === "dark" ? "migo-dark" : "migo");
};

/** Global theme store, persisted to localStorage under "migo_theme". */
export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      set: (t) => {
        apply(t);
        set({ theme: t });
      },
      toggle: () => get().set(get().theme === "dark" ? "light" : "dark"),
    }),
    { name: "migo_theme" },
  ),
);

/** Apply the persisted (or system-preferred) theme on first paint. Call once from a client provider. */
export function initTheme() {
  try {
    const saved = JSON.parse(localStorage.getItem("migo_theme") || "{}")?.state?.theme as Theme | undefined;
    const t = saved ?? (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    apply(t);
    useTheme.setState({ theme: t });
  } catch {
    apply("light");
  }
}
