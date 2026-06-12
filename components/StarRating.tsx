"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  ratingCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, ratingCount, interactive, onRate, size = "sm" }: StarRatingProps) {
  const sizeClass = size === "lg" ? "w-7 h-7" : size === "md" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            className={cn(
              "transition-transform",
              interactive && "hover:scale-110 cursor-pointer",
              !interactive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeClass,
                star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-none text-gray-300"
              )}
            />
          </button>
        ))}
      </div>
      {ratingCount !== undefined && (
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({ratingCount})
        </span>
      )}
    </div>
  );
}
