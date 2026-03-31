import { useCallback, useRef } from "react";
import { toBunnyCDNUrl, isBunnyCDNConfigured } from "@/lib/bunnycdn";

// Cache to track already preloaded images
const preloadedImages = new Set<string>();

// Pending preload timeouts
const pendingPreloads = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Preload an image with BunnyCDN optimization
 */
const preloadBunnyImage = (src: string, width: number = 1200): void => {
  if (!src || preloadedImages.has(src)) return;

  const optimizedSrc = isBunnyCDNConfigured() 
    ? toBunnyCDNUrl(src, { width, quality: 85 })
    : src;

  const img = new Image();
  img.src = optimizedSrc;
  
  img.onload = () => {
    preloadedImages.add(src);
  };
};

/**
 * Hook for preloading blog article images on hover
 * 
 * Features:
 * - Debounced preloading (waits 150ms before starting)
 * - Preloads hero image at full resolution
 * - Caches preloaded images to avoid duplicate requests
 * - Cancellable on hover end
 * 
 * @example
 * ```tsx
 * const { onHover, onHoverEnd } = useBlogImagePreload();
 * 
 * <Card 
 *   onMouseEnter={() => onHover(post.image)}
 *   onMouseLeave={onHoverEnd}
 * >
 * ```
 */
export function useBlogImagePreload() {
  const currentSlugRef = useRef<string | null>(null);

  /**
   * Start preloading article image on hover
   * Uses debouncing to avoid preloading on quick mouse movements
   */
  const onHover = useCallback((imageUrl: string, slug?: string) => {
    if (!imageUrl) return;
    
    const key = slug || imageUrl;
    currentSlugRef.current = key;

    // Cancel any existing timeout for this image
    const existingTimeout = pendingPreloads.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Debounce preloading by 150ms
    const timeout = setTimeout(() => {
      if (currentSlugRef.current === key) {
        // Preload hero image at full resolution (1200px for blog posts)
        preloadBunnyImage(imageUrl, 1200);
        
        // Also preload a WebP version if BunnyCDN is configured
        if (isBunnyCDNConfigured()) {
          const webpImg = new Image();
          webpImg.src = toBunnyCDNUrl(imageUrl, { 
            width: 1200, 
            quality: 85, 
            format: 'webp' 
          });
        }
      }
      pendingPreloads.delete(key);
    }, 150);

    pendingPreloads.set(key, timeout);
  }, []);

  /**
   * Cancel pending preload when hover ends
   */
  const onHoverEnd = useCallback(() => {
    currentSlugRef.current = null;
    
    // Cancel all pending preloads
    pendingPreloads.forEach((timeout) => {
      clearTimeout(timeout);
    });
    pendingPreloads.clear();
  }, []);

  /**
   * Check if an image has been preloaded
   */
  const isPreloaded = useCallback((src: string): boolean => {
    return preloadedImages.has(src);
  }, []);

  /**
   * Immediately preload an image (no debouncing)
   */
  const preloadNow = useCallback((imageUrl: string): void => {
    preloadBunnyImage(imageUrl, 1200);
  }, []);

  return {
    onHover,
    onHoverEnd,
    isPreloaded,
    preloadNow,
  };
}

export default useBlogImagePreload;
