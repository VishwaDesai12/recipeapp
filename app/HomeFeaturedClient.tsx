"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types/recipe";

const SEEDED_IDS = new Set(["1","2","3","4","5","6","7","8","9","10"]);

export function HomeFeaturedClient() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("manage_recipes");
      if (stored) {
        const parsed: Recipe[] = JSON.parse(stored);
        const published = parsed
          .filter((r) => r.published && !SEEDED_IDS.has(r.id))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecipes(published);
      }
    } catch { /* ignore */ }
  }, []);

  if (recipes.length === 0) return null;

  const featured = recipes.slice(0, 3);
  const recent = recipes.slice(3, 9);

  return (
    <>
      {featured.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Recipes</h2>
            <Link href="/recipes" className="text-sm text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((r) => <HomeRecipeCard key={r.id} recipe={r} />)}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Recently Added</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recent.map((r) => <HomeRecipeCard key={r.id} recipe={r} />)}
          </div>
        </section>
      )}
    </>
  );
}

function HomeRecipeCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        {recipe.coverImageUrl ? (
          <img src={recipe.coverImageUrl} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-stone-100 dark:from-stone-800/60 dark:via-amber-900/30 dark:to-stone-900/50 flex items-center justify-center text-4xl">🍳</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">{recipe.category}</Badge>
          {recipe.dietaryTags.slice(0, 2).map((t) => (
            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
          ))}
        </div>
        <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-1">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {totalTime} min
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {recipe.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
}
