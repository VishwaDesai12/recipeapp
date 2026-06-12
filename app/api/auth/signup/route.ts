import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

async function getUsers(): Promise<User[]> {
  try {
    const data = await readFile(join(process.cwd(), "data/users.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users: User[]): Promise<void> {
  await writeFile(join(process.cwd(), "data/users.json"), JSON.stringify(users, null, 2));
}

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const users = await getUsers();

  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const newUser: User = { id: randomUUID(), name, email, password };
  users.push(newUser);
  await saveUsers(users);

  const cookieStore = await cookies();
  cookieStore.set("chef_token", email, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
  });

  return NextResponse.json({ success: true });
}
