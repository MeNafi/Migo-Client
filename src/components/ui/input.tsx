import * as React from "react";
import { cn } from "@/lib/migo/cn";

const base = "w-full rounded-xl bg-cream px-4 text-base outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-primary aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger disabled:opacity-50";
export const Input = ({ className, ...p }: React.ComponentProps<"input">) => <input className={cn(base, "h-12", className)} {...p} />;
export const Textarea = ({ className, ...p }: React.ComponentProps<"textarea">) => <textarea className={cn(base, "min-h-24 py-3", className)} {...p} />;
export const Select = ({ className, ...p }: React.ComponentProps<"select">) => <select className={cn(base, "h-12", className)} {...p} />;
