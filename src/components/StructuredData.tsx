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
  | { type: "article"; data: ArticleData };

const StructuredData = (props: StructuredDataProps) => {
  useEffect(() => {
    let jsonLd: object;

    switch (props.type) {
      case "organization":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: props.data.name,
          url: props.data.url,
          logo: props.data.logo,
          description: props.data.description,
          contactPoint: props.data.contactEmail
            ? {
                "@type": "ContactPoint",
                email: props.data.contactEmail,
                contactType: "customer service",
                availableLanguage: ["French", "English"],
              }
            : undefined,
          sameAs: props.data.sameAs || [],
        };
        break;

      case "website":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: props.data.name,
          url: props.data.url,
          description: props.data.description,
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
          offers: {
            "@type": "Offer",
            price: props.data.price,
            priceCurrency: props.data.currency,
            availability: `https://schema.org/${props.data.availability}`,
            url: props.data.url,
          },
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
          },
          url: props.data.url,
          areaServed: props.data.areaServed || "CA",
          serviceType: props.data.serviceType || "IPTV Streaming Service",
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
          },
          publisher: {
            "@type": "Organization",
            name: "Quebec IPTV",
            logo: {
              "@type": "ImageObject",
              url: "https://quebec-iptv.ca/og-image.jpg",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": props.data.url,
          },
        };
        break;

      default:
        return;
    }

    // Create and inject script tag
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    script.id = `structured-data-${props.type}`;

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
