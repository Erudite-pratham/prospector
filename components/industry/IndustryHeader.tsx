import { Industry } from "@/lib/api/industry.api";

export function IndustryHeader({ industry }: { industry: Industry }) {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">Industry – {industry.name}</h1>
      <p className="text-muted-foreground text-lg">
        Explore companies and insights for this industry
      </p>
    </div>
  );
}
