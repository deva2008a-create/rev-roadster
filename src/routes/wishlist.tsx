import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { bikes } from "@/lib/bikes";
import { BikeCard } from "@/components/site/BikeCard";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist | BikeZone" },
      {
        name: "description",
        content: "Every motorcycle you've saved on BikeZone, ready to compare and book.",
      },
      { property: "og:title", content: "My Wishlist | BikeZone" },
      { property: "og:description", content: "Your saved motorcycles on BikeZone." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const saved = bikes.filter((b) => wishlist.includes(b.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Saved</p>
      <h1 className="mt-2 text-5xl">My Wishlist</h1>

      {saved.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-14 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold">Nothing saved yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the heart on any bike to keep it here.
          </p>
          <Button asChild className="mt-6 font-semibold">
            <Link to="/new-bikes">Start browsing</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
}
