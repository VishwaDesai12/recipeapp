import Link from "next/link";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("chef_token");
  if (!token?.value) {
    redirect("/login");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-56 shrink-0">
        <nav className="space-y-1 rounded-xl border bg-card p-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">
            Manage
          </p>
          <SidebarLink href="/manage" icon={<LayoutDashboard className="w-4 h-4" />} label="My Recipes" />
          <SidebarLink href="/manage/create" icon={<PlusCircle className="w-4 h-4" />} label="Create Recipe" />
        </nav>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
