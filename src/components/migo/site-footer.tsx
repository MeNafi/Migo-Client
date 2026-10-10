import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const columns = [
  { title: "Product", links: [["Find a ride", "/find-ride"], ["How it works", "/how-it-works"], ["Safety", "/safety"], ["Payments", "/payments"]] },
  { title: "Account", links: [["Sign in", "/login"], ["Create account", "/register"], ["Dashboard", "/dashboard"], ["Ride history", "/history"]] },
  { title: "Admins", links: [["Admin console", "/admin"], ["Reports", "/admin/reports"], ["Verifications", "/admin/verifications"], ["Support tickets", "/admin/support"]] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">Daily ride-sharing for Dhaka commutes. Share the empty seats already on the road.</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> support@migo.app</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> 09612-MIGO-00</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Banani, Dhaka, Bangladesh</li>
          </ul>
          <div className="mt-4 flex gap-2">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="press flex h-9 w-9 items-center justify-center rounded-full bg-cream text-muted transition-colors hover:bg-line hover:text-ink">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="press flex h-9 w-9 items-center justify-center rounded-full bg-cream text-muted transition-colors hover:bg-line hover:text-ink">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.14 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* Twitter/X */}
            <a href="#" aria-label="Twitter" className="press flex h-9 w-9 items-center justify-center rounded-full bg-cream text-muted transition-colors hover:bg-line hover:text-ink">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="press flex h-9 w-9 items-center justify-center rounded-full bg-cream text-muted transition-colors hover:bg-line hover:text-ink">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted">{c.title}</h3>
            <ul className="mt-3 space-y-2.5 text-sm font-medium">
              {c.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-ink transition-colors hover:text-muted">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Migo Ltd. · Made for Dhaka</p>
          <div className="flex items-center gap-3">
            <Link href="/safety" className="transition-colors hover:text-ink">Safety</Link>
            <Link href="/how-it-works" className="transition-colors hover:text-ink">How it works</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}