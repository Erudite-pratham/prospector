import Link from "next/link";
import { Company } from "@/lib/api/companies.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export function IndustryCompanies({ companies }: { companies: Company[] }) {
  if (companies.length === 0) {
    return <p className="text-muted-foreground">No companies found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {companies.map((c) => (
        <Link key={c.id} href={`/industry/${c.industryId}/${c.id}`}>
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>{c.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{c.domain}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{c.subIndustry}</Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
