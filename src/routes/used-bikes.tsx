import { createFileRoute } from "@tanstack/react-router";
import { BikeExplorer } from "@/components/site/BikeExplorer";

export const Route = createFileRoute("/used-bikes")({
  head: () => ({
    meta: [
      { title: "Certified Used Bikes | BikeZone" },
      {
        name: "description",
        content:
          "Pre-owned motorcycles with 200-point inspection reports, verified kilometres and 5-day returns.",
      },
      { property: "og:title", content: "Certified Used Bikes | BikeZone" },
      {
        property: "og:description",
        content: "Inspected second-hand motorcycles with transparent history and warranty.",
      },
    ],
  }),
  component: UsedBikes,
});

function UsedBikes() {
  return (
    <BikeExplorer
      condition="Used"
      title="Certified Used Bikes"
      subtitle="Every listing carries a 200-point inspection report, verified odometer and 5-day return."
    />
  );
}
