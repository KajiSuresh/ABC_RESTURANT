import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/staffDashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const userRole = req.cookies.get("login")?.value;

    if (!userRole) {
      return NextResponse.redirect(new URL("/unavailable", req.url));
    }

    const loginDetails = JSON.parse(userRole);

    if (pathname.startsWith("/dashboard") && loginDetails.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unavailable", req.url));
    }

  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};