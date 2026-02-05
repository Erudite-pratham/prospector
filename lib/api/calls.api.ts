import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export type ClientProblem = {
  problemDescription: string;
  impact: string;
  category: string;
};

export type FinalSolution = {
  problemAddressed: string;
  solutionPitched: string;
  outcomeDiscussed: string;
  pastExamples: string;
};

export type Call = {
  id: string;
  companyId: string;
  createdAt: string;
  clientProblems: ClientProblem[];
  finalSolution: FinalSolution;
};

export async function getCallsByCompany(companyId: string) {
  const res = await apiClient<ApiResponse<Call[]>>(
    `/calls/company/${companyId}`,
  );

  return res.data;
}
