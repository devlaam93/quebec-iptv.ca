import { useState, ImgHTMLAttributes, useMemo, useRef, useEffect } from "react";
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
  /**
   * Low-quality placeholder image for blur-up effect
   * Use with vite-imagetools: import placeholder from './img.jpg?w=20&blur=10'
   */
  placeholderSrc?: string;
  /**
   * Enable blur-up placeholder effect (auto-generates if placeholderSrc not provided)
   */
  blurUp?: boolean;
  /**
   * Placeholder blur amount in pixels (default: 20)
   */
  blurAmount?: number;
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
 * Generate a tiny placeholder URL for external services
 */
const generatePlaceholderUrl = (url: string): string | null => {
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=20&blur=50&q=10`;
  }
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', '/upload/w_20,e_blur:1000,q_10/');
  }
  if (url.includes('imgix.net')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=20&blur=50&q=10`;
  }
  return null;
};

/**
 * OptimizedImage component with WebP support, blur-up placeholders, and responsive srcset
 * 
 * Features:
 * - Blur-up placeholder effect for smooth loading
 * - Responsive srcset for different viewport sizes
 * - WebP format with automatic fallback
 * - Lazy loading by default (use priority={true} for above-the-fold)
 * - Error handling with optional fallback image
 * - Prevents layout shift with width/height or aspectRatio
 * - Auto-generates srcset for Unsplash, Cloudinary, Imgix
 * - Works with vite-imagetools for build-time optimization
 * 
 * @example With blur-up placeholder
 * ```tsx
 * import heroPlaceholder from '@/assets/hero.jpg?w=20&blur=10'
 * 
 * <OptimizedImage 
 *   src={heroImage} 
 *   placeholderSrc={heroPlaceholder}
 *   alt="Hero" 
 *   width={1200} 
 *   height={600} 
 * />
 * ```
 * 
 * @example Auto blur-up for external images
 * ```tsx
 * <OptimizedImage 
 *   src="https://images.unsplash.com/photo-xxx" 
 *   blurUp
 *   alt="Hero" 
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
  placeholderSrc,
  blurUp = false,
  blurAmount = 20,
  className,
  ...props
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate srcset strings and placeholder
  const { srcSetString, webpSrcSetString, webpUrl, placeholderUrl } = useMemo(() => {
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

    // Generate placeholder URL
    const placeholder = placeholderSrc || (blurUp ? generatePlaceholderUrl(src) : null);

    return {
      srcSetString: srcSetStr || externalSrcSet,
      webpSrcSetString: webpSrcSetStr || externalWebpSrcSet,
      webpUrl: webpUrlResult,
      placeholderUrl: placeholder,
    };
  }, [src, srcSet, webpSrcSet, webpSrc, placeholderSrc, blurUp]);

  // Check if image is already cached/loaded
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalHeight > 0) {
      setIsLoaded(true);
      setShowPlaceholder(false);
    }
  }, []);

  // Hide placeholder after load transition
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShowPlaceholder(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const displaySrc = hasError && fallbackSrc ? fallbackSrc : src;

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  const placeholderStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: `blur(${blurAmount}px)`,
    transform: 'scale(1.1)', // Prevent blur edge artifacts
    transition: 'opacity 0.3s ease-out',
    opacity: isLoaded ? 0 : 1,
    zIndex: 1,
  };

  const imageStyles = cn(
    "transition-opacity duration-300",
    !isLoaded && placeholderUrl && "opacity-0",
    isLoaded && "opacity-100",
    className
  );

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

  const renderImage = () => {
    if ((hasWebpSupport || hasSrcSet) && !hasError) {
      return (
        <picture>
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
            ref={imgRef}
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
        ref={imgRef}
        src={displaySrc}
        {...imgProps}
      />
    );
  };

  // Render with blur-up placeholder
  if (placeholderUrl && !hasError) {
    return (
      <div style={containerStyles} className={cn("inline-block", className)}>
        {/* Blurred placeholder */}
        {showPlaceholder && (
          <img
            src={placeholderUrl}
            alt=""
            aria-hidden="true"
            style={placeholderStyles}
          />
        )}
        {/* Main image */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {renderImage()}
        </div>
      </div>
    );
  }

  // Render without placeholder
  if (aspectRatio) {
    return (
      <div style={{ aspectRatio }}>
        {renderImage()}
      </div>
    );
  }

  return renderImage();
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

export { OptimizedImage, generateSrcSetString, generatePlaceholderUrl, DEFAULT_WIDTHS };
export type { OptimizedImageProps, ResponsiveSrc };
