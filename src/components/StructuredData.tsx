import { useEffect } from "react";

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  contactEmail?: string;
  sameAs?: string[];
}

interface WebSiteData {
  name: string;
  url: string;
  description: string;
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  currency: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
  url: string;
  image?: string;
  brand?: string;
  sku?: string;
  reviewCount?: number;
  ratingValue?: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceData {
  name: string;
  description: string;
  provider: string;
  url: string;
  areaServed?: string;
  serviceType?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleData {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

interface OfferData {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  availability: "InStock" | "OutOfStock" | "PreOrder" | "LimitedAvailability";
  url: string;
  validFrom?: string;
  validThrough?: string;
  seller?: string;
}

interface SoftwareApplicationData {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  url: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

interface VideoObjectData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToData {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: string;
  steps: HowToStep[];
}

interface ItemListData {
  name: string;
  description: string;
  itemListElement: Array<{
    name: string;
    description?: string;
    url?: string;
    image?: string;
  }>;
}

type StructuredDataProps =
  | { type: "organization"; data: OrganizationData }
  | { type: "website"; data: WebSiteData }
  | { type: "product"; data: ProductData }
  | { type: "faq"; data: FAQItem[] }
  | { type: "local-business"; data: OrganizationData & { 
      address?: { 
        streetAddress?: string;
        addressLocality?: string;
        addressRegion?: string;
        postalCode?: string;
        addressCountry?: string;
      };
      telephone?: string;
      priceRange?: string;
      openingHours?: string[];
      geo?: { latitude: number; longitude: number };
      paymentAccepted?: string[];
      currenciesAccepted?: string;
      areaServed?: string[];
    } }
  | { type: "service"; data: ServiceData }
  | { type: "breadcrumb"; data: BreadcrumbItem[] }
  | { type: "article"; data: ArticleData }
  | { type: "offer"; data: OfferData }
  | { type: "software-application"; data: SoftwareApplicationData }
  | { type: "video-object"; data: VideoObjectData }
  | { type: "how-to"; data: HowToData }
  | { type: "item-list"; data: ItemListData };

const StructuredData = (props: StructuredDataProps) => {
  useEffect(() => {
    let jsonLd: object;

    switch (props.type) {
      case "organization":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${props.data.url}/#organization`,
          name: props.data.name,
          url: props.data.url,
          logo: {
            "@type": "ImageObject",
            url: props.data.logo,
            width: 1200,
            height: 630,
          },
          description: props.data.description,
          contactPoint: props.data.contactEmail
            ? {
                "@type": "ContactPoint",
                email: props.data.contactEmail,
                contactType: "customer service",
                availableLanguage: ["French", "English"],
                areaServed: "CA",
              }
            : undefined,
          sameAs: props.data.sameAs || [],
        };
        break;

      case "website":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${props.data.url}/#website`,
          name: props.data.name,
          url: props.data.url,
          description: props.data.description,
          inLanguage: "fr-CA",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${props.data.url}/blog?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };
        break;

      case "product":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: props.data.name,
          description: props.data.description,
          image: props.data.image,
          brand: {
            "@type": "Brand",
            name: props.data.brand || "IPTV Québec",
          },
          sku: props.data.sku,
          offers: {
            "@type": "Offer",
            price: props.data.price,
            priceCurrency: props.data.currency,
            availability: `https://schema.org/${props.data.availability}`,
            url: props.data.url,
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            seller: {
              "@type": "Organization",
              name: "IPTV Québec",
            },
          },
          ...(props.data.reviewCount && props.data.ratingValue && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: props.data.ratingValue,
              reviewCount: props.data.reviewCount,
              bestRating: 5,
              worstRating: 1,
            },
          }),
        };
        break;

      case "faq":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: props.data.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        };
        break;

      case "local-business":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${props.data.url}/#localbusiness`,
          name: props.data.name,
          url: props.data.url,
          logo: props.data.logo,
          image: props.data.logo,
          description: props.data.description,
          telephone: props.data.telephone,
          priceRange: props.data.priceRange || "$$",
          ...(props.data.address && {
            address: {
              "@type": "PostalAddress",
              streetAddress: props.data.address.streetAddress,
              addressLocality: props.data.address.addressLocality,
              addressRegion: props.data.address.addressRegion,
              postalCode: props.data.address.postalCode,
              addressCountry: props.data.address.addressCountry || "CA",
            },
          }),
          ...(props.data.geo && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: props.data.geo.latitude,
              longitude: props.data.geo.longitude,
            },
          }),
          ...(props.data.openingHours && {
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
          }),
          ...(props.data.paymentAccepted && {
            paymentAccepted: props.data.paymentAccepted.join(", "),
          }),
          ...(props.data.currenciesAccepted && {
            currenciesAccepted: props.data.currenciesAccepted,
          }),
          ...(props.data.areaServed && {
            areaServed: props.data.areaServed.map(area => ({
              "@type": "Country",
              name: area,
            })),
          }),
          sameAs: props.data.sameAs || [],
        };
        break;

      case "service":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Service",
          name: props.data.name,
          description: props.data.description,
          provider: {
            "@type": "Organization",
            name: props.data.provider,
            url: "https://quebec-iptv.ca",
          },
          url: props.data.url,
          areaServed: {
            "@type": "Country",
            name: props.data.areaServed || "Canada",
          },
          serviceType: props.data.serviceType || "IPTV Streaming Service",
          ...(props.data.offers && {
            offers: {
              "@type": "Offer",
              price: props.data.offers.price,
              priceCurrency: props.data.offers.priceCurrency,
            },
          }),
        };
        break;

      case "breadcrumb":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: props.data.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };
        break;

      case "article":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: props.data.headline,
          description: props.data.description,
          image: props.data.image,
          datePublished: props.data.datePublished,
          dateModified: props.data.dateModified || props.data.datePublished,
          author: {
            "@type": "Organization",
            name: props.data.author,
            url: "https://quebec-iptv.ca",
          },
          publisher: {
            "@type": "Organization",
            name: "IPTV Québec",
            logo: {
              "@type": "ImageObject",
              url: "https://quebec-iptv.ca/og-image.jpg",
              width: 1200,
              height: 630,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": props.data.url,
          },
          inLanguage: "fr-CA",
        };
        break;

      case "offer":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Offer",
          name: props.data.name,
          description: props.data.description,
          price: props.data.price,
          priceCurrency: props.data.priceCurrency,
          availability: `https://schema.org/${props.data.availability}`,
          url: props.data.url,
          ...(props.data.validFrom && { validFrom: props.data.validFrom }),
          ...(props.data.validThrough && { priceValidUntil: props.data.validThrough }),
          seller: {
            "@type": "Organization",
            name: props.data.seller || "IPTV Québec",
          },
        };
        break;

      case "software-application":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: props.data.name,
          description: props.data.description,
          applicationCategory: props.data.applicationCategory,
          operatingSystem: props.data.operatingSystem,
          url: props.data.url,
          ...(props.data.offers && {
            offers: {
              "@type": "Offer",
              price: props.data.offers.price,
              priceCurrency: props.data.offers.priceCurrency,
            },
          }),
          ...(props.data.aggregateRating && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: props.data.aggregateRating.ratingValue,
              ratingCount: props.data.aggregateRating.ratingCount,
              bestRating: 5,
              worstRating: 1,
            },
          }),
        };
        break;

      case "video-object":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: props.data.name,
          description: props.data.description,
          thumbnailUrl: props.data.thumbnailUrl,
          uploadDate: props.data.uploadDate,
          ...(props.data.duration && { duration: props.data.duration }),
          ...(props.data.contentUrl && { contentUrl: props.data.contentUrl }),
          ...(props.data.embedUrl && { embedUrl: props.data.embedUrl }),
        };
        break;

      case "how-to":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: props.data.name,
          description: props.data.description,
          ...(props.data.image && { image: props.data.image }),
          ...(props.data.totalTime && { totalTime: props.data.totalTime }),
          ...(props.data.estimatedCost && {
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: "CAD",
              value: props.data.estimatedCost,
            },
          }),
          step: props.data.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.image && { image: step.image }),
          })),
        };
        break;

      case "item-list":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: props.data.name,
          description: props.data.description,
          numberOfItems: props.data.itemListElement.length,
          itemListElement: props.data.itemListElement.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.description && { description: item.description }),
            ...(item.url && { url: item.url }),
            ...(item.image && { image: item.image }),
          })),
        };
        break;

      default:
        return;
    }

    // Create and inject script tag with unique ID based on type and content hash
    const contentHash = JSON.stringify(jsonLd).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    script.id = `structured-data-${props.type}-${contentHash}`;

    // Remove existing script with same ID if present
    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(script.id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [props]);

  return null;
};

export default StructuredData;
