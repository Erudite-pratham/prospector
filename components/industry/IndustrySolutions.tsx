import { IndustryInsight } from "@/lib/api/industry-insights.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function IndustrySolutions({
  solutions,
}: {
  solutions: IndustryInsight[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Solutions Across This Industry</CardTitle>
        <p className="text-sm text-muted-foreground">
          Solutions frequently discussed or proposed across companies
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {solutions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No common solutions identified yet.
          </p>
        ) : (
          solutions.map((s) => (
            <div key={s.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{s.category}</Badge>
                <Badge variant="outline">
                  {s.companiesCount} / {s.totalCompaniesInIndustry} companies
                </Badge>
                <Badge variant="outline">
                  {s.crossCompanyPrevalencePercent}% prevalence
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Mentioned{" "}
                <span className="font-medium text-foreground">
                  {s.occurrencesAcrossAllCalls}
                </span>{" "}
                times across all calls
              </p>

              <ul className="list-disc list-inside space-y-1 text-sm">
                {s.sampleDescriptions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
