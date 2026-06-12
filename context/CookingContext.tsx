"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MeasurementUnit } from "@/types/recipe";

interface CookingContextValue {
  servingMultiplier: number;
  setServingMultiplier: (n: number) => void;
  scaleIngredient: (qty: number) => number;
  unitSystem: "metric" | "imperial";
  setUnitSystem: (s: "metric" | "imperial") => void;
  convertUnit: (qty: number, unit: MeasurementUnit) => string;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const CookingContext = createContext<CookingContextValue | null>(null);

const METRIC_TO_IMPERIAL: Partial<Record<MeasurementUnit, { factor: number; label: string }>> = {
  g: { factor: 0.035274, label: "oz" },
  kg: { factor: 2.20462, label: "lb" },
  ml: { factor: 0.033814, label: "fl oz" },
  l: { factor: 33.814, label: "fl oz" },
};

export function CookingProvider({ children }: { children: React.ReactNode }) {
  const [servingMultiplier, setServingMultiplierState] = useState(1);
  const [unitSystem, setUnitSystemState] = useState<"metric" | "imperial">("metric");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMultiplier = localStorage.getItem("servingMultiplier");
    const savedUnit = localStorage.getItem("unitSystem");
    const savedTheme = localStorage.getItem("theme");

    if (savedMultiplier) setServingMultiplierState(parseFloat(savedMultiplier));
    if (savedUnit === "metric" || savedUnit === "imperial") setUnitSystemState(savedUnit);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  const setServingMultiplier = (n: number) => {
    setServingMultiplierState(n);
    localStorage.setItem("servingMultiplier", String(n));
  };

  const setUnitSystem = (s: "metric" | "imperial") => {
    setUnitSystemState(s);
    localStorage.setItem("unitSystem", s);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  const scaleIngredient = (qty: number): number => {
    return Math.round(qty * servingMultiplier * 100) / 100;
  };

  const convertUnit = (qty: number, unit: MeasurementUnit): string => {
    if (unitSystem === "imperial") {
      const conv = METRIC_TO_IMPERIAL[unit];
      if (conv) {
        const converted = Math.round(qty * conv.factor * 100) / 100;
        return `${converted} ${conv.label}`;
      }
    }
    return `${qty} ${unit}`;
  };

  return (
    <CookingContext.Provider
      value={{
        servingMultiplier,
        setServingMultiplier,
        scaleIngredient,
        unitSystem,
        setUnitSystem,
        convertUnit,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CookingContext.Provider>
  );
}

export function useCooking(): CookingContextValue {
  const ctx = useContext(CookingContext);
  if (!ctx) throw new Error("useCooking must be used within CookingProvider");
  return ctx;
}
