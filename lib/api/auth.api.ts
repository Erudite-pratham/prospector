import { apiClient } from "./client";

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginUser(payload: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Login failed");
  }

  return res.json();
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}
