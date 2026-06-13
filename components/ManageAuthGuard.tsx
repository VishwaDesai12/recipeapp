"use client";

import { useEffect, useState } from "react";

export function ManageAuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("chef_logged_in") === "true") {
      setChecked(true);
    } else {
      window.location.href = "/login";
    }
  }, []);

  if (!checked) return null;
  return <>{children}</>;
}
