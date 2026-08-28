import { createFileRoute } from "@tanstack/react-router";
import { BikeExplorer } from "@/components/site/BikeExplorer";

export const Route = createFileRoute("/new-bikes")({
  validateSearch: (search: Record<string, unknown>): { q?: string | undefined } => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),

  head: () => ({
    meta: [
      { title: "New Bikes for Sale | BikeZone" },
      {
        name: "description",
        content:
          "Browse brand-new motorcycles with full warranty from KTM, Yamaha, Ducati, BMW, Honda, Kawasaki and Royal Enfield.",
      },
      { property: "og:title", content: "New Bikes for Sale | BikeZone" },
      {
        property: "og:description",
        content: "Filter new motorcycles by brand, engine capacity and budget.",
      },
    ],
  }),
  component: NewBikes,
});

function NewBikes() {
  const { q } = Route.useSearch();
  return (
    <BikeExplorer
      initialQuery={q ?? ""}
      condition="New"
      title="New Bikes"
      subtitle="Factory-fresh machines with full manufacturer warranty and on-road pricing."
    />
  );
}
