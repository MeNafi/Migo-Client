import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/migo/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 min-h-11 px-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-hover",
        secondary: "bg-surface text-primary border border-primary hover:bg-cream",
        ghost: "bg-transparent text-ink hover:bg-cream",
        success: "bg-success text-white hover:opacity-90",
        danger: "bg-danger text-white hover:opacity-90",
      },
      size: {
        default: "h-11",
        sm: "h-9 min-h-9 px-3 text-xs",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  loading,
  children,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean }) {
  if (asChild) return <Slot className={cn(buttonVariants({ variant, size, className }))} {...props}>{children}</Slot>;
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} disabled={props.disabled || loading} {...props}>
      {loading && <span className="loading loading-spinner loading-sm" aria-hidden />}{children}
    </button>
  );
}
