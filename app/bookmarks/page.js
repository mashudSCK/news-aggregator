'use client';

import { useBookmarks } from '@/context/BookmarkContext';
import NewsCard from '@/components/NewsCard';
import { Bookmark, Trash2 } from 'lucide-react';

export default function BookmarksPage() {
  const { bookmarks, clearAllBookmarks } = useBookmarks();

  // Sort bookmarks by bookmarked date (newest first)
  const sortedBookmarks = [...bookmarks].sort((a, b) => 
    new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt)
  );

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all bookmarks?')) {
      clearAllBookmarks();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              📑 My Bookmarks
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {bookmarks.length} {bookmarks.length === 1 ? 'article' : 'articles'} saved
            </p>
          </div>
          
          {bookmarks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Bookmarks Grid */}
      {sortedBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBookmarks.map((article, index) => (
            <NewsCard 
              key={`${article.url}-${index}`} 
              article={article}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookmarks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start bookmarking articles to read them later
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
          >
            Browse News
          </a>
        </div>
      )}
    </div>
  );
}
