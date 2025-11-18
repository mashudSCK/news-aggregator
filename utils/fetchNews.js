/**
 * Utility functions for fetching news from GNews API
 * Documentation: https://gnews.io/docs/v4
 */

const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

/**
 * Fetch top headlines
 * @param {Object} params - Query parameters
 * @param {string} params.category - Category (business, entertainment, general, health, science, sports, technology)
 * @param {string} params.country - Country code (us, ph, gb, etc.)
 * @param {number} params.page - Page number for pagination
 * @param {number} params.pageSize - Number of results per page
 * @returns {Promise<Object>} News response
 */
export async function fetchTopHeadlines({ category = '', country = 'us', page = 1, pageSize = 20 }) {
  try {
    if (!API_KEY) {
      throw new Error('API key is missing. Please add NEXT_PUBLIC_GNEWS_API_KEY to your environment variables.');
    }

    const params = new URLSearchParams({
      token: API_KEY,
      country: country,
      max: Math.min(pageSize, 10).toString(), // GNews max is 10 per request
    });

    // GNews uses 'topic' not 'category'
    if (category && category !== 'general') {
      params.append('topic', category);
    }

    console.log('Fetching from:', `${BASE_URL}/top-headlines?${params.toString().replace(API_KEY, 'HIDDEN')}`);

    const response = await fetch(`${BASE_URL}/top-headlines?${params.toString()}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GNews API Error:', response.status, errorData);
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform GNews response to match NewsAPI format
    return {
      status: 'ok',
      totalResults: data.totalArticles || 0,
      articles: data.articles || []
    };
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
}

/**
 * Search for news articles
 * @param {Object} params - Query parameters
 * @param {string} params.query - Search query
 * @param {string} params.language - Language code
 * @param {string} params.sortBy - Sort order (relevancy, popularity, publishedAt)
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Number of results per page
 * @returns {Promise<Object>} News response
 */
export async function searchNews({ query, language = 'en', sortBy = 'publishedAt', page = 1, pageSize = 20 }) {
  try {
    if (!query) {
      throw new Error('Search query is required');
    }

    if (!API_KEY) {
      throw new Error('API key is missing. Please add NEXT_PUBLIC_GNEWS_API_KEY to your environment variables.');
    }

    const params = new URLSearchParams({
      q: query,
      token: API_KEY,
      lang: language,
      max: Math.min(pageSize, 10).toString(), // GNews max is 10 per request
    });

    console.log('Searching:', `${BASE_URL}/search?${params.toString().replace(API_KEY, 'HIDDEN')}`);

    const response = await fetch(`${BASE_URL}/search?${params.toString()}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GNews API Error:', response.status, errorData);
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform GNews response to match NewsAPI format
    return {
      status: 'ok',
      totalResults: data.totalArticles || 0,
      articles: data.articles || []
    };
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

/**
 * Get fallback image for articles without images
 * @param {string} category - Article category
 * @returns {string} Placeholder image URL
 */
export function getFallbackImage(category = 'general') {
  const placeholders = {
    business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
    technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop',
    entertainment: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop',
    health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    science: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop',
    general: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop',
  };

  return placeholders[category] || placeholders.general;
}

/**
 * Available news categories
 */
export const NEWS_CATEGORIES = [
  { id: 'general', name: 'Top Headlines', icon: '🌟' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'health', name: 'Health', icon: '🏥' },
];
