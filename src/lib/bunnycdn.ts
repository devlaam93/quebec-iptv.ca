/**
 * BunnyCDN Image Optimization Utilities
 * 
 * Provides URL transformation and srcset generation for BunnyCDN's Bunny Optimizer.
 * Works with Pull Zone URLs to deliver optimized images with automatic format conversion.
 * 
 * @example
 * import { toBunnyCDNUrl, generateBunnySrcSet } from '@/lib/bunnycdn';
 * 
 * // Basic optimization
 * const optimizedUrl = toBunnyCDNUrl('/assets/hero.jpg', { width: 800, format: 'webp' });
 * 
 * // Generate responsive srcset
 * const srcSet = generateBunnySrcSet('/assets/hero.jpg');
 */

/** BunnyCDN Pull Zone URL */
const BUNNY_CDN_URL = 'https://quebec-iptv.b-cdn.net';

/** Default widths for responsive images */
export const BUNNY_RESPONSIVE_WIDTHS = [640, 768, 1024, 1280, 1536, 1920];

/** Options for BunnyCDN Bunny Optimizer */
export interface BunnyOptimizeOptions {
  /** Target width in pixels */
  width?: number;
  /** Target height in pixels */
  height?: number;
  /** Image quality (1-100, default: 85) */
  quality?: number;
  /** Output format (auto detects best format for browser) */
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  /** Enable sharpening */
  sharpen?: boolean;
  /** Crop mode */
  crop?: 'fit' | 'crop' | 'force' | 'pad';
  /** Crop gravity for positioning */
  crop_gravity?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  /** Flip image */
  flip?: boolean;
  /** Flop (mirror) image */
  flop?: boolean;
  /** Brightness adjustment (-100 to 100) */
  brightness?: number;
  /** Saturation adjustment (-100 to 100) */
  saturation?: number;
  /** Contrast adjustment (-100 to 100) */
  contrast?: number;
  /** Blur amount (1-100) */
  blur?: number;
}

/**
 * Check if BunnyCDN is configured
 */
export const isBunnyCDNConfigured = (): boolean => {
  return Boolean(BUNNY_CDN_URL);
};

/**
 * Get the BunnyCDN base URL
 */
export const getBunnyCDNUrl = (): string => {
  return BUNNY_CDN_URL;
};

/**
 * Check if a URL is already a BunnyCDN URL
 */
export const isBunnyCDNUrl = (url: string): boolean => {
  if (!BUNNY_CDN_URL) return false;
  return url.includes('.b-cdn.net') || url.startsWith(BUNNY_CDN_URL);
};

/**
 * Transform an image URL to BunnyCDN optimized URL
 * 
 * @param src - Original image source (can be relative path or full URL)
 * @param options - Bunny Optimizer options
 * @returns Optimized BunnyCDN URL, or original src if BunnyCDN not configured
 * 
 * @example
 * // Basic usage
 * toBunnyCDNUrl('/assets/image.jpg', { width: 800, format: 'webp' })
 * // Returns: https://your-zone.b-cdn.net/assets/image.jpg?width=800&format=webp
 */
export const toBunnyCDNUrl = (src: string, options?: BunnyOptimizeOptions): string => {
  // If BunnyCDN not configured, return original
  if (!BUNNY_CDN_URL) return src;
  
  // If already a full BunnyCDN URL, just add params
  if (isBunnyCDNUrl(src)) {
    return addBunnyParams(src, options);
  }
  
  // Skip external URLs (keep as-is unless you want to proxy them)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // Skip data URLs
  if (src.startsWith('data:')) {
    return src;
  }
  
  // Build the BunnyCDN URL
  // Handle both /assets/... and assets/... formats
  const cleanPath = src.startsWith('/') ? src : `/${src}`;
  const baseUrl = `${BUNNY_CDN_URL}${cleanPath}`;
  
  return addBunnyParams(baseUrl, options);
};

/**
 * Add Bunny Optimizer parameters to a URL
 */
const addBunnyParams = (url: string, options?: BunnyOptimizeOptions): string => {
  if (!options || Object.keys(options).length === 0) return url;
  
  const params = new URLSearchParams();
  
  if (options.width) params.set('width', String(options.width));
  if (options.height) params.set('height', String(options.height));
  if (options.quality) params.set('quality', String(options.quality));
  if (options.format) params.set('format', options.format);
  if (options.sharpen) params.set('sharpen', 'true');
  if (options.crop) params.set('crop', options.crop);
  if (options.crop_gravity) params.set('crop_gravity', options.crop_gravity);
  if (options.flip) params.set('flip', 'true');
  if (options.flop) params.set('flop', 'true');
  if (options.brightness !== undefined) params.set('brightness', String(options.brightness));
  if (options.saturation !== undefined) params.set('saturation', String(options.saturation));
  if (options.contrast !== undefined) params.set('contrast', String(options.contrast));
  if (options.blur) params.set('blur', String(options.blur));
  
  const queryString = params.toString();
  if (!queryString) return url;
  
  // Handle existing query parameters
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${queryString}`;
};

/**
 * Generate responsive srcset string for BunnyCDN
 * 
 * @param src - Original image source
 * @param widths - Array of widths to generate (default: BUNNY_RESPONSIVE_WIDTHS)
 * @param options - Additional Bunny Optimizer options applied to all sizes
 * @returns srcset string for use in img or source elements
 * 
 * @example
 * generateBunnySrcSet('/assets/hero.jpg')
 * // Returns: "https://zone.b-cdn.net/assets/hero.jpg?width=640 640w, ..."
 */
export const generateBunnySrcSet = (
  src: string,
  widths: number[] = BUNNY_RESPONSIVE_WIDTHS,
  options?: Omit<BunnyOptimizeOptions, 'width'>
): string => {
  if (!BUNNY_CDN_URL) return '';
  
  return widths
    .map(w => {
      const url = toBunnyCDNUrl(src, { ...options, width: w });
      return `${url} ${w}w`;
    })
    .join(', ');
};

/**
 * Generate WebP srcset for BunnyCDN
 * 
 * @param src - Original image source
 * @param widths - Array of widths to generate
 * @returns srcset string with WebP format
 */
export const generateBunnyWebpSrcSet = (
  src: string,
  widths: number[] = BUNNY_RESPONSIVE_WIDTHS
): string => {
  return generateBunnySrcSet(src, widths, { format: 'webp', quality: 85 });
};

/**
 * Generate AVIF srcset for BunnyCDN (best compression)
 * 
 * @param src - Original image source
 * @param widths - Array of widths to generate
 * @returns srcset string with AVIF format
 */
export const generateBunnyAvifSrcSet = (
  src: string,
  widths: number[] = BUNNY_RESPONSIVE_WIDTHS
): string => {
  return generateBunnySrcSet(src, widths, { format: 'avif', quality: 80 });
};

/**
 * Generate a low-quality placeholder URL for blur-up effect
 * 
 * @param src - Original image source
 * @returns Tiny placeholder URL for blur-up loading
 */
export const generateBunnyPlaceholder = (src: string): string => {
  if (!BUNNY_CDN_URL) return src;
  
  return toBunnyCDNUrl(src, {
    width: 20,
    quality: 10,
    blur: 50,
    format: 'webp',
  });
};

/**
 * Get optimized image URL with sensible defaults
 * 
 * @param src - Original image source
 * @param width - Target width
 * @returns Optimized URL with auto format detection
 */
export const getOptimizedImageUrl = (src: string, width?: number): string => {
  return toBunnyCDNUrl(src, {
    width,
    quality: 85,
    format: 'auto', // Let Bunny choose best format for browser
  });
};
