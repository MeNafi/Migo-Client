"use client";
import { confirmAsync } from "@/components/ui/confirm";
import { Button } from "@/components/ui/button";
import { useAct } from "./kit";

/** Small admin button: runs `fn`, toasts, refreshes the list. */
export function ActBtn({ label, fn, keyOf, variant = "secondary", ask }: { label: string; fn: () => Promise<any>; keyOf: string[]; variant?: any; ask?: string }) {
  const m = useAct(fn, [keyOf], `${label} done`);
  return <Button size="sm" variant={variant} disabled={m.isPending} onClick={async () => (!ask || (await confirmAsync(ask))) && m.mutate(undefined)}>{m.isPending ? "…" : label}</Button>;
}
