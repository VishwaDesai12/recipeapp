export default function RecipesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="h-8 w-48 rounded-lg shimmer mb-2" />
        <div className="h-4 w-32 rounded shimmer" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 shrink-0">
          <div className="h-96 rounded-xl shimmer" />
        </aside>
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border overflow-hidden">
              <div className="h-48 shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-24 rounded shimmer" />
                <div className="h-5 w-full rounded shimmer" />
                <div className="h-4 w-3/4 rounded shimmer" />
                <div className="h-3 w-20 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
