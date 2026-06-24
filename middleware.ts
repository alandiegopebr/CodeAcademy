import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/dashboard', '/courses', '/leaderboard', '/profile', '/certificates', '/settings', '/admin', '/ai'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('codeacademy_session');

  if (protectedPaths.some((path) => pathname.startsWith(path)) && !sessionCookie) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/courses/:path*', '/leaderboard', '/profile', '/certificates', '/settings', '/admin/:path*', '/ai'],
};
