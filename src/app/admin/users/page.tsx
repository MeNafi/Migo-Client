"use client";
import { AdminList } from "@/components/migo/admin-list";
import { ActBtn } from "@/components/migo/admin-act";
import { adminService } from "@/lib/migo/services";

export default function Users() {
  return <AdminList title="Users" path="users" actions={(o, k) => o.status === "SUSPENDED"
    ? <ActBtn label="Reactivate" keyOf={k} fn={() => adminService.setUserStatus(o.id, { status: "ACTIVE", reason: "Reactivated by admin" })} />
    : <ActBtn label="Suspend" variant="danger" ask="Suspend this user?" keyOf={k} fn={() => adminService.setUserStatus(o.id, { status: "SUSPENDED", reason: "Suspended by admin" })} />} />;
}
