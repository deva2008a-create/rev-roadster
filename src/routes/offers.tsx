import { createFileRoute, Link } from "@tanstack/react-router";
import { Percent, Tag, Timer } from "lucide-react";
import { bikes, formatPrice } from "@/lib/bikes";
import { BikeCard } from "@/components/site/BikeCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Motorcycle Offers & Exchange Deals | BikeZone" },
      {
        name: "description",
        content:
          "Live festive discounts, low-interest EMI schemes and exchange bonuses on new and used motorcycles.",
      },
      { property: "og:title", content: "Motorcycle Offers & Exchange Deals | BikeZone" },
      {
        property: "og:description",
        content: "Save on your next bike with limited-time BikeZone offers.",
      },
    ],
  }),
  component: Offers,
});

const deals = [
  {
    Icon: Percent,
    title: "Up to ₹28,000 off",
    text: "Instant cash discount on select 2025 stock while it lasts.",
    tag: "New bikes",
  },
  {
    Icon: Tag,
    title: "₹15,000 exchange bonus",
    text: "Trade in any running motorcycle and stack it with brand offers.",
    tag: "Exchange",
  },
  {
    Icon: Timer,
    title: "7.99% EMI for 48 hours",
    text: "Flash finance window with zero processing fee on approvals.",
    tag: "Finance",
  },
];

function Offers() {
  const hot = bikes.filter((b) => b.highlight);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Live now</p>
      <h1 className="mt-2 text-5xl">Offers & Deals</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Stackable savings across finance, exchange and manufacturer schemes. Prices shown already
        include the applicable discount.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {deals.map(({ Icon, title, text, tag }) => (
          <article
            key={title}
            className="card-lift relative overflow-hidden rounded-xl border border-border bg-card p-7"
          >
            <span className="absolute right-5 top-5 rounded-full bg-gradient-ember px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
              {tag}
            </span>
            <Icon className="h-7 w-7 text-primary" />
            <h2 className="mt-5 text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-7">
        <div>
          <h2 className="text-3xl">Not sure what fits your budget?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Filter the full catalogue by price — bikes from {formatPrice(128000)} upward.
          </p>
        </div>
        <Button asChild size="lg" className="font-semibold">
          <Link to="/used-bikes">Shop by budget</Link>
        </Button>
      </div>

      <h2 className="mt-16 text-4xl">Discounted machines</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {hot.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
}
