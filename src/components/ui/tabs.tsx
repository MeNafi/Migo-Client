"use client";
import * as T from "@radix-ui/react-tabs";
import { cn } from "@/lib/migo/cn";
export const Tabs = T.Root;
export const TabsList = ({ className, ...p }: React.ComponentProps<typeof T.List>) => <T.List className={cn("tabs tabs-box w-full bg-cream", className)} {...p} />;
export const TabsTrigger = ({ className, ...p }: React.ComponentProps<typeof T.Trigger>) => <T.Trigger className={cn("tab flex-1 font-bold data-[state=active]:bg-primary data-[state=active]:text-white", className)} {...p} />;
export const TabsContent = T.Content;
