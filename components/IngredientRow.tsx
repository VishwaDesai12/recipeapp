"use client";

import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCooking } from "@/context/CookingContext";
import { Ingredient, MeasurementUnit } from "@/types/recipe";
import { cn } from "@/lib/utils";

const UNITS: MeasurementUnit[] = ["g", "kg", "ml", "l", "tsp", "tbsp", "cup", "piece", "pinch", "to taste"];

interface IngredientRowProps {
  ingredient: Ingredient;
  index: number;
  scaled?: boolean;
  editable?: boolean;
  onChange?: (index: number, field: keyof Ingredient, value: string | number | boolean) => void;
  onRemove?: (index: number) => void;
  canRemove?: boolean;
  className?: string;
}

export function IngredientRow({
  ingredient,
  index,
  scaled = false,
  editable = false,
  onChange,
  onRemove,
  canRemove = true,
  className,
}: IngredientRowProps) {
  const { scaleIngredient } = useCooking();

  if (!editable) {
    const displayQty = scaled ? scaleIngredient(ingredient.quantity) : ingredient.quantity;
    const displayStr = `${displayQty} ${ingredient.unit}`;

    return (
      <div className={cn("flex items-center gap-3 py-2 border-b last:border-0", className)}>
        <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0" />
        <span className="font-medium text-sm w-24 shrink-0">{displayStr}</span>
        <span className="text-sm flex-1">{ingredient.name}</span>
        {ingredient.optional && (
          <span className="text-xs text-muted-foreground italic">optional</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 py-2", className)}>
      <Input
        type="number"
        min={0}
        step="any"
        value={ingredient.quantity}
        onChange={(e) => onChange?.(index, "quantity", parseFloat(e.target.value) || 0)}
        className="w-20 text-sm"
        placeholder="Qty"
      />
      <Select
        value={ingredient.unit}
        onValueChange={(v) => v && onChange?.(index, "unit", v as MeasurementUnit)}
      >
        <SelectTrigger className="w-24 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {UNITS.map((u) => (
            <SelectItem key={u} value={u}>
              {u}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={ingredient.name}
        onChange={(e) => onChange?.(index, "name", e.target.value)}
        className="flex-1 text-sm"
        placeholder="Ingredient name"
      />
      <div className="flex items-center gap-1">
        <Checkbox
          id={`opt-${index}`}
          checked={ingredient.optional}
          onCheckedChange={(v) => onChange?.(index, "optional", !!v)}
        />
        <label htmlFor={`opt-${index}`} className="text-xs text-muted-foreground cursor-pointer">
          Optional
        </label>
      </div>
      {canRemove && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => onRemove?.(index)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
