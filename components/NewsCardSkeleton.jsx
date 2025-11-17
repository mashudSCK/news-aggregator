export default function NewsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 w-full bg-gray-300 dark:bg-gray-700"></div>
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Source & Date */}
        <div className="flex justify-between">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
        </div>
        
        {/* Button */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mt-4"></div>
      </div>
    </div>
  );
}
