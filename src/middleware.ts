import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("authToken");

  // console.log(⁠ Pathname: ${pathname} ⁠);
  // console.log(⁠ AuthToken: ${authToken} ⁠);

  // Redirect to /auth/login if accessing /dashboard without authToken
  if (pathname === "/dashboard" && !authToken) {
    console.log("Redirecting to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Apply middleware to /dashboard path
};