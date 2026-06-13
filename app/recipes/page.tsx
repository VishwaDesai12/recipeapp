import { headers } from "next/headers";
import { Recipe } from "@/types/recipe";
import { RecipesBrowseClient } from "./RecipesBrowseClient";

export default async function RecipesPage() {
  let initialRecipes: Recipe[] = [];

  try {
    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const proto = host.includes("localhost") ? "http" : "https";
    const res = await fetch(`${proto}://${host}/api/recipes?published=true`, {
      cache: "no-store",
    });
    if (res.ok) {
      initialRecipes = await res.json();
    }
  } catch {
    // API unavailable on cold start — client will hydrate from localStorage
  }

  return <RecipesBrowseClient initialRecipes={initialRecipes} />;
}
