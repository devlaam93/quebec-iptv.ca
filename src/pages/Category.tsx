import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Calendar, Clock, ArrowRight, Globe, Tag, Loader2, SearchX } from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import CategorySidebar from "@/components/CategorySidebar";
import { useWordPressPosts, prefetchPostOnHover, cancelPrefetch } from "@/hooks/useWordPressPosts";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { posts, loading, loadingMore, error, totalPages, categoryName, categoryDescription, categoryCount, categoryNotFound } = useWordPressPosts({ 
    perPage: 12, 
    page: currentPage,
    categorySlug: slug,
    append: currentPage > 1
  });

  // Display name from resolved category or fallback to formatted slug
  const displayName = categoryName || (slug
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '');
  
  // Clean HTML from description
  const cleanDescription = categoryDescription 
    ? categoryDescription.replace(/<[^>]*>/g, '').trim()
    : '';
  
  // Post count display
  const postCountText = categoryCount > 0 
    ? `${categoryCount} article${categoryCount > 1 ? 's' : ''}`
    : '';

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
  }, [currentPage, totalPages, loadingMore, loading]);

  const handleArticleClick = (postSlug: string) => {
    window.location.href = `/blog/${postSlug}`;
  };

  const handleArticleHover = useCallback((postSlug: string) => {
    prefetchPostOnHover(postSlug);
  }, []);

  const handleArticleHoverEnd = useCallback(() => {
    cancelPrefetch();
  }, []);

  // Category Not Found State
  if (!loading && categoryNotFound) {
    return (
      <PageLayout>
        <SEO
          title="Catégorie introuvable | IPTV Québec"
          description="La catégorie demandée n'existe pas. Découvrez nos autres catégories d'articles."
          path={`/category/${slug}`}
        />
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
                <SearchX className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-6">Catégorie introuvable</h1>
              <p className="text-lg text-muted-foreground mb-8">
                La catégorie « <span className="font-semibold text-foreground">{slug}</span> » n'existe pas ou a été supprimée.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = '/blog'} size="lg">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Voir tous les articles
                </Button>
                <Button variant="outline" onClick={() => window.history.back()} size="lg">
                  Retour
                </Button>
              </div>
            </div>
            
            {/* Show category sidebar for navigation */}
            <div className="mt-16 max-w-sm mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-center">Catégories disponibles</h3>
              <CategorySidebar />
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO
        title={`${displayName} | Articles IPTV Québec`}
        description={`Découvrez tous nos articles dans la catégorie ${displayName}. Guides, tutoriels et conseils IPTV.`}
        path={`/category/${slug}`}
        keywords={[displayName, "IPTV", "articles", "guides"]}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Blog", url: "https://quebec-iptv.ca/blog" },
          { name: displayName, url: `https://quebec-iptv.ca/category/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge className="text-sm">{displayName}</Badge>
              {postCountText && (
                <Badge variant="outline" className="text-sm">{postCountText}</Badge>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              Articles <span className="bg-gradient-orange bg-clip-text text-transparent">{displayName}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {cleanDescription || `Tous nos articles dans la catégorie ${displayName}`}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid with Sidebar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <CategorySidebar />

            {/* Main Content */}
            <div className="flex-1">
              {/* Loading State with Skeletons */}
              {loading && (
                <div className="grid md:grid-cols-2 gap-8">
                  <BlogCardSkeleton count={6} />
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-12">
                  <p className="text-destructive text-lg mb-4">Une erreur est survenue lors du chargement des articles.</p>
                  <Button onClick={() => window.location.reload()}>Réessayer</Button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && posts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">Aucun article disponible dans cette catégorie.</p>
                  <Button onClick={() => window.location.href = '/blog'}>Voir tous les articles</Button>
                </div>
              )}

              {/* Articles */}
              {!loading && !error && posts.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                      <Card 
                        key={post.id} 
                        className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border-border group cursor-pointer"
                        onMouseEnter={() => handleArticleHover(post.slug)}
                        onMouseLeave={handleArticleHoverEnd}
                        onClick={() => handleArticleClick(post.slug)}
                      >
                        {/* Full-width image */}
                        <div className="relative aspect-video overflow-hidden">
                          {post.image ? (
                            <OptimizedImage 
                              src={post.image} 
                              alt={post.imageAlt || `Article: ${post.title}`}
                              width={600}
                              height={338}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <Globe className="w-16 h-16 text-primary/50" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          {/* Category badge and meta info */}
                          <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-muted text-foreground hover:bg-muted">{post.category}</Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                              </div>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag.id} variant="outline" className="text-xs font-normal">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                          
                          {/* Read link */}
                          <div className="flex items-center text-foreground font-medium group-hover:text-primary transition-colors">
                            Lire l'article
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
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
                      <p className="text-muted-foreground text-sm">Tous les articles ont été chargés</p>
                    )}
                  </div>
                </>
              )}

              {/* Back to Blog */}
              <div className="mt-16 text-center">
                <Button variant="outline" onClick={() => window.location.href = '/blog'}>
                  ← Retour au blog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Category;
