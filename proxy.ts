import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Proxy] ${new Date().toISOString()} ${pathname}`);

  const token = request.cookies.get("chef_token");

  if (!token?.value) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage", "/manage/:path*", "/cookbook"],
};
