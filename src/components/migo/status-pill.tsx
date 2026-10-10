import { statusLabel } from "@/lib/migo/cn";

const map: Record<string, string> = {
  ACTIVE: "bg-success/15 text-success",
  APPROVED: "bg-success/15 text-success",
  PAID: "bg-success/15 text-success",
  COMPLETED: "bg-success/15 text-success",
  CONFIRMED: "bg-success/15 text-success",
  IN_PROGRESS: "bg-accent/15 text-primary",
  PENDING: "bg-warning/15 text-warning",
  OPEN: "bg-warning/15 text-warning",
  REQUESTED: "bg-warning/15 text-warning",
  MATCHED: "bg-accent/15 text-primary",
  ACCEPTED: "bg-accent/15 text-primary",
  SUGGESTED: "bg-cream text-muted",
  PAUSED: "bg-cream text-muted",
  FAILED: "bg-danger/15 text-danger",
  REJECTED: "bg-danger/15 text-danger",
  CANCELLED: "bg-danger/15 text-danger",
  SUSPENDED: "bg-danger/15 text-danger",
};

export function StatusPill({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${map[value] || "bg-cream text-muted"}`}
    >
      {statusLabel(value)}
    </span>
  );
}
