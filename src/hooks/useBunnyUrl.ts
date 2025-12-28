import { useMemo, useCallback } from "react";
import {
  toBunnyCDNUrl,
  generateBunnySrcSet,
  generateBunnyWebpSrcSet,
  generateBunnyAvifSrcSet,
  generateBunnyPlaceholder,
  isBunnyCDNConfigured,
  isBunnyCDNUrl,
  getBunnyCDNUrl,
  BunnyOptimizeOptions,
  BUNNY_RESPONSIVE_WIDTHS,
} from "@/lib/bunnycdn";

/**
 * Return type for the useBunnyUrl hook
 */
interface UseBunnyUrlReturn {
  /** Whether BunnyCDN is configured */
  isConfigured: boolean;
  /** The BunnyCDN base URL */
  baseUrl: string;
  /** Transform an image URL to optimized BunnyCDN URL */
  getUrl: (src: string, options?: BunnyOptimizeOptions) => string;
  /** Get WebP version of an image */
  getWebpUrl: (src: string, options?: Omit<BunnyOptimizeOptions, 'format'>) => string;
  /** Get AVIF version of an image (best compression) */
  getAvifUrl: (src: string, options?: Omit<BunnyOptimizeOptions, 'format'>) => string;
  /** Generate responsive srcset string */
  getSrcSet: (src: string, widths?: number[], options?: Omit<BunnyOptimizeOptions, 'width'>) => string;
  /** Generate WebP srcset string */
  getWebpSrcSet: (src: string, widths?: number[]) => string;
  /** Generate AVIF srcset string */
  getAvifSrcSet: (src: string, widths?: number[]) => string;
  /** Generate blur-up placeholder URL */
  getPlaceholder: (src: string) => string;
  /** Check if a URL is already a BunnyCDN URL */
  isBunnyUrl: (url: string) => boolean;
  /** Get optimized URL for Open Graph / meta tags (1200x630) */
  getOgImageUrl: (src: string) => string;
  /** Get optimized URL for Twitter card (1200x600) */
  getTwitterImageUrl: (src: string) => string;
  /** Get optimized favicon URL */
  getFaviconUrl: (src: string, size?: number) => string;
  /** Get optimized thumbnail URL */
  getThumbnailUrl: (src: string, size?: number) => string;
}

/**
 * useBunnyUrl - Hook for programmatic BunnyCDN URL generation
 * 
 * Provides utility functions to generate optimized image URLs for use in:
 * - Meta tags (og:image, twitter:image)
 * - Structured data (JSON-LD)
 * - Dynamic image sources
 * - Preloading and prefetching
 * 
 * @example Basic usage
 * ```tsx
 * const { getUrl, getWebpUrl, isConfigured } = useBunnyUrl();
 * 
 * // Generate optimized URL
 * const optimizedSrc = getUrl('/assets/hero.jpg', { width: 800 });
 * 
 * // Generate WebP URL
 * const webpSrc = getWebpUrl('/assets/hero.jpg', { width: 800 });
 * ```
 * 
 * @example Meta tags
 * ```tsx
 * const { getOgImageUrl, getTwitterImageUrl } = useBunnyUrl();
 * 
 * <meta property="og:image" content={getOgImageUrl('/assets/og-image.jpg')} />
 * <meta name="twitter:image" content={getTwitterImageUrl('/assets/og-image.jpg')} />
 * ```
 * 
 * @example Structured data
 * ```tsx
 * const { getUrl } = useBunnyUrl();
 * 
 * const structuredData = {
 *   "@type": "Article",
 *   "image": getUrl('/assets/article-hero.jpg', { width: 1200, quality: 90 })
 * };
 * ```
 * 
 * @example Preloading
 * ```tsx
 * const { getUrl } = useBunnyUrl();
 * 
 * useEffect(() => {
 *   const link = document.createElement('link');
 *   link.rel = 'preload';
 *   link.as = 'image';
 *   link.href = getUrl('/assets/hero.jpg', { width: 1920, format: 'webp' });
 *   document.head.appendChild(link);
 * }, []);
 * ```
 */
export const useBunnyUrl = (): UseBunnyUrlReturn => {
  const isConfigured = useMemo(() => isBunnyCDNConfigured(), []);
  const baseUrl = useMemo(() => getBunnyCDNUrl(), []);

  /** Transform an image URL to optimized BunnyCDN URL */
  const getUrl = useCallback(
    (src: string, options?: BunnyOptimizeOptions): string => {
      return toBunnyCDNUrl(src, options);
    },
    []
  );

  /** Get WebP version of an image */
  const getWebpUrl = useCallback(
    (src: string, options?: Omit<BunnyOptimizeOptions, 'format'>): string => {
      return toBunnyCDNUrl(src, { ...options, format: 'webp' });
    },
    []
  );

  /** Get AVIF version of an image */
  const getAvifUrl = useCallback(
    (src: string, options?: Omit<BunnyOptimizeOptions, 'format'>): string => {
      return toBunnyCDNUrl(src, { ...options, format: 'avif' });
    },
    []
  );

  /** Generate responsive srcset string */
  const getSrcSet = useCallback(
    (
      src: string,
      widths: number[] = [...BUNNY_RESPONSIVE_WIDTHS],
      options?: Omit<BunnyOptimizeOptions, 'width'>
    ): string => {
      return generateBunnySrcSet(src, widths, options);
    },
    []
  );

  /** Generate WebP srcset string */
  const getWebpSrcSet = useCallback(
    (src: string, widths: number[] = [...BUNNY_RESPONSIVE_WIDTHS]): string => {
      return generateBunnyWebpSrcSet(src, widths);
    },
    []
  );

  /** Generate AVIF srcset string */
  const getAvifSrcSet = useCallback(
    (src: string, widths: number[] = [...BUNNY_RESPONSIVE_WIDTHS]): string => {
      return generateBunnyAvifSrcSet(src, widths);
    },
    []
  );

  /** Generate blur-up placeholder URL */
  const getPlaceholder = useCallback((src: string): string => {
    return generateBunnyPlaceholder(src);
  }, []);

  /** Check if a URL is already a BunnyCDN URL */
  const isBunnyUrl = useCallback((url: string): boolean => {
    return isBunnyCDNUrl(url);
  }, []);

  /** Get optimized URL for Open Graph / meta tags (1200x630) */
  const getOgImageUrl = useCallback((src: string): string => {
    return toBunnyCDNUrl(src, {
      width: 1200,
      height: 630,
      quality: 90,
      format: 'jpeg', // OG images need wide browser support
      crop: 'fit',
    });
  }, []);

  /** Get optimized URL for Twitter card (1200x600) */
  const getTwitterImageUrl = useCallback((src: string): string => {
    return toBunnyCDNUrl(src, {
      width: 1200,
      height: 600,
      quality: 90,
      format: 'jpeg',
      crop: 'fit',
    });
  }, []);

  /** Get optimized favicon URL */
  const getFaviconUrl = useCallback((src: string, size: number = 32): string => {
    return toBunnyCDNUrl(src, {
      width: size,
      height: size,
      quality: 100,
      format: 'png',
      crop: 'fit',
    });
  }, []);

  /** Get optimized thumbnail URL */
  const getThumbnailUrl = useCallback(
    (src: string, size: number = 150): string => {
      return toBunnyCDNUrl(src, {
        width: size,
        height: size,
        quality: 80,
        format: 'webp',
        crop: 'crop',
        crop_gravity: 'center',
      });
    },
    []
  );

  return {
    isConfigured,
    baseUrl,
    getUrl,
    getWebpUrl,
    getAvifUrl,
    getSrcSet,
    getWebpSrcSet,
    getAvifSrcSet,
    getPlaceholder,
    isBunnyUrl,
    getOgImageUrl,
    getTwitterImageUrl,
    getFaviconUrl,
    getThumbnailUrl,
  };
};

/**
 * Standalone utility functions for non-React contexts
 * Use these when you need BunnyCDN URLs outside of React components
 */
export const bunnyUrlUtils = {
  /** Check if BunnyCDN is configured */
  isConfigured: isBunnyCDNConfigured,
  
  /** Get the BunnyCDN base URL */
  getBaseUrl: getBunnyCDNUrl,
  
  /** Transform an image URL to optimized BunnyCDN URL */
  getUrl: toBunnyCDNUrl,
  
  /** Get WebP version of an image */
  getWebpUrl: (src: string, options?: Omit<BunnyOptimizeOptions, 'format'>) =>
    toBunnyCDNUrl(src, { ...options, format: 'webp' }),
  
  /** Get AVIF version of an image */
  getAvifUrl: (src: string, options?: Omit<BunnyOptimizeOptions, 'format'>) =>
    toBunnyCDNUrl(src, { ...options, format: 'avif' }),
  
  /** Generate responsive srcset string */
  getSrcSet: generateBunnySrcSet,
  
  /** Generate WebP srcset string */
  getWebpSrcSet: generateBunnyWebpSrcSet,
  
  /** Generate AVIF srcset string */
  getAvifSrcSet: generateBunnyAvifSrcSet,
  
  /** Generate blur-up placeholder URL */
  getPlaceholder: generateBunnyPlaceholder,
  
  /** Check if a URL is already a BunnyCDN URL */
  isBunnyUrl: isBunnyCDNUrl,
  
  /** Get optimized URL for Open Graph / meta tags (1200x630) */
  getOgImageUrl: (src: string) =>
    toBunnyCDNUrl(src, {
      width: 1200,
      height: 630,
      quality: 90,
      format: 'jpeg',
      crop: 'fit',
    }),
  
  /** Get optimized URL for Twitter card (1200x600) */
  getTwitterImageUrl: (src: string) =>
    toBunnyCDNUrl(src, {
      width: 1200,
      height: 600,
      quality: 90,
      format: 'jpeg',
      crop: 'fit',
    }),
  
  /** Get optimized thumbnail URL */
  getThumbnailUrl: (src: string, size: number = 150) =>
    toBunnyCDNUrl(src, {
      width: size,
      height: size,
      quality: 80,
      format: 'webp',
      crop: 'crop',
      crop_gravity: 'center',
    }),
};

export type { UseBunnyUrlReturn, BunnyOptimizeOptions };
