"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store";
import { setFilters, clearFilters } from "@/store/recipeSlice";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { DietaryTag } from "@/types/recipe";
import { cn } from "@/lib/utils";

const ALL_DIETARY_TAGS: DietaryTag[] = [
  "vegan",
  "vegetarian",
  "gluten-free",
  "dairy-free",
  "keto",
  "paleo",
  "nut-free",
];

interface RecipeFiltersBarProps {
  className?: string;
}

export function RecipeFiltersBar({ className }: RecipeFiltersBarProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.recipes.filters);
  const { categories } = useFilteredRecipes();

  const activeCount = [
    filters.category,
    filters.difficulty !== "all" && filters.difficulty,
    filters.search,
    filters.maxCookTime !== null,
    ...filters.dietaryTags,
  ].filter(Boolean).length;

  const toggleDietaryTag = (tag: DietaryTag) => {
    const current = filters.dietaryTags;
    const updated = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    dispatch(setFilters({ dietaryTags: updated }));
  };

  return (
    <div className={cn("space-y-4 p-4 rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        {activeCount > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => dispatch(clearFilters())}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Clear All ({activeCount})
          </Button>
        )}
      </div>

      {/* Search */}
      <Input
        placeholder="Search recipes..."
        value={filters.search}
        onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
        className="text-sm"
      />

      <div className="grid grid-cols-2 gap-3">
        {/* Category */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Category</label>
          <Select
            value={filters.category || "all"}
            onValueChange={(v) => dispatch(setFilters({ category: v === null || v === "all" ? "" : v }))}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Difficulty</label>
          <Select
            value={filters.difficulty}
            onValueChange={(v) =>
              v && dispatch(setFilters({ difficulty: v as "all" | "easy" | "medium" | "hard" }))
            }
          >
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Difficulty</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Max cook time */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">
          Max cook time:{" "}
          <span className="font-medium text-foreground">
            {filters.maxCookTime !== null ? `${filters.maxCookTime} min` : "Any"}
          </span>
        </label>
        <input
          type="range"
          min={15}
          max={180}
          step={15}
          value={filters.maxCookTime ?? 180}
          onChange={(e) =>
            dispatch(
              setFilters({
                maxCookTime: parseInt(e.target.value) === 180 ? null : parseInt(e.target.value),
              })
            )
          }
          className="w-full accent-primary"
        />
      </div>

      {/* Dietary tags */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">Dietary</label>
        <div className="grid grid-cols-2 gap-1.5">
          {ALL_DIETARY_TAGS.map((tag) => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.dietaryTags.includes(tag)}
                onCheckedChange={() => toggleDietaryTag(tag)}
              />
              <span className="text-xs group-hover:text-foreground text-muted-foreground capitalize">
                {tag}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
