import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("chef_token");
  const path = request.nextUrl.pathname;
  const timestamp = new Date().toISOString();

  console.log(`[Proxy] ${timestamp} — ${path}`);

  if (!token?.value) {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
