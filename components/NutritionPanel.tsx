import { Nutrition } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface NutritionPanelProps {
  nutrition: Nutrition;
  servingMultiplier?: number;
  className?: string;
}

export function NutritionPanel({ nutrition, servingMultiplier = 1, className }: NutritionPanelProps) {
  const scale = (v: number) => Math.round(v * servingMultiplier * 10) / 10;

  const calories = scale(nutrition.calories);
  const rows = [
    { label: "Protein", value: scale(nutrition.proteinG), unit: "g", kcalPer: 4 },
    { label: "Carbs", value: scale(nutrition.carbsG), unit: "g", kcalPer: 4 },
    { label: "Fat", value: scale(nutrition.fatG), unit: "g", kcalPer: 9 },
    { label: "Fiber", value: scale(nutrition.fiberG), unit: "g", kcalPer: 2 },
  ];

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <h4 className="text-sm font-semibold mb-1">Nutrition Facts</h4>
      <p className="text-xs text-muted-foreground mb-3">per serving</p>

      {/* Calories row — prominent */}
      <div className="flex justify-between items-baseline mb-3 pb-3 border-b">
        <span className="text-sm font-semibold">Calories</span>
        <span className="text-lg font-bold">{calories} <span className="text-xs font-normal text-muted-foreground">kcal</span></span>
      </div>

      {/* Macros with proportion bars */}
      <div className="space-y-2.5">
        {rows.map((row) => {
          const macroKcal = row.value * row.kcalPer;
          const pct = calories > 0 ? Math.min(100, Math.round((macroKcal / calories) * 100)) : 0;
          return (
            <div key={row.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium">{row.value} {row.unit}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary/60 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
