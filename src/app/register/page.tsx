"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Logo } from "@/components/migo/logo";
import { PasswordInput } from "@/components/migo/password-input";
import { ThemeToggle } from "@/components/migo/theme-toggle";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { errMsg } from "@/lib/migo/api";
import { homeFor, useAuth } from "@/lib/migo/auth";
import { registerSchema } from "@/lib/migo/schemas";
import { cn } from "@/lib/migo/cn";
import type { z } from "zod";

type Form = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const signUp = useAuth((s) => s.register);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(registerSchema), defaultValues: { role: "PASSENGER" } });
  const role = watch("role");

  async function submit({ role, ...body }: Form) {
    try { const u = await signUp(role, body); toast.success("Welcome to Migo!"); router.replace(homeFor(u.role)); }
    catch (e) { toast.error(errMsg(e)); }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6"><ThemeToggle onDark /></div>
      <div className="road-grid p-6 pb-8 md:p-12"><Logo invert className="h-10" /></div>
      <form onSubmit={handleSubmit(submit)} noValidate className="sheet pb-safe flex-1 space-y-3 p-6 md:mx-auto md:mb-10 md:w-full md:max-w-md md:flex-none md:rounded-3xl">
        <h1 className="text-2xl font-extrabold">Create your account</h1>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-cream p-1">
          {(["PASSENGER", "COMMUTER"] as const).map((r) => (
            <button type="button" key={r} onClick={() => setValue("role", r)} className={cn("h-11 rounded-lg text-sm font-bold", role === r ? "bg-primary text-on-primary" : "text-ink")}>{r === "PASSENGER" ? "I need rides" : "I drive daily"}</button>
          ))}
        </div>
        <Field error={errors.fullName}><Input placeholder="Full name" className="h-14" aria-invalid={!!errors.fullName} {...register("fullName")} /></Field>
        <Field error={errors.email}><Input type="email" placeholder="Email" className="h-14" aria-invalid={!!errors.email} {...register("email")} /></Field>
        <Field error={errors.phone}><Input type="tel" placeholder="Phone (01712345678)" className="h-14" aria-invalid={!!errors.phone} {...register("phone")} /></Field>
        <Field error={errors.password}><PasswordInput placeholder="Password (8+ characters)" className="h-14" aria-invalid={!!errors.password} {...register("password")} /></Field>
        <Button size="lg" className="h-14 w-full text-base" loading={isSubmitting}>Sign up</Button>
        <p className="text-center text-sm text-muted">Have an account? <Link href="/login" className="font-bold text-primary underline">Sign in</Link></p>
      </form>
    </div>
  );
}
