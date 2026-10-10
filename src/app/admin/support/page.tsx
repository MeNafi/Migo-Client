"use client";
import { AdminList } from "@/components/migo/admin-list";
import { ActBtn } from "@/components/migo/admin-act";
import { adminService } from "@/lib/migo/services";
 
export default function Support() {
  return <AdminList title="Support" path="support/tickets" actions={(o, k) => o.status === "RESOLVED" || o.status === "CLOSED" ? null : <ActBtn label="Resolve" variant="success" keyOf={k} fn={() => adminService.update(`support/tickets/${o.id}`, { status: "RESOLVED" })} />} />;
}
