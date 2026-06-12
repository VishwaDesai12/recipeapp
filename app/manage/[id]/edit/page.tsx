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
    // Fallback: fetch from API if navigated directly
    fetch(`/api/recipes/${id}`)
      .then((r) => r.json())
      .then((data: Recipe) => {
        setRecipe(data);
        dispatch(setSelectedRecipe(data));
      })
      .catch(() => null);
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
