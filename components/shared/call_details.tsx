"use client";

import { CallDetailsInterface } from "@/types/calls";
import { use, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export const CallDetails = ({
  initCall,
}: {
  initCall: CallDetailsInterface;
}) => {
  const [call, setCall] = useState<CallDetailsInterface>(initCall);

  const router = useRouter();

  console.log(call);

  return (
    <div className="space-y-4 ">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-2xl">{call.companyName}</CardTitle>
            <div className="flex flex-col gap-2">
              <Badge variant={"outline"}>
                {new Date(call.createdAt).toLocaleDateString("en-US")}
              </Badge>
              {call.notesLink && (
                <Button
                  size="sm"
                  onClick={() =>
                    window.open(call.notesLink, "_blank", "noopener,noreferrer")
                  }
                >
                  View Recording
                </Button>
              )}
            </div>
          </div>
          <CardDescription>
            <span className="font-bold">Client:</span>{" "}
            {call.clientRepresentative.name} - {call.clientRepresentative.title}{" "}
            <br />
            <span className="font-bold">Consultadd Rep:</span>{" "}
            {call.consultAddRepresentative} <br />
            <span className="font-bold">Stage:</span> {call.stage} <br />
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full ">
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="takeaways">Takeaways</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Summary</CardTitle>
              <CardDescription>{call.callSummary}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competitors Mentioned</CardTitle>
            </CardHeader>
            <CardContent className="space-x-2">
              {call.competitorsMentioned.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No competitors mentioned.
                </p>
              ) : (
                call.competitorsMentioned.map((competitor, i) => (
                  <div
                    key={i}
                    className="bg-secondary/90 flex items-start gap-4 p-4 rounded-2xl"
                  >
                    <Badge variant={"outline"}>{competitor.sentiment}</Badge>
                    <div>
                      {" "}
                      <h2 className="text-lg font-bold">
                        {competitor.competitorName}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {competitor.context}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problems">
          <Card>
            <CardHeader>
              <CardTitle>Client Problems & Pain Points</CardTitle>
              <CardDescription>
                All challenges and pain points mentioned by the client during
                the call.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {call.clientProblems.map((problem, i) => (
                <div
                  key={i}
                  className="border border-border flex flex-wrap items-start gap-4 p-4 rounded-2xl"
                >
                  <Badge variant={"destructive"}>{problem.tag}</Badge>
                  <Badge variant={"secondary"}>{problem.category}</Badge>
                  <Badge variant={"outline"}>{problem.industryContext}</Badge>
                  <p className="text-sm">{problem.problemStatement}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solutions">
          <Card>
            <CardHeader>
              <CardTitle>Solutions Pitched</CardTitle>
              <CardDescription>
                Proposed solutions mapped to client problems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {call.solutionsPitched.map((solution, i) => (
                <div
                  key={i}
                  className="border border-border flex flex-col items-start gap-4 p-4 rounded-2xl"
                >
                  <Badge variant={"destructive"}>{solution.fitLabel}</Badge>
                  <h4 className="text-base font-medium">Solution</h4>
                  <CardDescription>
                    {solution.solutionDescription}
                  </CardDescription>

                  <h4 className="text-base font-medium mt-3">
                    Addressed Problem
                  </h4>
                  <CardDescription>{solution.addressedProblem}</CardDescription>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {call.summaryRows.map((row, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>Analysis #{i + 1}</CardTitle>
                  <Badge>{row.clientReaction}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-bold text-sm text-muted-foreground">
                    Problem
                  </p>
                  <p className="text-sm">{row.problem}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-sm text-muted-foreground">
                    Solution Pitched
                  </p>
                  <p className="text-sm">{row.solutionPitched}</p>
                </div>
                <Separator />
                {row.clientObjection && (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="space-y-2 flex-1">
                        <p className="font-bold text-sm text-muted-foreground">
                          Client Objection
                        </p>
                        <p className="text-sm">{row.clientObjection}</p>
                      </div>
                      <div className="space-y-2 flex-1">
                        <p className="font-bold text-sm text-muted-foreground">
                          Objection Handling
                        </p>
                        <p className="text-sm">{row.objectionHandling}</p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                )}
                <div className="space-y-2">
                  <p className="font-bold text-sm text-muted-foreground">
                    Client Reaction
                  </p>
                  <p className="text-sm">{row.clientReaction}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="takeaways">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {call.keyTakeaways.map((data, i) => (
                    <li key={i} className="text-sm">
                      {data}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Follow-up Actions</CardTitle>
              </CardHeader>

              <CardContent>
                <ol className="list-decimal list-inside space-y-2 marker:font-bold">
                  {call.followUpActions.map((data, i) => (
                    <li key={i} className="text-sm">
                      {data}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
