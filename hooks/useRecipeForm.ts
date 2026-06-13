import { useState, useCallback } from "react";
import { Ingredient, Recipe, RecipeStep, DietaryTag, Difficulty, MeasurementUnit } from "@/types/recipe";

type FormValues = Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">;

interface FormErrors {
  title?: string;
  ingredients?: string;
  steps?: string;
  servings?: string;
}

interface UseRecipeFormReturn {
  values: FormValues;
  errors: FormErrors;
  isDirty: boolean;
  handleChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
  handleSubmit: (onSubmit: (values: FormValues) => void) => void;
  reset: (initial?: Partial<Recipe>) => void;
  addIngredient: () => void;
  updateIngredient: (index: number, field: keyof Ingredient, value: string | number | boolean) => void;
  removeIngredient: (index: number) => void;
  addStep: () => void;
  updateStep: (index: number, field: keyof RecipeStep, value: string | number) => void;
  removeStep: (index: number) => void;
  moveStep: (fromIndex: number, toIndex: number) => void;
}

const blankIngredient = (): Ingredient => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: 1,
  unit: "g" as MeasurementUnit,
  optional: false,
});

const blankStep = (stepNumber: number): RecipeStep => ({
  stepNumber,
  instruction: "",
  durationMinutes: undefined,
  tip: undefined,
});

function buildInitial(initial?: Partial<Recipe>): FormValues {
  return {
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    coverImageUrl: initial?.coverImageUrl ?? "",
    authorId: initial?.authorId ?? "chef1",
    category: initial?.category ?? "Dinner",
    dietaryTags: initial?.dietaryTags ?? [],
    difficulty: initial?.difficulty ?? "easy",
    servings: initial?.servings ?? 4,
    prepTimeMinutes: initial?.prepTimeMinutes ?? 10,
    cookTimeMinutes: initial?.cookTimeMinutes ?? 30,
    ingredients: initial?.ingredients ?? [blankIngredient()],
    steps: initial?.steps ?? [blankStep(1)],
    nutrition: initial?.nutrition,
    published: initial?.published ?? true,
  };
}

export function useRecipeForm(initialValues?: Partial<Recipe>): UseRecipeFormReturn {
  const [values, setValues] = useState<FormValues>(() => buildInitial(initialValues));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback(<K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  const validate = (vals: FormValues): FormErrors => {
    const errs: FormErrors = {};
    if (vals.title.trim().length < 3) errs.title = "Title must be at least 3 characters.";
    if (vals.ingredients.length < 1) errs.ingredients = "At least one ingredient required.";
    if (vals.steps.length < 1) errs.steps = "At least one step required.";
    if (vals.servings < 1) errs.servings = "Servings must be at least 1.";
    return errs;
  };

  const handleSubmit = useCallback(
    (onSubmit: (values: FormValues) => void) => {
      const errs = validate(values);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      onSubmit(values);
    },
    [values]
  );

  const reset = useCallback((initial?: Partial<Recipe>) => {
    setValues(buildInitial(initial));
    setErrors({});
    setIsDirty(false);
  }, []);

  const addIngredient = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, blankIngredient()],
    }));
    setIsDirty(true);
  }, []);

  const updateIngredient = useCallback(
    (index: number, field: keyof Ingredient, value: string | number | boolean) => {
      setValues((prev) => {
        const updated = [...prev.ingredients];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, ingredients: updated };
      });
      setIsDirty(true);
    },
    []
  );

  const removeIngredient = useCallback((index: number) => {
    setValues((prev) => {
      if (prev.ingredients.length <= 1) return prev;
      return {
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      };
    });
    setIsDirty(true);
  }, []);

  const addStep = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      steps: [...prev.steps, blankStep(prev.steps.length + 1)],
    }));
    setIsDirty(true);
  }, []);

  const updateStep = useCallback(
    (index: number, field: keyof RecipeStep, value: string | number) => {
      setValues((prev) => {
        const updated = [...prev.steps];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, steps: updated };
      });
      setIsDirty(true);
    },
    []
  );

  const removeStep = useCallback((index: number) => {
    setValues((prev) => {
      const filtered = prev.steps.filter((_, i) => i !== index);
      const renumbered = filtered.map((s, i) => ({ ...s, stepNumber: i + 1 }));
      return { ...prev, steps: renumbered };
    });
    setIsDirty(true);
  }, []);

  const moveStep = useCallback((fromIndex: number, toIndex: number) => {
    setValues((prev) => {
      const steps = [...prev.steps];
      const [moved] = steps.splice(fromIndex, 1);
      steps.splice(toIndex, 0, moved);
      const renumbered = steps.map((s, i) => ({ ...s, stepNumber: i + 1 }));
      return { ...prev, steps: renumbered };
    });
    setIsDirty(true);
  }, []);

  return {
    values,
    errors,
    isDirty,
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
  };
}
