import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/users";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("chef_token", user.email, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
  // Non-httpOnly flag cookie so client-side JS can detect login state
  response.cookies.set("chef_session", "1", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false,
    sameSite: "lax",
    secure: true,
  });
  return response;
}
