import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { BRANDS } from "@/lib/bikes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Bike — Free Valuation | BikeZone" },
      {
        name: "description",
        content:
          "Get a free doorstep valuation for your motorcycle and same-day payment when you sell through BikeZone.",
      },
      { property: "og:title", content: "Sell Your Bike — Free Valuation | BikeZone" },
      {
        property: "og:description",
        content: "Share your bike details and receive an instant price estimate.",
      },
    ],
  }),
  component: Sell,
});

const schema = z.object({
  brand: z.string().trim().min(1, "Choose a brand"),
  model: z.string().trim().min(2, "Enter the model name").max(60),
  year: z.coerce.number().int().min(1990, "Year looks off").max(2026, "Year looks off"),
  kms: z.coerce.number().int().min(0).max(500000),
  price: z.coerce.number().int().min(1000, "Enter an expected price"),
  owner: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
  notes: z.string().trim().max(600).optional(),
});

function Sell() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quote, setQuote] = useState<number | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setQuote(null);
      return;
    }
    setErrors({});
    const { price, year, kms } = parsed.data;
    const age = Math.max(0, 2026 - year);
    const estimate = Math.max(
      15000,
      Math.round((price * (1 - age * 0.055) - kms * 0.6) / 1000) * 1000,
    );
    setQuote(estimate);
    toast.success("Valuation ready — inspection slot options sent to your phone.");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Sell your bike</p>
      <h1 className="mt-2 text-5xl">Free valuation in 60 seconds</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Enter your bike's details and we'll estimate its market value instantly. Inspection is free
        and payment lands the same day you hand over the keys.
      </p>

      <form onSubmit={submit} className="mt-10 rounded-xl border border-border bg-card p-7" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <select
              id="brand"
              name="brand"
              className="h-10 rounded-md border border-input bg-secondary/60 px-3 text-sm"
            >
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
              <option>Other</option>
            </select>
            {errors["brand"] && <p className="text-xs text-destructive">{errors["brand"]}</p>}
          </div>
          <F label="Model" name="model" error={errors["model"]} placeholder="Classic 350" />
          <F label="Manufacturing year" name="year" error={errors["year"]} placeholder="2022" />
          <F label="Kilometres ridden" name="kms" error={errors["kms"]} placeholder="18000" />
          <F label="Expected price (₹)" name="price" error={errors["price"]} placeholder="185000" />
          <F label="Your name" name="owner" error={errors["owner"]} placeholder="Rider name" />
          <F label="Phone" name="phone" error={errors["phone"]} placeholder="+91 90000 00000" />
        </div>
        <div className="mt-5 grid gap-2">
          <Label htmlFor="notes">Condition notes (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={600}
            placeholder="Service history, accessories, any dents or repairs…"
            className="bg-secondary/60"
          />
        </div>
        <Button type="submit" size="lg" className="mt-6 font-semibold">
          Get free valuation
        </Button>
      </form>

      {quote !== null && (
        <div className="rise-in mt-6 rounded-xl border border-primary/50 bg-card p-7">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Estimated BikeZone offer
          </p>
          <p className="mt-2 text-4xl font-bold text-primary">
            ₹{quote.toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Final price is confirmed after the free 200-point inspection at your doorstep.
          </p>
        </div>
      )}
    </div>
  );
}

function F({
  label,
  name,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} placeholder={placeholder} maxLength={80} className="bg-secondary/60" />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
