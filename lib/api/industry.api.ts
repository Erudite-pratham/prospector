import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export type Industry = {
  id: string;
  name: string;
  createdAt: string;
};

export async function getIndustryById(id: string): Promise<Industry> {
  const res = await apiClient<ApiResponse<Industry>>(`/industries/${id}`);

  return res.data;
}

export async function getIndustries() {
  const res = await apiClient<ApiResponse<Industry[]>>("/industries");
  return res.data;
}
