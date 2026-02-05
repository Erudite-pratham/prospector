import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IndustryStats({
  totalCompanies,
  subIndustryCount,
  industryName,
}: {
  totalCompanies: number;
  subIndustryCount: number;
  industryName: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Total Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalCompanies}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Sub Industries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{subIndustryCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Active Industry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{industryName}</p>
        </CardContent>
      </Card>
    </div>
  );
}
