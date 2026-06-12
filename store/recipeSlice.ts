import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, RecipeFilters } from "@/types/recipe";

interface RecipeState {
  recipes: Recipe[];
  filters: RecipeFilters;
  selectedRecipe: Recipe | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialFilters: RecipeFilters = {
  category: "",
  dietaryTags: [],
  difficulty: "all",
  search: "",
  maxCookTime: null,
  published: null,
};

const initialState: RecipeState = {
  recipes: [],
  filters: initialFilters,
  selectedRecipe: null,
  status: "idle",
  error: null,
};

export const fetchRecipes = createAsyncThunk<Recipe[], URLSearchParams | undefined>(
  "recipes/fetchAll",
  async (params) => {
    const query = params ? `?${params.toString()}` : "";
    const res = await fetch(`/api/recipes${query}`);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return res.json() as Promise<Recipe[]>;
  }
);

export const createRecipe = createAsyncThunk<Recipe, Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">>(
  "recipes/create",
  async (data) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create recipe");
    return res.json() as Promise<Recipe>;
  }
);

export const editRecipe = createAsyncThunk<Recipe, { id: string; data: Partial<Recipe> }>(
  "recipes/edit",
  async ({ id, data }) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update recipe");
    return res.json() as Promise<Recipe>;
  }
);

export const deleteRecipe = createAsyncThunk<string, string>(
  "recipes/delete",
  async (id) => {
    const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete recipe");
    return id;
  }
);

export const rateRecipe = createAsyncThunk<
  { id: string; rating: number; ratingCount: number },
  { id: string; rating: number }
>("recipes/rate", async ({ id, rating }) => {
  const res = await fetch(`/api/recipes/${id}/rate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });
  if (!res.ok) throw new Error("Failed to rate recipe");
  const data = (await res.json()) as { rating: number; ratingCount: number };
  return { id, ...data };
});

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
    addRecipe(state, action: PayloadAction<Recipe>) {
      state.recipes.unshift(action.payload);
    },
    updateRecipe(state, action: PayloadAction<Recipe>) {
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state.recipes[index] = action.payload;
    },
    removeRecipe(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
    setFilters(state, action: PayloadAction<Partial<RecipeFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialFilters;
    },
    setSelectedRecipe(state, action: PayloadAction<Recipe | null>) {
      state.selectedRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.recipes[index] = action.payload;
        if (state.selectedRecipe?.id === action.payload.id) {
          state.selectedRecipe = action.payload;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      })
      .addCase(rateRecipe.fulfilled, (state, action) => {
        const { id, rating, ratingCount } = action.payload;
        const recipe = state.recipes.find((r) => r.id === id);
        if (recipe) {
          recipe.rating = rating;
          recipe.ratingCount = ratingCount;
        }
        if (state.selectedRecipe?.id === id) {
          state.selectedRecipe.rating = rating;
          state.selectedRecipe.ratingCount = ratingCount;
        }
      });
  },
});

export const {
  setRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe,
  setFilters,
  clearFilters,
  setSelectedRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
