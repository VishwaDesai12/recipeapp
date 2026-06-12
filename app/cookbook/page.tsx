"use client";

import { useEffect } from "react";
import { BookOpen } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import { RecipeCard } from "@/components/RecipeCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSavedIds } from "@/store/cookbookSlice";
import { setRecipes } from "@/store/recipeSlice";

export default function CookbookPage() {
  const dispatch = useAppDispatch();
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);
  const allRecipes = useAppSelector((s) => s.recipes.recipes);

  useEffect(() => {
    // Hydrate saved IDs from localStorage
    const stored = localStorage.getItem("cookbook_saved_ids");
    if (stored) {
      try {
        const ids = JSON.parse(stored) as string[];
        dispatch(setSavedIds(ids));
      } catch {
        // ignore malformed data
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Fetch recipes if not already loaded
    if (allRecipes.length === 0) {
      fetch("/api/recipes?published=true")
        .then((r) => r.json())
        .then((data) => dispatch(setRecipes(data)))
        .catch(() => null);
    }
  }, [dispatch, allRecipes.length]);

  // Persist savedIds changes to localStorage
  useEffect(() => {
    localStorage.setItem("cookbook_saved_ids", JSON.stringify(savedIds));
  }, [savedIds]);

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
