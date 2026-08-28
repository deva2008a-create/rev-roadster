import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Twitter, label: "X", href: "https://x.com" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="display text-3xl">
            Bike<span className="text-gradient-ember">Zone</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            India's premium motorcycle marketplace — inspected machines, transparent pricing and
            doorstep delivery in 48 hours.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-md border border-border bg-secondary/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Explore"
          items={[
            { to: "/new-bikes", label: "New Bikes" },
            { to: "/used-bikes", label: "Used Bikes" },
            { to: "/brands", label: "Brands" },
            { to: "/offers", label: "Offers" },
          ]}
        />
        <FooterCol
          title="Account"
          items={[
            { to: "/login", label: "Login" },
            { to: "/signup", label: "Create account" },
            { to: "/wishlist", label: "Wishlist" },
            { to: "/booking", label: "My bookings" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { to: "/sell", label: "Sell Your Bike" },
            { to: "/contact", label: "Contact" },
          ]}
        />
      </div>
      <div className="border-t border-border px-4 py-5">
        <p className="mx-auto max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} BikeZone Motors Pvt. Ltd. All prices are on-road estimates
          and may vary by city.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
