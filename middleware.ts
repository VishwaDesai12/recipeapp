import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Log path and timestamp for every matched request
  console.log(`[middleware] ${new Date().toISOString()} ${pathname}`);

  const token = req.cookies.get("chef_token");

  if (!token?.value) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.delete("error");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage", "/manage/:path*", "/cookbook"],
};
