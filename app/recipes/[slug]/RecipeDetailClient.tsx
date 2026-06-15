"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IngredientRow } from "@/components/IngredientRow";
import { StepCard } from "@/components/StepCard";
import { NutritionPanel } from "@/components/NutritionPanel";
import { StarRating } from "@/components/StarRating";
import { useCooking } from "@/context/CookingContext";
import { useAppDispatch } from "@/store";
import { updateRecipe } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface Props {
  recipe: Recipe;
}

export function RecipeDetailClient({ recipe }: Props) {
  const dispatch = useAppDispatch();
  const { servingMultiplier, setServingMultiplier, unitSystem, setUnitSystem } = useCooking();
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const RATINGS_KEY = "recipe_user_ratings";

  const getSavedUserRating = (): number | null => {
    try {
      const stored = localStorage.getItem(RATINGS_KEY);
      if (stored) {
        const map: Record<string, number> = JSON.parse(stored);
        return map[recipe.id] ?? null;
      }
    } catch { /* ignore */ }
    return null;
  };

  const [userRating, setUserRating] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    return getSavedUserRating();
  });
  // If the user has no saved rating, treat the stored count as 0 to prevent
  // stale accumulated counts from old sessions showing inflated numbers.
  const hasExistingRating = typeof window !== "undefined" && getSavedUserRating() !== null;
  const [currentRating, setCurrentRating] = useState(hasExistingRating ? recipe.rating : 0);
  const [ratingCount, setRatingCount] = useState(hasExistingRating ? recipe.ratingCount : 0);

  const handleStartTimer = (index: number) => {
    setActiveTimerStep(index);
  };

  const handleRate = (star: number) => {
    const prevUserRating = getSavedUserRating();
    const alreadyRated = prevUserRating !== null;

    let newRating: number;
    let newCount: number;
    if (alreadyRated && ratingCount >= 1) {
      // Replace old vote — count stays the same, adjust the average
      newCount = ratingCount;
      newRating = ratingCount === 1
        ? star
        : Math.round(((currentRating * ratingCount - prevUserRating! + star) / ratingCount) * 10) / 10;
    } else {
      // First rating from this user. Reset count to 1 to prevent stale
      // accumulated counts from old sessions bleeding in.
      newCount = 1;
      newRating = star;
    }

    setUserRating(star);
    setCurrentRating(newRating);
    setRatingCount(newCount);

    // Save user's rating choice
    try {
      const stored = localStorage.getItem(RATINGS_KEY);
      const map: Record<string, number> = stored ? JSON.parse(stored) : {};
      map[recipe.id] = star;
      localStorage.setItem(RATINGS_KEY, JSON.stringify(map));
    } catch { /* ignore */ }

    // Call POST /api/recipes/:id/rate
    fetch(`/api/recipes/${recipe.id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: star }),
    }).catch(() => {/* ignore if API cold */});

    // Persist updated rating to manage_recipes localStorage + Redux
    try {
      const stored = localStorage.getItem("manage_recipes");
      if (stored) {
        const recipes: Recipe[] = JSON.parse(stored);
        const updated = recipes.map((r) =>
          r.id === recipe.id ? { ...r, rating: newRating, ratingCount: newCount } : r
        );
        localStorage.setItem("manage_recipes", JSON.stringify(updated));
        const updatedRecipe = updated.find((r) => r.id === recipe.id);
        if (updatedRecipe) dispatch(updateRecipe(updatedRecipe));
      }
    } catch { /* ignore */ }
  };

  const handleServingChange = (delta: number) => {
    const current = Math.round(recipe.servings * servingMultiplier);
    const next = Math.max(1, current + delta);
    setServingMultiplier(next / recipe.servings);
  };

  return (
    <div className="space-y-8">
      {/* Servings adjuster + unit system toggle */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Servings:</span>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleServingChange(-1)}
            disabled={Math.round(recipe.servings * servingMultiplier) <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-12 text-center font-semibold">
            {Math.round(recipe.servings * servingMultiplier)}
          </span>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleServingChange(1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Unit system toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-medium">Units:</span>
          <div className="flex rounded-lg border overflow-hidden">
            <button
              type="button"
              onClick={() => setUnitSystem("metric")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium transition-colors",
                unitSystem === "metric"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              Metric
            </button>
            <button
              type="button"
              onClick={() => setUnitSystem("imperial")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium transition-colors",
                unitSystem === "imperial"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              Imperial
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients + Nutrition */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Ingredients</h2>
          <div className="rounded-xl border bg-card p-4">
            {recipe.ingredients.map((ingredient, i) => (
              <IngredientRow
                key={ingredient.id}
                ingredient={ingredient}
                index={i}
                scaled
                editable={false}
              />
            ))}
          </div>
        </div>

        {recipe.nutrition && (
          <div>
            <h2 className="text-xl font-bold mb-4">Nutrition</h2>
            <NutritionPanel nutrition={recipe.nutrition} servingMultiplier={servingMultiplier} />
          </div>
        )}
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-xl font-bold mb-4">Instructions</h2>
        <div className="rounded-xl border bg-card p-4 divide-y">
          {recipe.steps.map((step, i) => (
            <StepCard
              key={step.stepNumber}
              step={step}
              index={i}
              editable={false}
              activeTimerStep={activeTimerStep}
              onStartTimer={handleStartTimer}
            />
          ))}
        </div>
      </div>

      {/* Rate this recipe */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-bold mb-2">Rate This Recipe</h2>
        <p className="text-sm text-muted-foreground mb-4">
          How would you rate this recipe?
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <StarRating
            rating={userRating ?? 0}
            interactive
            onRate={handleRate}
            size="lg"
          />
          {userRating && (
            <span className="text-sm text-muted-foreground">
              You rated this {userRating} star{userRating !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="mt-3 text-sm text-muted-foreground flex items-center gap-1">
          <StarRating rating={currentRating} ratingCount={ratingCount} size="sm" />
        </div>
      </div>
    </div>
  );
}
