import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isLoginPage = req.nextUrl.pathname === "/api/login";

  if (!token && !isLoginPage) {
    return NextResponse.redirect(
      new URL("/api/login", req.url)
    );
  }

  return NextResponse.next();
}