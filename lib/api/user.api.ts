import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export type UserProfile = {
  name: string;
  employeeId: number;
  email: string;
  department: string | null;
};

export async function getMyProfile() {
  const res = await apiClient<ApiResponse<UserProfile>>("/users/getMyProfile");
  return res.data;
}
