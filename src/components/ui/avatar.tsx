"use client";
import * as A from "@radix-ui/react-avatar";
import { cn } from "@/lib/migo/cn";
export function Avatar({ name, src, className }: { name: string; src?: string; className?: string }) {
  return (
    <A.Root className={cn("flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-primary text-white", className)}>
      {src && <A.Image src={src} alt={name} className="h-full w-full object-cover" />}
      <A.Fallback className="flex h-full w-full items-center justify-center text-sm font-bold">{name.charAt(0).toUpperCase()}</A.Fallback>
    </A.Root>
  );
}
