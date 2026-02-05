import { IndustriesGrid } from "@/components/dashboard/IndustriesGrid";

export default function DashboardPage() {
  return (
    <div className="space-y-8 py-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Explore Industries</h1>
        <p className="text-muted-foreground text-lg">
          Select an industry to view companies and sales insights
        </p>
      </div>
      <IndustriesGrid />
    </div>
  );
}
