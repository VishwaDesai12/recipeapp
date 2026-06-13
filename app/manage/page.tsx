import { PlusCircle } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import { getAllRecipes } from "@/lib/data";
import { ManageDashboardClient } from "./ManageDashboardClient";

export default function ManagePage() {
  const recipes = getAllRecipes();

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
