"use server";

import { cookies } from "next/headers";
import { apiClient } from "./client";
import { ApiResponse } from "./types";

const COOKIE_NAME = "token";

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  };
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await apiClient<ApiResponse<{ message: string }>>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const token = res.data.message;

  if (!token) {
    throw new Error("No token returned from server");
  }

  // ✅ cookies() IS ASYNC IN NEW NEXT
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, getCookieOptions());

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });

  return { success: true };
}
