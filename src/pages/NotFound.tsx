import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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
          <p className="text-muted-foreground text-lg mb-8">
            Oups! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
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
                <Search className="h-5 w-5" aria-hidden="true" />
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
