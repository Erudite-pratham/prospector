import { IndustryInsight } from "@/lib/api/industry-insights.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function IndustryProblems({
  problems,
}: {
  problems: IndustryInsight[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Problems in This Industry</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recurring challenges observed across companies and calls
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {problems.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No common problems identified yet.
          </p>
        ) : (
          problems.map((p) => (
            <div key={p.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{p.category}</Badge>
                <Badge variant="outline">
                  {p.companiesCount} / {p.totalCompaniesInIndustry} companies
                </Badge>
                <Badge variant="outline">
                  {p.crossCompanyPrevalencePercent}% prevalence
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Mentioned{" "}
                <span className="font-medium text-foreground">
                  {p.occurrencesAcrossAllCalls}
                </span>{" "}
                times across all calls
              </p>

              <ul className="list-disc list-inside space-y-1 text-sm">
                {p.sampleDescriptions.map((d, i) => (
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
