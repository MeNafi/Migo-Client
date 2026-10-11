 <div align="center">

<a href="https://i.ibb.co.com/M5GRcwJk/migo-logo.png">
  <img src="https://i.ibb.co.com/M5GRcwJk/migo-logo.png" alt="Migo Logo" width="250" />
</a>

### Smart, Reliable & Connected Daily Commutes

**A modern, responsive daily ride-sharing platform built for smarter everyday transportation.**

Migo connects passengers with verified commuters traveling along similar routes at compatible times. Passengers can discover matching rides, request seats, track journeys, make secure digital payments, and communicate with commuters. Commuters can publish recurring routes, manage schedules, accept ride requests, and share their available vehicle capacity.

**Connecting People. Simplifying Daily Commutes.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-1AD1A5?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🚀 Overview

Migo Client is the frontend application for the Migo daily ride-sharing platform, built with Next.js App Router and TypeScript. It delivers a responsive, role-based experience with reusable components, centralized API integration, and structured error handling.

### 🎯 Product Goals & Key Highlights

| 🚀 Product Goals | ✨ Key Highlights |
|:---|:---|
| 🛣️ Simplify daily commuting with route-based ride discovery. | 📱 Modern, responsive UI across all devices. |
| 🤝 Match passengers with commuters and available seats. | 👥 Role-based passenger, commuter, and admin dashboards. |
| 📅 Manage recurring routes and ride requests. | 🔗 Centralized, type-safe API integration. |
| 💰 Ensure transparent ride-sharing costs. | ✅ Form validation and user-friendly error feedback. |
| 🛡️ Build trust with verification, ratings, OTP, and safety features. | ⚡ Real-time ride updates, location sharing, and messaging support. |
| 💳 Enable secure SSLCommerz online payments. | 🔐 Secure payment redirects and result handling. |
| 🎨 Deliver a consistent cross-device experience. | 🧩 Reusable components and consistent design tokens. |

---

## 📌 Table of Contents

| 📚 Section | 📚 Section |
|:---|:---|
| 📌 Overview & Core Features | 🛠️ Technology Stack & Architecture |
| 👥 User Roles & Application Routes | 🎨 Brand & Design System |
| 🔗 API Integration & Documentation | 🔐 Authentication & Security |
| ⚡ Real-Time Features | 💳 Payment Integration |
| ✅ Error Handling & Validation | 📂 Project Structure |
| 🚀 Getting Started | ⚙️ Environment Variables & Scripts |
| 🧪 Testing & Quality | 🌐 Production Deployment |
| 📖 Related Resources | 📋 API Documentation |


---

## ✨ Core Features

### 🔐 Authentication & Account Management

- Passenger and commuter registration.
- Email/phone and password login.
- Optional Google OAuth integration when configured by the backend.
- Access-token and refresh-session handling.
- Logout and session expiration management.
- OTP verification and password recovery.
- Protected pages and role-aware navigation.
- Profile information, profile photos, and emergency contacts.
- User preferences and account safety controls.

### 🔎 Ride Discovery & Smart Matching

- Search rides by pickup, destination, date, time, and passenger count.
- Browse available commuter routes.
- View ranked matching results and compatibility information.
- Compare route direction, pickup proximity, destination proximity, and departure time.
- View available seats and relevant commuter details.
- Select a preferred match and submit a ride request.
- Display shared contribution and payment breakdowns transparently.

### 🚘 Commuter & Route Management

- Create and update commuter routes.
- Configure recurring daily or weekly schedules.
- Manage departure and return times.
- Set seat capacity and date-specific availability.
- Pause and resume recurring routes.
- Register and manage vehicles.
- Submit verification documents and check verification status.
- Accept or reject incoming ride requests.
- View upcoming rides, completed rides, and contribution history.

### 🎫 Ride Management

- View upcoming rides and ride history.
- Access authorized ride details and timelines.
- Track ride-request and ride-status changes.
- Confirm accepted rides.
- View OTP instructions and verify pickup.
- Start and complete rides according to backend permissions.
- Cancel rides according to applicable policies.
- Report no-shows where supported.
- View ride details and authorized live location information.

### 📍 Live Location & Communication

- Display live location updates for authorized active rides.
- Synchronize ride status using Socket.IO.
- Support ride-related conversations and messaging.
- View message history and read status.
- Display application notifications and unread counts.
- Support trip-sharing controls where implemented by the backend.

### 💳 Online Payments

- Initiate SSLCommerz checkout for eligible rides.
- Redirect passengers to the payment gateway.
- Handle payment processing, success, failure, and cancellation pages.
- Display payment history and transaction details.
- Refresh payment status from the backend.
- Show clear payment-result feedback.
- Support payment verification and refund status where authorized.

**Security:** The frontend never treats a redirect to a success page as proof of payment. Final payment status must be verified by the backend.

### ⭐ Reviews, Safety & Support

- Submit ride reviews and ratings when eligible.
- View commuter or passenger reviews.
- Report users, rides, messages, or other supported issues.
- Access safety and emergency assistance features.
- Create and track support tickets.
- Block or restrict users where supported.
- Display verification status and safety-related information.

### 🛡️ Administration

- Operational dashboard and statistics.
- User search and account-status management.
- Commuter and vehicle verification workflows.
- Route moderation and ride oversight.
- Payment investigation and supported refund workflows.
- Report and dispute management.
- Support tickets and incident management.
- User growth, ride, matching, payment, and route analytics.
- Read-only audit-log search and event inspection.

Administrative interfaces must follow the permissions enforced by the backend.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|---|---|---|
| Framework | Next.js App Router | Routing, rendering, and application structure |
| UI Library | React | Component-based user interfaces |
| Language | TypeScript | Type-safe components and API models |
| Styling | Tailwind CSS | Responsive utility-first styling |
| UI Components | DaisyUI | Reusable semantic UI components |
| UI Primitives | shadcn/ui | Accessible, composable interface elements |
| Animation | Framer Motion | Purposeful interactions and transitions |
| Forms | React Hook Form | Form state and submission management |
| Validation | Zod | Client-side input validation |
| Server State | TanStack Query | API caching and synchronization |
| HTTP Client | Axios | Centralized REST API communication |
| Client State | Zustand | Shared authentication and UI state where needed |
| Notifications | Sonner | Toast notifications and user feedback |
| Real-Time | Socket.IO Client | Live ride updates, location, and messaging |
| Charts | Recharts or Chart.js | Administrative analytics |
| Icons | Lucide React | Consistent iconography |
| Image Optimization | next/image | Optimized image rendering |
| Deployment | Vercel | Frontend hosting and deployment |

---

## 🏗️ System Architecture

Migo Client communicates with the Express REST API for normal request-response operations and Socket.IO for real-time application events.

```text
                         MIGO CLIENT
                              |
                    Next.js App Router
                              |
               +--------------+--------------+
               |              |              |
           Public UI      Passenger UI   Commuter UI
                              |
                       Admin Dashboard
                              |
               +--------------+--------------+
               |                             |
          Axios API Client              Socket.IO Client
               |                             |
        JWT / Session Handling         Authenticated Events
               |
        Express REST API
               |
      Authentication & RBAC
               |
       Backend Domain Modules
               |
          Prisma ORM
               |
          PostgreSQL
               |
       +-------+--------+
       |                |
   SSLCommerz       Redis / Other
   Payments         Backend Services
```

### Architecture Principles

- Keep API calls inside a centralized, typed service layer.
- Separate reusable UI components from domain-specific pages.
- Use TanStack Query for server-state caching and invalidation.
- Use Zustand only for appropriate shared client-side state.
- Protect private routes while relying on the backend for final authorization.
- Validate user input before submission and handle server validation responses.
- Keep payment, ride, and verification status synchronized with backend state.
- Authenticate and authorize real-time events.
- Avoid exposing private information in public interfaces or client-side logs.

---

## 👥 User Roles & Permissions

| Role | Responsibilities |
|---|---|
| **PASSENGER** | Search routes, discover matches, request rides, confirm trips, pay, message, review, and manage profile |
| **COMMUTER** | Manage vehicles, publish routes, configure schedules, accept requests, verify pickup OTPs, and complete rides |
| **ADMIN** | Manage users, verification, routes, rides, payments, reports, support, and analytics |
| **SUPER_ADMIN** | Perform separately authorized privileged administration, including role management where permitted |

### Role-Based Interface Behavior

- Public users can access public pages and authentication flows.
- Passengers see passenger-specific navigation and actions.
- Commuters see route, vehicle, verification, request, and contribution features.
- Administrators see operational management and reporting interfaces.
- Unauthorized users are redirected or shown an appropriate access-denied state.
- Ownership-sensitive actions must be checked by the backend, regardless of what the UI displays.

---

## 🧭 Application Routes

The following routes are the intended application route structure from the Migo specification. Some pages may depend on the corresponding backend endpoints and features being implemented.

### Public Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/how-it-works` | Explain the ride-sharing workflow |
| `/safety` | Safety information and guidance |
| `/login` | User login |
| `/register` | Passenger or commuter registration |

### Passenger Routes

| Route | Purpose |
|---|---|
| `/dashboard` | Passenger dashboard |
| `/find-ride` | Search compatible rides |
| `/routes` | Browse or manage passenger routes |
| `/rides` | View rides |
| `/rides/[id]` | View authorized ride details |
| `/history` | View previous rides |
| `/messages` | Ride-related conversations |
| `/payments` | Payment history and transaction details |
| `/profile` | Manage profile and preferences |
| `/safety` | Safety controls and information |

### Commuter Routes

| Route | Purpose |
|---|---|
| `/commuter` | Commuter dashboard |
| `/commuter/routes` | Manage recurring routes and schedules |
| `/commuter/requests` | Review incoming ride requests |
| `/commuter/rides` | Manage rides |
| `/commuter/vehicle` | Manage vehicles and documents |
| `/commuter/verification` | View verification status |
| `/commuter/contributions` | View shared contributions and history |

### Admin Routes

| Route | Purpose |
|---|---|
| `/admin` | Administration dashboard |
| `/admin/users` | Manage user accounts |
| `/admin/verifications` | Review verification requests |
| `/admin/routes` | Moderate routes |
| `/admin/rides` | Inspect and manage rides |
| `/admin/payments` | Investigate transactions |
| `/admin/reports` | Review and resolve reports |
| `/admin/support` | Manage support cases |
| `/admin/analytics` | View platform analytics |
| `/admin/audit-logs` | Inspect audit events |

### Payment Routes

| Route | Purpose |
|---|---|
| `/payment/success` | Display the payment-return state after a success redirect |
| `/payment/cancel` | Display a cancelled checkout state |
| `/payment/fail` | Display a failed checkout state |

Dynamic routes and additional pages should follow the actual implementation and backend API contract.

---

## 🎨 Brand & Design System

Migo uses a consistent visual system across landing pages, dashboards, forms, cards, tables, and interactive controls.

### Color Palette

| Token | Color | Usage |
|---|---|---|
| Primary | `#1A0F2E` | Main brand color, primary buttons, active states |
| Primary Hover | `#2A1846` | Hover and pressed states |
| Accent Purple | `#AC5CCB` | Optional supporting accent |
| Surface | `#FFFFFF` | Main content surfaces |
| Soft Surface | `#F7F4F9` | Page backgrounds and secondary surfaces |
| Primary Text | `#211B27` | Headings and body text |
| Secondary Text | `#6B6472` | Descriptions and metadata |
| Border | `#DED6E5` | Inputs, cards, and dividers |
| Success | `#2E9B62` | Successful or completed states |
| Warning | `#D99024` | Pending or warning states |
| Error | `#D64545` | Errors and destructive actions |

### Button System

- **Primary:** `#1A0F2E` background with white text.
- **Secondary:** White background with a primary-colored border and text.
- **Ghost:** Transparent background with brand-colored text.
- **Success:** Green for appropriate successful actions.
- **Danger:** Red for destructive or permanent actions.
- **Disabled:** Muted styling for unavailable actions.

### UI Standards

- Use a mobile-first responsive layout.
- Maintain accessible color contrast and readable typography.
- Use visible focus states and semantic HTML.
- Provide appropriate labels and accessible names for controls.
- Do not rely on color alone to communicate status.
- Keep loading, empty, error, and success states consistent.
- Use animations purposefully and respect reduced-motion preferences.
- Ensure route cards, forms, navigation, and ride actions remain usable on smaller screens.
- Use reusable DaisyUI and shadcn/ui components where appropriate.

---

## 🔌 API Integration

Migo Client integrates with the Migo REST API through a centralized Axios instance.

### API Configuration

The API base URL is configured using:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

Production deployments should configure the appropriate deployed API base URL.

### API Integration Principles

1. Create a single Axios instance with the configured base URL.
2. Keep endpoint paths and request/response types in a typed service layer.
3. Attach authentication using a centralized session or interceptor mechanism.
4. Use TanStack Query for fetching, caching, mutations, and cache invalidation.
5. Handle expired sessions and attempt the refresh flow according to backend behavior.
6. Redirect to login when authentication cannot be renewed.
7. Convert API errors into clear, user-friendly feedback.
8. Avoid hard-coding raw Axios requests throughout UI components.
9. Never expose backend secrets or payment credentials in frontend environment variables.
10. Document feature-to-endpoint mappings in `API_INTEGRATION.md`.

### Main API Feature Groups

All endpoint paths below are relative to `/api/v1`. The actual route prefix and endpoint availability must be confirmed against the deployed backend.

| Feature | Example Endpoint | Frontend Usage |
|---|---|---|
| Health | `GET /health` | Check API availability |
| Authentication | `POST /auth/login` | Sign in |
| Registration | `POST /auth/register/passenger` | Register a passenger |
| Registration | `POST /auth/register/commuter` | Register a commuter |
| Session | `GET /auth/me` | Retrieve current user |
| Token Refresh | `POST /auth/refresh` | Renew authentication |
| Profile | `GET /users/me` | Load profile |
| Profile Update | `PATCH /users/me` | Update profile |
| Vehicles | `GET /vehicles` | List commuter vehicles |
| Vehicle Creation | `POST /vehicles` | Register a vehicle |
| Routes | `GET /routes` | Browse or retrieve routes |
| Route Creation | `POST /routes` | Publish a commute route |
| Matching | `POST /matches/search` | Search compatible rides |
| Ride Requests | `POST /ride-requests` | Submit a ride request |
| Request Matches | `GET /ride-requests/:requestId/matches` | View matching results |
| Rides | `GET /rides` | View rides |
| Ride Details | `GET /rides/:rideId` | Display ride information |
| OTP | `POST /rides/:rideId/otp/verify` | Verify pickup |
| Location | `GET /rides/:rideId/location` | Retrieve authorized location |
| Payments | `POST /payments/checkout` | Initiate checkout |
| Payment Status | `GET /payments/:paymentId/status` | Retrieve payment state |
| Conversations | `GET /conversations` | List conversations |
| Messages | `POST /conversations/:conversationId/messages` | Send a message |
| Reviews | `POST /reviews` | Submit a review |
| Notifications | `GET /notifications` | Retrieve notifications |
| Reports | `POST /reports` | Submit a report |
| Admin Dashboard | `GET /admin/dashboard` | Display statistics |
| Admin Users | `GET /admin/users` | Search users |
| Admin Analytics | `GET /admin/analytics/users` | Display user analytics |
| Audit Logs | `GET /admin/audit-logs` | Inspect audit history |

This table is a representative integration reference, not a guarantee that every endpoint is registered in the running backend. Use the backend's actual OpenAPI specification and `API_INTEGRATION.md` for the complete contract.

---

## 🔐 Authentication & Security

The frontend must handle authentication carefully while leaving authorization and sensitive business rules to the backend.

### Authentication Workflow

1. A user submits login credentials.
2. The client sends the request to the authentication endpoint.
3. The backend validates credentials and issues the configured authentication tokens or session.
4. The client updates its authentication state according to the backend's response.
5. Protected requests include the required authentication credentials.
6. Expired access sessions trigger the supported refresh flow.
7. If refresh fails, the client clears invalid session state and redirects the user to login.

### Security Requirements

- Never commit `.env` or `.env.local` files.
- Keep private API keys, JWT secrets, and payment credentials on the server.
- Treat `NEXT_PUBLIC_*` variables as publicly visible.
- Prefer secure, `httpOnly`, `sameSite` cookies for browser refresh sessions where supported by the backend architecture.
- Avoid storing long-lived refresh tokens in `localStorage`.
- Prevent unauthorized users from accessing role-specific pages.
- Never treat frontend route protection as a replacement for backend RBAC.
- Do not expose private contact information, verification documents, or unauthorized ride locations.
- Avoid logging access tokens, passwords, payment credentials, or sensitive personal data.
- Validate permissions and resource ownership through the API.

---

## ⚡ Real-Time Features

Migo supports real-time functionality through Socket.IO Client when the backend's Socket.IO server and corresponding events are available.

### Supported Capabilities

- Live ride status updates.
- Authorized location sharing.
- Ride-related chat and messaging.
- Notification updates.
- Passenger and commuter interface synchronization.

### Real-Time Implementation Guidelines

- Authenticate socket connections using the backend's supported mechanism.
- Subscribe only to authorized rides and conversations.
- Use the actual event names and payload schemas implemented by the backend.
- Clean up listeners when components unmount.
- Handle disconnects and reconnection states.
- Avoid duplicate event listeners.
- Do not assume an event has been delivered successfully without appropriate confirmation.
- Use REST endpoints to retrieve initial state and recover after reconnection.

---

## 💳 Payment Integration

Migo uses SSLCommerz for online checkout through the backend API.

### Payment Workflow

1. The passenger selects an eligible ride and initiates checkout.
2. The frontend requests a checkout session from the backend.
3. The backend creates the payment record and initializes SSLCommerz.
4. The passenger completes the payment through the gateway.
5. SSLCommerz redirects the browser to the configured success, failure, or cancellation flow.
6. The frontend retrieves the authoritative payment status from the backend.
7. The UI displays the verified result and updates related ride information.

### Payment UI Requirements

- Display the payable contribution before checkout.
- Show a clear processing state while checkout is initiated.
- Prevent accidental duplicate submissions.
- Handle failed network requests and interrupted redirects.
- Display success, failure, and cancellation states separately.
- Allow users to retry only when the backend supports a valid retry flow.
- Retrieve payment history and transaction status from authorized endpoints.
- Never mark a payment successful based only on URL parameters or client-side state.

Payment gateway credentials, transaction verification, callback validation, and refund processing must remain backend responsibilities.

---

## 🧩 Error Handling & Validation

Migo Client provides structured, consistent feedback for API failures and invalid form submissions.

### Standard Success Response

```json
{
  "success": true,
  "message": "OK",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 3
  }
}
```

### Standard Error Response

```json
{
  "success": false,
  "message": "Validation error",
  "errorDetails": []
}
```

These examples reflect the documented backend response convention. The frontend should also tolerate endpoint-specific response types where the actual API contract differs.

### Error Handling Strategy

| Status | Meaning | Frontend Behavior |
|---|---|---|
| `400` | Invalid request | Show an actionable validation message |
| `401` | Unauthenticated | Attempt supported refresh or redirect to login |
| `403` | Forbidden | Show access-denied feedback |
| `404` | Resource not found | Display a not-found state |
| `409` | Business conflict | Explain the conflict and offer a valid next action |
| `422` | Validation failure | Display field-level errors where possible |
| `429` | Rate limit exceeded | Explain the limit and allow retry later |
| `500` | Server error | Show a generic retry-friendly message |

### UI Feedback

- Use Sonner for concise toast notifications.
- Display field-level validation messages near the relevant inputs.
- Provide loading indicators for asynchronous actions.
- Use skeletons where they improve perceived loading performance.
- Include empty states for lists with no results.
- Provide retry actions for recoverable network errors.
- Handle failed authentication and expired sessions consistently.
- Avoid displaying raw backend stack traces or internal exception details.

---

## 📁 Project Structure

The following is a recommended frontend organization. Adapt it to the actual repository structure rather than assuming every directory already exists.

```text
migo-client/
├── public/
│   ├── images/
│   ├── icons/
│   └── logo/
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── how-it-works/
│   │   │   └── safety/
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (passenger)/
│   │   │   ├── dashboard/
│   │   │   ├── find-ride/
│   │   │   ├── routes/
│   │   │   ├── rides/
│   │   │   ├── history/
│   │   │   ├── messages/
│   │   │   ├── payments/
│   │   │   └── profile/
│   │   │
│   │   ├── commuter/
│   │   │   ├── routes/
│   │   │   ├── requests/
│   │   │   ├── rides/
│   │   │   ├── vehicle/
│   │   │   ├── verification/
│   │   │   └── contributions/
│   │   │
│   │   ├── admin/
│   │   │   ├── users/
│   │   │   ├── verifications/
│   │   │   ├── routes/
│   │   │   ├── rides/
│   │   │   ├── payments/
│   │   │   ├── reports/
│   │   │   ├── support/
│   │   │   ├── analytics/
│   │   │   └── audit-logs/
│   │   │
│   │   ├── payment/
│   │   │   ├── success/
│   │   │   ├── cancel/
│   │   │   └── fail/
│   │   │
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── forms/
│   │   ├── rides/
│   │   ├── routes/
│   │   ├── maps/
│   │   ├── payments/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── vehicles/
│   │   ├── routes/
│   │   ├── matching/
│   │   ├── rides/
│   │   ├── payments/
│   │   ├── messaging/
│   │   ├── notifications/
│   │   └── admin/
│   │
│   ├── lib/
│   │   ├── api-client.ts
│   │   ├── query-client.ts
│   │   ├── socket-client.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── routes.service.ts
│   │   ├── matches.service.ts
│   │   ├── rides.service.ts
│   │   ├── payments.service.ts
│   │   └── admin.service.ts
│   │
│   ├── hooks/
│   ├── stores/
│   ├── schemas/
│   ├── types/
│   └── middleware.ts
│
├── .env.example
├── .gitignore
├── API_INTEGRATION.md
├── components.json
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

**Note:** This tree is illustrative. The actual Next.js version and configuration may use different filenames or locations.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js version compatible with your installed Next.js release.
- npm.
- Git.
- Access to a running Migo backend API.
- SSLCommerz sandbox credentials configured on the backend for payment testing.

### Installation

```bash
# 1. Clone the frontend repository
git clone YOUR_MIGO_FRONTEND_REPOSITORY_URL

# 2. Navigate into the project
cd migo-client

# 3. Install dependencies
npm install

# 4. Create your local environment file
cp .env.example .env.local

# 5. Configure the API URL in .env.local

# 6. Start the development server
npm run dev
```

On Windows PowerShell, if `cp` is unavailable in your environment, use:

```powershell
Copy-Item .env.example .env.local
```

Open the development URL shown in the terminal, typically:

```text
http://localhost:3000
```

### Verify the Backend

Ensure that the configured backend is running and that the health endpoint is accessible:

```text
http://localhost:5000/api/v1/health
```

The address above is the documented local development example. Use your actual backend URL if it differs.

---

## 🔑 Environment Variables

Create a `.env.local` file in the frontend project root.

### `.env.example`

```env
# Backend REST API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Frontend application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Configure production values through your deployment platform's environment settings.

### Environment Variable Rules

- `NEXT_PUBLIC_API_BASE_URL` identifies the backend API.
- `NEXT_PUBLIC_APP_URL` identifies the frontend origin where required.
- Only expose values through `NEXT_PUBLIC_*` when they are safe to be public.
- Never put JWT secrets, database URLs, SSLCommerz store passwords, or private API keys in the frontend environment.
- Keep `.env`, `.env.local`, and other local environment files out of Git.
- Commit `.env.example` with placeholders only.

---

## 📜 Development Scripts

Use the scripts defined in your actual `package.json`.

Typical Next.js scripts are:

```bash
# Start the development server
npm run dev

# Build the production application
npm run build

# Run the production server locally
npm run start

# Run linting, if configured
npm run lint

# Run tests, if configured
npm test
```

Not every script is necessarily configured in the repository. Check `package.json` before running optional commands.

---

## 📚 API Documentation

The frontend relies on the Migo backend API for authentication, routes, ride matching, bookings, payments, messaging, notifications, and administration.

| Resource | URL |
|---|---|
| Local frontend | `http://localhost:3000` |
| Local API base URL | `http://localhost:5000/api/v1` |
| Local API health | `http://localhost:5000/api/v1/health` |
| Local Swagger documentation | `http://localhost:5000/docs` |

The local API documentation URL assumes the backend exposes Swagger at `/docs`, as documented in the backend README. Use the deployed documentation URL if one is available.

### API Integration Documentation

The `API_INTEGRATION.md` file should document:

- Frontend feature or page.
- HTTP method and API endpoint.
- Authentication requirements.
- Request and response types.
- Loading, success, and error behavior.
- Relevant query invalidation and session handling.

The actual backend OpenAPI specification should be treated as the source of truth for registered endpoints, payloads, and response schemas.

---

## 🧪 Testing & Quality

The frontend should be tested across its most important user journeys and responsive breakpoints.

### Authentication Tests

- Passenger registration and login.
- Commuter registration and login.
- Invalid credentials and validation errors.
- Refresh and logout behavior.
- Protected-route and role-based navigation behavior.

### Ride Workflow Tests

- Search compatible routes.
- View matching results.
- Create and cancel a ride request.
- Accept or reject requests as a commuter.
- Confirm a ride and verify pickup OTP.
- View ride status and history.
- Test permitted location-sharing behavior.

### Payment Tests

- Create a checkout session.
- Handle successful checkout redirects.
- Handle failed and cancelled payment flows.
- Refresh payment status from the backend.
- Verify duplicate submissions are handled safely.
- Confirm the UI does not trust client-only payment results.

### UI & Accessibility Tests

- Mobile, tablet, laptop, and desktop layouts.
- Keyboard navigation and visible focus.
- Form labels and validation feedback.
- Loading, empty, success, and error states.
- Unauthorized access and expired sessions.
- Responsive navigation and dashboard usability.

### Quality Standards

- Keep TypeScript types consistent with the API contract.
- Avoid duplicated API logic.
- Keep dependencies and configuration maintainable.
- Synchronize API integration documentation with the implementation.
- Do not describe an integration as operational until it has been tested against the actual backend.

---

## 🚀 Production Deployment

The frontend can be deployed to Vercel or another compatible Next.js hosting platform.

### Deployment Checklist

- Configure the production API base URL.
- Configure the production frontend URL.
- Confirm backend CORS permits the frontend origin.
- Configure SSLCommerz return URLs on the backend and payment provider.
- Ensure secure session and refresh-token handling.
- Confirm protected pages and backend RBAC behavior.
- Verify Socket.IO connectivity and authentication.
- Test payment success, failure, and cancellation flows.
- Run a production build.
- Review logs for accidental exposure of sensitive information.
- Test mobile responsiveness and important user journeys.
- Ensure local environment files are excluded from Git.
- Keep development credentials and test-only behavior out of production.

### Build

```bash
npm run build
```

Deploy only after the build succeeds and the application's environment variables and external integrations have been configured.

---

## 🔗 Related Resources

- **Next.js:** https://nextjs.org/
- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **DaisyUI:** https://daisyui.com/
- **shadcn/ui:** https://ui.shadcn.com/
- **TanStack Query:** https://tanstack.com/query/latest
- **Axios:** https://axios-http.com/
- **Zod:** https://zod.dev/
- **Socket.IO:** https://socket.io/
- **Framer Motion:** https://motion.dev/
- **SSLCommerz:** https://sslcommerz.com/
- **Vercel:** https://vercel.com/

---

<div align="center">

<a href="https://i.ibb.co.com/M5GRcwJk/migo-logo.png">
  <img src="https://i.ibb.co.com/M5GRcwJk/migo-logo.png" alt="Migo Logo" width="180" />
</a>

### Migo — Making Everyday Commutes Smarter

**Connecting People. Simplifying Daily Commutes.**

Built with Next.js, React, TypeScript, Tailwind CSS, DaisyUI, and a modular API integration architecture.

</div>
