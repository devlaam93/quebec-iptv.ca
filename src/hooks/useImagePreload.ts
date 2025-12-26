import { useState, useEffect, useCallback, useRef } from "react";

interface PreloadedImage {
  src: string;
  status: "loading" | "loaded" | "error";
  width?: number;
  height?: number;
}

interface UseImagePreloadOptions {
  /** Start preloading immediately (default: true) */
  immediate?: boolean;
  /** Preload images sequentially instead of in parallel (default: false) */
  sequential?: boolean;
  /** Priority hint for fetch (default: "auto") */
  fetchPriority?: "high" | "low" | "auto";
  /** Callback when all images are loaded */
  onAllLoaded?: () => void;
  /** Callback when any image fails */
  onError?: (src: string, error: Error) => void;
}

interface UseImagePreloadResult {
  /** Current loading status of all images */
  images: Map<string, PreloadedImage>;
  /** Whether all images have finished loading (success or error) */
  isComplete: boolean;
  /** Whether all images loaded successfully */
  isSuccess: boolean;
  /** Whether any images are still loading */
  isLoading: boolean;
  /** Number of images that loaded successfully */
  loadedCount: number;
  /** Number of images that failed to load */
  errorCount: number;
  /** Total number of images */
  totalCount: number;
  /** Manually trigger preloading (if immediate: false) */
  preload: () => void;
  /** Preload a single additional image */
  preloadImage: (src: string) => Promise<HTMLImageElement>;
  /** Cancel all pending preloads */
  cancel: () => void;
}

/**
 * Hook to preload critical images programmatically
 * 
 * @example Basic usage - preload hero images
 * ```tsx
 * import heroImage from '@/assets/hero.jpg'
 * import logoImage from '@/assets/logo.png'
 * 
 * const { isComplete, isLoading } = useImagePreload([heroImage, logoImage])
 * 
 * if (isLoading) return <Skeleton />
 * return <HeroSection />
 * ```
 * 
 * @example With callbacks
 * ```tsx
 * const { isSuccess } = useImagePreload(
 *   [image1, image2],
 *   {
 *     onAllLoaded: () => console.log('All images ready!'),
 *     onError: (src) => console.error(`Failed to load: ${src}`)
 *   }
 * )
 * ```
 * 
 * @example Deferred preloading
 * ```tsx
 * const { preload, isComplete } = useImagePreload(images, { immediate: false })
 * 
 * // Start preloading on user interaction
 * <button onClick={preload}>Load gallery</button>
 * ```
 * 
 * @example Preload single image dynamically
 * ```tsx
 * const { preloadImage } = useImagePreload([])
 * 
 * const handleHover = async () => {
 *   await preloadImage('/high-res-image.jpg')
 * }
 * ```
 */
export function useImagePreload(
  sources: string[],
  options: UseImagePreloadOptions = {}
): UseImagePreloadResult {
  const {
    immediate = true,
    sequential = false,
    fetchPriority = "auto",
    onAllLoaded,
    onError,
  } = options;

  const [images, setImages] = useState<Map<string, PreloadedImage>>(
    () => new Map(sources.map((src) => [src, { src, status: "loading" as const }]))
  );
  const [hasStarted, setHasStarted] = useState(immediate);
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  // Calculate derived states
  const loadedCount = Array.from(images.values()).filter((img) => img.status === "loaded").length;
  const errorCount = Array.from(images.values()).filter((img) => img.status === "error").length;
  const totalCount = images.size;
  const isComplete = loadedCount + errorCount === totalCount && totalCount > 0;
  const isSuccess = loadedCount === totalCount && totalCount > 0;
  const isLoading = hasStarted && !isComplete;

  // Preload a single image
  const preloadSingleImage = useCallback(
    (src: string, signal?: AbortSignal): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        // Set fetch priority if supported
        if ("fetchPriority" in img) {
          (img as any).fetchPriority = fetchPriority;
        }

        const cleanup = () => {
          img.onload = null;
          img.onerror = null;
        };

        img.onload = () => {
          cleanup();
          if (mountedRef.current) {
            setImages((prev) => {
              const next = new Map(prev);
              next.set(src, {
                src,
                status: "loaded",
                width: img.naturalWidth,
                height: img.naturalHeight,
              });
              return next;
            });
          }
          resolve(img);
        };

        img.onerror = () => {
          cleanup();
          const error = new Error(`Failed to load image: ${src}`);
          if (mountedRef.current) {
            setImages((prev) => {
              const next = new Map(prev);
              next.set(src, { src, status: "error" });
              return next;
            });
            onError?.(src, error);
          }
          reject(error);
        };

        // Handle abort signal
        if (signal) {
          signal.addEventListener("abort", () => {
            cleanup();
            img.src = "";
            reject(new Error("Preload cancelled"));
          });
        }

        img.src = src;
      });
    },
    [fetchPriority, onError]
  );

  // Preload all images
  const preloadAll = useCallback(async () => {
    if (sources.length === 0) return;

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      if (sequential) {
        // Sequential loading
        for (const src of sources) {
          if (signal.aborted) break;
          try {
            await preloadSingleImage(src, signal);
          } catch {
            // Continue with next image even if one fails
          }
        }
      } else {
        // Parallel loading
        await Promise.allSettled(
          sources.map((src) => preloadSingleImage(src, signal))
        );
      }

      if (mountedRef.current) {
        onAllLoaded?.();
      }
    } catch {
      // Cancelled or other error
    }
  }, [sources, sequential, preloadSingleImage, onAllLoaded]);

  // Start preloading
  const preload = useCallback(() => {
    setHasStarted(true);
  }, []);

  // Cancel preloading
  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  // Preload a single additional image
  const preloadImage = useCallback(
    async (src: string): Promise<HTMLImageElement> => {
      // Add to tracking if not already present
      setImages((prev) => {
        if (prev.has(src)) return prev;
        const next = new Map(prev);
        next.set(src, { src, status: "loading" });
        return next;
      });
      return preloadSingleImage(src);
    },
    [preloadSingleImage]
  );

  // Effect to start preloading
  useEffect(() => {
    if (hasStarted && sources.length > 0) {
      preloadAll();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [hasStarted, preloadAll, sources.length]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reset images when sources change
  useEffect(() => {
    setImages(new Map(sources.map((src) => [src, { src, status: "loading" as const }])));
    if (immediate) {
      setHasStarted(true);
    }
  }, [sources.join(","), immediate]);

  return {
    images,
    isComplete,
    isSuccess,
    isLoading,
    loadedCount,
    errorCount,
    totalCount,
    preload,
    preloadImage,
    cancel,
  };
}

/**
 * Preload a single image imperatively (outside of React)
 * 
 * @example
 * ```ts
 * // Preload before navigation
 * await preloadImage('/next-page-hero.jpg')
 * navigate('/next-page')
 * ```
 */
export function preloadImage(
  src: string,
  options: { fetchPriority?: "high" | "low" | "auto" } = {}
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    if ("fetchPriority" in img && options.fetchPriority) {
      (img as any).fetchPriority = options.fetchPriority;
    }

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Preload multiple images imperatively (outside of React)
 * 
 * @example
 * ```ts
 * // Preload gallery images
 * const results = await preloadImages([img1, img2, img3])
 * console.log(`Loaded ${results.filter(r => r.status === 'fulfilled').length} images`)
 * ```
 */
export function preloadImages(
  sources: string[],
  options: { fetchPriority?: "high" | "low" | "auto"; sequential?: boolean } = {}
): Promise<PromiseSettledResult<HTMLImageElement>[]> {
  const { sequential = false, ...imageOptions } = options;

  if (sequential) {
    return sources.reduce(async (acc, src) => {
      const results = await acc;
      try {
        const img = await preloadImage(src, imageOptions);
        results.push({ status: "fulfilled", value: img });
      } catch (error) {
        results.push({ status: "rejected", reason: error });
      }
      return results;
    }, Promise.resolve([] as PromiseSettledResult<HTMLImageElement>[]));
  }

  return Promise.allSettled(sources.map((src) => preloadImage(src, imageOptions)));
}

/**
 * Add a preload link to the document head for high-priority images
 * 
 * @example
 * ```ts
 * // In your app initialization or route component
 * addPreloadLink('/hero-image.jpg', 'image')
 * ```
 */
export function addPreloadLink(
  href: string,
  as: "image" | "script" | "style" | "font" = "image",
  options: {
    type?: string;
    crossOrigin?: "anonymous" | "use-credentials";
    fetchPriority?: "high" | "low" | "auto";
  } = {}
): HTMLLinkElement | null {
  // Check if link already exists
  const existing = document.querySelector(`link[rel="preload"][href="${href}"]`);
  if (existing) return existing as HTMLLinkElement;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;

  if (options.type) link.type = options.type;
  if (options.crossOrigin) link.crossOrigin = options.crossOrigin;
  if (options.fetchPriority && "fetchPriority" in link) {
    (link as any).fetchPriority = options.fetchPriority;
  }

  document.head.appendChild(link);
  return link;
}

export default useImagePreload;
