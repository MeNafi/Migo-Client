"use client";
import { AdminList } from "@/components/migo/admin-list";
import { ActBtn } from "@/components/migo/admin-act";
import { adminService } from "@/lib/migo/services";

export default function Verifications() {
  return <AdminList title="Verifications" path="verifications" actions={(o, k) => o.status === "PENDING" || !o.status ? <>
    <ActBtn label="Approve" variant="success" keyOf={k} fn={() => adminService.approveVerification(o.id, "Documents match registration")} />
    <ActBtn label="Reject" variant="danger" keyOf={k} fn={() => adminService.rejectVerification(o.id, "Documents do not match")} />
    <ActBtn label="Resubmit" keyOf={k} fn={() => adminService.act(`verifications/${o.id}/request-resubmission`, { reason: "Please upload clearer documents" })} /></> : null} />;
}
