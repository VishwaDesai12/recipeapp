import { cookies } from "next/headers";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/LogoutButton";

export async function NavAuthButton() {
  const cookieStore = await cookies();
  const token = cookieStore.get("chef_token");

  if (token?.value) {
    return <LogoutButton />;
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
