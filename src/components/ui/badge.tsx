import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/migo/cn";
const v = cva("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold", { variants: { tone: { neutral: "bg-cream text-ink", success: "bg-success/15 text-success", info: "bg-accent/15 text-accent", warning: "bg-warning/25 text-warning", danger: "bg-danger/15 text-danger" } }, defaultVariants: { tone: "neutral" } });
export const Badge = ({ className, tone, ...p }: React.ComponentProps<"span"> & VariantProps<typeof v>) => <span className={cn(v({ tone }), className)} {...p} />;
