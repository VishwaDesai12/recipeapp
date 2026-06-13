import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth is enforced in app/manage/layout.tsx (server component) which has
// reliable access to cookies. Proxy is kept only for request logging.
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const timestamp = new Date().toISOString();
  console.log(`[Proxy] ${timestamp} — ${path}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
