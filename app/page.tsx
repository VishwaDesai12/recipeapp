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
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
      <HomeLoginBanner error={error} />
      {/* Hero */}
      <section className="text-center space-y-4 py-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Cook Better, Every Day
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Discover delicious recipes, scale ingredients to your serving size, and save your favourites to a personal cookbook.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <LinkButton href="/recipes" size="lg">Browse Recipes</LinkButton>
          <LinkButton href="/manage/create" variant="outline" size="lg">Create Recipe</LinkButton>
        </div>
      </section>

      {/* Featured & Recent — rendered client-side from localStorage */}
      <HomeFeaturedClient />
    </div>
  );
}
