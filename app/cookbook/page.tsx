"use client";

import { useEffect, useState } from "react";
import { BookOpen, LogIn } from "lucide-react";
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

  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth check is the first thing — nothing meaningful renders until this resolves
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(({ loggedIn }: { loggedIn: boolean }) => {
        setIsLoggedIn(loggedIn);
        if (!loggedIn) {
          dispatch(setSavedIds([]));
          localStorage.removeItem("cookbook_saved_ids");
        } else {
          try {
            const stored = localStorage.getItem("cookbook_saved_ids");
            if (stored) {
              const ids: string[] = JSON.parse(stored);
              const userOnly = ids.filter((id) => !SEEDED_IDS.has(id));
              if (userOnly.length > 0) dispatch(setSavedIds(userOnly));
            }
          } catch { /* ignore */ }
        }
      })
      .catch(() => {
        dispatch(setSavedIds([]));
      })
      .finally(() => setAuthChecked(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load user-created recipes from localStorage (only when confirmed logged in)
  useEffect(() => {
    if (!isLoggedIn || allRecipes.length > 0) return;
    try {
      const stored = localStorage.getItem("manage_recipes");
      if (stored) {
        const parsed: Recipe[] = JSON.parse(stored);
        const userOnly = parsed.filter((r) => !SEEDED_IDS.has(r.id));
        dispatch(setRecipes(userOnly));
      }
    } catch { /* ignore */ }
  }, [isLoggedIn, allRecipes.length, dispatch]);

  // Prune stale saved IDs once recipes are loaded
  useEffect(() => {
    if (!isLoggedIn || allRecipes.length === 0 || savedIds.length === 0) return;
    const validIds = savedIds.filter((id) => allRecipes.some((r) => r.id === id));
    if (validIds.length !== savedIds.length) {
      dispatch(setSavedIds(validIds));
      localStorage.setItem("cookbook_saved_ids", JSON.stringify(validIds));
    }
  }, [isLoggedIn, allRecipes, savedIds, dispatch]);

  // Show spinner while auth check is in flight
  if (!authChecked) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in — hard gate, show login prompt only
  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-5">
        <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/40" />
        <h1 className="text-2xl font-bold">Your Cookbook</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Log in to save recipes and build your personal cookbook.
        </p>
        <LinkButton href="/login" className="inline-flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          Log in to view your cookbook
        </LinkButton>
      </div>
    );
  }

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
