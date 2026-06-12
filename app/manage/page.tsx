import { PlusCircle } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import { Recipe } from "@/types/recipe";
import { ManageDashboardClient } from "./ManageDashboardClient";

async function getAllRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/recipes`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ManagePage() {
  const recipes = await getAllRecipes();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Recipes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{recipes.length} total recipes</p>
        </div>
        <LinkButton href="/manage/create">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Recipe
        </LinkButton>
      </div>
      <ManageDashboardClient initialRecipes={recipes} />
    </div>
  );
}
