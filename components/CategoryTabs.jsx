'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NEWS_CATEGORIES } from '@/utils/fetchNews';

export default function CategoryTabs() {
  const pathname = usePathname();

  const isActive = (categoryId) => {
    if (categoryId === 'general') {
      return pathname === '/';
    }
    return pathname === `/category/${categoryId}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-2 md:space-x-3">
          {NEWS_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.id === 'general' ? '/' : `/category/${category.id}`}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
                isActive(category.id)
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
