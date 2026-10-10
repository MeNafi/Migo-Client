"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { AppShell } from "@/components/migo/app-shell";
import { Card, H, Item, Load, useAct, useData } from "@/components/migo/kit";
import { Button } from "@/components/ui/button";
import { confirmAsync } from "@/components/ui/confirm";
import { Field } from "@/components/ui/field";
import { Input, Select, Textarea } from "@/components/ui/input";
import { reportSchema, ticketSchema } from "@/lib/migo/schemas";
import { rideService, safetyService } from "@/lib/migo/services";
import { list } from "@/lib/migo/util";

export default function Safety() {
  const rides = useData(["rides"], () => rideService.list());
  const live = list(rides.data).find((r) => ["IN_PROGRESS", "CONFIRMED", "ACCEPTED"].includes(r.status));
  const tickets = useData(["tickets"], safetyService.tickets);
  const rep = useForm<z.infer<typeof reportSchema>>({ resolver: zodResolver(reportSchema), defaultValues: { targetType: "USER", targetId: "", reason: "", details: "" } });
  const tk = useForm<z.infer<typeof ticketSchema>>({ resolver: zodResolver(ticketSchema), defaultValues: { subject: "", message: "" } });
  const sos = useAct(() => safetyService.emergency({ rideId: live?.id, note: "Need help" }), [], "Emergency alert sent");
  const report = useAct((v: object) => safetyService.report(v), [], "Report submitted", () => rep.reset());
  const ticket = useAct((v: object) => safetyService.createTicket(v), [["tickets"]], "Ticket created", () => tk.reset());
  return (
    <AppShell title="Safety">
      <div className="space-y-3">
        <Card className="space-y-2 bg-danger/10"><H>Emergency</H>
          <p className="text-sm">{live ? "Alerts your emergency contact and Migo safety with your current trip." : "SOS is available during an active trip."}</p>
          <Button variant="danger" size="lg" className="w-full" disabled={!live} loading={sos.isPending} onClick={async () => (await confirmAsync("Send an emergency alert to Migo safety and your contact?")) && sos.mutate(undefined)}>Send SOS</Button></Card>
        <Card><form className="space-y-3" noValidate onSubmit={rep.handleSubmit((v) => report.mutate(v))}>
          <H>Report a problem</H>
          <Field label="About"><Select {...rep.register("targetType")}><option value="USER">A user</option><option value="RIDE">A ride</option></Select></Field>
          <Field label="User or ride ID" error={rep.formState.errors.targetId}><Input {...rep.register("targetId")} /></Field>
          <Field label="Reason" error={rep.formState.errors.reason}><Input {...rep.register("reason")} /></Field>
          <Field label="Details"><Textarea {...rep.register("details")} /></Field>
          <Button className="w-full" loading={report.isPending}>Submit report</Button></form></Card>
        <Card><form className="space-y-3" noValidate onSubmit={tk.handleSubmit((v) => ticket.mutate(v))}>
          <H>Contact support</H>
          <Field error={tk.formState.errors.subject}><Input placeholder="Subject" {...tk.register("subject")} /></Field>
          <Field error={tk.formState.errors.message}><Textarea placeholder="How can we help?" {...tk.register("message")} /></Field>
          <Button className="w-full" loading={ticket.isPending}>Send</Button></form></Card>
        <H>Your tickets</H>
        <Load q={tickets} isList empty="No tickets.">{(d) => d.map((t: any) => <Item key={t.id} o={t} />)}</Load>
      </div>
    </AppShell>
  );
}
