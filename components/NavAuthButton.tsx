import { cookies } from "next/headers";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function NavAuthButton() {
  const cookieStore = await cookies();
  const token = cookieStore.get("chef_token");

  if (token?.value) {
    return (
      <Link
        href="/api/auth/logout"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-1.5")}
      >
        <LogOut className="w-3.5 h-3.5" />
        Logout
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-1.5")}
    >
      <LogIn className="w-3.5 h-3.5" />
      Login
    </Link>
  );
}
