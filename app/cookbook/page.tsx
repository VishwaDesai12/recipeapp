"use client";

import { useEffect } from "react";
import { BookOpen } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import { RecipeCard } from "@/components/RecipeCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSavedIds } from "@/store/cookbookSlice";
import { setRecipes } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";

const SEEDED_IDS = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);

export default function CookbookPage() {
  const dispatch = useAppDispatch();
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);
  const allRecipes = useAppSelector((s) => s.recipes.recipes);

  // Restore savedIds from localStorage (middleware guarantees user is logged in)
  useEffect(() => {
    if (savedIds.length === 0) {
      try {
        const stored = localStorage.getItem("cookbook_saved_ids");
        if (stored) {
          const ids: string[] = JSON.parse(stored);
          const userOnly = ids.filter((id) => !SEEDED_IDS.has(id));
          if (userOnly.length > 0) dispatch(setSavedIds(userOnly));
        }
      } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load user-created recipes from localStorage
  useEffect(() => {
    if (allRecipes.length === 0) {
      try {
        const stored = localStorage.getItem("manage_recipes");
        if (stored) {
          const parsed: Recipe[] = JSON.parse(stored);
          const userOnly = parsed.filter((r) => !SEEDED_IDS.has(r.id));
          dispatch(setRecipes(userOnly));
        }
      } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prune stale saved IDs once recipes are loaded
  useEffect(() => {
    if (allRecipes.length === 0 || savedIds.length === 0) return;
    const validIds = savedIds.filter((id) => allRecipes.some((r) => r.id === id));
    if (validIds.length !== savedIds.length) {
      dispatch(setSavedIds(validIds));
      localStorage.setItem("cookbook_saved_ids", JSON.stringify(validIds));
    }
  }, [allRecipes, savedIds, dispatch]);

  const savedRecipes = allRecipes.filter((r) => savedIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Cookbook</h1>
          <p className="text-muted-foreground mt-1">
            {savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <LinkButton href="/recipes" variant="outline">Browse More</LinkButton>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/40" />
          <h2 className="text-xl font-semibold text-muted-foreground">Your cookbook is empty</h2>
          <p className="text-sm text-muted-foreground">
            Browse recipes and tap the heart icon to save them here.
          </p>
          <LinkButton href="/recipes">Browse Recipes</LinkButton>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
          ))}
        </div>
      )}
    </div>
  );
}
