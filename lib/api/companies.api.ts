import { apiServer } from "./api.server";

export type Company = {
  id: string;
  name: string;
  domain: string;
  industryId: string;
  subIndustry: string;
  createdAt: string;
};

export async function getCompaniesByIndustry(industryId: string) {
  const res = await apiServer<Company[]>(`/companies/industry/${industryId}`);

  return res.data;
}
