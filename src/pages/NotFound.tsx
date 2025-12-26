import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, ArrowLeft, Search } from "lucide-react";

// Available pages for search
const SITE_PAGES = [
  { path: "/", title: "Accueil", description: "Page d'accueil IPTV Québec" },
  { path: "/tarifs", title: "Tarifs", description: "Nos forfaits et prix" },
  { path: "/liste-chaines", title: "Liste des Chaînes", description: "Toutes nos chaînes disponibles" },
  { path: "/essai-gratuit", title: "Essai Gratuit", description: "Testez notre service gratuitement" },
  { path: "/blog", title: "Blog", description: "Articles et actualités IPTV" },
  { path: "/tutorial", title: "Tutoriel", description: "Guide d'installation et configuration" },
  { path: "/faq", title: "FAQ", description: "Questions fréquemment posées" },
  { path: "/contact", title: "Contact", description: "Nous contacter" },
  { path: "/revendeur", title: "Revendeur", description: "Devenir revendeur" },
  { path: "/politique-confidentialite", title: "Politique de Confidentialité", description: "Protection des données" },
  { path: "/conditions-generales", title: "Conditions Générales", description: "Conditions d'utilisation" },
  { path: "/politique-remboursement", title: "Politique de Remboursement", description: "Conditions de remboursement" },
];

// Popular pages to show by default
const POPULAR_PAGES = [
  { path: "/", title: "Accueil", icon: "🏠" },
  { path: "/tarifs", title: "Tarifs", icon: "💰" },
  { path: "/essai-gratuit", title: "Essai Gratuit", icon: "🎁" },
  { path: "/liste-chaines", title: "Liste des Chaînes", icon: "📺" },
  { path: "/tutorial", title: "Tutoriel", icon: "📖" },
  { path: "/faq", title: "FAQ", icon: "❓" },
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return SITE_PAGES.filter(
      (page) =>
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredPages.length > 0) {
      navigate(filteredPages[0].path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Page Non Trouvée - Erreur 404 | IPTV Québec"
        description="La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre navigation."
        path={location.pathname}
        noIndex={true}
      />
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 Number with gradient */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-b from-primary to-primary/20 bg-clip-text text-transparent select-none">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl bg-primary/20 -z-10" aria-hidden="true" />
          </div>
          
          {/* Error message */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Page Non Trouvée
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Oups! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-6" role="search">
            <label htmlFor="search-pages" className="sr-only">
              Rechercher une page
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <Input
                id="search-pages"
                type="search"
                placeholder="Rechercher une page..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                maxLength={100}
              />
            </div>
          </form>

          {/* Search results */}
          {filteredPages.length > 0 && (
            <ul className="mb-6 text-left bg-card border border-border rounded-lg overflow-hidden" role="listbox" aria-label="Résultats de recherche">
              {filteredPages.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="flex flex-col px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-b-0"
                  >
                    <span className="font-medium text-foreground">{page.title}</span>
                    <span className="text-sm text-muted-foreground">{page.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Popular pages - show when not searching */}
          {!searchQuery.trim() && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Pages populaires</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {POPULAR_PAGES.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent hover:border-primary/50 transition-colors text-left"
                  >
                    <span className="text-lg" aria-hidden="true">{page.icon}</span>
                    <span className="text-sm font-medium text-foreground">{page.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {searchQuery.trim() && filteredPages.length === 0 && (
            <p className="mb-6 text-muted-foreground text-sm">
              Aucun résultat pour "{searchQuery}"
            </p>
          )}
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-5 w-5" aria-hidden="true" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/contact">
                Contactez-nous
              </Link>
            </Button>
          </div>
          
          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retourner à la page précédente
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
