import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("chef_token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
  response.cookies.set("chef_session", "", {
    path: "/",
    maxAge: 0,
    httpOnly: false,
    sameSite: "lax",
    secure: true,
  });
  return response;
}
