import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function money(n: number) {
  return `৳${n}`;
}

export function statusLabel(s: string) {
  return s.replaceAll("_", " ");
}
