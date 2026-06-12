"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export function HomeLoginBanner({ error }: { error?: string }) {
  if (error !== "login_required") return null;

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <div className="flex-1 text-sm">
        <span className="font-medium">Login required</span> to access the manage section.{" "}
        <Link href="/login" className="underline hover:no-underline font-medium">
          Click here to log in
        </Link>
      </div>
    </div>
  );
}
