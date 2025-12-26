import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  webpSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  aspectRatio?: string;
  sizes?: string;
}

/**
 * OptimizedImage component with WebP support and fallbacks
 * 
 * Features:
 * - WebP format with automatic fallback to original format
 * - Lazy loading by default (use priority={true} for above-the-fold images)
 * - Error handling with optional fallback image
 * - Prevents layout shift with width/height or aspectRatio
 * - Supports external image services with WebP (Unsplash, etc.)
 * - Works with vite-imagetools for build-time optimization
 * 
 * Usage with vite-imagetools:
 * ```tsx
 * import heroJpg from '@/assets/hero.jpg'
 * import heroWebp from '@/assets/hero.jpg?webp'
 * 
 * <OptimizedImage src={heroJpg} webpSrc={heroWebp} alt="Hero" />
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
  className,
  ...props
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate WebP URL for supported external services
  const getWebPUrl = (url: string): string | null => {
    // If explicit webpSrc provided, use it
    if (webpSrc) {
      return webpSrc;
    }

    // Unsplash supports fm=webp parameter
    if (url.includes('images.unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}fm=webp`;
    }
    
    // Cloudinary supports f_webp
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_webp/');
    }

    // Imgix supports fm=webp
    if (url.includes('imgix.net')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}fm=webp`;
    }

    return null;
  };

  const webpUrl = getWebPUrl(src);
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
    sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    ...props,
  };

  // If we have a WebP source, use picture element for format switching
  if (webpUrl && !hasError) {
    return (
      <picture style={containerStyles}>
        <source srcSet={webpUrl} type="image/webp" />
        <source srcSet={displaySrc} type={getImageType(displaySrc)} />
        <img src={displaySrc} {...imgProps} />
      </picture>
    );
  }

  // Fallback to regular img element
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

export { OptimizedImage };
export type { OptimizedImageProps };
