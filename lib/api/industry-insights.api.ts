import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export type IndustryInsight = {
  id: string;
  industryId: string;
  type: "PROBLEM" | "SOLUTION";
  category: string;
  companiesCount: number;
  totalCompaniesInIndustry: number;
  occurrencesAcrossAllCalls: number;
  crossCompanyPrevalencePercent: number;
  sampleDescriptions: string[];
  createdAt: string;
  updatedAt: string;
};

export async function getIndustryProblems(industryId: string) {
  const res = await apiClient<ApiResponse<IndustryInsight[]>>(
    `/industry-insights/${industryId}/problems`,
  );
  return res.data;
}

export async function getIndustrySolutions(industryId: string) {
  const res = await apiClient<ApiResponse<IndustryInsight[]>>(
    `/industry-insights/${industryId}/solutions`,
  );
  return res.data;
}
