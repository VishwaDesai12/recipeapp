"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Moon, Search, Sun } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSavedIds } from "@/store/cookbookSlice";
import { useCooking } from "@/context/CookingContext";
import { isLoggedInClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";

export function Navbar({ authButton }: { authButton?: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const savedCount = useAppSelector((s) => s.cookbook.savedIds.length);
  const { theme, toggleTheme } = useCooking();

  // On every navigation, if the session cookie is gone but Redux still has saves, wipe them
  useEffect(() => {
    if (savedCount > 0 && !isLoggedInClient()) {
      dispatch(setSavedIds([]));
      localStorage.removeItem("cookbook_saved_ids");
    }
  }, [pathname, savedCount, dispatch]);

  const links = [
    { href: "/recipes", label: "Browse", icon: <Search className="w-3.5 h-3.5" /> },
    { href: "/cookbook", label: "Cookbook", icon: null },
    { href: "/manage", label: "Manage", icon: null },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary shrink-0">
          <Flame className="w-6 h-6" />
          Yumms
        </Link>

        <nav className="flex items-center gap-1 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors",
                pathname.startsWith(link.href)
                  ? "text-primary font-medium bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.icon}
              {link.label}
              {link.href === "/cookbook" && savedCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 min-w-4 px-1 text-[10px]">
                  {savedCount}
                </Badge>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {authButton}
          <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
