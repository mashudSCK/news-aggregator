'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import NewsCardSkeleton from '@/components/NewsCardSkeleton';
import { searchNews } from '@/utils/fetchNews';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Loader2, Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const performSearch = async (searchQuery, pageNum = 1, append = false) => {
    if (!searchQuery) {
      setArticles([]);
      setLoading(false);
      return;
    }

    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);
      
      setError(null);
      
      const data = await searchNews({
        query: searchQuery,
        page: pageNum,
        pageSize: 10,
      });

      if (data.articles && data.articles.length > 0) {
        setArticles(prev => append ? [...prev, ...data.articles] : data.articles);
        // GNews free tier doesn't support pagination - only returns 10 articles total
        setHasMore(false);
      } else {
        if (!append) setArticles([]);
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to search news');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    performSearch(query, 1, false);
  }, [query]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(query, nextPage, true);
  };

  // Infinite scroll hook - triggers loadMore when sentinel comes into view
  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loadingMore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🔍 Search News
        </h1>
        <SearchBar initialQuery={query} />
      </div>

      {/* Search Results */}
      {loading && !query ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage message={error} retry={() => performSearch(query, 1, false)} />
      ) : query && articles.length > 0 ? (
        <>
          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing results for <span className="font-semibold text-gray-900 dark:text-white">"{query}"</span>
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard 
                key={`${article.url}-${index}`} 
                article={article}
                priority={index < 3}
              />
            ))}
          </div>

          {/* Infinite Scroll Sentinel & Loading Indicator */}
          {hasMore && (
            <div 
              ref={sentinelRef}
              className="mt-12 flex justify-center items-center py-8"
            >
              {loadingMore && (
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-sm font-medium">Loading more results...</span>
                </div>
              )}
            </div>
          )}

          {/* End of Results Indicator */}
          {!hasMore && articles.length > 0 && (
            <div className="mt-12 text-center py-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                🎉 You've reached the end of search results
              </p>
            </div>
          )}
        </>
      ) : query && articles.length === 0 && !loading ? (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching for something else or use different keywords
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Start searching for news
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter keywords in the search box above to find relevant articles
          </p>
        </div>
      )}
    </div>
  );
}
