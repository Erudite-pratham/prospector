import { apiServer } from "./api.server";

export type UserProfile = {
  name: string;
  employeeId: number;
  email: string;
  department: string | null;
};

export async function getMyProfile() {
  const res = await apiServer<UserProfile>("/users/getMyProfile");
  return res.data;
}
