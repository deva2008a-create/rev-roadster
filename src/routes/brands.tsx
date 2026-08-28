import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BRANDS, bikes, formatPrice } from "@/lib/bikes";
import { BikeCard } from "@/components/site/BikeCard";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Motorcycle Brands | BikeZone" },
      {
        name: "description",
        content:
          "Explore Royal Enfield, Yamaha, KTM, Honda, Kawasaki, BMW and Ducati line-ups with pricing and specs.",
      },
      { property: "og:title", content: "Motorcycle Brands | BikeZone" },
      {
        property: "og:description",
        content: "Seven marquee motorcycle brands, all stock in one place.",
      },
    ],
  }),
  component: Brands,
});

const blurbs: Record<string, string> = {
  "Royal Enfield": "Retro thumpers built for long Indian highways.",
  Yamaha: "Crossplane engineering and racing pedigree.",
  KTM: "Austrian street-fighters, ready to race.",
  Honda: "Bulletproof reliability with refined touring comfort.",
  Kawasaki: "Sugomi styling and inline-four muscle.",
  BMW: "Bavarian electronics and autobahn stability.",
  Ducati: "Italian desmo drama in every gear.",
};

function Brands() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Marques</p>
      <h1 className="mt-2 text-5xl">Popular Brands</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Seven manufacturers, one showroom. Pick a badge to see what's on the floor right now.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BRANDS.map((brand) => {
          const stock = bikes.filter((b) => b.brand === brand);
          const from = Math.min(...stock.map((b) => b.price));
          return (
            <article
              key={brand}
              className="card-lift rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl">{brand}</h2>
                <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {stock.length} in stock
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{blurbs[brand]}</p>
              <p className="mt-4 text-sm font-semibold">
                Starting at <span className="text-primary">{formatPrice(from)}</span>
              </p>
              <Link
                to="/new-bikes"
                search={{ q: brand }}
                className="mt-5 inline-flex items-center text-sm font-semibold text-primary"
              >
                View line-up <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>

      <h2 className="mt-16 text-4xl">Fresh arrivals across brands</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {bikes.slice(2, 8).map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
}
