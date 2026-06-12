import { Nutrition } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface NutritionPanelProps {
  nutrition: Nutrition;
  servingMultiplier?: number;
  className?: string;
}

export function NutritionPanel({ nutrition, servingMultiplier = 1, className }: NutritionPanelProps) {
  const scale = (v: number) => Math.round(v * servingMultiplier * 10) / 10;

  const rows = [
    { label: "Calories", value: scale(nutrition.calories), unit: "kcal" },
    { label: "Protein", value: scale(nutrition.proteinG), unit: "g" },
    { label: "Carbs", value: scale(nutrition.carbsG), unit: "g" },
    { label: "Fat", value: scale(nutrition.fatG), unit: "g" },
    { label: "Fiber", value: scale(nutrition.fiberG), unit: "g" },
  ];

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <h4 className="text-sm font-semibold mb-3">Nutrition Facts</h4>
      <div className="divide-y">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between py-2 text-sm">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium">
              {row.value} {row.unit}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Per {servingMultiplier === 1 ? "serving" : `${servingMultiplier} servings`}
      </p>
    </div>
  );
}
