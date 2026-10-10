"use client";
import { AdminList } from "@/components/migo/admin-list";
import { ActBtn } from "@/components/migo/admin-act";
import { adminService } from "@/lib/migo/services";

export default function Reports() {
  return <AdminList title="Reports" path="reports" actions={(o, k) => o.status === "RESOLVED" ? null : <ActBtn label="Resolve" variant="success" keyOf={k} fn={() => adminService.act(`reports/${o.id}/resolve`, { reason: "Reviewed and resolved" })} />} />;
}
