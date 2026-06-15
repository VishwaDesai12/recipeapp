"use client";

import { useEffect, useState } from "react";
import { isLoggedInClient } from "@/lib/authClient";

export function ManageAuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoggedInClient()) {
      setChecked(true);
    } else {
      window.location.href = "/?error=login_required";
    }
  }, []);

  if (!checked) return null;
  return <>{children}</>;
}
