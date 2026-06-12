import { getAllRecipes } from "@/lib/data";
import { RecipesBrowseClient } from "./RecipesBrowseClient";

export default async function RecipesPage() {
  const recipes = getAllRecipes().filter((r) => r.published);
  return <RecipesBrowseClient initialRecipes={recipes} />;
}
