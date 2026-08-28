import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { BRANDS, bikes as allBikes, formatPrice, type Condition } from "@/lib/bikes";
import { BikeCard } from "@/components/site/BikeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const CC_BANDS = [
  { label: "All CC", min: 0, max: 2000 },
  { label: "Up to 200cc", min: 0, max: 200 },
  { label: "200 – 400cc", min: 200, max: 400 },
  { label: "400 – 700cc", min: 400, max: 700 },
  { label: "700cc +", min: 700, max: 2000 },
];

export function BikeExplorer({
  initialQuery = "",
  condition,
  title,
  subtitle,
}: {
  initialQuery?: string;
  condition?: Condition;
  title: string;
  subtitle: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState<string>("All");
  const [ccBand, setCcBand] = useState(0);
  const [cond, setCond] = useState<Condition | "All">(condition ?? "All");
  const [maxPrice, setMaxPrice] = useState(2200000);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const band = CC_BANDS[ccBand] ?? CC_BANDS[0]!;
    return allBikes.filter((b) => {
      if (condition && b.condition !== condition) return false;
      if (!condition && cond !== "All" && b.condition !== cond) return false;
      if (brand !== "All" && b.brand !== brand) return false;
      if (b.cc < band.min || b.cc > band.max) return false;
      if (b.price > maxPrice) return false;
      if (q && !`${b.brand} ${b.name}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, brand, ccBand, cond, maxPrice, condition]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0">
          <h1 className="text-4xl md:text-5xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by bike name or brand"
            aria-label="Search bikes"
            className="h-11 bg-secondary/60 pl-9"
          />
        </div>
      </div>

      <Button
        variant="secondary"
        className="mt-6 w-full md:hidden"
        onClick={() => setShowFilters((v) => !v)}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        {showFilters ? "Hide filters" : "Show filters"}
      </Button>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside
          className={`${showFilters ? "block" : "hidden"} h-fit rounded-xl border border-border bg-card p-5 md:block lg:sticky lg:top-24`}
        >
          <h2 className="text-xl">Filters</h2>

          <FilterGroup label="Brand">
            <div className="flex flex-wrap gap-2">
              {["All", ...BRANDS].map((b) => (
                <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Engine capacity">
            <div className="flex flex-wrap gap-2">
              {CC_BANDS.map((b, i) => (
                <Chip key={b.label} active={ccBand === i} onClick={() => setCcBand(i)}>
                  {b.label}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          {!condition && (
            <FilterGroup label="Condition">
              <div className="flex flex-wrap gap-2">
                {(["All", "New", "Used"] as const).map((c) => (
                  <Chip key={c} active={cond === c} onClick={() => setCond(c)}>
                    {c}
                  </Chip>
                ))}
              </div>
            </FilterGroup>
          )}

          <FilterGroup label={`Max price · ${formatPrice(maxPrice)}`}>
            <Slider
              value={[maxPrice]}
              min={100000}
              max={2200000}
              step={10000}
              onValueChange={(v) => setMaxPrice(v[0] ?? 2200000)}
              aria-label="Maximum price"
            />
          </FilterGroup>

          <Button
            variant="ghost"
            className="mt-6 w-full"
            onClick={() => {
              setBrand("All");
              setCcBand(0);
              setCond(condition ?? "All");
              setMaxPrice(2200000);
              setQuery("");
            }}
          >
            Reset all
          </Button>
        </aside>

        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "bike" : "bikes"} available
          </p>
          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <p className="text-lg font-semibold">No bikes match those filters</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try widening the price range or clearing the brand filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
