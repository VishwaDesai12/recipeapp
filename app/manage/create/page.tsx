"use client";

import { RecipeFormClient } from "@/components/RecipeFormClient";

export default function CreateRecipePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Recipe</h1>
      <RecipeFormClient mode="create" />
    </div>
  );
}
