import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Map routes to French page names for screen reader announcements
const routeNames: Record<string, string> = {
  "/": "Accueil",
  "/essai-gratuit": "Essai Gratuit",
  "/faq": "Questions Fréquentes",
  "/contact": "Contact",
  "/tarifs": "Tarifs",
  "/liste-chaines": "Liste des Chaînes",
  "/revendeur": "Programme Revendeur",
  "/tutorial": "Tutoriel d'Installation",
  "/blog": "Blog",
  "/annulation-commande": "Annulation de Commande",
  "/politique-remboursement": "Politique de Remboursement",
  "/politique-confidentialite": "Politique de Confidentialité",
  "/conditions-generales": "Conditions Générales",
  "/dmca-policy": "Politique DMCA",
  "/avis-non-responsabilite": "Avis de Non-Responsabilité",
  "/conditions-paiement": "Conditions de Paiement",
};

const RouteAnnouncer = () => {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    // Get page name from route map or generate from pathname
    let pageName = routeNames[location.pathname];
    
    if (!pageName) {
      // Handle dynamic routes like /blog/:slug
      if (location.pathname.startsWith("/blog/")) {
        const slug = location.pathname.replace("/blog/", "");
        pageName = `Article: ${slug.replace(/-/g, " ")}`;
      } else {
        // Fallback: convert pathname to readable name
        pageName = location.pathname
          .replace(/^\//, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) || "Accueil";
      }
    }

    // Announce the page change
    setAnnouncement(`Navigation vers ${pageName}`);

    // Clear announcement after it's been read
    const timer = setTimeout(() => setAnnouncement(""), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};

export default RouteAnnouncer;
