/**
 * Route Component Prefetching
 * 
 * Preloads lazy-loaded route components when users hover over links,
 * reducing perceived navigation time by loading JS chunks in advance.
 */

// Map of routes to their dynamic import functions
const routeImports: Record<string, () => Promise<unknown>> = {
  '/': () => import('@/pages/Index'),
  '/tarifs': () => import('@/pages/Tarifs'),
  '/liste-chaines': () => import('@/pages/ListeChaines'),
  '/blog': () => import('@/pages/Blog'),
  '/revendeur': () => import('@/pages/Revendeur'),
  '/tutorial': () => import('@/pages/Tutorial'),
  '/essai-gratuit': () => import('@/pages/EssaiGratuit'),
  '/faq': () => import('@/pages/FAQPage'),
  '/contact': () => import('@/pages/Contact'),
  '/accessibilite': () => import('@/pages/Accessibilite'),
  '/annulation-commande': () => import('@/pages/AnnulationCommande'),
  '/politique-remboursement': () => import('@/pages/PolitiqueRemboursement'),
  '/politique-confidentialite': () => import('@/pages/PolitiqueConfidentialite'),
  '/conditions-generales': () => import('@/pages/ConditionsGenerales'),
  '/dmca-policy': () => import('@/pages/DmcaPolicy'),
  '/avis-non-responsabilite': () => import('@/pages/AvisNonResponsabilite'),
  '/conditions-paiement': () => import('@/pages/ConditionsPaiement'),
  '/tags': () => import('@/pages/Tags'),
};

// Dynamic route patterns
const dynamicRouteImports: Array<{
  pattern: RegExp;
  importFn: () => Promise<unknown>;
}> = [
  { pattern: /^\/blog\/.+$/, importFn: () => import('@/pages/blog/WordPressPost') },
  { pattern: /^\/tutorial\/.+$/, importFn: () => import('@/pages/blog/WordPressPost') },
  { pattern: /^\/category\/.+$/, importFn: () => import('@/pages/Category') },
  { pattern: /^\/tag\/.+$/, importFn: () => import('@/pages/Tag') },
];

// Cache of prefetched routes
const prefetchedRoutes = new Set<string>();

// Pending prefetch timeouts
const pendingPrefetches = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Get the import function for a route
 */
function getRouteImport(route: string): (() => Promise<unknown>) | null {
  // Check static routes first
  if (routeImports[route]) {
    return routeImports[route];
  }

  // Check dynamic route patterns
  for (const { pattern, importFn } of dynamicRouteImports) {
    if (pattern.test(route)) {
      return importFn;
    }
  }

  return null;
}

/**
 * Prefetch a route's component chunk
 * 
 * @param route - The route path to prefetch
 * @returns Promise that resolves when prefetching is complete
 */
export async function prefetchRoute(route: string): Promise<void> {
  // Normalize route
  const normalizedRoute = route.split('?')[0].split('#')[0];
  
  // Skip if already prefetched
  if (prefetchedRoutes.has(normalizedRoute)) {
    return;
  }

  const importFn = getRouteImport(normalizedRoute);
  
  if (!importFn) {
    // Try to match as a blog post or category page
    if (normalizedRoute.startsWith('/blog/')) {
      prefetchedRoutes.add(normalizedRoute);
      await import('@/pages/blog/WordPressPost');
      return;
    }
    return;
  }

  try {
    await importFn();
    prefetchedRoutes.add(normalizedRoute);
  } catch (error) {
    console.warn(`Failed to prefetch route: ${normalizedRoute}`, error);
  }
}

/**
 * Start prefetching a route with debouncing
 * 
 * @param route - The route to prefetch
 * @param delay - Delay in ms before starting (default: 150)
 */
export function startPrefetch(route: string, delay: number = 150): void {
  const normalizedRoute = route.split('?')[0].split('#')[0];
  
  // Skip if already prefetched or pending
  if (prefetchedRoutes.has(normalizedRoute) || pendingPrefetches.has(normalizedRoute)) {
    return;
  }

  const timeout = setTimeout(() => {
    prefetchRoute(normalizedRoute);
    pendingPrefetches.delete(normalizedRoute);
  }, delay);

  pendingPrefetches.set(normalizedRoute, timeout);
}

/**
 * Cancel a pending prefetch
 * 
 * @param route - The route to cancel prefetching for
 */
export function cancelRoutePrefetch(route?: string): void {
  if (route) {
    const normalizedRoute = route.split('?')[0].split('#')[0];
    const timeout = pendingPrefetches.get(normalizedRoute);
    if (timeout) {
      clearTimeout(timeout);
      pendingPrefetches.delete(normalizedRoute);
    }
  } else {
    // Cancel all pending prefetches
    pendingPrefetches.forEach((timeout) => clearTimeout(timeout));
    pendingPrefetches.clear();
  }
}

/**
 * Check if a route has been prefetched
 */
export function isRoutePrefetched(route: string): boolean {
  const normalizedRoute = route.split('?')[0].split('#')[0];
  return prefetchedRoutes.has(normalizedRoute);
}

/**
 * Prefetch multiple routes at once (useful for above-the-fold links)
 */
export async function prefetchRoutes(routes: string[]): Promise<void> {
  await Promise.all(routes.map(prefetchRoute));
}

/**
 * Get list of all prefetchable routes
 */
export function getPrefetchableRoutes(): string[] {
  return Object.keys(routeImports);
}
