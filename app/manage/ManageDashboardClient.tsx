"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { setRecipes, deleteRecipe, setSelectedRecipe } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";

const STORAGE_KEY = "manage_recipes";

interface Props {
  initialRecipes: Recipe[];
}

export function ManageDashboardClient({ initialRecipes }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const recipes = useAppSelector((s) => s.recipes.recipes);

  // On mount: only restore from localStorage when Redux is empty (hard refresh / cold load).
  // If Redux already has data (soft navigation), skip — preserves session-created recipes.
  useEffect(() => {
    if (recipes.length > 0) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Recipe[] = JSON.parse(stored);
        if (parsed.length > 0) {
          dispatch(setRecipes(parsed));
          return;
        }
      } catch {
        // ignore malformed data
      }
    }
    dispatch(setRecipes(initialRecipes));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRecipes));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep localStorage in sync whenever recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }
  }, [recipes]);

  const handleEdit = (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
    router.push(`/manage/${recipe.id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe? This cannot be undone.")) return;
    await dispatch(deleteRecipe(id));
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
