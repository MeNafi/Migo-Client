import { SiteHeader } from "@/components/migo/site-header";
import { SiteFooter } from "@/components/migo/site-footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold">How Migo works</h1>
        <p className="mt-3 text-muted">Route-first matching: commuters publish corridors they already drive. Passengers request a seat. OTP starts the ride. SSLCommerz collects the contribution.</p>
        <ol className="mt-8 space-y-6">
          {["Commuter setup","Passenger search","Request & accept","OTP start","Pay & review"].map((t, i) => (
            <li key={t} className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-bold text-accent">Step {i + 1}</p>
              <h2 className="mt-1 font-semibold">{t}</h2>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
