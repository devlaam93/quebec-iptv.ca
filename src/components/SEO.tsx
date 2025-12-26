import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string;
  path?: string;
  type?: string;
  noIndex?: boolean;
  /** Image alt text for accessibility */
  imageAlt?: string;
}

const BASE_URL = "https://quebec-iptv.ca";

const defaultSEO = {
  title: "Quebec IPTV - Meilleur Service IPTV au Quebec | +20,000 Chaines",
  description: "Service IPTV premium au Quebec avec +20,000 chaines TV, films et series. Qualite HD/4K, support 24/7. Essai gratuit disponible. Compatible tous appareils.",
  keywords: "iptv quebec, iptv canada, service iptv, chaines tv, streaming tv, iptv montreal, abonnement iptv, meilleur iptv",
  image: "/og-image.jpg",
  type: "website",
};

/**
 * SEO Component for managing Open Graph and Twitter Card metadata
 * 
 * Features:
 * - Unique og:image and twitter:image per page (1200×630 JPG)
 * - Custom title, description, and URL for each route
 * - Proper canonical URLs to prevent duplicate content
 * - Twitter large image card support
 * - Hreflang tags for international SEO
 * 
 * @example
 * ```tsx
 * <SEO
 *   title="Tarifs IPTV Québec | Forfaits dès 14,99$/mois"
 *   description="Forfaits IPTV flexibles : 1, 3, 6 ou 12 mois..."
 *   path="/tarifs"
 *   image="/og-tarifs.jpg"
 * />
 * ```
 */
export default function SEO({
  title,
  description,
  keywords,
  image,
  path = "/",
  type,
  noIndex = false,
  imageAlt,
}: SEOProps) {
  const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : (keywords || defaultSEO.keywords);
  
  // Normalize path to prevent duplicate content (remove trailing slashes except for root)
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  const fullUrl = `${BASE_URL}${normalizedPath}`;
  
  // Ensure image URL is absolute for social sharing
  const imageUrl = image || defaultSEO.image;
  const fullImage = imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`;
  
  // Use title for image alt if not provided
  const seoImageAlt = imageAlt || title || defaultSEO.title;

  const seo = {
    title: title || defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywordsString,
    image: fullImage,
    imageAlt: seoImageAlt,
    url: fullUrl,
    type: type || defaultSEO.type,
  };

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        if (selector.includes("property=")) {
          const propValue = selector.match(/property="([^"]+)"/)?.[1];
          if (propValue) element.setAttribute("property", propValue);
        } else if (selector.includes("name=")) {
          const nameValue = selector.match(/name="([^"]+)"/)?.[1];
          if (nameValue) element.setAttribute("name", nameValue);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Helper to update or create link tags
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let element = document.querySelector(selector) as HTMLLinkElement;
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        if (hreflang) element.setAttribute("hreflang", hreflang);
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Update meta tags
    updateMeta('meta[name="description"]', seo.description);
    updateMeta('meta[name="keywords"]', seo.keywords);
    updateMeta('meta[name="robots"]', noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    updateMeta('meta[name="language"]', "French");
    updateMeta('meta[name="geo.region"]', "CA-QC");
    updateMeta('meta[name="geo.placename"]', "Quebec");
    updateMeta('meta[name="author"]', "IPTV Québec");
    updateMeta('meta[name="publisher"]', "IPTV Québec");

    // Open Graph metadata (1200×630 image recommended)
    updateMeta('meta[property="og:type"]', seo.type);
    updateMeta('meta[property="og:url"]', seo.url);
    updateMeta('meta[property="og:title"]', seo.title);
    updateMeta('meta[property="og:description"]', seo.description);
    updateMeta('meta[property="og:image"]', seo.image);
    updateMeta('meta[property="og:image:secure_url"]', seo.image);
    updateMeta('meta[property="og:image:type"]', "image/jpeg");
    updateMeta('meta[property="og:image:width"]', "1200");
    updateMeta('meta[property="og:image:height"]', "630");
    updateMeta('meta[property="og:image:alt"]', seo.imageAlt);
    updateMeta('meta[property="og:locale"]', "fr_CA");
    updateMeta('meta[property="og:site_name"]', "IPTV Québec");

    // Twitter Card metadata (Large Image)
    updateMeta('meta[name="twitter:card"]', "summary_large_image");
    updateMeta('meta[name="twitter:site"]', "@QuebecIPTV");
    updateMeta('meta[name="twitter:creator"]', "@QuebecIPTV");
    updateMeta('meta[name="twitter:url"]', seo.url);
    updateMeta('meta[name="twitter:title"]', seo.title);
    updateMeta('meta[name="twitter:description"]', seo.description);
    updateMeta('meta[name="twitter:image"]', seo.image);
    updateMeta('meta[name="twitter:image:alt"]', seo.imageAlt);

    // Canonical URL - Critical for preventing duplicate content
    updateLink("canonical", seo.url);
    
    // Hreflang tags for international SEO
    updateLink("alternate", seo.url, "fr-CA");
    updateLink("alternate", seo.url, "fr");
    updateLink("alternate", seo.url, "x-default");

  }, [seo.title, seo.description, seo.keywords, seo.image, seo.imageAlt, seo.url, seo.type, noIndex]);

  return null;
}
