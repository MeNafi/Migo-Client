"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, ChevronDown, CarFront, CreditCard, Flag, History, LayoutDashboard, LogOut, MapPinned, MessageSquare, Route as RouteIcon, ShieldCheck, User, Wallet, CheckCheck } from "lucide-react";
import { Logo } from "./logo";
import { SiteFooter } from "./site-footer";
import { cn } from "@/lib/migo/cn";
import { displayName, homeFor, useAuth } from "@/lib/migo/auth";
import { notificationService } from "@/lib/migo/services";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRealtime } from "@/hooks/use-realtime";
import { closeSocket } from "@/lib/migo/socket";
import { ThemeToggle } from "./theme-toggle";

type Item = { to: string; label: string; icon: typeof User; tab?: boolean };
const passengerNav: Item[] = [
  { to: "/find-ride", label: "Ride", icon: MapPinned, tab: true },
  { to: "/rides", label: "Trips", icon: CarFront, tab: true },
  { to: "/messages", label: "Chat", icon: MessageSquare, tab: true },
  { to: "/payments", label: "Wallet", icon: CreditCard, tab: true },
  { to: "/profile", label: "Account", icon: User, tab: true },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/history", label: "History", icon: History },
  { to: "/safety", label: "Safety", icon: ShieldCheck },
];
const commuterNav: Item[] = [
  { to: "/commuter", label: "Home", icon: LayoutDashboard, tab: true },
  { to: "/commuter/requests", label: "Requests", icon: Flag, tab: true },
  { to: "/commuter/routes", label: "Routes", icon: RouteIcon, tab: true },
  { to: "/commuter/contributions", label: "Earnings", icon: Wallet, tab: true },
  { to: "/profile", label: "Account", icon: User, tab: true },
  { to: "/commuter/rides", label: "Rides", icon: CarFront },
  { to: "/commuter/vehicle", label: "Vehicle", icon: CarFront },
  { to: "/commuter/verification", label: "Verification", icon: ShieldCheck },
  { to: "/messages", label: "Messages", icon: MessageSquare },
];
const adminNav: Item[] = [
  { to: "/admin", label: "Home", icon: LayoutDashboard, tab: true },
  { to: "/admin/users", label: "Users", icon: User, tab: true },
  { to: "/admin/verifications", label: "Verify", icon: ShieldCheck, tab: true },
  { to: "/admin/rides", label: "Rides", icon: CarFront, tab: true },
  { to: "/admin/reports", label: "Reports", icon: Flag, tab: true },
  { to: "/admin/routes", label: "Routes", icon: RouteIcon },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/support", label: "Support", icon: MessageSquare },
  { to: "/admin/analytics", label: "Analytics", icon: LayoutDashboard },
  { to: "/admin/audit-logs", label: "Audit logs", icon: History },
];

const isActive = (path: string, to: string) =>
  path === to ||
  (to.split("/").length > 2 && path.startsWith(to + "/")) ||
  (["/find-ride", "/rides"].includes(to) && path.startsWith(to + "/"));

function NotificationsPanel({ unread, onReadAll }: { unread: number; onReadAll: () => void }) {
  const qc = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.list,
    staleTime: 15_000,
  });
  const list: any[] = Array.isArray(data) ? data : data?.notifications ?? data?.data ?? [];

  return (
    <DropdownMenuContent align="end" className="w-[min(100vw-2rem,22rem)] p-0">
      <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
        <p className="text-sm font-extrabold">Notifications</p>
        {unread > 0 && (
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            onClick={async (e) => {
              e.preventDefault();
              await notificationService.readAll();
              qc.invalidateQueries({ queryKey: ["unread"] });
              qc.invalidateQueries({ queryKey: ["notifications"] });
              onReadAll();
            }}
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {isLoading && <p className="px-3 py-6 text-center text-sm text-muted">Loading…</p>}
        {isError && <p className="px-3 py-6 text-center text-sm text-muted">Could not load notifications</p>}
        {!isLoading && !isError && list.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted">No notifications yet</p>
        )}
        {list.slice(0, 30).map((n: any) => (
          <button
            key={n.id ?? n._id ?? n.createdAt}
            type="button"
            className={cn(
              "flex w-full flex-col gap-0.5 border-b border-line px-3 py-3 text-left transition-colors last:border-0 hover:bg-cream",
              !n.read && !n.isRead && "bg-cream/60",
            )}
            onClick={async () => {
              if (n.id && !n.read && !n.isRead) {
                try {
                  await notificationService.read(n.id);
                  qc.invalidateQueries({ queryKey: ["unread"] });
                  qc.invalidateQueries({ queryKey: ["notifications"] });
                } catch { /* ignore */ }
              }
            }}
          >
            <span className="text-sm font-semibold leading-snug">{n.title ?? n.subject ?? n.type ?? "Update"}</span>
            {(n.body || n.message || n.content) && (
              <span className="line-clamp-2 text-xs text-muted">{n.body ?? n.message ?? n.content}</span>
            )}
            {n.createdAt && (
              <span className="mt-0.5 text-[11px] text-muted">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            )}
          </button>
        ))}
      </div>
    </DropdownMenuContent>
  );
}

export function AppShell({ children, title, wide }: { children: ReactNode; title: string; wide?: boolean }) {
  const { user, ready, hydrate, logout } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const qc = useQueryClient();
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);
  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);
  const live = useRealtime(user ? [`user:${user.id}`] : [], [["unread"], ["rides"], ["notifications"]]);

  const { data: unreadRaw } = useQuery({
    queryKey: ["unread"],
    queryFn: notificationService.unread,
    enabled: !!user,
    refetchInterval: live ? 120000 : 30000,
  });
  const unread = typeof unreadRaw === "number" ? unreadRaw : unreadRaw?.count ?? unreadRaw?.unread ?? 0;

  if (!ready || !user)
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <Logo invert className="animate-pulse" />
      </div>
    );

  const nav = user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? adminNav : user.role === "COMMUTER" ? commuterNav : passengerNav;
  const tabs = nav.filter((n) => n.tab);
  const extra = nav.filter((n) => !n.tab);
  const pill = (to: string) =>
    cn(
      "flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition-colors lg:px-4",
      isActive(path, to) ? "bg-primary text-on-primary" : "text-ink hover:bg-cream",
    );
  const signOut = async () => {
    await logout();
    closeSocket();
    qc.clear();
    router.replace("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8">
          <Link href={homeFor(user.role)} className="shrink-0" aria-label="Migo home">
            <Logo />
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center gap-0.5 md:flex lg:gap-1" aria-label="Main">
            {tabs.map((i) => (
              <Link key={i.to} href={i.to} className={pill(i.to)}>
                <i.icon className="hidden h-4 w-4 lg:block" />
                {i.label}
              </Link>
            ))}
            {extra.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={cn(pill("/__more"), extra.some((i) => isActive(path, i.to)) && "bg-cream")}>
                    More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {extra.map((i) => (
                    <DropdownMenuItem key={i.to} asChild>
                      <Link href={i.to}>
                        <i.icon className="h-4 w-4" />
                        {i.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Notifications"
                  className="press relative flex h-10 w-10 items-center justify-center rounded-full bg-cream hover:bg-line"
                >
                  <Bell className="h-5 w-5" />
                  {unread > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <NotificationsPanel unread={unread} onReadAll={() => setNotifOpen(false)} />
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Account menu"
                  className="press flex h-10 items-center gap-2 rounded-full bg-cream pl-1 pr-1 hover:bg-line lg:pr-3"
                >
                  <Avatar name={displayName(user)} src={user.profile?.photoUrl} className="h-8 w-8" />
                  <span className="hidden max-w-[8rem] truncate text-sm font-semibold lg:block">
                    {displayName(user).split(" ")[0]}
                  </span>
                  <ChevronDown className="mr-1 hidden h-4 w-4 lg:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p className="truncate text-sm font-bold">{displayName(user)}</p>
                  <p className="truncate text-xs font-normal text-muted">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                {extra.map((i) => (
                  <DropdownMenuItem key={i.to} asChild className="md:hidden">
                    <Link href={i.to}>
                      <i.icon className="h-4 w-4" />
                      {i.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="text-danger" onSelect={signOut}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className={cn("mx-auto w-full flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-10 md:pt-8 lg:px-8", wide ? "max-w-6xl" : "max-w-3xl")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {user.role.toLowerCase().replace("_", " ")}
        </p>
        <h1 className="mb-5 text-2xl font-extrabold tracking-tight md:mb-6 md:text-3xl">{title}</h1>
        {children}
      </main>

      <div className="mt-auto hidden md:block">
        <SiteFooter />
      </div>

      {/* Mobile footer strip */}
      <div className="border-t border-line bg-surface px-4 py-3 text-center text-[11px] text-muted md:hidden">
        © 2026 Migo Ltd. · Made for Dhaka
      </div>

      <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface md:hidden" aria-label="Tabs">
        {tabs.map((i) => (
          <Link
            key={i.to}
            href={i.to}
            className={cn(
              "press flex min-w-0 flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold",
              isActive(path, i.to) ? "text-primary" : "text-muted",
            )}
          >
            <span className={cn("flex h-7 w-12 items-center justify-center rounded-full", isActive(path, i.to) && "bg-cream")}>
              <i.icon className="h-5 w-5" />
            </span>
            <span className="truncate">{i.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function MoreLinks() {
  const user = useAuth((s) => s.user);
  const nav = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? adminNav : user?.role === "COMMUTER" ? commuterNav : passengerNav;
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {nav
        .filter((i) => !i.tab)
        .map((i) => (
          <Link
            key={i.to}
            href={i.to}
            className="press flex min-h-14 items-center gap-3 rounded-2xl bg-surface p-3 text-sm font-bold shadow-sm"
          >
            <i.icon className="h-5 w-5" />
            {i.label}
          </Link>
        ))}
    </div>
  );
}
