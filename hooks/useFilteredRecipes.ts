import { useMemo } from "react";
import { useAppSelector } from "@/store";
import { Recipe } from "@/types/recipe";

interface FilteredResult {
  filteredRecipes: Recipe[];
  count: number;
  categories: string[];
}

export function useFilteredRecipes(): FilteredResult {
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const filters = useAppSelector((state) => state.recipes.filters);

  const categories = useMemo(
    () => Array.from(new Set(recipes.map((r) => r.category))).sort(),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      if (filters.published !== null && recipe.published !== filters.published) return false;

      if (filters.category && recipe.category !== filters.category) return false;

      if (filters.difficulty !== "all" && recipe.difficulty !== filters.difficulty) return false;

      if (filters.dietaryTags.length > 0) {
        const hasAll = filters.dietaryTags.every((tag) => recipe.dietaryTags.includes(tag));
        if (!hasAll) return false;
      }

      if (filters.search) {
        const q = filters.search.toLowerCase();
        const inTitle = recipe.title.toLowerCase().includes(q);
        const inDesc = recipe.description.toLowerCase().includes(q);
        if (!inTitle && !inDesc) return false;
      }

      if (filters.maxCookTime !== null) {
        const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
        if (totalTime > filters.maxCookTime) return false;
      }

      return true;
    });
  }, [recipes, filters]);

  return { filteredRecipes, count: filteredRecipes.length, categories };
}