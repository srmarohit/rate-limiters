export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-6 dark:border-gray-800"
          >
            {/* Card image skeleton */}
            <div className="mb-4 h-40 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
            
            {/* Card title skeleton */}
            <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
            
            {/* Card description skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
            
            {/* Card footer skeleton */}
            <div className="mt-4 flex items-center justify-between">
              <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="h-96 rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-center space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    </div>
  );
}