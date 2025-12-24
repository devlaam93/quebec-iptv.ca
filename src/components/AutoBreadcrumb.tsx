import { useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Route label mapping for French translations
const routeLabels: Record<string, string> = {
  "": "Accueil",
  "tarifs": "Tarifs",
  "liste-chaines": "Liste des Chaînes",
  "blog": "Blog",
  "revendeur": "Revendeur",
  "tutorial": "Tutoriels",
  "essai-gratuit": "Essai Gratuit",
  "contact": "Contact",
  "annulation-commande": "Annulation de Commande",
  "politique-remboursement": "Politique de Remboursement",
  "politique-confidentialite": "Politique de Confidentialité",
  "conditions-generales": "Conditions Générales",
  "dmca-policy": "Politique DMCA",
  "avis-non-responsabilite": "Avis de Non-Responsabilité",
  "conditions-paiement": "Conditions de Paiement",
  // Tutorial subpages
  "mag-box": "MAG Box",
  "dreamlink": "Dreamlink",
  "avov-tv": "AVOV TV",
  "xciptv-player": "XCIPTV Player",
  "tivimate": "TiviMate",
  "firestick": "Fire TV Stick",
  "google-tv": "Google TV",
  "nvidia-shield": "NVIDIA Shield",
  "apple-ios": "Apple iOS",
  "samsung-lg": "Samsung & LG",
  "windows": "Windows",
  "ibo-player": "IBO Player",
  "mytvonline": "MyTVOnline",
  "mytvonline-2": "MyTVOnline 2",
  "mytvonline-3": "MyTVOnline 3",
  // Blog articles
  "comment-iptv-fonctionne": "Comment l'IPTV Fonctionne",
  "iptv-legal-quebec": "IPTV Légal au Québec",
  "meilleure-application-iptv": "Meilleure Application IPTV",
  "acheter-code-iptv": "Acheter Code IPTV",
  "installer-iptv-montreal-quebec": "Installation Montréal",
  "fire-stick-iptv-fonctionnement": "Fire Stick IPTV",
  "meilleur-service-iptv-quebec": "Meilleur Service IPTV",
  "applications-gratuites-fire-tv-stick": "Apps Gratuites Fire Stick",
  "ibo-player-guide": "Guide IBO Player",
};

const getLabel = (segment: string): string => {
  return routeLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const AutoBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumb on homepage
  if (pathnames.length === 0) {
    return null;
  }

  // Generate JSON-LD structured data
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": baseUrl
      },
      ...pathnames.map((segment, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": getLabel(segment),
        "item": `${baseUrl}/${pathnames.slice(0, index + 1).join("/")}`
      }))
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          {/* Home link */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1.5">
                <Home className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Accueil</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathnames.map((segment, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label = getLabel(segment);

            return (
              <span key={routeTo} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default AutoBreadcrumb;
