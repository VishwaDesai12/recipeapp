"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setSavedIds } from "@/store/cookbookSlice";

const SEEDED_IDS = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);

export function LocalStorageHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookbook_saved_ids");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const userOnly = ids.filter((id) => !SEEDED_IDS.has(id));
        if (userOnly.length > 0) dispatch(setSavedIds(userOnly));
      }
    } catch {
      // ignore malformed data
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
