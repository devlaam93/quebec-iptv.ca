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

  // Note: JSON-LD breadcrumb structured data is handled by StructuredData component on each page
  // to avoid duplicate schemas

  return (
    <>
      
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
