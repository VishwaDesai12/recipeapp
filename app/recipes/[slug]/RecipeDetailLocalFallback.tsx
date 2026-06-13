"use client";

import { useEffect, useState } from "react";
import { Clock, Users, ChefHat, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types/recipe";
import { RecipeDetailClient } from "./RecipeDetailClient";

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export function RecipeDetailLocalFallback({ slug }: { slug: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("manage_recipes");
      if (stored) {
        const recipes: Recipe[] = JSON.parse(stored);
        const found = recipes.find((r) => r.slug === slug && r.published);
        setRecipe(found ?? null);
      }
    } catch {
      // ignore
    }
    setChecked(true);
  }, [slug]);

  if (!checked) return null;

  if (!recipe) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-32 text-center text-muted-foreground">
        <p className="text-2xl font-semibold mb-2">Recipe not found</p>
        <p className="text-sm">This recipe may have been deleted or doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {recipe.coverImageUrl ? (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <img src={recipe.coverImageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20 flex items-center justify-center mb-8">
          <ChefHat className="w-20 h-20 text-orange-300" />
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{recipe.title}</h1>
        <p className="text-muted-foreground text-base mb-4">{recipe.description}</p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Prep: {recipe.prepTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Cook: {recipe.cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <UserCircle className="w-4 h-4 text-muted-foreground" />
            <span>{recipe.authorId}</span>
          </div>
          <Badge variant="secondary">{recipe.category}</Badge>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>

        {recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.dietaryTags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs capitalize">{tag}</Badge>
            ))}
          </div>
        )}
      </div>

      <RecipeDetailClient recipe={recipe} />
    </div>
  );
}
