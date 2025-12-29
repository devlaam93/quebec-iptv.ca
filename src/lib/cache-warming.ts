/**
 * Cache warming utility to preload critical images on app initialization
 * Improves perceived performance by loading hero images, logos, and above-the-fold content
 */

import { imageCache } from "@/lib/image-cache";

interface WarmCacheOptions {
  /** Priority for fetch requests */
  fetchPriority?: "high" | "low" | "auto";
  /** Load images sequentially to reduce bandwidth competition */
  sequential?: boolean;
  /** Callback when warming starts */
  onStart?: () => void;
  /** Callback for each image loaded */
  onProgress?: (loaded: number, total: number, src: string) => void;
  /** Callback when all images are loaded */
  onComplete?: (results: WarmCacheResult) => void;
  /** Callback on error */
  onError?: (src: string, error: Error) => void;
  /** Delay between sequential loads (ms) */
  sequentialDelay?: number;
}

interface WarmCacheResult {
  successful: string[];
  failed: string[];
  duration: number;
}

/**
 * Warm the image cache with critical images
 * 
 * @example Basic usage in main.tsx
 * ```tsx
 * import { warmImageCache, criticalImages } from '@/lib/cache-warming'
 * 
 * // Warm cache after initial render
 * warmImageCache(criticalImages)
 * ```
 * 
 * @example With progress tracking
 * ```tsx
 * warmImageCache(criticalImages, {
 *   onProgress: (loaded, total) => {
 *     console.log(`Loading: ${loaded}/${total}`)
 *   },
 *   onComplete: (result) => {
 *     console.log(`Loaded ${result.successful.length} images in ${result.duration}ms`)
 *   }
 * })
 * ```
 */
export async function warmImageCache(
  sources: string[],
  options: WarmCacheOptions = {}
): Promise<WarmCacheResult> {
  const {
    fetchPriority = "low",
    sequential = false,
    onStart,
    onProgress,
    onComplete,
    onError,
    sequentialDelay = 0,
  } = options;

  const startTime = performance.now();
  const successful: string[] = [];
  const failed: string[] = [];

  onStart?.();

  // Filter out already cached images
  const uncachedSources = sources.filter((src) => !imageCache.peek(src));

  if (uncachedSources.length === 0) {
    const result: WarmCacheResult = {
      successful: sources,
      failed: [],
      duration: performance.now() - startTime,
    };
    onComplete?.(result);
    return result;
  }

  const loadImage = async (src: string, index: number): Promise<void> => {
    try {
      await imageCache.preload(src, { fetchPriority });
      successful.push(src);
      onProgress?.(successful.length + failed.length, uncachedSources.length, src);
    } catch (error) {
      failed.push(src);
      onError?.(src, error as Error);
      onProgress?.(successful.length + failed.length, uncachedSources.length, src);
    }
  };

  if (sequential) {
    for (let i = 0; i < uncachedSources.length; i++) {
      await loadImage(uncachedSources[i], i);
      if (sequentialDelay > 0 && i < uncachedSources.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, sequentialDelay));
      }
    }
  } else {
    await Promise.all(uncachedSources.map((src, i) => loadImage(src, i)));
  }

  const result: WarmCacheResult = {
    successful,
    failed,
    duration: performance.now() - startTime,
  };

  onComplete?.(result);
  return result;
}

/**
 * Warm cache after idle period (uses requestIdleCallback)
 * Better for non-critical images that shouldn't block main thread
 */
export function warmImageCacheWhenIdle(
  sources: string[],
  options: WarmCacheOptions = {}
): void {
  const startWarming = () => {
    warmImageCache(sources, { ...options, fetchPriority: "low" });
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(startWarming, { timeout: 5000 });
  } else {
    // Fallback for Safari
    setTimeout(startWarming, 200);
  }
}

/**
 * Warm cache after DOM content is loaded
 */
export function warmImageCacheOnLoad(
  sources: string[],
  options: WarmCacheOptions = {}
): void {
  if (document.readyState === "complete") {
    warmImageCacheWhenIdle(sources, options);
  } else {
    window.addEventListener("load", () => {
      warmImageCacheWhenIdle(sources, options);
    });
  }
}

/**
 * Create a cache warming configuration for route-based preloading
 */
export function createRouteImageMap(
  routes: Record<string, string[]>
): Map<string, string[]> {
  return new Map(Object.entries(routes));
}

/**
 * Warm cache for a specific route
 */
export async function warmRouteImages(
  routeImageMap: Map<string, string[]>,
  route: string,
  options: WarmCacheOptions = {}
): Promise<WarmCacheResult | null> {
  const images = routeImageMap.get(route);
  if (!images || images.length === 0) {
    return null;
  }
  return warmImageCache(images, options);
}

// ============================================
// Critical Images Configuration
// ============================================

import { toBunnyCDNUrl, isBunnyCDNConfigured } from "./bunnycdn";

// Import critical images so Vite resolves them correctly
import heroBackground from "@/assets/hero-background.jpg";
import premiumLogo from "@/assets/iptv-quebec-premium-logo.png";
// Logo is in public folder for preloading
const animatedLogo = "/iptv-quebec-animated-logo.png";

/**
 * Get optimized image URL (BunnyCDN if configured, else original)
 */
const getOptimizedUrl = (src: string, options?: { width?: number; quality?: number }) => {
  if (isBunnyCDNConfigured()) {
    return toBunnyCDNUrl(src, { 
      quality: options?.quality || 85,
      width: options?.width,
      format: 'webp'
    });
  }
  return src;
};

/**
 * Critical images that should be preloaded on app initialization
 * Add your above-the-fold images here
 */
export const criticalImages: string[] = [
  getOptimizedUrl(heroBackground, { width: 1920, quality: 85 }),
  getOptimizedUrl(premiumLogo, { quality: 90 }),
  getOptimizedUrl(animatedLogo, { quality: 90 }),
];

/**
 * Secondary images to load after critical images
 * These load during idle time
 */
export const secondaryImages: string[] = [
  // Add secondary images here as needed
];

/**
 * Route-specific images for prefetching on navigation
 * Add route-specific images here for prefetching on hover
 */
export const routeImages = createRouteImageMap({
  "/": criticalImages,
  "/essai-gratuit": criticalImages,
  "/tarifs": criticalImages,
  "/liste-chaines": criticalImages,
  "/tutorial": criticalImages,
  "/revendeur": criticalImages,
  "/blog": criticalImages,
  "/contact": criticalImages,
  "/faq": criticalImages,
});

/**
 * Initialize cache warming - call this in main.tsx
 * 
 * @example
 * ```tsx
 * // In main.tsx, after ReactDOM.createRoot
 * import { initCacheWarming } from '@/lib/cache-warming'
 * 
 * initCacheWarming()
 * ```
 */
export function initCacheWarming(options?: {
  enableLogging?: boolean;
}): void {
  const { enableLogging = false } = options || {};

  // Preload critical images immediately with high priority
  warmImageCache(criticalImages, {
    fetchPriority: "high",
    onStart: () => {
      if (enableLogging) {
        console.log("[CacheWarming] Starting critical image preload...");
      }
    },
    onComplete: (result) => {
      if (enableLogging) {
        console.log(
          `[CacheWarming] Critical images loaded: ${result.successful.length}/${criticalImages.length} in ${result.duration.toFixed(0)}ms`
        );
      }
    },
    onError: (src, error) => {
      if (enableLogging) {
        console.warn(`[CacheWarming] Failed to load: ${src}`, error);
      }
    },
  });

  // Preload secondary images when idle
  if (secondaryImages.length > 0) {
    warmImageCacheWhenIdle(secondaryImages, {
      sequential: true,
      sequentialDelay: 100,
      onComplete: (result) => {
        if (enableLogging) {
          console.log(
            `[CacheWarming] Secondary images loaded: ${result.successful.length}/${secondaryImages.length}`
          );
        }
      },
    });
  }
}

export type { WarmCacheOptions, WarmCacheResult };
