import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Default language for the site
const DEFAULT_LANG = "fr-CA";

// Routes that might have different language content (for future multilingual support)
const routeLanguages: Record<string, string> = {
  "/dmca-policy": "en", // DMCA is typically in English
};

/**
 * Hook to dynamically set the document language based on the current route.
 * Updates the <html> lang attribute for proper screen reader pronunciation.
 */
export const useDocumentLang = () => {
  const location = useLocation();

  useEffect(() => {
    const lang = routeLanguages[location.pathname] || DEFAULT_LANG;
    document.documentElement.lang = lang;
    
    // Also set the dir attribute for RTL language support (future-proofing)
    document.documentElement.dir = "ltr";
  }, [location.pathname]);
};

export default useDocumentLang;
