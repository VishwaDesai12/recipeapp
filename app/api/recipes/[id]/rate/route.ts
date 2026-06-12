import { NextRequest, NextResponse } from "next/server";
import { getRecipeById, updateRecipe } from "@/lib/data";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await req.json()) as { rating: number };
  const rating = body.rating;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be an integer between 1 and 5." }, { status: 400 });
  }

  // Running average: newAvg = (oldAvg * oldCount + newRating) / (oldCount + 1)
  const newCount = recipe.ratingCount + 1;
  const newRating = Math.round(((recipe.rating * recipe.ratingCount + rating) / newCount) * 10) / 10;

  updateRecipe(id, {
    ...recipe,
    rating: newRating,
    ratingCount: newCount,
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ rating: newRating, ratingCount: newCount });
}
