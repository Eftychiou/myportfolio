// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { JWT } from 'next-auth/jwt';

// Constants
const LOGIN_PATH = '/login';
const ADMIN_PATH = '/admin';

// Helpers as arrow functions
const isNotAuthorized = (token: JWT | null) => !token;

const isLoginPath = (pathname: string) => pathname.startsWith(LOGIN_PATH);

const isAdminPath = (pathname: string) => pathname.startsWith(ADMIN_PATH);

// Middleware
export const middleware = async (request: NextRequest) => {
  const token: JWT | null = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  const { pathname } = request.nextUrl;

  // 1️⃣ Redirect logged-in users away from /login
  if (isLoginPath(pathname)) {
    if (!isNotAuthorized(token)) {
      return NextResponse.redirect(new URL(ADMIN_PATH, request.url));
    }
    return NextResponse.next();
  }

  // 2️⃣ Protect /admin routes
  if (isAdminPath(pathname)) {
    if (isNotAuthorized(token)) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
  }

  // 3️⃣ Default allow
  return NextResponse.next();
};

// Match only /admin and /login routes
export const config = {
  matcher: ['/admin/:path*', '/login']
};
