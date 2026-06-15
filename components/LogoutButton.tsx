"use client";

import { LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LogoutButton() {
  const handleLogout = async () => {
    localStorage.removeItem("chef_logged_in");
    await fetch("/api/auth/logout");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-1.5")}
    >
      <LogOut className="w-3.5 h-3.5" />
      Logout
    </button>
  );
}
