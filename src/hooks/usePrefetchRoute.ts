/**
 * Hook for prefetching route images on hover
 * Improves perceived navigation performance by preloading images before user clicks
 */

import { useCallback, useRef } from "react";
import { warmRouteImages, routeImages, WarmCacheOptions } from "@/lib/cache-warming";

interface UsePrefetchOptions extends Omit<WarmCacheOptions, "onStart" | "onComplete"> {
  /** Delay before starting prefetch (ms) - prevents prefetching on quick mouse passes */
  delay?: number;
  /** Enable logging in development */
  enableLogging?: boolean;
}

/**
 * Hook to prefetch images for a route on hover
 * 
 * @example
 * ```tsx
 * const { onMouseEnter, onMouseLeave } = usePrefetchRoute('/tarifs')
 * 
 * <Link to="/tarifs" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
 *   Tarifs
 * </Link>
 * ```
 */
export function usePrefetchRoute(route: string, options: UsePrefetchOptions = {}) {
  const { delay = 100, enableLogging = false, ...warmOptions } = options;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPrefetchedRef = useRef(false);

  const onMouseEnter = useCallback(() => {
    // Don't prefetch again if already done
    if (hasPrefetchedRef.current) return;

    timeoutRef.current = setTimeout(() => {
      if (enableLogging) {
        console.log(`[Prefetch] Starting prefetch for route: ${route}`);
      }

      warmRouteImages(routeImages, route, {
        fetchPriority: "low",
        ...warmOptions,
      }).then((result) => {
        if (result && enableLogging) {
          console.log(
            `[Prefetch] Route ${route}: ${result.successful.length} images loaded in ${result.duration.toFixed(0)}ms`
          );
        }
        hasPrefetchedRef.current = true;
      });
    }, delay);
  }, [route, delay, enableLogging, warmOptions]);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { onMouseEnter, onMouseLeave };
}

/**
 * Get prefetch handlers for multiple routes at once
 * 
 * @example
 * ```tsx
 * const prefetchHandlers = usePrefetchRoutes(['/tarifs', '/blog', '/contact'])
 * 
 * {routes.map(route => (
 *   <Link key={route} to={route} {...prefetchHandlers[route]}>
 *     {route}
 *   </Link>
 * ))}
 * ```
 */
export function usePrefetchRoutes(
  routes: string[],
  options: UsePrefetchOptions = {}
): Record<string, { onMouseEnter: () => void; onMouseLeave: () => void }> {
  const { delay = 100, enableLogging = false, ...warmOptions } = options;
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const prefetchedRef = useRef<Set<string>>(new Set());

  const createHandlers = useCallback(
    (route: string) => ({
      onMouseEnter: () => {
        if (prefetchedRef.current.has(route)) return;

        const timeout = setTimeout(() => {
          if (enableLogging) {
            console.log(`[Prefetch] Starting prefetch for route: ${route}`);
          }

          warmRouteImages(routeImages, route, {
            fetchPriority: "low",
            ...warmOptions,
          }).then((result) => {
            if (result && enableLogging) {
              console.log(
                `[Prefetch] Route ${route}: ${result.successful.length} images loaded`
              );
            }
            prefetchedRef.current.add(route);
          });
        }, delay);

        timeoutsRef.current.set(route, timeout);
      },
      onMouseLeave: () => {
        const timeout = timeoutsRef.current.get(route);
        if (timeout) {
          clearTimeout(timeout);
          timeoutsRef.current.delete(route);
        }
      },
    }),
    [delay, enableLogging, warmOptions]
  );

  // Create handlers object for all routes
  const handlers: Record<string, { onMouseEnter: () => void; onMouseLeave: () => void }> = {};
  routes.forEach((route) => {
    handlers[route] = createHandlers(route);
  });

  return handlers;
}

export default usePrefetchRoute;
