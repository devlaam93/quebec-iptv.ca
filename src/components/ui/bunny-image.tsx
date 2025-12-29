import { OptimizedImage, OptimizedImageProps } from "./optimized-image";
import { 
  toBunnyCDNUrl, 
  generateBunnyWebpSrcSet, 
  generateBunnyAvifSrcSet,
  generateBunnyPlaceholder,
  isBunnyCDNConfigured,
  BunnyOptimizeOptions,
  BUNNY_RESPONSIVE_WIDTHS
} from "@/lib/bunnycdn";
import { useMemo } from "react";

/**
 * BunnyImage props extending OptimizedImage with BunnyCDN-specific options
 */
interface BunnyImageProps extends Omit<OptimizedImageProps, 'webpSrc' | 'placeholderSrc'> {
  /** BunnyCDN optimization options */
  bunnyOptions?: BunnyOptimizeOptions;
  /** Custom widths for responsive srcset (default: BUNNY_RESPONSIVE_WIDTHS) */
  responsiveWidths?: readonly number[] | number[];
  /** Enable AVIF format for best compression (default: true) */
  enableAvif?: boolean;
  /** Enable WebP format fallback (default: true) */
  enableWebp?: boolean;
  /** Default image quality (default: 85) */
  quality?: number;
  /** Enable auto blur-up placeholder (default: true) */
  autoPlaceholder?: boolean;
}

/**
 * BunnyImage - Optimized image component with BunnyCDN defaults
 * 
 * Automatically handles:
 * - Responsive srcset generation for multiple widths
 * - WebP and AVIF format switching
 * - Blur-up placeholder for smooth loading
 * - Quality optimization
 * 
 * @example Basic usage
 * ```tsx
 * <BunnyImage 
 *   src="/assets/hero.jpg" 
 *   alt="Hero image"
 *   width={1200}
 *   height={600}
 * />
 * ```
 * 
 * @example With custom options
 * ```tsx
 * <BunnyImage 
 *   src="/assets/product.jpg" 
 *   alt="Product"
 *   bunnyOptions={{ sharpen: true }}
 *   quality={90}
 *   responsiveWidths={[400, 800, 1200]}
 * />
 * ```
 * 
 * @example Priority image (above-the-fold)
 * ```tsx
 * <BunnyImage 
 *   src="/assets/hero.jpg" 
 *   alt="Hero"
 *   priority
 * />
 * ```
 */
export const BunnyImage = ({
  src,
  alt,
  bunnyOptions,
  responsiveWidths = BUNNY_RESPONSIVE_WIDTHS,
  enableAvif = true,
  enableWebp = true,
  quality = 90,
  autoPlaceholder = true,
  blurUp = true,
  priority = false,
  sizes,
  className,
  ...props
}: BunnyImageProps) => {
  // Generate optimized URLs and srcsets
  const { 
    optimizedSrc, 
    webpSrcSet, 
    avifSrcSet, 
    placeholderSrc,
    defaultSizes 
  } = useMemo(() => {
    // If BunnyCDN not configured, return original src
    if (!isBunnyCDNConfigured()) {
      return {
        optimizedSrc: src,
        webpSrcSet: undefined,
        avifSrcSet: undefined,
        placeholderSrc: undefined,
        defaultSizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      };
    }

    // Base optimized URL with quality
    const baseOptions: BunnyOptimizeOptions = {
      quality,
      ...bunnyOptions,
    };
    
    const optimized = toBunnyCDNUrl(src, baseOptions);
    
    // Generate responsive srcsets
    const widthsArray = [...responsiveWidths];
    
    const webp = enableWebp 
      ? generateBunnyWebpSrcSet(src, widthsArray) 
      : undefined;
    
    const avif = enableAvif 
      ? generateBunnyAvifSrcSet(src, widthsArray) 
      : undefined;
    
    // Generate placeholder for blur-up effect
    const placeholder = autoPlaceholder && blurUp
      ? generateBunnyPlaceholder(src)
      : undefined;

    // Generate sizes based on responsive widths
    const maxWidth = Math.max(...responsiveWidths);
    const defaultSizesStr = `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${maxWidth}px`;

    return {
      optimizedSrc: optimized,
      webpSrcSet: webp,
      avifSrcSet: avif,
      placeholderSrc: placeholder,
      defaultSizes: defaultSizesStr
    };
  }, [src, bunnyOptions, responsiveWidths, enableAvif, enableWebp, quality, autoPlaceholder, blurUp]);

  // Build srcSet array for OptimizedImage
  const srcSetArray = useMemo(() => {
    if (!isBunnyCDNConfigured()) return undefined;
    
    return responsiveWidths.map(width => ({
      src: toBunnyCDNUrl(src, { width, quality, ...bunnyOptions }),
      width
    }));
  }, [src, responsiveWidths, quality, bunnyOptions]);

  // Build WebP srcSet array
  const webpSrcSetArray = useMemo(() => {
    if (!isBunnyCDNConfigured() || !enableWebp) return undefined;
    
    return responsiveWidths.map(width => ({
      src: toBunnyCDNUrl(src, { width, quality, format: 'webp', ...bunnyOptions }),
      width
    }));
  }, [src, responsiveWidths, quality, enableWebp, bunnyOptions]);

  return (
    <OptimizedImage
      src={optimizedSrc}
      alt={alt}
      srcSet={srcSetArray}
      webpSrcSet={webpSrcSetArray}
      placeholderSrc={placeholderSrc}
      blurUp={blurUp && autoPlaceholder}
      priority={priority}
      sizes={sizes || defaultSizes}
      className={className}
      {...props}
    />
  );
};

/**
 * Preset configurations for common use cases
 */
export const BunnyImagePresets = {
  /** Hero/banner images - full width, highest quality */
  hero: {
    responsiveWidths: [768, 1024, 1280, 1536, 1920],
    quality: 95,
    sizes: "100vw",
    priority: true,
  },
  /** Thumbnail images - small, fast loading */
  thumbnail: {
    responsiveWidths: [150, 300, 450],
    quality: 85,
    sizes: "(max-width: 640px) 33vw, 150px",
    enableAvif: false,
  },
  /** Card images - medium size, high quality */
  card: {
    responsiveWidths: [320, 480, 640, 800],
    quality: 90,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px",
  },
  /** Blog post images - content width, high quality */
  blog: {
    responsiveWidths: [640, 768, 1024, 1280],
    quality: 90,
    sizes: "(max-width: 768px) 100vw, 768px",
  },
  /** Avatar/profile images - small, fixed size */
  avatar: {
    responsiveWidths: [48, 96, 144],
    quality: 90,
    sizes: "48px",
    enableAvif: false,
  },
} as const;

/**
 * Helper component for hero images with optimal defaults
 */
export const BunnyHeroImage = (props: Omit<BunnyImageProps, keyof typeof BunnyImagePresets.hero>) => (
  <BunnyImage {...BunnyImagePresets.hero} {...props} />
);

/**
 * Helper component for thumbnail images
 */
export const BunnyThumbnail = (props: Omit<BunnyImageProps, keyof typeof BunnyImagePresets.thumbnail>) => (
  <BunnyImage {...BunnyImagePresets.thumbnail} {...props} />
);

/**
 * Helper component for card images
 */
export const BunnyCardImage = (props: Omit<BunnyImageProps, keyof typeof BunnyImagePresets.card>) => (
  <BunnyImage {...BunnyImagePresets.card} {...props} />
);

/**
 * Helper component for blog post images
 */
export const BunnyBlogImage = (props: Omit<BunnyImageProps, keyof typeof BunnyImagePresets.blog>) => (
  <BunnyImage {...BunnyImagePresets.blog} {...props} />
);

/**
 * Helper component for avatar images
 */
export const BunnyAvatar = (props: Omit<BunnyImageProps, keyof typeof BunnyImagePresets.avatar>) => (
  <BunnyImage {...BunnyImagePresets.avatar} {...props} />
);

export type { BunnyImageProps };
