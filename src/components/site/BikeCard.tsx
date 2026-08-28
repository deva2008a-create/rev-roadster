import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, Heart, Star } from "lucide-react";
import { toast } from "sonner";
import type { Bike } from "@/lib/bikes";
import { formatPrice } from "@/lib/bikes";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function BikeCard({ bike }: { bike: Bike }) {
  const { isWished, toggleWishlist } = useStore();
  const wished = isWished(bike.id);

  return (
    <article className="card-lift group overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={bike.image}
          alt={`${bike.brand} ${bike.name}`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground backdrop-blur">
            {bike.condition}
          </span>
          {bike.highlight && (
            <span className="rounded-full bg-gradient-ember px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
              {bike.highlight}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            toggleWishlist(bike.id);
            toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:border-primary"
        >
          <Heart
            className={
              wished ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4 text-muted-foreground"
            }
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {bike.brand}
            </p>
            <h3 className="truncate text-xl">{bike.name}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-sm text-gold">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">{bike.rating}</span>
          </div>
        </div>

        <p className="mt-3 text-2xl font-bold text-foreground">{formatPrice(bike.price)}</p>
        <p className="text-xs text-muted-foreground">
          {bike.condition === "Used" ? `${bike.year} · ${bike.kms?.toLocaleString("en-IN")} km` : "On-road estimate"}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <span className="flex items-center gap-2 rounded-md bg-secondary/60 px-3 py-2 text-muted-foreground">
            <Gauge className="h-4 w-4 text-primary" /> {bike.cc} cc
          </span>
          <span className="flex items-center gap-2 rounded-md bg-secondary/60 px-3 py-2 text-muted-foreground">
            <Fuel className="h-4 w-4 text-primary" /> {bike.mileage} kmpl
          </span>
        </div>

        <Button asChild className="mt-5 w-full font-semibold">
          <Link to="/bike/$bikeId" params={{ bikeId: bike.id }}>
            View Details
          </Link>
        </Button>
      </div>
    </article>
  );
}
