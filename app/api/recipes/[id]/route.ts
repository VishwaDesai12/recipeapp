import { NextRequest, NextResponse } from "next/server";
import { getRecipeById, updateRecipe, deleteRecipe, generateSlug } from "@/lib/data";
import { Recipe } from "@/types/recipe";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(recipe);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = getRecipeById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await req.json()) as Partial<Recipe>;
  const now = new Date().toISOString();

  const updated: Recipe = {
    ...existing,
    ...body,
    id: existing.id,
    slug: body.title && body.title !== existing.title
      ? generateSlug(body.title, existing.id)
      : existing.slug,
    updatedAt: now,
  };

  updateRecipe(id, updated);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteRecipe(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
