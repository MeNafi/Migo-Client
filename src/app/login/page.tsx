"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CarFront, ShieldCheck, User } from "lucide-react";
import { Logo } from "@/components/migo/logo";
import { PasswordInput } from "@/components/migo/password-input";
import { ThemeToggle } from "@/components/migo/theme-toggle";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { errMsg } from "@/lib/migo/api";
import { homeFor, useAuth } from "@/lib/migo/auth";
import { loginSchema, type Login } from "@/lib/migo/schemas";
import { cn } from "@/lib/migo/cn";

const ROLES = [
  { value: "PASSENGER", label: "Passenger", hint: "I need a seat", icon: User },
  { value: "COMMUTER", label: "Commuter", hint: "I drive & share seats", icon: CarFront },
] as const;
type Role = (typeof ROLES)[number]["value"];

const DEMOS = [
  { label: "Passenger", icon: User, email: "nabila@migo.app", password: "Passenger@123" },
  { label: "Commuter", icon: CarFront, email: "karim@migo.app", password: "Commuter@123" },
  { label: "Admin", icon: ShieldCheck, email: "admin@migo.app", password: "Admin@123" },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const logout = useAuth((s) => s.logout);
  const [role, setRole] = useState<Role>("PASSENGER");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Login>({ resolver: zodResolver(loginSchema) });

  async function signIn(v: Login) {
    try {
      const user = await login(v.email, v.password);
      const admin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
      if (!admin && user.role !== role) {
        await logout();
        toast.error(`This account is registered as a ${user.role.toLowerCase()} — pick “${user.role === "COMMUTER" ? "Commuter" : "Passenger"}” above and try again.`);
        return;
      }
      toast.success(`Welcome back, ${user.profile?.fullName ?? user.fullName ?? "rider"}`);
      const next = new URLSearchParams(location.search).get("next");
      router.replace(next && next.startsWith("/") && !next.startsWith("//") ? next : homeFor(user.role));
    } catch (e) { toast.error(errMsg(e)); }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg p-4 py-10">
      <div className="absolute right-4 top-4 md:right-6 md:top-6"><ThemeToggle /></div>
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-xl sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <Logo className="h-9" />
            <p className="mt-3 text-sm text-muted">Daily ride-sharing for Dhaka commutes</p>
          </div>
          <h1 className="text-xl font-extrabold">Sign in to Migo</h1>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit(signIn)} noValidate>
            <Field label="Email" error={errors.email}>
              <Input type="email" placeholder="you@example.com" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            </Field>
            <Field label="Password" error={errors.password}>
              <PasswordInput placeholder="Your password" autoComplete="current-password" aria-invalid={!!errors.password} {...register("password")} />
            </Field>
            <div>
              <p className="mb-1.5 text-sm font-medium">I am signing in as</p>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button key={r.value} type="button" onClick={() => setRole(r.value)} aria-pressed={role === r.value}
                    className={cn("press flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                      role === r.value ? "border-primary bg-cream" : "border-line hover:border-muted")}>
                    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", role === r.value ? "bg-primary text-on-primary" : "bg-cream text-muted")}>
                      <r.icon className="h-4 w-4" />
                    </span>
                    <span><b className="block text-sm">{r.label}</b><span className="block text-xs text-muted">{r.hint}</span></span>
                  </button>
                ))}
              </div>
            </div>
            <Button size="lg" className="h-12 w-full text-base" loading={isSubmitting}>Sign in</Button>
          </form>
          <div className="mt-6">
            <div className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-muted">
              <span className="h-px flex-1 bg-line" />One-click demo login<span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMOS.map((d) => (
                <Button key={d.label} type="button" variant="secondary" size="sm" disabled={isSubmitting} onClick={() => signIn(d)}>
                  <d.icon className="h-4 w-4" />{d.label}
                </Button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            New to Migo? <Link href="/register" className="font-bold text-primary underline">Create an account</Link>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-muted"><Link href="/" className="underline">Back to home</Link></p>
      </div>
    </div>
  );
}
