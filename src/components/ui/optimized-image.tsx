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
  className,
  ...props
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate WebP URL for supported external services
  const getWebPUrl = (url: string): string | null => {
    // Unsplash supports fm=webp parameter
    if (url.includes('images.unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}fm=webp`;
    }
    
    // For local images, check if webpSrc was provided
    if (webpSrc) {
      return webpSrc;
    }

    // Try to create WebP path for local assets
    if (url.startsWith('/') || url.includes('/assets/')) {
      const webpPath = url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      if (webpPath !== url) {
        return webpPath;
      }
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

  // If we have a WebP source, use picture element
  if (webpUrl && !hasError) {
    return (
      <picture style={containerStyles}>
        <source srcSet={webpUrl} type="image/webp" />
        <source srcSet={displaySrc} type={getImageType(displaySrc)} />
        <img
          src={displaySrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onError={handleError}
          onLoad={handleLoad}
          className={imageStyles}
          {...props}
        />
      </picture>
    );
  }

  // Fallback to regular img element
  return (
    <img
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      onError={handleError}
      onLoad={handleLoad}
      className={imageStyles}
      style={containerStyles}
      {...props}
    />
  );
};

// Helper to determine image MIME type
const getImageType = (src: string): string => {
  const extension = src.split('.').pop()?.toLowerCase();
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
