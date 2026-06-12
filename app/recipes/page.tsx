import { Recipe } from "@/types/recipe";
import { RecipesBrowseClient } from "./RecipesBrowseClient";

async function getPublishedRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/recipes?published=true`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function RecipesPage() {
  const recipes = await getPublishedRecipes();
  return <RecipesBrowseClient initialRecipes={recipes} />;
}
