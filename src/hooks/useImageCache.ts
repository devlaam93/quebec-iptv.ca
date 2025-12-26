import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { imageCache, CachedImage, ImageCacheStats } from "@/lib/image-cache";

/**
 * Hook to access the global image cache
 * 
 * @example Check if image is cached before rendering
 * ```tsx
 * const { isCached, getCachedImage } = useImageCache()
 * 
 * const cachedInfo = isCached(heroImage) ? getCachedImage(heroImage) : null
 * ```
 * 
 * @example Subscribe to cache stats
 * ```tsx
 * const { stats } = useImageCache()
 * console.log(`Cache hit rate: ${(stats.hitRate * 100).toFixed(1)}%`)
 * ```
 */
export function useImageCache() {
  const [stats, setStats] = useState<ImageCacheStats>(imageCache.getStats());

  // Subscribe to cache changes
  useEffect(() => {
    const unsubscribe = imageCache.subscribe(() => {
      setStats(imageCache.getStats());
    });
    return unsubscribe;
  }, []);

  const isCached = useCallback((src: string): boolean => {
    return imageCache.peek(src);
  }, []);

  const getCachedImage = useCallback((src: string): CachedImage | undefined => {
    return imageCache.get(src);
  }, []);

  const preload = useCallback(
    async (src: string, options?: { fetchPriority?: "high" | "low" | "auto" }) => {
      return imageCache.preload(src, options);
    },
    []
  );

  const preloadMany = useCallback(
    async (
      sources: string[],
      options?: { fetchPriority?: "high" | "low" | "auto"; sequential?: boolean }
    ) => {
      return imageCache.preloadMany(sources, options);
    },
    []
  );

  const clearCache = useCallback(() => {
    imageCache.clear();
  }, []);

  return {
    stats,
    isCached,
    getCachedImage,
    preload,
    preloadMany,
    clearCache,
    cacheSize: stats.totalImages,
  };
}

/**
 * Hook to check if a specific image is cached (with reactive updates)
 * 
 * @example
 * ```tsx
 * const isCached = useIsImageCached(heroImage)
 * 
 * return isCached ? <img src={heroImage} /> : <Skeleton />
 * ```
 */
export function useIsImageCached(src: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return imageCache.subscribe((event) => {
        if (event.src === src || event.type === "clear") {
          onStoreChange();
        }
      });
    },
    [src]
  );

  const getSnapshot = useCallback(() => {
    return imageCache.peek(src);
  }, [src]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/**
 * Hook to get cached image dimensions (useful for layout calculations)
 * 
 * @example
 * ```tsx
 * const dimensions = useCachedImageDimensions(heroImage)
 * 
 * if (dimensions) {
 *   console.log(`Image is ${dimensions.width}x${dimensions.height}`)
 * }
 * ```
 */
export function useCachedImageDimensions(
  src: string
): { width: number; height: number } | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return imageCache.subscribe((event) => {
        if (event.src === src || event.type === "clear") {
          onStoreChange();
        }
      });
    },
    [src]
  );

  const getSnapshot = useCallback(() => {
    const cached = imageCache.get(src);
    if (cached) {
      return { width: cached.width, height: cached.height };
    }
    return null;
  }, [src]);

  // Need to serialize for comparison
  const getDimensions = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(getSnapshot()),
    () => JSON.stringify(getSnapshot())
  );

  return getDimensions ? JSON.parse(getDimensions) : null;
}

/**
 * Hook to preload an image and track its loading state
 * 
 * @example
 * ```tsx
 * const { isLoading, isLoaded, error, image } = usePreloadImage(heroImage)
 * 
 * if (isLoading) return <Skeleton />
 * if (error) return <ErrorState />
 * return <img src={heroImage} />
 * ```
 */
export function usePreloadImage(src: string, options?: { immediate?: boolean }) {
  const { immediate = true } = options || {};
  
  const [state, setState] = useState<{
    isLoading: boolean;
    isLoaded: boolean;
    error: Error | null;
    image: CachedImage | null;
  }>(() => {
    const cached = imageCache.get(src);
    return {
      isLoading: !cached && immediate,
      isLoaded: !!cached,
      error: null,
      image: cached || null,
    };
  });

  useEffect(() => {
    if (!immediate) return;

    // Check cache first
    const cached = imageCache.get(src);
    if (cached) {
      setState({
        isLoading: false,
        isLoaded: true,
        error: null,
        image: cached,
      });
      return;
    }

    // Preload
    setState((prev) => ({ ...prev, isLoading: true }));

    imageCache
      .preload(src)
      .then((image) => {
        setState({
          isLoading: false,
          isLoaded: true,
          error: null,
          image,
        });
      })
      .catch((error) => {
        setState({
          isLoading: false,
          isLoaded: false,
          error,
          image: null,
        });
      });
  }, [src, immediate]);

  const preload = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const image = await imageCache.preload(src);
      setState({
        isLoading: false,
        isLoaded: true,
        error: null,
        image,
      });
      return image;
    } catch (error) {
      setState({
        isLoading: false,
        isLoaded: false,
        error: error as Error,
        image: null,
      });
      throw error;
    }
  }, [src]);

  return { ...state, preload };
}

export default useImageCache;
