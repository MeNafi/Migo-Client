"use client";
import { AdminList } from "@/components/migo/admin-list";
import { ActBtn } from "@/components/migo/admin-act";
import { adminService } from "@/lib/migo/services";
 
export default function AdminRoutes() {
  return <AdminList title="Routes" path="routes" actions={(o, k) => <ActBtn label={o.status === "PAUSED" ? "Activate" : "Pause"} keyOf={k} fn={() => adminService.update(`routes/${o.id}`, { status: o.status === "PAUSED" ? "ACTIVE" : "PAUSED" })} />} />;
}
