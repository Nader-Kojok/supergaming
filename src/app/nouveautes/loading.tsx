export default function NouveautesLoading() {
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
        {/* Category Filter Skeleton */}
        <div className="mb-12">
          <div className="flex gap-3">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-10 w-32 bg-cardBlack rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="relative bg-cardBlack rounded-lg overflow-hidden border border-borderBlack animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="aspect-[16/9] bg-borderBlack" />

              {/* Content Skeleton */}
              <div className="p-6">
                {/* Category Badge Skeleton */}
                <div className="mb-3">
                  <div className="h-6 w-24 bg-borderBlack rounded-full" />
                </div>

                {/* Title Skeleton */}
                <div className="h-8 w-3/4 bg-borderBlack rounded mb-2" />
                
                {/* Description Skeleton */}
                <div className="h-4 w-full bg-borderBlack rounded mb-4" />
                
                {/* Price and Rating Skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-24 bg-borderBlack rounded" />
                  <div className="h-6 w-16 bg-borderBlack rounded" />
                </div>

                {/* Date and Stock Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-32 bg-borderBlack rounded" />
                  <div className="h-4 w-24 bg-borderBlack rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 