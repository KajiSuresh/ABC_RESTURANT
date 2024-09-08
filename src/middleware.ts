import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get('authToken')?.value;
  const role = req.cookies.get('role')?.value;

  // Check for authentication when accessing the admin dashboard
  if (pathname.startsWith('/dashboard') && (!authToken || role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Check for authentication when accessing the staff dashboard
  if (pathname.startsWith('/layout/staffs') && (!authToken || role !== 'STAFF')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}