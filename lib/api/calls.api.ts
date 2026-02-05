import { apiServer } from "./api.server";

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
  const res = await apiServer<Call[]>(
    `/calls/company/${companyId}`,
  );

  return res.data;
}
