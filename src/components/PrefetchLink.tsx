import { forwardRef, useCallback, useRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { startPrefetch, cancelRoutePrefetch, isRoutePrefetched } from "@/lib/route-prefetch";
import { warmRouteImages, routeImages } from "@/lib/cache-warming";

interface PrefetchLinkProps extends LinkProps {
  /** Delay before starting prefetch (ms) - default: 150 */
  prefetchDelay?: number;
  /** Also prefetch images for the route - default: true */
  prefetchImages?: boolean;
  /** Disable prefetching entirely */
  noPrefetch?: boolean;
}

/**
 * Enhanced Link component with automatic route prefetching on hover
 * 
 * Prefetches both the route's JavaScript chunk and associated images
 * when the user hovers over the link, reducing perceived navigation time.
 * 
 * @example Basic usage
 * ```tsx
 * <PrefetchLink to="/tarifs">
 *   Voir les tarifs
 * </PrefetchLink>
 * ```
 * 
 * @example With custom delay
 * ```tsx
 * <PrefetchLink to="/blog" prefetchDelay={100}>
 *   Blog
 * </PrefetchLink>
 * ```
 * 
 * @example Disable prefetching
 * ```tsx
 * <PrefetchLink to="/external-page" noPrefetch>
 *   External Link
 * </PrefetchLink>
 * ```
 */
const PrefetchLink = forwardRef<HTMLAnchorElement, PrefetchLinkProps>(
  (
    {
      to,
      prefetchDelay = 150,
      prefetchImages = true,
      noPrefetch = false,
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const hasPrefetchedRef = useRef(false);
    const route = typeof to === "string" ? to : to.pathname || "";

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Call original handler if provided
        onMouseEnter?.(e);

        // Skip if disabled or already prefetched
        if (noPrefetch || hasPrefetchedRef.current || isRoutePrefetched(route)) {
          return;
        }

        // Start prefetching the route component
        startPrefetch(route, prefetchDelay);

        // Also prefetch images for the route
        if (prefetchImages) {
          warmRouteImages(routeImages, route, { fetchPriority: "low" });
        }

        hasPrefetchedRef.current = true;
      },
      [route, prefetchDelay, prefetchImages, noPrefetch, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        onMouseLeave?.(e);
        cancelRoutePrefetch(route);
      },
      [route, onMouseLeave]
    );

    return (
      <Link
        ref={ref}
        to={to}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

PrefetchLink.displayName = "PrefetchLink";

export { PrefetchLink };
export type { PrefetchLinkProps };
export default PrefetchLink;
