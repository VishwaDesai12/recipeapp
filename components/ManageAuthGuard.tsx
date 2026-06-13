"use client";

import { useEffect, useState } from "react";

export function ManageAuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("chef_logged_in") === "true") {
      setChecked(true);
    } else {
      window.location.href = "/?error=login_required";
    }
  }, []);

  if (!checked) return null;
  return <>{children}</>;
}
