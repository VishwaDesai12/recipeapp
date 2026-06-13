import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("chef_token");
  return NextResponse.json({ loggedIn: !!token?.value });
}
