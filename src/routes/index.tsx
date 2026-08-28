import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck, Wallet } from "lucide-react";
import { BRANDS, bikes, heroImage } from "@/lib/bikes";
import { BikeCard } from "@/components/site/BikeCard";
import { ReviewsSection } from "@/components/site/Reviews";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BikeZone — Buy & Sell Premium Motorcycles" },
      {
        name: "description",
        content:
          "Shop inspected new and used motorcycles from Royal Enfield, KTM, Yamaha, Honda, Kawasaki, BMW and Ducati with transparent EMI and 48-hour delivery.",
      },
      { property: "og:title", content: "BikeZone — Buy & Sell Premium Motorcycles" },
      {
        property: "og:description",
        content: "India's premium motorcycle marketplace. Inspected bikes, clear pricing, fast delivery.",
      },
    ],
  }),
  component: Index,
});

const perks = [
  { Icon: ShieldCheck, title: "200-point inspection", text: "Every machine checked by certified technicians." },
  { Icon: Wallet, title: "EMI from 9.5%", text: "Instant approvals with zero hidden charges." },
  { Icon: Truck, title: "48-hour delivery", text: "Doorstep handover in 40+ cities." },
  { Icon: BadgeCheck, title: "5-day return", text: "Not the right fit? Send it back." },
];

function Index() {
  const featured = bikes.slice(0, 6);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Premium sport motorcycle lit by amber studio light"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-fade absolute inset-0" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-32">
          <p className="rise-in text-xs font-bold uppercase tracking-[0.35em] text-primary">
            Ride something serious
          </p>
          <h1 className="rise-in mt-4 max-w-3xl text-6xl sm:text-7xl lg:text-8xl">
            The garage for <span className="text-gradient-ember">obsessive</span> riders
          </h1>
          <p className="rise-in mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Over 4,200 inspected new and used motorcycles across seven marquee brands — priced
            openly, financed instantly, delivered to your door.
          </p>
          <div className="rise-in mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-ember font-semibold">
              <Link to="/new-bikes">
                Explore new bikes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/used-bikes">Browse used bikes</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-border/60 pt-6">
            {[
              ["4,200+", "Bikes listed"],
              ["40+", "Delivery cities"],
              ["4.8/5", "Rider rating"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="display text-3xl text-foreground">{v}</dt>
                <dd className="text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-8">
          {BRANDS.map((b) => (
            <Link
              key={b}
              to="/brands"
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {b}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Featured stock
            </p>
            <h2 className="mt-2 text-4xl">This week's standouts</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/new-bikes">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Sell your bike
              </p>
              <h2 className="mt-3 text-4xl lg:text-5xl">
                Free valuation. Payment the same day.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tell us the model, year and kilometres. We'll quote in minutes, inspect at your
                doorstep and transfer money before we take the keys.
              </p>
              <Button asChild size="lg" className="mt-7 font-semibold">
                <Link to="/sell">Get my valuation</Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Share details", "Free inspection", "Instant payment"].map((step, i) => (
                <div key={step} className="rounded-xl border border-border bg-surface-2 p-5">
                  <span className="display text-3xl text-primary">0{i + 1}</span>
                  <p className="mt-2 text-sm font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
    </>
  );
}
