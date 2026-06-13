import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, addUser } from "@/lib/users";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (findUserByEmail(email)) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  addUser(name, email, password);

  const response = NextResponse.json({ success: true });
  response.cookies.set("chef_token", email, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
  return response;
}
