"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Trash2, Timer, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RecipeStep } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: RecipeStep;
  index: number;
  editable?: boolean;
  onChange?: (index: number, field: keyof RecipeStep, value: string | number) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  activeTimerStep?: number | null;
  onStartTimer?: (index: number) => void;
}

function CountdownTimer({
  durationMinutes,
  isActive,
  onStart,
}: {
  durationMinutes: number;
  isActive: boolean;
  onStart: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSecondsLeft(null);
      return;
    }
    const total = durationMinutes * 60;
    setSecondsLeft(total);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, durationMinutes]);

  const isDone = secondsLeft === 0;
  const isUnder10 = secondsLeft !== null && secondsLeft > 0 && secondsLeft <= 10;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  if (isActive && secondsLeft !== null) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-mono font-bold mt-2",
          isDone ? "text-green-600" : isUnder10 ? "text-red-500 animate-pulse" : "text-blue-600 dark:text-blue-400"
        )}
      >
        <Timer className="w-4 h-4" />
        {isDone ? "Time's Up!" : formatTime(secondsLeft)}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onStart}
      className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
    >
      <Timer className="w-3.5 h-3.5" />
      Start Timer ({durationMinutes} min)
    </button>
  );
}

export function StepCard({
  step,
  index,
  editable = false,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  className,
  activeTimerStep,
  onStartTimer,
}: StepCardProps) {
  const [tipOpen, setTipOpen] = useState(false);

  if (!editable) {
    return (
      <div className={cn("py-3 border-b last:border-0", className)}>
        <div className="flex items-start gap-3">
          {/* Step number circle */}
          <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
            {step.stepNumber}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm">{step.instruction}</p>
            {step.tip && (
              <div>
                <button
                  type="button"
                  onClick={() => setTipOpen((v) => !v)}
                  className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <ChevronRight className={cn("w-3 h-3 transition-transform", tipOpen && "rotate-90")} />
                  Tip
                </button>
                {tipOpen && (
                  <p className="text-xs text-muted-foreground mt-1 pl-4 border-l-2 border-amber-300">{step.tip}</p>
                )}
              </div>
            )}
            {step.durationMinutes && (
              <CountdownTimer
                durationMinutes={step.durationMinutes}
                isActive={activeTimerStep === index}
                onStart={() => onStartTimer?.(index)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("border rounded-xl p-4 space-y-3 bg-muted/30", className)}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
          {step.stepNumber}
        </div>
        <span className="text-sm font-medium text-muted-foreground">Step {step.stepNumber}</span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onMoveUp?.(index)}
            disabled={isFirst}
            className="h-7 w-7"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onMoveDown?.(index)}
            disabled={isLast}
            className="h-7 w-7"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onRemove?.(index)}
            className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Textarea
        value={step.instruction}
        onChange={(e) => onChange?.(index, "instruction", e.target.value)}
        placeholder="Describe this step..."
        rows={3}
        className="text-sm resize-none"
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Duration (minutes)</label>
          <Input
            type="number"
            min={0}
            value={step.durationMinutes ?? ""}
            onChange={(e) =>
              onChange?.(index, "durationMinutes", e.target.value ? parseInt(e.target.value) : 0)
            }
            placeholder="Optional"
            className="text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Tip (optional)</label>
          <Input
            value={step.tip ?? ""}
            onChange={(e) => onChange?.(index, "tip", e.target.value)}
            placeholder="A helpful tip..."
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}
