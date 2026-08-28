import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageSquare, ShieldCheck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { bikes, emi, formatPrice, getBike, reviews } from "@/lib/bikes";
import { BikeCard } from "@/components/site/BikeCard";
import { Stars } from "@/components/site/Reviews";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/bike/$bikeId")({
  loader: ({ params }) => {
    const bike = getBike(params.bikeId);
    if (!bike) throw notFound();
    return { bike };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Bike unavailable | BikeZone" }, { name: "robots", content: "noindex" }],
      };
    }
    const { bike } = loaderData;
    const title = `${bike.brand} ${bike.name} — ${formatPrice(bike.price)} | BikeZone`;
    const description = `${bike.brand} ${bike.name}: ${bike.cc}cc, ${bike.mileage} kmpl, ${bike.power}. ${bike.tagline}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: BikeDetail,
});

function BikeDetail() {
  const { bike } = Route.useLoaderData();
  const { isWished, toggleWishlist, addToCart } = useStore();
  const [active, setActive] = useState(0);
  const wished = isWished(bike.id);
  const monthly = emi(bike.price);

  const specs: [string, string][] = [
    ["Engine", `${bike.cc} cc`],
    ["Max power", bike.power],
    ["Mileage", `${bike.mileage} kmpl`],
    ["Kerb weight", bike.weight],
    ["Fuel tank", bike.fuel],
    ["Transmission", bike.transmission],
    ["Top speed", bike.topSpeed],
    ["Model year", String(bike.year)],
    ["Condition", bike.condition === "Used" ? `Used · ${bike.kms?.toLocaleString("en-IN")} km` : "Brand new"],
  ];

  const similar = bikes.filter((b) => b.id !== bike.id && b.brand === bike.brand).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-xs uppercase tracking-wider text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link
          to={bike.condition === "New" ? "/new-bikes" : "/used-bikes"}
          className="hover:text-foreground"
        >
          {bike.condition} Bikes
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{bike.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <div className="overflow-hidden rounded-xl border border-border bg-surface-2">
            <img
              src={bike.gallery[active] ?? bike.image}
              alt={`${bike.brand} ${bike.name}`}
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {bike.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`overflow-hidden rounded-lg border ${
                  i === active ? "border-primary" : "border-border"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-20 w-28 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {bike.brand}
          </p>
          <h1 className="mt-2 text-5xl">{bike.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={bike.rating} />
            <span className="text-sm text-muted-foreground">
              {bike.rating} · {bike.reviews} reviews
            </span>
          </div>
          <p className="mt-4 text-muted-foreground">{bike.tagline}</p>

          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <p className="text-4xl font-bold">{formatPrice(bike.price)}</p>
            <p className="text-xs text-muted-foreground">
              On-road price, inclusive of RTO and insurance estimate
            </p>
            <div className="mt-5 rounded-lg bg-surface-2 p-4">
              <p className="text-sm font-semibold">
                EMI from <span className="text-primary">{formatPrice(monthly)}/month</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                36 months · 9.5% p.a. · 15% down payment ({formatPrice(Math.round(bike.price * 0.15))})
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                className="font-semibold"
                onClick={() => {
                  addToCart(bike.id);
                  toast.success("Added to your bookings");
                }}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Book now
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
                onClick={() => toast.success("Enquiry sent — a specialist will call you shortly.")}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Enquire
              </Button>
            </div>
            <Button
              variant="ghost"
              className="mt-3 w-full"
              onClick={() => {
                toggleWishlist(bike.id);
                toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
            >
              <Heart className={wished ? "mr-2 h-4 w-4 fill-primary text-primary" : "mr-2 h-4 w-4"} />
              {wished ? "Saved to wishlist" : "Add to wishlist"}
            </Button>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> 200-point inspection · 5-day return ·
              free doorstep delivery
            </p>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-4xl">Specifications</h2>
        <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {specs.map(([k, v]) => (
            <div key={k} className="bg-card p-5">
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <h2 className="text-4xl">Owner reviews</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {reviews.slice(0, 2).map((r) => (
            <figure key={r.name} className="rounded-xl border border-border bg-card p-6">
              <Stars rating={r.rating} />
              <blockquote className="mt-3 text-sm text-muted-foreground">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {r.name} <span className="text-muted-foreground">· {r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-4xl">More from {bike.brand}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((b) => (
              <BikeCard key={b.id} bike={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
