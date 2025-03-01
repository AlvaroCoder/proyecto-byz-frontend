import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./authentication/lib";

export async function middleware(request= NextRequest) {
    const session = await getSession();

    if (session !== null && request.nextUrl.pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }

    if (!session && request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/login', '/admin/dashboard/:path*'],
  };