import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string;
  path?: string;
  type?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://quebec-iptv.ca";

const defaultSEO = {
  title: "Quebec IPTV - Meilleur Service IPTV au Quebec | +20,000 Chaines",
  description: "Service IPTV premium au Quebec avec +20,000 chaines TV, films et series. Qualite HD/4K, support 24/7. Essai gratuit disponible. Compatible tous appareils.",
  keywords: "iptv quebec, iptv canada, service iptv, chaines tv, streaming tv, iptv montreal, abonnement iptv, meilleur iptv",
  image: "/og-image.jpg",
  type: "website",
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  path = "/",
  type,
  noIndex = false,
}: SEOProps) {
  const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : (keywords || defaultSEO.keywords);
  const fullUrl = `${BASE_URL}${path}`;
  const fullImage = image?.startsWith("http") ? image : `${BASE_URL}${image || defaultSEO.image}`;

  const seo = {
    title: title || defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywordsString,
    image: fullImage,
    url: fullUrl,
    type: type || defaultSEO.type,
  };

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, content: string, attribute = "name") => {
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
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Update meta tags
    updateMeta('meta[name="description"]', seo.description);
    updateMeta('meta[name="keywords"]', seo.keywords);
    updateMeta('meta[name="robots"]', noIndex ? "noindex, nofollow" : "index, follow");
    updateMeta('meta[name="language"]', "French");
    updateMeta('meta[name="geo.region"]', "CA-QC");
    updateMeta('meta[name="geo.placename"]', "Quebec");

    // Open Graph
    updateMeta('meta[property="og:type"]', seo.type);
    updateMeta('meta[property="og:url"]', seo.url);
    updateMeta('meta[property="og:title"]', seo.title);
    updateMeta('meta[property="og:description"]', seo.description);
    updateMeta('meta[property="og:image"]', seo.image);
    updateMeta('meta[property="og:locale"]', "fr_CA");
    updateMeta('meta[property="og:site_name"]', "Quebec IPTV");

    // Twitter
    updateMeta('meta[name="twitter:card"]', "summary_large_image");
    updateMeta('meta[name="twitter:url"]', seo.url);
    updateMeta('meta[name="twitter:title"]', seo.title);
    updateMeta('meta[name="twitter:description"]', seo.description);
    updateMeta('meta[name="twitter:image"]', seo.image);

    // Canonical URL
    updateLink("canonical", seo.url);
  }, [seo.title, seo.description, seo.keywords, seo.image, seo.url, seo.type, noIndex]);

  return null;
}
