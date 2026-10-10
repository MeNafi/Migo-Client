import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";
import { Label } from "./label";

/** Label + control + inline Zod error, for react-hook-form fields. */
export function Field({ label, error, children, className }: { label?: string; error?: FieldError | { message?: string }; children: ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      {label && <Label>{label}</Label>}
      {children}
      {error?.message && <p role="alert" className="text-xs font-semibold text-danger">{error.message}</p>}
    </div>
  );
}
