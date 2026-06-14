import { Flame, Scale, BookHeart, Timer } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import { HomeLoginBanner } from "./HomeLoginBanner";
import { HomeFeaturedClient } from "./HomeFeaturedClient";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <HomeLoginBanner error={error} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-950 dark:via-amber-950/20 dark:to-stone-950" />
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber-300/30 dark:bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-orange-300/30 dark:bg-orange-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 py-28 md:py-36 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 shadow-sm">
            <Flame className="w-3.5 h-3.5" />
            Your Personal Recipe Manager
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Cook Better,{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Every Day
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Create, scale, and organise your favourite recipes. Built for home cooks who love great food.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton
              href="/recipes"
              size="lg"
              className="w-48 h-12 text-base shadow-lg shadow-primary/25"
            >
              Browse Recipes
            </LinkButton>
            <LinkButton
              href="/manage/create"
              variant="outline"
              size="lg"
              className="w-48 h-12 text-base bg-white/60 dark:bg-white/5 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10"
            >
              Create Recipe
            </LinkButton>
          </div>

          {/* Floating recipe emoji decorations */}
          <div className="absolute left-8 top-12 text-4xl opacity-20 rotate-[-15deg] select-none hidden md:block">🥗</div>
          <div className="absolute right-12 top-20 text-3xl opacity-20 rotate-[12deg] select-none hidden md:block">🍝</div>
          <div className="absolute left-20 bottom-12 text-3xl opacity-20 rotate-[8deg] select-none hidden md:block">🍕</div>
          <div className="absolute right-8 bottom-8 text-4xl opacity-20 rotate-[-10deg] select-none hidden md:block">🍜</div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: <Scale className="w-5 h-5" />,
              title: "Smart Scaling",
              desc: "Adjust any recipe to your serving size instantly. Ingredients and nutrition scale automatically.",
              bg: "bg-blue-50 dark:bg-blue-950/40",
              icon_color: "text-blue-600 dark:text-blue-400",
              border: "border-blue-100 dark:border-blue-900/50",
            },
            {
              icon: <BookHeart className="w-5 h-5" />,
              title: "Personal Cookbook",
              desc: "Save favourites with one tap. Your collection persists across sessions — always at hand.",
              bg: "bg-rose-50 dark:bg-rose-950/40",
              icon_color: "text-rose-600 dark:text-rose-400",
              border: "border-rose-100 dark:border-rose-900/50",
            },
            {
              icon: <Timer className="w-5 h-5" />,
              title: "Step Timers",
              desc: "Built-in countdown for every step. Red alert under 10 seconds so you never overcook.",
              bg: "bg-amber-50 dark:bg-amber-950/40",
              icon_color: "text-amber-600 dark:text-amber-400",
              border: "border-amber-100 dark:border-amber-900/50",
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl border ${f.border} bg-card p-6 space-y-3 hover:shadow-md transition-all hover:-translate-y-0.5`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${f.bg} ${f.icon_color}`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-base">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured & Recent (from localStorage) ── */}
      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-14">
        <HomeFeaturedClient />
      </div>
    </div>
  );
}
