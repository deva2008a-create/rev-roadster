import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { bikes, emi, formatPrice } from "@/lib/bikes";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "My Bookings & Checkout | BikeZone" },
      {
        name: "description",
        content:
          "Review the motorcycles you've reserved, see EMI totals and confirm your BikeZone booking.",
      },
      { property: "og:title", content: "My Bookings & Checkout | BikeZone" },
      { property: "og:description", content: "Reserve your motorcycle with a refundable token." },
    ],
  }),
  component: Booking,
});

function Booking() {
  const { cart, removeFromCart } = useStore();
  const items = bikes.filter((b) => cart.includes(b.id));
  const total = items.reduce((sum, b) => sum + b.price, 0);
  const token = items.length * 5000;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Checkout</p>
      <h1 className="mt-2 text-5xl">My Bookings</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-14 text-center">
          <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold">No bikes reserved yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Hit “Book now” on a bike to hold it with a refundable token.
          </p>
          <Button asChild className="mt-6 font-semibold">
            <Link to="/new-bikes">Find a bike</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ul className="grid gap-4">
            {items.map((b) => (
              <li
                key={b.id}
                className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <img
                  src={b.image}
                  alt={`${b.brand} ${b.name}`}
                  loading="lazy"
                  className="h-20 w-24 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-primary">{b.brand}</p>
                  <Link
                    to="/bike/$bikeId"
                    params={{ bikeId: b.id }}
                    className="block truncate text-lg font-semibold hover:text-primary"
                  >
                    {b.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(b.price)} · EMI {formatPrice(emi(b.price))}/mo
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${b.name}`}
                  onClick={() => {
                    removeFromCart(b.id);
                    toast.success("Removed from bookings");
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl">Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label={`Bikes (${items.length})`} value={formatPrice(total)} />
              <Row label="Refundable token" value={formatPrice(token)} />
              <Row label="Delivery" value="Free" />
              <div className="border-t border-border pt-3">
                <Row label="Pay now" value={formatPrice(token)} strong />
              </div>
            </dl>
            <Button
              size="lg"
              className="mt-6 w-full font-semibold"
              onClick={() => toast.success("Booking confirmed — our team will call to schedule delivery.")}
            >
              Confirm booking
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Token is fully refundable for 5 days. Balance payable on delivery or through finance.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={strong ? "text-lg font-bold" : "font-semibold"}>{value}</dd>
    </div>
  );
}
