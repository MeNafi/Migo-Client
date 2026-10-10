"use client";
import { AdminList } from "@/components/migo/admin-list";
import { ActBtn } from "@/components/migo/admin-act";
import { adminService } from "@/lib/migo/services";

export default function AdminRides() {
  return <AdminList title="Rides" path="rides" actions={(o, k) => ["COMPLETED", "CANCELLED"].includes(o.status) ? null : <>
    <ActBtn label="Cancel" variant="danger" ask="Cancel this ride?" keyOf={k} fn={() => adminService.act(`rides/${o.id}/cancel`, { reason: "Cancelled by admin" })} />
    <ActBtn label="No-show" keyOf={k} fn={() => adminService.act(`rides/${o.id}/no-show`, { reason: "Passenger no-show" })} /></>} />;
}
