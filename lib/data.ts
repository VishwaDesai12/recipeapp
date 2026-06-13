import { Recipe } from "@/types/recipe";

// Intentionally empty — all recipe data lives in client localStorage
const recipes: Recipe[] = [];

export function getAllRecipes(): Recipe[] {
  return [...recipes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function addRecipe(recipe: Recipe): Recipe {
  recipes.push(recipe);
  return recipe;
}

// Seeds an existing recipe (preserves id/slug). Skips if already present.
export function seedRecipe(recipe: Recipe): void {
  if (!recipes.find((r) => r.id === recipe.id)) {
    recipes.push(recipe);
  }
}

export function updateRecipe(id: string, updated: Recipe): Recipe | null {
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) return null;
  recipes[index] = updated;
  return updated;
}

export function deleteRecipe(id: string): boolean {
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) return false;
  recipes.splice(index, 1);
  return true;
}

export function generateSlug(title: string, excludeId?: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const exists = (s: string) =>
    recipes.some((r) => r.slug === s && r.id !== excludeId);

  if (!exists(base)) return base;

  let i = 2;
  while (exists(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
