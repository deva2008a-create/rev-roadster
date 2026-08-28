import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const links = [
  { to: "/", label: "Home" },
  { to: "/new-bikes", label: "New Bikes" },
  { to: "/used-bikes", label: "Used Bikes" },
  { to: "/brands", label: "Brands" },
  { to: "/offers", label: "Offers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { wishlist, cart, user } = useStore();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/new-bikes", search: { q: q || undefined } });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:gap-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-ember text-primary-foreground">
            <span className="display text-lg leading-none">BZ</span>
          </span>
          <span className="display truncate text-2xl tracking-wide">
            Bike<span className="text-gradient-ember">Zone</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submit} className="ml-auto hidden max-w-xs flex-1 lg:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search bikes or brands"
              aria-label="Search bikes by name or brand"
              className="h-10 border-border bg-secondary/60 pl-9"
            />
          </div>
        </form>

        <div className="hidden items-center gap-1 lg:flex">
          <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
            <Link to="/wishlist" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <Badge count={wishlist.length} />}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Bookings">
            <Link to="/booking" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && <Badge count={cart.length} />}
            </Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="ml-2 font-semibold">
            <Link to={user ? "/sell" : "/login"}>
              <User className="mr-1 h-4 w-4" />
              {user ? user.name.split(" ")[0] : "Login"}
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="justify-self-end rounded-md border border-border p-2 lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-4 pb-5 pt-3 lg:hidden">
          <form onSubmit={submit} className="mb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search bikes or brands"
                className="h-10 bg-secondary/60 pl-9"
              />
            </div>
          </form>
          <div className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link to="/wishlist" onClick={() => setOpen(false)}>
                  Wishlist
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link to="/booking" onClick={() => setOpen(false)}>
                  Bookings
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to={user ? "/sell" : "/login"} onClick={() => setOpen(false)}>
                  {user ? "Sell" : "Login"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
      {count}
    </span>
  );
}
