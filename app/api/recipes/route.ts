import { NextRequest, NextResponse } from "next/server";
import { getAllRecipes, addRecipe, generateSlug } from "@/lib/data";
import { DietaryTag, Difficulty, Recipe } from "@/types/recipe";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  let recipes = getAllRecipes();

  const category = searchParams.get("category");
  const dietaryTagsParam = searchParams.get("dietaryTags");
  const difficulty = searchParams.get("difficulty");
  const search = searchParams.get("search");
  const maxCookTime = searchParams.get("maxCookTime");
  const published = searchParams.get("published");
  const slug = searchParams.get("slug");

  if (slug) {
    const found = recipes.find((r) => r.slug === slug);
    if (!found) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(found);
  }

  if (published === "true") recipes = recipes.filter((r) => r.published);
  else if (published === "false") recipes = recipes.filter((r) => !r.published);

  if (category) recipes = recipes.filter((r) => r.category === category);

  if (dietaryTagsParam) {
    const tags = dietaryTagsParam.split(",") as DietaryTag[];
    recipes = recipes.filter((r) => tags.every((t) => r.dietaryTags.includes(t)));
  }

  if (difficulty && difficulty !== "all") {
    recipes = recipes.filter((r) => r.difficulty === (difficulty as Difficulty));
  }

  if (search) {
    const q = search.toLowerCase();
    recipes = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );
  }

  if (maxCookTime) {
    const max = parseInt(maxCookTime, 10);
    recipes = recipes.filter((r) => r.prepTimeMinutes + r.cookTimeMinutes <= max);
  }

  return NextResponse.json(recipes);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Recipe>;

  if (!body.title || body.title.trim().length < 3) {
    return NextResponse.json({ error: "Title must be at least 3 characters." }, { status: 400 });
  }
  if (!body.ingredients || body.ingredients.length < 1) {
    return NextResponse.json({ error: "At least one ingredient required." }, { status: 400 });
  }
  if (!body.steps || body.steps.length < 1) {
    return NextResponse.json({ error: "At least one step required." }, { status: 400 });
  }
  if (!body.servings || body.servings < 1) {
    return NextResponse.json({ error: "Servings must be at least 1." }, { status: 400 });
  }
  if (body.prepTimeMinutes === undefined || body.prepTimeMinutes < 0) {
    return NextResponse.json({ error: "prepTimeMinutes must be >= 0." }, { status: 400 });
  }
  if (body.cookTimeMinutes === undefined || body.cookTimeMinutes < 0) {
    return NextResponse.json({ error: "cookTimeMinutes must be >= 0." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const newRecipe: Recipe = {
    id: crypto.randomUUID(),
    slug: generateSlug(body.title),
    title: body.title,
    description: body.description ?? "",
    coverImageUrl: body.coverImageUrl,
    authorId: body.authorId ?? "chef1",
    category: body.category ?? "Dinner",
    dietaryTags: body.dietaryTags ?? [],
    difficulty: body.difficulty ?? "easy",
    servings: body.servings,
    prepTimeMinutes: body.prepTimeMinutes,
    cookTimeMinutes: body.cookTimeMinutes,
    ingredients: body.ingredients,
    steps: body.steps,
    nutrition: body.nutrition,
    published: body.published ?? false,
    rating: 0,
    ratingCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  addRecipe(newRecipe);
  return NextResponse.json(newRecipe, { status: 201 });
}
