"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setRecipes, setFilters } from "@/store/recipeSlice";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeFiltersBar } from "@/components/RecipeFiltersBar";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { Recipe } from "@/types/recipe";

interface Props {
  initialRecipes: Recipe[];
}

export function RecipesBrowseClient({ initialRecipes }: Props) {
  const dispatch = useAppDispatch();
  const { filteredRecipes, count } = useFilteredRecipes();

  useEffect(() => {
    dispatch(setRecipes(initialRecipes));
    // Only show published on this page
    dispatch(setFilters({ published: true }));
  }, [dispatch, initialRecipes]);

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
              <p className="text-lg">No recipes match your filters.</p>
              <p className="text-sm mt-1">Try adjusting or clearing your filters.</p>
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
