export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-deepBlack pt-24 pb-16">
      {/* Hero Section Skeleton */}
      <div className="relative h-48 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-pulse" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative z-10">
            <div className="h-12 w-64 bg-cardBlack rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-96 bg-cardBlack rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search Bar Skeleton */}
        <div className="mb-12 max-w-xl mx-auto">
          <div className="h-14 bg-cardBlack rounded-lg animate-pulse" />
        </div>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-cardBlack animate-pulse"
            >
              <div className="aspect-[16/9] bg-borderBlack" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="h-6 w-32 bg-borderBlack rounded mb-2" />
                <div className="h-4 w-48 bg-borderBlack rounded mb-2" />
                <div className="h-4 w-24 bg-borderBlack rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 