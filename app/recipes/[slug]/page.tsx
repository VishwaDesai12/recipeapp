import { Clock, Users, ChefHat, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getRecipeBySlug } from "@/lib/data";
import { RecipeDetailClient } from "./RecipeDetailClient";
import { RecipeDetailLocalFallback } from "./RecipeDetailLocalFallback";

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  // Seeded recipe not found — may be a user-created recipe stored in localStorage.
  // Render a client-side fallback that reads from localStorage by slug.
  if (!recipe || !recipe.published) {
    return <RecipeDetailLocalFallback slug={slug} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Cover image */}
      {recipe.coverImageUrl ? (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <img
            src={recipe.coverImageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20 flex items-center justify-center mb-8">
          <ChefHat className="w-20 h-20 text-orange-300" />
        </div>
      )}

      {/* Title + meta */}
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
              <Badge key={tag} variant="outline" className="text-xs capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Interactive client island: serving adjuster, unit toggle, ingredients, nutrition, steps, rating */}
      <RecipeDetailClient recipe={recipe} />
    </div>
  );
}
