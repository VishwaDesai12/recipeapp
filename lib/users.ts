import { randomUUID } from "crypto";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// In-memory store seeded with the default user.
// Same trade-off as the recipe store: resets on cold starts.
const users: User[] = [
  {
    id: "d56a3ea4-af87-497f-98d2-b338522d7be9",
    name: "vish",
    email: "hello@gmail.com",
    password: "123abc",
  },
];

export function getAllUsers(): User[] {
  return users;
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function addUser(name: string, email: string, password: string): User {
  const user: User = { id: randomUUID(), name, email, password };
  users.push(user);
  return user;
}
