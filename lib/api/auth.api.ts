import { apiClient } from "./client";

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginUser(payload: LoginPayload) {
  return await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logout() {
  await apiClient("/auth/logout", { method: "POST" });
}
