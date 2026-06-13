"use client";

import { useEffect, useState } from "react";

export function ManageAuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(({ loggedIn }: { loggedIn: boolean }) => {
        if (!loggedIn) {
          window.location.href = "/login";
        } else {
          setChecked(true);
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  if (!checked) return null;
  return <>{children}</>;
}
