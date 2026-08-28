import { Star } from "lucide-react";
import { reviews } from "@/lib/bikes";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= Math.round(rating) ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-muted-foreground"
          }
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Rider stories
          </p>
          <h2 className="mt-2 text-4xl">Rated 4.8 by 12,400 riders</h2>
        </div>
        <Stars rating={5} className="pb-2" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reviews.map((r) => (
          <figure key={r.name} className="card-lift rounded-xl border border-border bg-card p-6">
            <Stars rating={r.rating} />
            <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-ember text-sm font-bold text-primary-foreground">
                {r.name.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{r.name}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {r.bike} · {r.city}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
