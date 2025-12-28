import { useCallback, useRef } from "react";
import { startPrefetch, cancelRoutePrefetch, isRoutePrefetched } from "@/lib/route-prefetch";
import { warmRouteImages, routeImages } from "@/lib/cache-warming";

interface UseRoutePrefetchOptions {
  /** Delay before starting prefetch (ms) */
  delay?: number;
  /** Also prefetch images for the route */
  prefetchImages?: boolean;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Hook for prefetching route components and images on hover
 * 
 * @example
 * ```tsx
 * const { onMouseEnter, onMouseLeave } = useRoutePrefetch('/tarifs');
 * 
 * <Link 
 *   to="/tarifs" 
 *   onMouseEnter={onMouseEnter} 
 *   onMouseLeave={onMouseLeave}
 * >
 *   Voir les tarifs
 * </Link>
 * ```
 */
export function useRoutePrefetch(route: string, options: UseRoutePrefetchOptions = {}) {
  const { delay = 150, prefetchImages = true, debug = false } = options;
  const hasPrefetchedRef = useRef(false);

  const onMouseEnter = useCallback(() => {
    if (hasPrefetchedRef.current || isRoutePrefetched(route)) {
      return;
    }

    if (debug) {
      console.log(`[Prefetch] Starting prefetch for: ${route}`);
    }

    // Prefetch the route component
    startPrefetch(route, delay);

    // Also prefetch images for the route
    if (prefetchImages) {
      warmRouteImages(routeImages, route, { fetchPriority: 'low' });
    }

    hasPrefetchedRef.current = true;
  }, [route, delay, prefetchImages, debug]);

  const onMouseLeave = useCallback(() => {
    cancelRoutePrefetch(route);
  }, [route]);

  return { onMouseEnter, onMouseLeave };
}

/**
 * Hook for prefetching multiple routes - returns handlers for each route
 * 
 * @example
 * ```tsx
 * const handlers = useRoutesPrefetch(['/tarifs', '/blog', '/contact']);
 * 
 * <Link to="/tarifs" {...handlers['/tarifs']}>Tarifs</Link>
 * <Link to="/blog" {...handlers['/blog']}>Blog</Link>
 * ```
 */
export function useRoutesPrefetch(
  routes: string[], 
  options: UseRoutePrefetchOptions = {}
): Record<string, { onMouseEnter: () => void; onMouseLeave: () => void }> {
  const { delay = 150, prefetchImages = true, debug = false } = options;
  const prefetchedRef = useRef<Set<string>>(new Set());

  const createHandlers = useCallback((route: string) => ({
    onMouseEnter: () => {
      if (prefetchedRef.current.has(route) || isRoutePrefetched(route)) {
        return;
      }

      if (debug) {
        console.log(`[Prefetch] Starting prefetch for: ${route}`);
      }

      startPrefetch(route, delay);

      if (prefetchImages) {
        warmRouteImages(routeImages, route, { fetchPriority: 'low' });
      }

      prefetchedRef.current.add(route);
    },
    onMouseLeave: () => {
      cancelRoutePrefetch(route);
    },
  }), [delay, prefetchImages, debug]);

  const handlers: Record<string, { onMouseEnter: () => void; onMouseLeave: () => void }> = {};
  routes.forEach((route) => {
    handlers[route] = createHandlers(route);
  });

  return handlers;
}

export default useRoutePrefetch;
