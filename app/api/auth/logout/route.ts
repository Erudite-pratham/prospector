import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
    method: "POST",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  const response = NextResponse.json({ success: true });

  // forward cookie deletion
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) response.headers.set("set-cookie", setCookie);

  return response;
}
