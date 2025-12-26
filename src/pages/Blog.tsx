import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Calendar, Clock, ArrowRight, Globe, Tag, Loader2 } from "lucide-react";
import logo from "@/assets/iptv-quebec-premium-logo.png";
import { useWordPressPosts, WordPressPost } from "@/hooks/useWordPressPosts";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [visibleArticles, setVisibleArticles] = useState(6);
  
  const { posts, loading, error } = useWordPressPosts({ perPage: 100 });

  // Calculate dynamic category counts
  const categories = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    posts.forEach(post => {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    });
    
    const sortedCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count: String(count) }));
    
    return [
      { name: "Tous", count: String(posts.length) },
      ...sortedCategories
    ];
  }, [posts]);

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === "Tous" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Show only visible number of articles
  const displayedArticles = filteredArticles.slice(0, visibleArticles);

  // Handler to load more articles
  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 6);
  };

  // Reset visible articles when category changes
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setVisibleArticles(6);
  };

  const handleArticleClick = (post: WordPressPost) => {
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <PageLayout heroSection>
      <SEO
        title="Blog IPTV Québec | Guides, Tutoriels et Actualités"
        description="Guides experts et tutoriels IPTV : installation, configuration, comparatifs. Conseils pratiques pour profiter au maximum de votre service IPTV."
        path="/blog"
        keywords={["blog IPTV", "articles IPTV", "guides IPTV", "actualités streaming"]}
        image="/og-blog.jpg"
      />
      <StructuredData
        type="website"
        data={{
          name: "Blog Quebec IPTV",
          url: "https://quebec-iptv.ca/blog",
          description: "Articles experts sur l'IPTV au Quebec : guides, tutoriels et actualites.",
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Blog", url: "https://quebec-iptv.ca/blog" },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog IPTV <span className="text-primary">Québec</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Guides experts, tutoriels détaillés et conseils pour maîtriser l'IPTV au Québec. 
            Prêt à essayer? <a href="/essai-gratuit" className="text-primary hover:underline font-semibold">Obtenez votre essai gratuit de 24h</a>.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      {!loading && posts.length > 0 && (
        <section className="py-8 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, index) => (
                <Button 
                  key={index}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => handleCategoryChange(cat.name)}
                >
                  {cat.name} <Badge variant="secondary" className="ml-2">{cat.count}</Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
              <span className="text-muted-foreground">Chargement des articles...</span>
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
              <p className="text-muted-foreground text-lg">Aucun article disponible pour le moment.</p>
            </div>
          )}
          
          {/* Articles */}
          {!loading && !error && posts.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedArticles.map((post) => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border group"
                  >
                    <div 
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => handleArticleClick(post)}
                    >
                      {post.image ? (
                        <OptimizedImage 
                          src={post.image} 
                          alt={post.imageAlt || `Article: ${post.title} - Guide IPTV Quebec`}
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
                        onClick={() => handleArticleClick(post)}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Button 
                        variant="ghost" 
                        className="group-hover:text-primary"
                        onClick={() => handleArticleClick(post)}
                      >
                        Lire l'article 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              {visibleArticles < filteredArticles.length && (
                <div className="text-center mt-12">
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={loadMoreArticles}
                  >
                    Charger plus d'articles ({filteredArticles.length - visibleArticles} restants)
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Contextual Links */}
          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="text-xl font-bold mb-4">Besoin d'aide pour démarrer?</h3>
            <p className="text-muted-foreground mb-6">
              Consultez notre <a href="/tutorial" className="text-primary hover:underline font-medium">guide d'installation complet</a>, 
              explorez <a href="/liste-chaines" className="text-primary hover:underline font-medium">notre catalogue de chaînes</a>, 
              ou découvrez <a href="/tarifs" className="text-primary hover:underline font-medium">nos forfaits abordables</a>.
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

export default Blog;
