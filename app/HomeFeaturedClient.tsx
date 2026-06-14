"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
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
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-2xl font-bold">Featured Recipes</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Your top picks</p>
            </div>
            <Link
              href="/recipes"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((r) => <FeaturedCard key={r.id} recipe={r} />)}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section>
          <div className="mb-7">
            <h2 className="text-2xl font-bold">Recently Added</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Fresh from your kitchen</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {recent.map((r) => <RecentCard key={r.id} recipe={r} />)}
          </div>
        </section>
      )}
    </>
  );
}

function FeaturedCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group relative rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image — tall for featured */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-stone-100 dark:from-stone-800/60 dark:via-amber-900/30 dark:to-stone-900">
        {recipe.coverImageUrl ? (
          <img
            src={recipe.coverImageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🍳</div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 drop-shadow">
            {recipe.title}
          </h3>
        </div>
      </div>

      {/* Meta */}
      <div className="p-4 bg-card flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">{recipe.category}</Badge>
          {recipe.dietaryTags.slice(0, 2).map((t) => (
            <Badge key={t} variant="outline" className="text-xs capitalize">{t}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {totalTime} min
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium">{recipe.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function RecentCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group flex gap-3 rounded-xl border bg-card p-3 hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      {/* Thumbnail */}
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-amber-100 to-orange-50 dark:from-stone-800 dark:to-stone-900">
        {recipe.coverImageUrl ? (
          <img
            src={recipe.coverImageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🍳</div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        <Badge variant="secondary" className="text-xs w-fit">{recipe.category}</Badge>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {totalTime} min
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {recipe.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
}
