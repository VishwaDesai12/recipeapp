"use client";

import Link from "next/link";
import { Clock, ChefHat, Heart, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { useAppDispatch, useAppSelector } from "@/store";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import { Recipe } from "@/types/recipe";
import { cn } from "@/lib/utils";
import { isLoggedInClient } from "@/lib/authClient";

interface RecipeCardProps {
  recipe: Recipe;
  variant: "public" | "manage";
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export function RecipeCard({ recipe, variant, onEdit, onDelete, className }: RecipeCardProps) {
  const dispatch = useAppDispatch();
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);
  const isSaved = savedIds.includes(recipe.id);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const visibleTags = recipe.dietaryTags.slice(0, 3);
  const extraTags = recipe.dietaryTags.length - 3;

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedInClient()) {
      window.location.href = "/login";
      return;
    }
    const newIds = isSaved
      ? savedIds.filter((id) => id !== recipe.id)
      : [...savedIds, recipe.id];
    if (isSaved) {
      dispatch(unsaveRecipe(recipe.id));
    } else {
      dispatch(saveRecipe(recipe.id));
    }
    localStorage.setItem("cookbook_saved_ids", JSON.stringify(newIds));
  };

  return (
    <div
      className={cn(
        "group rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Cover image */}
      <Link href={`/recipes/${recipe.slug}`} className="block relative">
        <div className="relative h-48 overflow-hidden">
          {recipe.coverImageUrl ? (
            <img
              src={recipe.coverImageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-stone-100 dark:from-stone-800/60 dark:via-amber-900/30 dark:to-stone-900/50 flex items-center justify-center">
              <ChefHat className="w-16 h-16 text-amber-300/80 dark:text-amber-700/60" />
            </div>
          )}
          {/* Heart button */}
          <button
            onClick={toggleSave}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow hover:scale-110 transition-transform"
            aria-label={isSaved ? "Remove from cookbook" : "Save to cookbook"}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isSaved ? "fill-red-500 text-red-500" : "text-gray-400"
              )}
            />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/recipes/${recipe.slug}`} className="flex-1">
            <h3 className="font-semibold text-base leading-tight hover:text-primary transition-colors line-clamp-2">
              {recipe.title}
            </h3>
          </Link>
          {variant === "manage" && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs shrink-0",
                recipe.published
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-gray-400 text-gray-500"
              )}
            >
              {recipe.published ? "Published" : "Draft"}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">{recipe.category}</span>
          <span className="text-muted-foreground">·</span>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", DIFFICULTY_COLORS[recipe.difficulty])}>
            {recipe.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{totalTime} min</span>
        </div>

        <StarRating rating={recipe.rating} ratingCount={recipe.ratingCount} />

        {recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {visibleTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {extraTags > 0 && (
              <Badge variant="secondary" className="text-xs">
                +{extraTags}
              </Badge>
            )}
          </div>
        )}

        {variant === "manage" && (
          <div className="flex gap-2 mt-auto pt-2 border-t">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onEdit?.(recipe)}
            >
              <Edit className="w-3.5 h-3.5 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => onDelete?.(recipe.id)}
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
