'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, ExternalLink, Calendar, User } from 'lucide-react';
import { useBookmarks } from '@/context/BookmarkContext';
import { formatDate } from '@/utils/fetchNews';
import { useState } from 'react';

export default function NewsCard({ article, priority = false }) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [imageError, setImageError] = useState(false);
  const bookmarked = isBookmarked(article.url);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    if (bookmarked) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  // GNews API uses 'image' field, NewsAPI uses 'urlToImage'
  const imageUrl = !imageError && (article.image || article.urlToImage)
    ? (article.image || article.urlToImage)
    : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop';

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          src={imageUrl}
          alt={article.title || 'News article'}
          fill
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            bookmarked
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white/90 text-gray-700 hover:bg-white hover:scale-110'
          }`}
          title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Source & Date */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span className="font-medium">{article.source?.name || 'Unknown Source'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {article.description || 'No description available.'}
        </p>

        {/* Author */}
        {article.author && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            By {article.author}
          </p>
        )}

        {/* Read More Button */}
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group/link"
        >
          <span>Read full article</span>
          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
