import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { 
  toBunnyCDNUrl, 
  generateBunnyWebpSrcSet,
  generateBunnyPlaceholder,
  isBunnyCDNConfigured,
  BunnyOptimizeOptions,
  BUNNY_RESPONSIVE_WIDTHS 
} from "@/lib/bunnycdn";

/**
 * BunnyBackground props for optimized background images
 */
interface BunnyBackgroundProps {
  /** Background image source */
  src: string;
  /** Child content to render over the background */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** BunnyCDN optimization options */
  bunnyOptions?: BunnyOptimizeOptions;
  /** Custom widths for responsive images */
  responsiveWidths?: readonly number[] | number[];
  /** Image quality (default: 85) */
  quality?: number;
  /** Enable blur-up placeholder effect (default: true) */
  blurUp?: boolean;
  /** Blur amount for placeholder in pixels (default: 30) */
  blurAmount?: number;
  /** Load immediately without lazy loading (default: false) */
  priority?: boolean;
  /** Root margin for intersection observer (default: "200px") */
  rootMargin?: string;
  /** Background position (default: "center") */
  position?: string;
  /** Background size (default: "cover") */
  size?: string;
  /** Overlay gradient or color */
  overlay?: string;
  /** Overlay opacity (default: 0.5) */
  overlayOpacity?: number;
  /** Fixed background attachment for parallax effect */
  fixed?: boolean;
  /** Minimum height */
  minHeight?: string;
  /** Aspect ratio (e.g., "16/9", "4/3") */
  aspectRatio?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Custom hook for intersection observer-based lazy loading
 */
const useIntersectionObserver = (
  enabled: boolean,
  rootMargin: string = "200px"
): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setIsIntersecting(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return [containerRef, isIntersecting];
};

/**
 * BunnyBackground - Optimized background image component with BunnyCDN
 * 
 * Features:
 * - Lazy loading with intersection observer
 * - Blur-up placeholder for smooth loading
 * - Responsive background images via image-set
 * - Automatic WebP/AVIF format switching
 * - Customizable overlays for text contrast
 * - Optional parallax (fixed) effect
 * 
 * @example Hero section with overlay
 * ```tsx
 * <BunnyBackground 
 *   src="/assets/hero-background.jpg"
 *   overlay="linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)"
 *   minHeight="100vh"
 *   priority
 * >
 *   <h1>Welcome</h1>
 * </BunnyBackground>
 * ```
 * 
 * @example Banner with aspect ratio
 * ```tsx
 * <BunnyBackground 
 *   src="/assets/banner.jpg"
 *   aspectRatio="21/9"
 *   position="center top"
 * >
 *   <div className="flex items-center justify-center h-full">
 *     <h2>Banner Title</h2>
 *   </div>
 * </BunnyBackground>
 * ```
 * 
 * @example Parallax section
 * ```tsx
 * <BunnyBackground 
 *   src="/assets/parallax-bg.jpg"
 *   fixed
 *   minHeight="50vh"
 *   overlay="rgba(0,0,0,0.4)"
 * >
 *   <p>Scrolling content over fixed background</p>
 * </BunnyBackground>
 * ```
 */
export const BunnyBackground = ({
  src,
  children,
  className,
  bunnyOptions,
  responsiveWidths = BUNNY_RESPONSIVE_WIDTHS,
  quality = 85,
  blurUp = true,
  blurAmount = 30,
  priority = false,
  rootMargin = "200px",
  position = "center",
  size = "cover",
  overlay,
  overlayOpacity = 0.5,
  fixed = false,
  minHeight,
  aspectRatio,
  ariaLabel,
}: BunnyBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerRef, isInViewport] = useIntersectionObserver(!priority, rootMargin);

  // Generate optimized URLs
  const { optimizedUrl, placeholderUrl, imageSet } = (() => {
    if (!isBunnyCDNConfigured()) {
      return {
        optimizedUrl: src,
        placeholderUrl: null,
        imageSet: null
      };
    }

    const widthsArray = [...responsiveWidths];
    const baseOptions: BunnyOptimizeOptions = { quality, ...bunnyOptions };
    
    // Main optimized URL (largest size)
    const optimized = toBunnyCDNUrl(src, { 
      ...baseOptions, 
      width: Math.max(...widthsArray) 
    });
    
    // Placeholder for blur-up
    const placeholder = blurUp ? generateBunnyPlaceholder(src) : null;
    
    // Generate image-set for responsive backgrounds
    const webpSet = widthsArray.map(w => {
      const url = toBunnyCDNUrl(src, { ...baseOptions, width: w, format: 'webp' });
      return `url("${url}") ${w}w`;
    }).join(', ');

    return {
      optimizedUrl: optimized,
      placeholderUrl: placeholder,
      imageSet: `image-set(${webpSet})`
    };
  })();

  // Preload image when in viewport
  useEffect(() => {
    if (!isInViewport || isLoaded) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // Still show on error
    img.src = optimizedUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isInViewport, optimizedUrl, isLoaded]);

  // Container styles
  const containerStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(minHeight ? { minHeight } : {}),
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  // Background styles
  const backgroundStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundPosition: position,
    backgroundSize: size,
    backgroundRepeat: 'no-repeat',
    ...(fixed ? { backgroundAttachment: 'fixed' } : {}),
    transition: 'opacity 0.5s ease-out, filter 0.5s ease-out',
  };

  // Placeholder styles
  const placeholderStyles: React.CSSProperties = {
    ...backgroundStyles,
    backgroundImage: placeholderUrl ? `url("${placeholderUrl}")` : undefined,
    filter: `blur(${blurAmount}px)`,
    transform: 'scale(1.1)', // Prevent blur edge artifacts
    opacity: isLoaded ? 0 : 1,
    zIndex: 1,
  };

  // Main image styles
  const mainImageStyles: React.CSSProperties = {
    ...backgroundStyles,
    backgroundImage: isInViewport ? `url("${optimizedUrl}")` : undefined,
    opacity: isLoaded ? 1 : 0,
    zIndex: 2,
  };

  // Overlay styles
  const overlayStyles: React.CSSProperties = overlay ? {
    position: 'absolute',
    inset: 0,
    background: overlay.includes('gradient') ? overlay : overlay,
    opacity: overlay.includes('gradient') ? 1 : overlayOpacity,
    zIndex: 3,
  } : {};

  // Content styles
  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 4,
    height: '100%',
  };

  return (
    <div
      ref={containerRef}
      style={containerStyles}
      className={cn("relative", className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      {/* Skeleton when not in viewport */}
      {!isInViewport && !priority && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />
      )}

      {/* Blur placeholder */}
      {placeholderUrl && blurUp && isInViewport && (
        <div style={placeholderStyles} aria-hidden="true" />
      )}

      {/* Main background image */}
      {isInViewport && (
        <div style={mainImageStyles} aria-hidden="true" />
      )}

      {/* Overlay */}
      {overlay && <div style={overlayStyles} aria-hidden="true" />}

      {/* Content */}
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
};

/**
 * Preset configurations for common use cases
 */
export const BunnyBackgroundPresets = {
  /** Full-screen hero section */
  hero: {
    minHeight: "100vh",
    priority: true,
    quality: 90,
    responsiveWidths: [1024, 1536, 1920],
  },
  /** Half-screen hero */
  heroHalf: {
    minHeight: "50vh",
    priority: true,
    quality: 90,
    responsiveWidths: [1024, 1536, 1920],
  },
  /** Wide banner */
  banner: {
    aspectRatio: "21/9",
    quality: 85,
    responsiveWidths: [768, 1280, 1920],
  },
  /** Standard banner */
  bannerStandard: {
    aspectRatio: "16/9",
    quality: 85,
    responsiveWidths: [768, 1280, 1920],
  },
  /** Card background */
  card: {
    quality: 80,
    responsiveWidths: [400, 600, 800],
  },
  /** Parallax section */
  parallax: {
    fixed: true,
    minHeight: "60vh",
    quality: 85,
    responsiveWidths: [1024, 1536, 1920],
  },
} as const;

/**
 * Helper component for hero backgrounds
 */
export const BunnyHeroBackground = (
  props: Omit<BunnyBackgroundProps, keyof typeof BunnyBackgroundPresets.hero>
) => <BunnyBackground {...BunnyBackgroundPresets.hero} {...props} />;

/**
 * Helper component for banner backgrounds
 */
export const BunnyBannerBackground = (
  props: Omit<BunnyBackgroundProps, keyof typeof BunnyBackgroundPresets.banner>
) => <BunnyBackground {...BunnyBackgroundPresets.banner} {...props} />;

/**
 * Helper component for parallax backgrounds
 */
export const BunnyParallaxBackground = (
  props: Omit<BunnyBackgroundProps, keyof typeof BunnyBackgroundPresets.parallax>
) => <BunnyBackground {...BunnyBackgroundPresets.parallax} {...props} />;

export type { BunnyBackgroundProps };
