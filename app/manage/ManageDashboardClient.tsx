"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { setRecipes, deleteRecipe, setSelectedRecipe } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";

interface Props {
  initialRecipes: Recipe[];
}

export function ManageDashboardClient({ initialRecipes }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const recipes = useAppSelector((s) => s.recipes.recipes);

  useEffect(() => {
    dispatch(setRecipes(initialRecipes));
  }, [dispatch, initialRecipes]);

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
