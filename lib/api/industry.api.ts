import { apiServer } from "./api.server";

export type Industry = {
  id: string;
  name: string;
  createdAt: string;
};

export async function getIndustryById(id: string): Promise<Industry> {
  const res = await apiServer<Industry>(`/industries/${id}`);

  return res.data;
}

export async function getIndustries() {
  const res = await apiServer<Industry[]>("/industries");
  return res.data;
}
