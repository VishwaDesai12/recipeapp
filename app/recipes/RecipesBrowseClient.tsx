"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setRecipes, setFilters } from "@/store/recipeSlice";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeFiltersBar } from "@/components/RecipeFiltersBar";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { Recipe } from "@/types/recipe";

// Old seeded recipe IDs — strip them out when migrating existing localStorage data
const SEEDED_IDS = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);

export function RecipesBrowseClient() {
  const dispatch = useAppDispatch();
  const { filteredRecipes, count } = useFilteredRecipes();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("manage_recipes");
      if (stored) {
        const parsed: Recipe[] = JSON.parse(stored);
        const userOnly = parsed.filter((r) => !SEEDED_IDS.has(r.id));
        // If migration removed seeded recipes, persist the cleaned list back
        if (userOnly.length !== parsed.length) {
          localStorage.setItem("manage_recipes", JSON.stringify(userOnly));
        }
        dispatch(setRecipes(userOnly));
      } else {
        dispatch(setRecipes([]));
      }
    } catch {
      dispatch(setRecipes([]));
    }
    dispatch(setFilters({ published: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Browse Recipes</h1>
        <p className="text-muted-foreground mt-1">{count} recipe{count !== 1 ? "s" : ""} found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 shrink-0">
          <RecipeFiltersBar />
        </aside>

        <div className="flex-1">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No recipes yet.</p>
              <p className="text-sm mt-1">Go to Manage to create your first recipe.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
