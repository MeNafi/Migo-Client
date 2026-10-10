"use client";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/migo/cn";
export const Label = ({ className, ...p }: React.ComponentProps<typeof LabelPrimitive.Root>) => <LabelPrimitive.Root className={cn("text-xs font-bold uppercase tracking-wide text-muted", className)} {...p} />;
