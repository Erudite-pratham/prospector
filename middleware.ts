import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/login");
  const isAppRoute =
    pathname === "/" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile");

  // 🚫 Not logged in → block app routes
  if (!token && isAppRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🚫 Logged in → block auth routes
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/profile/:path*"],
};
