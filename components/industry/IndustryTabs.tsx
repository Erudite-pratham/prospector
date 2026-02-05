"use client";

import { useEffect, useState } from "react";
import {
  getIndustryProblems,
  getIndustrySolutions,
  IndustryInsight,
} from "@/lib/api/industry-insights.api";
import { getCompaniesByIndustry, Company } from "@/lib/api/companies.api";
import { getIndustryById, Industry } from "@/lib/api/industry.api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { IndustryHeader } from "./IndustryHeader";
import { IndustryStats } from "./IndustryStats";
import { IndustryCharts } from "./IndustryCharts";
import { IndustryProblems } from "./IndustryProblems";
import { IndustrySolutions } from "./IndustrySolutions";
import { IndustryCompanies } from "./IndustryCompanies";

export function IndustryTabs({ industryId }: { industryId: string }) {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [problems, setProblems] = useState<IndustryInsight[]>([]);
  const [solutions, setSolutions] = useState<IndustryInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [industry, companies, problems, solutions] = await Promise.all([
          getIndustryById(industryId),
          getCompaniesByIndustry(industryId),
          getIndustryProblems(industryId),
          getIndustrySolutions(industryId),
        ]);

        setIndustry(industry);
        setCompanies(companies);
        setProblems(problems);
        setSolutions(solutions);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [industryId]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!industry) return null;

  const subIndustryData = Object.values(
    companies.reduce(
      (acc: Record<string, { name: string; value: number }>, c) => {
        acc[c.subIndustry] ??= { name: c.subIndustry, value: 0 };
        acc[c.subIndustry].value += 1;
        return acc;
      },
      {},
    ),
  );

  const companyFrequencyByDate = Object.values(
    companies.reduce(
      (acc: Record<string, { date: string; count: number }>, c) => {
        const date = new Date(c.createdAt).toISOString().split("T")[0];
        acc[date] ??= { date, count: 0 };
        acc[date].count += 1;
        return acc;
      },
      {},
    ),
  ).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-8">
      <IndustryHeader industry={industry} />

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <IndustryStats
            totalCompanies={companies.length}
            subIndustryCount={subIndustryData.length}
            industryName={industry.name}
          />

          <IndustryCharts
            subIndustryData={subIndustryData}
            companyFrequencyByDate={companyFrequencyByDate}
          />

          <IndustryProblems problems={problems} />
          <IndustrySolutions solutions={solutions} />
        </TabsContent>

        <TabsContent value="companies">
          <IndustryCompanies companies={companies} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
