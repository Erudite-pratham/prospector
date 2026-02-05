"use server";

import { cookies } from "next/headers";
import { ApiResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function apiServer<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok) {
    throw new Error(json?.error?.message || "Request failed");
  }

  return json;
}
