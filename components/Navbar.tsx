"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, LogIn, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store";
import { useCooking } from "@/context/CookingContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const savedCount = useAppSelector((s) => s.cookbook.savedIds.length);
  const { theme, toggleTheme } = useCooking();

  const links = [
    { href: "/recipes", label: "Browse", icon: <Search className="w-3.5 h-3.5" /> },
    { href: "/cookbook", label: "Cookbook", icon: null },
    { href: "/manage", label: "Manage", icon: null },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary shrink-0">
          <ChefHat className="w-6 h-6" />
          RecipeApp
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
          <Button size="sm" variant="outline" asChild>
            <Link href="/login" className="flex items-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" />
              Login
            </Link>
          </Button>
          <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
