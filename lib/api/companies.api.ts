import { apiClient } from "./client";

export type Company = {
  id: string;
  name: string;
  domain: string;
  industryId: string;
  subIndustry: string;
  createdAt: string;
};

type CompaniesResponse = {
  timestamp: string;
  data: Company[];
  error: string | null;
};

export async function getCompaniesByIndustry(industryId: string) {
  const res = await apiClient<CompaniesResponse>(
    `/companies/industry/${industryId}`,
  );

  return res.data;
}
