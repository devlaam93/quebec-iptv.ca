import { useState, useCallback, useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Calendar, Clock, ArrowRight, Globe, Tag, Loader2 } from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import logo from "@/assets/iptv-quebec-premium-logo.png";
import { useWordPressPosts, prefetchPostOnHover, cancelPrefetch } from "@/hooks/useWordPressPosts";

const Tutorial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { posts, loading, loadingMore, error, totalPages } = useWordPressPosts({ 
    perPage: 12, 
    page: currentPage,
    categoryName: "Guide",
    append: currentPage > 1
  });

  // Infinite scroll observer
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages && !loadingMore && !loading) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [currentPage, totalPages, loadingMore, loading, setCurrentPage]);

  const handleArticleClick = (slug: string) => {
    window.location.href = `/tutorial/${slug}`;
  };

  const handleArticleHover = useCallback((slug: string) => {
    prefetchPostOnHover(slug);
  }, []);

  const handleArticleHoverEnd = useCallback(() => {
    cancelPrefetch();
  }, []);

  return (
    <PageLayout>
      <SEO
        title="Guide Installation IPTV | Tutoriels Tous Appareils"
        description="Installez IPTV en quelques minutes sur Android TV, Fire Stick, iOS, Smart TV. Guides étape par étape avec captures d'écran. Configuration facile!"
        path="/tutorial"
        keywords={["tutoriel IPTV", "installation IPTV", "configurer IPTV", "guide IPTV"]}
        image="/og-tutorial.jpg"
      />
      <StructuredData
        type="article"
        data={{
          headline: "Guide d'Installation IPTV - Tutoriels pour Tous Appareils",
          description: "Guides d'installation IPTV étape par étape pour Android TV, iOS, Fire Stick et Smart TV. Configuration facile en quelques minutes.",
          datePublished: "2025-01-01",
          dateModified: "2025-01-15",
          author: "IPTV Québec",
          url: "https://quebec-iptv.ca/tutorial",
          image: "https://quebec-iptv.ca/og-tutorial.jpg",
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Tutoriels", url: "https://quebec-iptv.ca/tutorial" },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-orange bg-clip-text text-transparent">
              Guides d'Installation
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              Tutoriels complets pour installer et configurer IPTV sur tous vos appareils
            </p>
            <a 
              href="/blog?category=Guide" 
              className="text-primary hover:underline font-medium"
            >
              Voir tous les guides sur le blog →
            </a>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State with Skeletons */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCardSkeleton count={6} />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-destructive text-lg mb-4">Une erreur est survenue lors du chargement des guides.</p>
              <Button onClick={() => window.location.reload()}>Réessayer</Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Aucun guide disponible pour le moment.</p>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && posts.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border group"
                    onMouseEnter={() => handleArticleHover(post.slug)}
                    onMouseLeave={handleArticleHoverEnd}
                  >
                    <div 
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => handleArticleClick(post.slug)}
                    >
                      {post.image ? (
                        <OptimizedImage 
                          src={post.image} 
                          alt={post.imageAlt || `Guide: ${post.title}`}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Globe className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <img src={logo} alt="" width={80} height={32} className="h-8 opacity-90" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.id} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <h3 
                        className="text-xl font-bold mb-3 group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
                        onClick={() => handleArticleClick(post.slug)}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Button 
                        variant="ghost" 
                        className="group-hover:text-primary"
                        onClick={() => handleArticleClick(post.slug)}
                      >
                        Lire le guide 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
                {loadingMore && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Chargement...</span>
                  </div>
                )}
                {currentPage >= totalPages && posts.length > 6 && (
                  <p className="text-muted-foreground text-sm">Tous les guides ont été chargés</p>
                )}
              </div>
            </>
          )}

          {/* Contextual Links */}
          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="text-xl font-bold mb-4">Besoin d'aide pour démarrer?</h3>
            <p className="text-muted-foreground mb-6">
              Explorez <a href="/liste-chaines" className="text-primary hover:underline font-medium">notre catalogue de chaînes</a>, 
              découvrez <a href="/tarifs" className="text-primary hover:underline font-medium">nos forfaits abordables</a>,
              ou consultez <a href="/blog" className="text-primary hover:underline font-medium">tous nos articles</a>.
            </p>
            <p className="text-sm text-muted-foreground">
              Des questions? Visitez notre <a href="/faq" className="text-primary hover:underline font-medium">foire aux questions</a>.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Tutorial;
