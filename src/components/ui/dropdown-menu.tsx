"use client";
import * as D from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/migo/cn";
export const DropdownMenu = D.Root;
export const DropdownMenuTrigger = D.Trigger;
export const DropdownMenuContent = ({ className, align = "end", sideOffset = 8, ...p }: React.ComponentProps<typeof D.Content>) => (
  <D.Portal><D.Content align={align} sideOffset={sideOffset} className={cn("z-50 min-w-56 rounded-2xl border border-line bg-surface p-2 shadow-xl data-[state=open]:animate-in", className)} {...p} /></D.Portal>
);
export const DropdownMenuItem = ({ className, ...p }: React.ComponentProps<typeof D.Item>) => <D.Item className={cn("flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-semibold outline-none data-[highlighted]:bg-cream", className)} {...p} />;
export const DropdownMenuLabel = ({ className, ...p }: React.ComponentProps<typeof D.Label>) => <D.Label className={cn("px-3 py-2", className)} {...p} />;
export const DropdownMenuSeparator = () => <D.Separator className="my-1 h-px bg-line" />;
