import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("chef_token");
  const res = NextResponse.json({ loggedIn: !!token?.value });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
