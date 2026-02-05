"use client";

import { useEffect, useState } from "react";
import { getCallsByCompany, Call } from "@/lib/api/calls.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CompanyCalls({ companyId }: { companyId: string }) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCallsByCompany(companyId);
        setCalls(data);
      } catch (err: any) {
        setError(err.message || "Failed to load calls");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [companyId]);

  if (loading) return <p>Loading calls…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6 py-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Sales Calls</h1>
        <p className="text-muted-foreground">
          Calls, problems discussed, and solutions proposed
        </p>
      </div>

      {calls.length === 0 ? (
        <p className="text-muted-foreground">No calls found.</p>
      ) : (
        <div className="space-y-4">
          {calls.map((call) => (
            <Card key={call.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Call</CardTitle>
                <Badge variant="outline">
                  {new Date(call.createdAt).toLocaleDateString()}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Solution */}
                <section className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    Solution Pitched
                  </h3>

                  <div className="rounded-md p-4 space-y-4 bg-muted">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Problem Addressed
                      </p>
                      <p className="text-sm">
                        {call.finalSolution.problemAddressed}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Proposed Solution
                      </p>
                      <p className="text-sm">
                        {call.finalSolution.solutionPitched}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Outcome Discussed
                      </p>
                      <p className="text-sm">
                        {call.finalSolution.outcomeDiscussed}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Past Examples
                      </p>
                      <p className="text-sm">
                        {call.finalSolution.pastExamples}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Problems */}
                <section className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    Client Problems
                  </h3>

                  <div className="space-y-3">
                    {call.clientProblems.map((problem, idx) => (
                      <div
                        key={idx}
                        className="rounded-md border p-3 space-y-2"
                      >
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{problem.category}</Badge>
                          <Badge variant="outline">{problem.impact}</Badge>
                        </div>

                        <p className="text-sm">{problem.problemDescription}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
