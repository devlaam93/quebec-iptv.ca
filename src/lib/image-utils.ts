/**
 * Image optimization utilities for vite-imagetools and BunnyCDN
 * 
 * Usage with vite-imagetools:
 * - Add ?webp to any image import to get WebP version
 * - Add ?optimize to get optimized WebP with quality settings
 * - Add ?w=800 to resize images
 * 
 * Usage with BunnyCDN:
 * - Set VITE_BUNNY_CDN_URL environment variable to your Pull Zone URL
 * - Use toBunnyCDNUrl() to transform image URLs
 * - Use generateBunnySrcSet() for responsive images
 * 
 * Example:
 * import heroImage from '@/assets/hero.jpg?webp'
 * import heroImageOptimized from '@/assets/hero.jpg?optimize'
 * import heroImageSmall from '@/assets/hero.jpg?w=400&format=webp'
 */

import { 
  isBunnyCDNConfigured, 
  toBunnyCDNUrl, 
  generateBunnySrcSet,
  generateBunnyWebpSrcSet 
} from './bunnycdn';

/**
 * Generates srcSet for responsive images
 * Supports BunnyCDN when configured, otherwise uses vite-imagetools format
 * 
 * @param baseSrc - The base image source
 * @param widths - Array of widths to generate
 * @returns srcSet string for use in img or source elements
 */
export const generateSrcSet = (baseSrc: string, widths: number[] = [640, 768, 1024, 1280, 1536]): string => {
  // Use BunnyCDN if configured
  if (isBunnyCDNConfigured()) {
    return generateBunnySrcSet(baseSrc, widths);
  }
  
  // Fallback to vite-imagetools format
  return widths
    .map((w) => `${baseSrc}?w=${w}&format=webp ${w}w`)
    .join(', ');
};

/**
 * Generates WebP srcSet for responsive images
 * 
 * @param baseSrc - The base image source
 * @param widths - Array of widths to generate
 * @returns WebP srcSet string
 */
export const generateWebpSrcSet = (baseSrc: string, widths: number[] = [640, 768, 1024, 1280, 1536]): string => {
  // Use BunnyCDN if configured
  if (isBunnyCDNConfigured()) {
    return generateBunnyWebpSrcSet(baseSrc, widths);
  }
  
  // Fallback to vite-imagetools format
  return widths
    .map((w) => `${baseSrc}?w=${w}&format=webp ${w}w`)
    .join(', ');
};

/**
 * Get WebP URL for images
 * Supports BunnyCDN, Unsplash, and local images
 * 
 * @param src - Original image source
 * @returns WebP version URL or null if not applicable
 */
export const getWebPUrl = (src: string): string | null => {
  // Use BunnyCDN if configured
  if (isBunnyCDNConfigured()) {
    return toBunnyCDNUrl(src, { format: 'webp', quality: 85 });
  }
  
  // For Unsplash images, add fm=webp parameter
  if (src.includes('images.unsplash.com')) {
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}fm=webp`;
  }
  
  // For local images imported with vite-imagetools, 
  // the WebP version should be imported separately with ?webp
  return null;
};

/**
 * Check if browser supports WebP
 * @returns Promise that resolves to true if WebP is supported
 */
export const supportsWebP = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  // Check if we've already cached the result
  const cached = sessionStorage.getItem('webp-support');
  if (cached !== null) return cached === 'true';
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const result = img.width > 0 && img.height > 0;
      sessionStorage.setItem('webp-support', String(result));
      resolve(result);
    };
    img.onerror = () => {
      sessionStorage.setItem('webp-support', 'false');
      resolve(false);
    };
    img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
};

/**
 * Image format priorities based on browser support
 */
export const IMAGE_FORMATS = {
  modern: ['avif', 'webp', 'jpg'],
  fallback: ['webp', 'jpg'],
  legacy: ['jpg', 'png'],
} as const;

/**
 * Get optimal image format based on browser support
 * For use with vite-imagetools format parameter
 */
export const getOptimalFormat = (): 'avif' | 'webp' | 'jpg' => {
  if (typeof window === 'undefined') return 'jpg';
  
  // Simple feature detection for modern formats
  const canvas = document.createElement('canvas');
  if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    return 'webp';
  }
  
  return 'jpg';
};
