import { Helmet } from "react-helmet-async";

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

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content="fr_CA" />
      <meta property="og:site_name" content="Quebec IPTV" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Additional SEO */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content="French" />
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Quebec" />
    </Helmet>
  );
}
