"use client";
import { AdminList } from "@/components/migo/admin-list";
import { ActBtn } from "@/components/migo/admin-act";
import { adminService, paymentService } from "@/lib/migo/services";

export default function AdminPayments() {
  return <AdminList title="Payments" path="payments" actions={(o, k) => <>
    {o.status === "FAILED" && <ActBtn label="Retry" keyOf={k} fn={() => adminService.act(`payments/${o.id}/retry`)} />}
    {o.status === "PENDING" && <ActBtn label="Validate" keyOf={k} fn={() => paymentService.validate(o.id)} />}
    {o.status === "PAID" && <ActBtn label="Refund" variant="danger" ask="Refund this payment?" keyOf={k} fn={() => paymentService.refund(o.id, "Refund by admin")} />}</>} />;
}
