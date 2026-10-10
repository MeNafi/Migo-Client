import Link from "next/link";
import { ArrowRight, CarFront, KeyRound, MapPinned, ShieldCheck, Wallet } from "lucide-react";
import { HeroSearch } from "@/components/migo/hero-search";
import { MapCard } from "@/components/migo/map-card";
import { Reveal } from "@/components/migo/reveal";
import { SiteFooter } from "@/components/migo/site-footer";
import { SiteHeader } from "@/components/migo/site-header";
import { Button } from "@/components/ui/button";

const tiles = [
  { icon: CarFront, title: "Ride", body: "Match with verified commuters already heading your way.", href: "/register" },
  { icon: MapPinned, title: "Drive", body: "Publish your daily route and share the empty seats.", href: "/register" },
  { icon: KeyRound, title: "OTP pickup", body: "A 6-digit code makes sure the right passenger boards.", href: "/how-it-works" },
  { icon: Wallet, title: "Pay securely", body: "Fuel share collected after the trip with SSLCommerz.", href: "/how-it-works" },
];
const steps = [
  ["Publish your commute", "Commuters add a vehicle, a daily route, and a weekday schedule."],
  ["Find a matching seat", "Passengers search by pickup, destination and time. Migo scores overlap."],
  ["Confirm with OTP", "The driver verifies a 6-digit code at pickup so the right passenger boards."],
  ["Share the contribution", "Pay the fuel share through SSLCommerz. Review after the trip."],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="road-grid text-white">
        <SiteHeader invert />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-14 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Dhaka daily commute</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Go anywhere.<br /><span className="text-white/60">Share the ride.</span></h1>
            <p className="mt-5 max-w-md text-base text-white/70 sm:text-lg">Migo matches passengers with commuters on recurring routes — Banani to Motijheel, Uttara to Banani, Mirpur to Farmgate.</p>
            <div className="mt-8"><HeroSearch /></div>
          </Reveal>
          <Reveal delay={0.1} className="hidden md:block"><MapCard from="Banani 11, Dhaka" to="Motijheel Shapla Chattar, Dhaka" tall /></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal><h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Everything for your daily run</h2></Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <Link href={t.href} className="press block h-full rounded-3xl bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
                <t.icon className="h-7 w-7" /><h3 className="mt-6 text-lg font-extrabold">{t.title}</h3><p className="mt-1 text-sm text-muted">{t.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <Reveal><h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">How a morning run works</h2></Reveal>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, b], i) => (
            <Reveal key={t} delay={i * 0.06}><li className="h-full rounded-3xl border border-line bg-surface p-5"><p className="text-xs font-bold text-accent">0{i + 1}</p><h3 className="mt-2 font-extrabold">{t}</h3><p className="mt-1 text-sm text-muted">{b}</p></li></Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div><ShieldCheck className="h-8 w-8" /><h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Verified vehicles. Live tracking. SOS built in.</h2><p className="mt-2 max-w-xl text-white/70">Admins approve every vehicle, and every trip has a timeline, live location sharing and an emergency button.</p></div>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-cream"><Link href="/register">Get started <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
