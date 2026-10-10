# Migo — Smart Daily Ride-Sharing (Frontend)

Production-oriented Next.js client for the Migo backend: commuters publish recurring routes,
passengers search & book seats, pickup is verified with OTP, payments go through SSLCommerz,
and admins moderate everything from a dashboard.

## Tech stack

- **Next.js 16 (App Router)** — Server Components by default, Client Components (`"use client"`) for interactivity
- **TypeScript + Tailwind CSS 4** — mobile-first, utility-first styling with a custom design token set
- **shadcn/ui + Radix UI** primitives — accessible `button`, `input`, `card`, `avatar`, `dropdown-menu`, `tabs`, `badge`, `dialog`
- **React Hook Form + Zod** — every form validated on the client with schemas mirroring backend rules
- **TanStack Query** — data fetching with loading skeletons, error retry UI and cache invalidation
- **Zustand** — global auth + theme stores (persisted)
- **SSLCommerz** payment flow (checkout → gateway → success/fail/cancel callbacks)

## Quick start

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://localhost:5000
npm install
npm run dev                  # http://localhost:3000
```

Backend API base defaults to `http://localhost:5000/api/v1` (see `src/lib/migo/api.ts`).

## Demo credentials (one-click login buttons are on the sign-in page)

| Role      | Email              | Password        |
| :-------- | :----------------- | :-------------- |
| Super Admin | superadmin@migo.app | SuperAdmin@123 |
| Admin     | admin@migo.app     | Admin@123       |
| Passenger | nabila@migo.app    | Passenger@123   |
| Passenger | rahim@migo.app     | Passenger@123   |
| Commuter  | karim@migo.app     | Commuter@123    |
| Commuter  | ayesha@migo.app    | Commuter@123    |

## Highlights

- **Role-aware login** — pick *Passenger* or *Commuter* before signing in; the app rejects mismatched accounts
- **One-click demo login** for Passenger / Commuter / Admin
- **Dark & light mode** — persisted, system-aware, toggle in header, app shell, footer and auth pages
- **Profile photo** upload (file or URL) for every role — `PATCH /users/me/photo`
- **Saved places** — set Home / Office / School as preferences and quick-pick them when searching a ride
- **Protected routes** via `src/proxy.ts` (JWT cookie gate + role-based redirects)
- **Full ride lifecycle UI** — search → match → request → accept → OTP verify → live location → complete → SSLCommerz checkout → review
- **Admin console** — dashboard, users, verifications, rides, reports, disputes, payments, support, audit logs

## Scripts

| Command            | Description        |
| :----------------- | :----------------- |
| `npm run dev`      | Start dev server   |
| `npm run build`    | Production build   |
| `npm run typecheck`| Type-check         |
