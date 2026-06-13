import { useMemo } from "react";
import { Ingredient, Nutrition, Recipe } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";

interface ScalerResult {
  scaledIngredients: Ingredient[];
  scaledServings: number;
  scaledNutrition: Nutrition | undefined;
}

export function useRecipeScaler(recipe: Recipe, multiplier: number): ScalerResult {
  const { scaleIngredient } = useCooking();

  const scaledIngredients = useMemo(
    () =>
      recipe.ingredients.map((ing) => ({
        ...ing,
        quantity: scaleIngredient(ing.quantity),
      })),
    [recipe.ingredients, scaleIngredient]
  );

  const scaledServings = recipe.servings * multiplier;

  const scaledNutrition: Nutrition | undefined = recipe.nutrition
    ? {
        calories: Math.round(recipe.nutrition.calories * multiplier),
        proteinG: Math.round(recipe.nutrition.proteinG * multiplier * 10) / 10,
        carbsG: Math.round(recipe.nutrition.carbsG * multiplier * 10) / 10,
        fatG: Math.round(recipe.nutrition.fatG * multiplier * 10) / 10,
        fiberG: Math.round(recipe.nutrition.fiberG * multiplier * 10) / 10,
      }
    : undefined;

  return { scaledIngredients, scaledServings, scaledNutrition };
}
