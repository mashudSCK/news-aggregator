/**
 * Custom hook for infinite scroll functionality using IntersectionObserver
 * 
 * @param {Function} callback - Function to call when loading more items
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {boolean} isLoading - Whether items are currently being loaded
 * @returns {React.RefObject} - Ref to attach to the sentinel element
 */

import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(callback, hasMore, isLoading) {
  const observer = useRef();
  const sentinelRef = useRef();

  const lastElementRef = useCallback(
    (node) => {
      // Don't observe if already loading or no more items
      if (isLoading) return;
      
      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      // Create new observer
      observer.current = new IntersectionObserver(
        (entries) => {
          // If the sentinel element is visible and we have more items
          if (entries[0].isIntersecting && hasMore) {
            callback();
          }
        },
        {
          // Trigger when element is 90% visible
          threshold: 0.1,
          // Start observing 200px before the element comes into view
          rootMargin: '200px',
        }
      );

      // Start observing the new node
      if (node) observer.current.observe(node);
    },
    [callback, hasMore, isLoading]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return lastElementRef;
}
