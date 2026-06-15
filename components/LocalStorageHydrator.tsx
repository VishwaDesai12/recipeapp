"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setSavedIds } from "@/store/cookbookSlice";
import { Recipe } from "@/types/recipe";

const SEEDED_IDS = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);

export function LocalStorageHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      // Check actual session state from server (reads httpOnly chef_token cookie)
      try {
        const authRes = await fetch("/api/auth/me");
        const { loggedIn } = (await authRes.json()) as { loggedIn: boolean };

        if (!loggedIn) {
          // Wipe any stale cookbook state so the badge and hearts don't show
          dispatch(setSavedIds([]));
        } else {
          // Restore cookbook saved IDs only when truly logged in
          try {
            const stored = localStorage.getItem("cookbook_saved_ids");
            if (stored) {
              const ids: string[] = JSON.parse(stored);
              const userOnly = ids.filter((id) => !SEEDED_IDS.has(id));
              if (userOnly.length > 0) dispatch(setSavedIds(userOnly));
            }
          } catch { /* ignore */ }
        }
      } catch { /* ignore — network error, leave state alone */ }

      // Re-seed the API in-memory store from localStorage so all API routes
      // work correctly even after a Vercel cold start.
      try {
        const check = await fetch("/api/recipes");
        const existing: Recipe[] = await check.json();
        if (existing.length > 0) return;

        const stored = localStorage.getItem("manage_recipes");
        if (!stored) return;

        const recipes: Recipe[] = JSON.parse(stored);
        const userOnly = recipes.filter((r) => !SEEDED_IDS.has(r.id));
        if (userOnly.length === 0) return;

        await fetch("/api/recipes/seed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userOnly),
        });
      } catch { /* ignore */ }
    };

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
