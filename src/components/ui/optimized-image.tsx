import { useState, ImgHTMLAttributes, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Responsive image source set configuration
 */
interface ResponsiveSrc {
  /** Image source URL */
  src: string;
  /** Width descriptor (e.g., 640 for 640w) */
  width: number;
}

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /** Primary image source */
  src: string;
  /** WebP version of the image (for format switching) */
  webpSrc?: string;
  /** Alt text for accessibility (required) */
  alt: string;
  /** Intrinsic width for layout stability */
  width?: number;
  /** Intrinsic height for layout stability */
  height?: number;
  /** Load immediately (above-the-fold images) */
  priority?: boolean;
  /** Fallback image if primary fails to load */
  fallbackSrc?: string;
  /** CSS aspect-ratio value */
  aspectRatio?: string;
  /** Responsive sizes attribute */
  sizes?: string;
  /** 
   * Responsive srcset array for different viewport widths
   * Each entry should have { src, width } 
   */
  srcSet?: ResponsiveSrc[];
  /**
   * WebP responsive srcset array
   * Use with vite-imagetools: import img640 from './img.jpg?w=640&format=webp'
   */
  webpSrcSet?: ResponsiveSrc[];
}

/**
 * Default breakpoint widths for responsive images
 */
const DEFAULT_WIDTHS = [640, 768, 1024, 1280, 1536];

/**
 * Generate srcset string from responsive source array
 */
const generateSrcSetString = (sources: ResponsiveSrc[]): string => {
  return sources
    .map(({ src, width }) => `${src} ${width}w`)
    .join(', ');
};

/**
 * Generate responsive srcset for external image services
 */
const generateExternalSrcSet = (
  url: string, 
  widths: number[] = DEFAULT_WIDTHS,
  format?: 'webp' | 'jpg'
): string | null => {
  // Unsplash responsive URLs
  if (url.includes('images.unsplash.com')) {
    return widths
      .map(w => {
        const baseUrl = url.split('?')[0];
        const formatParam = format === 'webp' ? '&fm=webp' : '';
        return `${baseUrl}?w=${w}&fit=crop${formatParam} ${w}w`;
      })
      .join(', ');
  }

  // Cloudinary responsive URLs
  if (url.includes('cloudinary.com')) {
    return widths
      .map(w => {
        const formatTransform = format === 'webp' ? 'f_webp,' : '';
        const transformed = url.replace('/upload/', `/upload/${formatTransform}w_${w}/`);
        return `${transformed} ${w}w`;
      })
      .join(', ');
  }

  // Imgix responsive URLs
  if (url.includes('imgix.net')) {
    return widths
      .map(w => {
        const separator = url.includes('?') ? '&' : '?';
        const formatParam = format === 'webp' ? '&fm=webp' : '';
        return `${url}${separator}w=${w}${formatParam} ${w}w`;
      })
      .join(', ');
  }

  return null;
};

/**
 * OptimizedImage component with WebP support, responsive srcset, and fallbacks
 * 
 * Features:
 * - Responsive srcset for different viewport sizes
 * - WebP format with automatic fallback
 * - Lazy loading by default (use priority={true} for above-the-fold)
 * - Error handling with optional fallback image
 * - Prevents layout shift with width/height or aspectRatio
 * - Auto-generates srcset for Unsplash, Cloudinary, Imgix
 * - Works with vite-imagetools for build-time optimization
 * 
 * @example Basic usage
 * ```tsx
 * <OptimizedImage src={heroImage} alt="Hero" width={1200} height={600} />
 * ```
 * 
 * @example With responsive srcset (vite-imagetools)
 * ```tsx
 * import img640 from '@/assets/hero.jpg?w=640'
 * import img1024 from '@/assets/hero.jpg?w=1024'
 * import img1536 from '@/assets/hero.jpg?w=1536'
 * import img640Webp from '@/assets/hero.jpg?w=640&format=webp'
 * import img1024Webp from '@/assets/hero.jpg?w=1024&format=webp'
 * import img1536Webp from '@/assets/hero.jpg?w=1536&format=webp'
 * 
 * <OptimizedImage 
 *   src={img1536}
 *   srcSet={[
 *     { src: img640, width: 640 },
 *     { src: img1024, width: 1024 },
 *     { src: img1536, width: 1536 },
 *   ]}
 *   webpSrcSet={[
 *     { src: img640Webp, width: 640 },
 *     { src: img1024Webp, width: 1024 },
 *     { src: img1536Webp, width: 1536 },
 *   ]}
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 *   alt="Hero image"
 * />
 * ```
 */
const OptimizedImage = ({
  src,
  webpSrc,
  alt,
  width,
  height,
  priority = false,
  fallbackSrc,
  aspectRatio,
  sizes,
  srcSet,
  webpSrcSet,
  className,
  ...props
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate srcset strings
  const { srcSetString, webpSrcSetString, webpUrl } = useMemo(() => {
    // If explicit srcSet provided, use it
    const srcSetStr = srcSet ? generateSrcSetString(srcSet) : null;
    const webpSrcSetStr = webpSrcSet ? generateSrcSetString(webpSrcSet) : null;

    // Try to generate srcset for external services
    const externalSrcSet = !srcSetStr ? generateExternalSrcSet(src, DEFAULT_WIDTHS) : null;
    const externalWebpSrcSet = !webpSrcSetStr ? generateExternalSrcSet(src, DEFAULT_WIDTHS, 'webp') : null;

    // Determine WebP URL
    let webpUrlResult = webpSrc || null;
    if (!webpUrlResult) {
      if (src.includes('images.unsplash.com')) {
        const separator = src.includes('?') ? '&' : '?';
        webpUrlResult = `${src}${separator}fm=webp`;
      } else if (src.includes('cloudinary.com')) {
        webpUrlResult = src.replace('/upload/', '/upload/f_webp/');
      } else if (src.includes('imgix.net')) {
        const separator = src.includes('?') ? '&' : '?';
        webpUrlResult = `${src}${separator}fm=webp`;
      }
    }

    return {
      srcSetString: srcSetStr || externalSrcSet,
      webpSrcSetString: webpSrcSetStr || externalWebpSrcSet,
      webpUrl: webpUrlResult,
    };
  }, [src, srcSet, webpSrcSet, webpSrc]);

  const displaySrc = hasError && fallbackSrc ? fallbackSrc : src;

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const imageStyles = cn(
    "transition-opacity duration-300",
    !isLoaded && "opacity-0",
    isLoaded && "opacity-100",
    className
  );

  const containerStyles = aspectRatio ? { aspectRatio } : undefined;

  // Determine sizes attribute
  const sizesAttr = sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  // Common image props
  const imgProps = {
    alt,
    width,
    height,
    loading: priority ? "eager" as const : "lazy" as const,
    decoding: priority ? "sync" as const : "async" as const,
    fetchPriority: priority ? "high" as const : "auto" as const,
    onError: handleError,
    onLoad: handleLoad,
    className: imageStyles,
    sizes: sizesAttr,
    ...props,
  };

  // Use picture element for format switching and responsive images
  const hasWebpSupport = webpUrl || webpSrcSetString;
  const hasSrcSet = srcSetString || webpSrcSetString;

  if ((hasWebpSupport || hasSrcSet) && !hasError) {
    return (
      <picture style={containerStyles}>
        {/* WebP sources (highest priority) */}
        {webpSrcSetString && (
          <source 
            srcSet={webpSrcSetString} 
            sizes={sizesAttr}
            type="image/webp" 
          />
        )}
        {webpUrl && !webpSrcSetString && (
          <source srcSet={webpUrl} type="image/webp" />
        )}
        
        {/* Original format sources */}
        {srcSetString && (
          <source 
            srcSet={srcSetString} 
            sizes={sizesAttr}
            type={getImageType(displaySrc)} 
          />
        )}
        
        {/* Fallback img element */}
        <img 
          src={displaySrc} 
          srcSet={srcSetString || undefined}
          {...imgProps} 
        />
      </picture>
    );
  }

  // Simple img fallback
  return (
    <img
      src={displaySrc}
      style={containerStyles}
      {...imgProps}
    />
  );
};

// Helper to determine image MIME type
const getImageType = (src: string): string => {
  const extension = src.split('.').pop()?.toLowerCase().split('?')[0];
  switch (extension) {
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    case 'avif':
      return 'image/avif';
    default:
      return 'image/jpeg';
  }
};

export { OptimizedImage, generateSrcSetString, DEFAULT_WIDTHS };
export type { OptimizedImageProps, ResponsiveSrc };
