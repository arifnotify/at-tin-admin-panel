import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(
  req: NextRequest
) {
  const token =
    req.cookies.get("token");

  const isLogin =
    req.nextUrl.pathname ===
    "/login";

  // NOT LOGGED IN
  if (!token && !isLogin) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // ALREADY LOGGED IN
  if (token && isLogin) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        req.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/orders/:path*",
    "/users/:path*",
    "/login",
  ],
};