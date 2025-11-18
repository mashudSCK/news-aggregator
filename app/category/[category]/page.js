'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import CategoryTabs from '@/components/CategoryTabs';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import NewsCardSkeleton from '@/components/NewsCardSkeleton';
import { fetchTopHeadlines, NEWS_CATEGORIES } from '@/utils/fetchNews';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Loader2 } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const categoryInfo = NEWS_CATEGORIES.find(cat => cat.id === category);

  const loadNews = async (pageNum = 1, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);
      
      setError(null);
      
      const data = await fetchTopHeadlines({
        category,
        country: 'us',
        page: pageNum,
        pageSize: 10,
      });

      if (data.articles && data.articles.length > 0) {
        setArticles(prev => append ? [...prev, ...data.articles] : data.articles);
        // GNews free tier doesn't support pagination - only returns 10 articles total
        setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to load news');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    loadNews(1, false);
  }, [category]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadNews(nextPage, true);
  };

  // Infinite scroll hook - triggers loadMore when sentinel comes into view
  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loadingMore);

  if (loading) {
    return (
      <>
        <CategoryTabs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {categoryInfo?.icon} {categoryInfo?.name || 'Category'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Latest news in {categoryInfo?.name?.toLowerCase() || 'this category'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <CategoryTabs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={error} retry={() => loadNews(1, false)} />
        </div>
      </>
    );
  }

  return (
    <>
      <CategoryTabs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryInfo?.icon} {categoryInfo?.name || 'Category'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Latest news in {categoryInfo?.name?.toLowerCase() || 'this category'}
          </p>
        </div>

        {/* News Grid */}
        {articles.length > 0 ? (
          <>
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
                    <span className="text-sm font-medium">Loading more articles...</span>
                  </div>
                )}
              </div>
            )}

            {/* End of Results Indicator */}
            {!hasMore && articles.length > 0 && (
              <div className="mt-12 text-center py-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  🎉 You've reached the end of the news feed
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No articles found in this category. Please try again later.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
