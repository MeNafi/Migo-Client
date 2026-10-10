"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Star } from "lucide-react";
import { AppShell, MoreLinks } from "@/components/migo/app-shell";
import { PhotoUploader } from "@/components/migo/photo-uploader";
import { SavedLocationsManager } from "@/components/migo/saved-locations";
import { Card, H, useAct, useData } from "@/components/migo/kit";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { displayName, useAuth } from "@/lib/migo/auth";
import { emergencySchema, nameSchema, passwordSchema } from "@/lib/migo/schemas";
import { authService, userService } from "@/lib/migo/services";
import { closeSocket } from "@/lib/migo/socket";

const ROLE_LABEL: Record<string, string> = { PASSENGER: "Passenger", COMMUTER: "Commuter", ADMIN: "Administrator", SUPER_ADMIN: "Super admin" };

export default function Profile() {
  const router = useRouter();
  const logout = useAuth((s) => s.logout);
  const q = useData(["me"], userService.me);
  const prefs = useData(["prefs"], userService.prefs);
  const u = q.data?.user ?? q.data;
  const name = useForm<z.infer<typeof nameSchema>>({ resolver: zodResolver(nameSchema), defaultValues: { fullName: "" } });
  const ec = useForm<z.infer<typeof emergencySchema>>({ resolver: zodResolver(emergencySchema), defaultValues: { name: "", phone: "" } });
  const pw = useForm<z.infer<typeof passwordSchema>>({ resolver: zodResolver(passwordSchema), defaultValues: { currentPassword: "", newPassword: "" } });
  useEffect(() => {
    if (!u) return;
    name.reset({ fullName: u.profile?.fullName ?? u.fullName ?? "" });
    ec.reset({ name: u.profile?.emergencyName ?? "", phone: u.profile?.emergencyPhone ?? "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u]);

  const saveName = useAct((v: object) => userService.update(v), [["me"]], "Profile saved");
  const saveEc = useAct((v: object) => userService.emergencyContact(v), [["me"]], "Emergency contact saved");
  const toggle = useAct((b: object) => userService.updatePrefs(b), [["prefs"]]);
  const change = useAct((v: object) => authService.changePassword(v), [], "Password changed", () => pw.reset());
  const p = prefs.data?.preferences ?? prefs.data ?? {};

  return (
    <AppShell title="Account">
      <div className="space-y-3">
        <Card>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <PhotoUploader />
            <div className="text-center sm:text-left">
              <b className="text-lg">{displayName(u)}</b>
              <p className="text-sm text-muted">{u?.email}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-muted">{ROLE_LABEL[u?.role] ?? u?.role}</p>
              {u?.profile?.ratingAverage != null && (
                <p className="mt-1 flex items-center justify-center gap-1 text-sm font-semibold sm:justify-start">
                  <Star className="h-4 w-4 fill-warning text-warning" />{Number(u.profile.ratingAverage).toFixed(1)} · {u.profile.completedRides ?? 0} rides
                </p>
              )}
            </div>
          </div>
        </Card>
        <Card><form className="space-y-3" noValidate onSubmit={name.handleSubmit((v) => saveName.mutate(v))}>
          <H>Name</H><Field error={name.formState.errors.fullName}><Input {...name.register("fullName")} /></Field><Button className="w-full" loading={saveName.isPending}>Save</Button></form></Card>
        <Card><form className="space-y-3" noValidate onSubmit={ec.handleSubmit((v) => saveEc.mutate(v))}>
          <H>Emergency contact</H>
          <Field error={ec.formState.errors.name}><Input placeholder="Name" {...ec.register("name")} /></Field>
          <Field error={ec.formState.errors.phone}><Input type="tel" placeholder="01712345678" {...ec.register("phone")} /></Field>
          <Button className="w-full" loading={saveEc.isPending}>Save contact</Button></form></Card>
        <Card><H>Saved places</H><SavedLocationsManager /></Card>
        <Card className="space-y-1"><H>Notifications</H>
          {(["notifySms", "notifyPush"] as const).map((k) => (
            <label key={k} className="flex min-h-12 cursor-pointer items-center justify-between font-semibold">{k === "notifySms" ? "SMS alerts" : "Push alerts"}
              <input type="checkbox" className="toggle toggle-primary" checked={!!p[k]} onChange={(e) => toggle.mutate({ [k]: e.target.checked })} /></label>))}</Card>
        <Card><form className="space-y-3" noValidate onSubmit={pw.handleSubmit((v) => change.mutate(v))}>
          <H>Change password</H>
          <Field error={pw.formState.errors.currentPassword}><Input type="password" placeholder="Current password" autoComplete="current-password" {...pw.register("currentPassword")} /></Field>
          <Field error={pw.formState.errors.newPassword}><Input type="password" placeholder="New password" autoComplete="new-password" {...pw.register("newPassword")} /></Field>
          <Button variant="secondary" className="w-full" loading={change.isPending}>Update password</Button></form></Card>
        <H>More</H><MoreLinks />
        <Button variant="ghost" className="w-full text-danger" onClick={async () => { await logout(); closeSocket(); router.replace("/"); }}>Sign out</Button>
      </div>
    </AppShell>
  );
}
