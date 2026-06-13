"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { setRecipes, removeRecipe, setSelectedRecipe } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";

const STORAGE_KEY = "manage_recipes";
const SEEDED_IDS = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);

interface Props {
  initialRecipes: Recipe[];
}

export function ManageDashboardClient({ initialRecipes }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const recipes = useAppSelector((s) => s.recipes.recipes);

  // On mount: restore from localStorage when Redux is empty (hard refresh / cold load).
  // Skip if Redux already has data (soft navigation) to preserve session state.
  useEffect(() => {
    if (recipes.length > 0) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Recipe[] = JSON.parse(stored);
        const userOnly = parsed.filter((r) => !SEEDED_IDS.has(r.id));
        if (userOnly.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly));
        }
        dispatch(setRecipes(userOnly));
        return;
      }
    } catch {
      // ignore malformed data
    }
    dispatch(setRecipes(initialRecipes));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
    router.push(`/manage/${recipe.id}/edit`);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this recipe? This cannot be undone.")) return;

    // Update Redux
    dispatch(removeRecipe(id));

    // Explicitly persist the updated list (handles empty array correctly)
    const updated = recipes.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Remove from cookbook saved IDs so badge + cookbook stay accurate
    try {
      const saved = localStorage.getItem("cookbook_saved_ids");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        localStorage.setItem("cookbook_saved_ids", JSON.stringify(ids.filter((sid) => sid !== id)));
      }
    } catch {
      // ignore
    }
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">No recipes yet.</p>
        <p className="text-sm mt-1">Create your first recipe to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          variant="manage"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
