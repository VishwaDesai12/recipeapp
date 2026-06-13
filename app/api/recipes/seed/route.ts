import { NextRequest, NextResponse } from "next/server";
import { seedRecipe } from "@/lib/data";
import { Recipe } from "@/types/recipe";

// Internal endpoint — restores localStorage recipes into the in-memory store
// after a cold start so all standard API routes keep working.
export async function POST(req: NextRequest) {
  const recipes = (await req.json()) as Recipe[];
  if (!Array.isArray(recipes)) {
    return NextResponse.json({ error: "Expected an array of recipes" }, { status: 400 });
  }
  recipes.forEach(seedRecipe);
  return NextResponse.json({ seeded: recipes.length });
}
