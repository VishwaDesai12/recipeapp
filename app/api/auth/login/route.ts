import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
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

  const cookieStore = await cookies();
  cookieStore.set("chef_token", user.email, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
  });

  return NextResponse.json({ success: true });
}
