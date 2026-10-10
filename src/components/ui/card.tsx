import { cn } from "@/lib/migo/cn";
export const Card = ({ className, ...p }: React.ComponentProps<"section">) => <section className={cn("rounded-3xl bg-surface p-4 shadow-sm", className)} {...p} />;
