"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngredientRow } from "@/components/IngredientRow";
import { StepCard } from "@/components/StepCard";
import { useRecipeForm } from "@/hooks/useRecipeForm";
import { useAppDispatch } from "@/store";
import { createRecipe, editRecipe } from "@/store/recipeSlice";
import { DietaryTag, Difficulty, Recipe } from "@/types/recipe";

const DIETARY_TAGS: DietaryTag[] = [
  "vegan", "vegetarian", "gluten-free", "dairy-free", "keto", "paleo", "nut-free",
];
const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Soup", "Salad", "Beverage"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

interface Props {
  mode: "create" | "edit";
  initialRecipe?: Recipe;
}

export function RecipeFormClient({ mode, initialRecipe }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showNutrition, setShowNutrition] = useState(!!initialRecipe?.nutrition);
  const [submitting, setSubmitting] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addStep,
    updateStep,
    removeStep,
    moveStep,
  } = useRecipeForm(initialRecipe);

  useEffect(() => {
    if (initialRecipe) reset(initialRecipe);
  }, [initialRecipe?.id]);

  // Auto-generate slug from title (for create mode)
  const derivedSlug = values.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const onSubmit = async (formValues: typeof values) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await dispatch(createRecipe(formValues));
      } else if (initialRecipe) {
        await dispatch(editRecipe({ id: initialRecipe.id, data: formValues }));
      }
      window.location.href = "/manage";
    } finally {
      setSubmitting(false);
    }
  };

  const toggleDietaryTag = (tag: DietaryTag) => {
    const current = values.dietaryTags;
    const updated = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    handleChange("dietaryTags", updated);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
      className="space-y-8"
    >
      {/* Basic Info */}
      <section className="space-y-4 rounded-xl border bg-card p-5">
        <h2 className="font-semibold text-base">Basic Information</h2>

        <div>
          <label className="text-sm font-medium mb-1 block">Title *</label>
          <Input
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Classic Spaghetti Carbonara"
          />
          {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Slug (auto-generated)</label>
          <Input value={derivedSlug} readOnly className="text-muted-foreground bg-muted" />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <Textarea
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Short description of the recipe..."
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Cover Image URL</label>
          <Input
            value={values.coverImageUrl ?? ""}
            onChange={(e) => handleChange("coverImageUrl", e.target.value)}
            placeholder="https://..."
            type="url"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Select value={values.category} onValueChange={(v) => v && handleChange("category", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Difficulty</label>
            <Select
              value={values.difficulty}
              onValueChange={(v) => v && handleChange("difficulty", v as Difficulty)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map((d) => (
                  <SelectItem key={d} value={d} className="capitalize">{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Servings *</label>
            <Input
              type="number"
              min={1}
              value={values.servings}
              onChange={(e) => handleChange("servings", parseInt(e.target.value) || 1)}
            />
            {errors.servings && <p className="text-xs text-destructive mt-1">{errors.servings}</p>}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Prep Time (min)</label>
            <Input
              type="number"
              min={0}
              value={values.prepTimeMinutes}
              onChange={(e) => handleChange("prepTimeMinutes", parseInt(e.target.value) || 0)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Cook Time (min)</label>
            <Input
              type="number"
              min={0}
              value={values.cookTimeMinutes}
              onChange={(e) => handleChange("cookTimeMinutes", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Dietary Tags</label>
          <div className="flex flex-wrap gap-3">
            {DIETARY_TAGS.map((tag) => (
              <label key={tag} className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={values.dietaryTags.includes(tag)}
                  onCheckedChange={() => toggleDietaryTag(tag)}
                />
                <span className="text-sm capitalize">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={values.published}
            onCheckedChange={(v) => handleChange("published", !!v)}
          />
          <span className="text-sm font-medium">Publish this recipe</span>
        </label>
      </section>

      {/* Ingredients */}
      <section className="space-y-3 rounded-xl border bg-card p-5">
        <h2 className="font-semibold text-base">Ingredients *</h2>
        {errors.ingredients && <p className="text-xs text-destructive">{errors.ingredients}</p>}
        <div className="divide-y">
          {values.ingredients.map((ing, i) => (
            <IngredientRow
              key={ing.id}
              ingredient={ing}
              index={i}
              editable
              onChange={updateIngredient}
              onRemove={removeIngredient}
              canRemove={values.ingredients.length > 1}
            />
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Ingredient
        </Button>
      </section>

      {/* Steps */}
      <section className="space-y-3 rounded-xl border bg-card p-5">
        <h2 className="font-semibold text-base">Steps *</h2>
        {errors.steps && <p className="text-xs text-destructive">{errors.steps}</p>}
        <div className="space-y-3">
          {values.steps.map((step, i) => (
            <StepCard
              key={step.stepNumber}
              step={step}
              index={i}
              editable
              onChange={updateStep}
              onRemove={removeStep}
              onMoveUp={(idx) => moveStep(idx, idx - 1)}
              onMoveDown={(idx) => moveStep(idx, idx + 1)}
              isFirst={i === 0}
              isLast={i === values.steps.length - 1}
            />
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addStep}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Step
        </Button>
      </section>

      {/* Nutrition (optional, collapsible) */}
      <section className="rounded-xl border bg-card p-5">
        <button
          type="button"
          onClick={() => setShowNutrition((v) => !v)}
          className="flex items-center gap-2 font-semibold text-base w-full text-left"
        >
          <span>Nutrition (optional)</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {showNutrition ? "▲ Collapse" : "▼ Expand"}
          </span>
        </button>

        {showNutrition && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
            {(["calories", "proteinG", "carbsG", "fatG", "fiberG"] as const).map((key) => (
              <div key={key}>
                <label className="text-xs text-muted-foreground mb-1 block capitalize">
                  {key === "calories" ? "Calories" : key.replace("G", " (g)")}
                </label>
                <Input
                  type="number"
                  min={0}
                  value={values.nutrition?.[key] ?? ""}
                  onChange={(e) =>
                    handleChange("nutrition", {
                      ...values.nutrition,
                      calories: values.nutrition?.calories ?? 0,
                      proteinG: values.nutrition?.proteinG ?? 0,
                      carbsG: values.nutrition?.carbsG ?? 0,
                      fatG: values.nutrition?.fatG ?? 0,
                      fiberG: values.nutrition?.fiberG ?? 0,
                      [key]: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Submit */}
      <div className="flex gap-3">
        {mode === "edit" && (
          <>
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => {
                handleChange("published", false);
                handleSubmit(onSubmit);
              }}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              disabled={submitting}
              onClick={() => {
                handleChange("published", true);
                handleSubmit(onSubmit);
              }}
            >
              Publish
            </Button>
          </>
        )}
        {mode === "create" && (
          <Button type="submit" disabled={submitting} className="px-8">
            {submitting ? "Creating..." : "Create Recipe"}
          </Button>
        )}
        <Button type="button" variant="ghost" onClick={() => router.push("/manage")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
