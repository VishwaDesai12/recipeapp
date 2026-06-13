"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store";
import { setSelectedRecipe } from "@/store/recipeSlice";
import { RecipeFormClient } from "@/components/RecipeFormClient";
import { Recipe } from "@/types/recipe";

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const selectedRecipe = useAppSelector((s) => s.recipes.selectedRecipe);
  const [recipe, setRecipe] = useState<Recipe | null>(selectedRecipe);

  useEffect(() => {
    if (selectedRecipe?.id === id) {
      setRecipe(selectedRecipe);
      return;
    }
    // Fallback: look up from localStorage (works for user-created recipes)
    try {
      const stored = localStorage.getItem("manage_recipes");
      if (stored) {
        const recipes: Recipe[] = JSON.parse(stored);
        const found = recipes.find((r) => r.id === id);
        if (found) {
          setRecipe(found);
          dispatch(setSelectedRecipe(found));
        }
      }
    } catch {
      // ignore
    }
  }, [id, selectedRecipe, dispatch]);

  if (!recipe) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>Loading recipe...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>
      <RecipeFormClient mode="edit" initialRecipe={recipe} />
    </div>
  );
}
