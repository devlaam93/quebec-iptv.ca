import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Calendar, Clock, ArrowRight, Globe, Tag as TagIcon, Loader2, ArrowLeft } from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { useWordPressPosts, WordPressPost, prefetchPostOnHover, cancelPrefetch } from "@/hooks/useWordPressPosts";
import { useAllViewCounts } from "@/hooks/useViewCount";
import logo from "@/assets/iptv-quebec-premium-logo.png";

const TagPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem('tag_sort_order') || 'date-desc';
  });
  
  const { posts, loading, loadingMore, error, totalPages } = useWordPressPosts({ 
    perPage: 12, 
    page: currentPage,
    append: currentPage > 1
  });
  const { getViewCount } = useAllViewCounts();

  // Filter posts by tag slug
  const tagPosts = useMemo(() => {
    if (!slug) return [];
    
    const filtered = posts.filter(post => 
      post.tags?.some(tag => 
        tag.slug === slug || 
        tag.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      )
    );

    // Sort articles
    const sorted = [...filtered];
    switch (sortOrder) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'alpha-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
        break;
      case 'alpha-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title, 'fr'));
        break;
      case 'popular':
        sorted.sort((a, b) => getViewCount(b.slug) - getViewCount(a.slug));
        break;
      default:
        break;
    }
    
    return sorted;
  }, [posts, slug, sortOrder, getViewCount]);

  // Get tag name from first matching post
  const tagName = useMemo(() => {
    if (!slug || tagPosts.length === 0) return slug?.replace(/-/g, ' ') || '';
    const matchingTag = tagPosts[0].tags?.find(tag => 
      tag.slug === slug || 
      tag.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    );
    return matchingTag?.name || slug.replace(/-/g, ' ');
  }, [tagPosts, slug]);

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

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    localStorage.setItem('tag_sort_order', value);
  };

  const handleArticleClick = (post: WordPressPost) => {
    window.location.href = `/blog/${post.slug}`;
  };

  const handleArticleHover = useCallback((postSlug: string) => {
    prefetchPostOnHover(postSlug);
  }, []);

  const handleArticleHoverEnd = useCallback(() => {
    cancelPrefetch();
  }, []);

  return (
    <PageLayout>
      <SEO
        title={`Articles sur "${tagName}" | Blog IPTV Québec`}
        description={`Découvrez tous nos articles sur le sujet "${tagName}". Guides, tutoriels et conseils IPTV au Québec.`}
        path={`/tag/${slug}`}
        keywords={[tagName || '', "IPTV", "Québec", "guides"]}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Blog", url: "https://quebec-iptv.ca/blog" },
          { name: tagName || '', url: `https://quebec-iptv.ca/tag/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <TagIcon className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="secondary" className="text-sm">Tag</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
            {tagName}
          </h1>
          <p className="text-xl text-muted-foreground">
            {tagPosts.length} article{tagPosts.length !== 1 ? 's' : ''} trouvé{tagPosts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Sort Controls */}
      {!loading && tagPosts.length > 1 && (
        <section className="py-4 bg-card/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-end gap-4">
              <Select value={sortOrder} onValueChange={handleSortOrderChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Plus récent</SelectItem>
                  <SelectItem value="date-asc">Plus ancien</SelectItem>
                  <SelectItem value="alpha-asc">A-Z</SelectItem>
                  <SelectItem value="alpha-desc">Z-A</SelectItem>
                  <SelectItem value="popular">Plus populaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          {!loading && !error && tagPosts.length === 0 && (
            <div className="text-center py-12">
              <TagIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Aucun article n'est associé à ce tag pour le moment.
              </p>
              <Button asChild>
                <Link to="/blog">Parcourir tous les articles</Link>
              </Button>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && tagPosts.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tagPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border group cursor-pointer"
                    onMouseEnter={() => handleArticleHover(post.slug)}
                    onMouseLeave={handleArticleHoverEnd}
                    onClick={() => handleArticleClick(post)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {post.image ? (
                        <OptimizedImage 
                          src={post.image} 
                          alt={post.imageAlt || `Article: ${post.title}`}
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
                        <Badge 
                          className="bg-muted text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/category/${post.categorySlug}`;
                          }}
                        >
                          {post.category}
                        </Badge>
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
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag.id} 
                              variant="outline" 
                              className="text-xs font-normal hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/tag/${tag.slug}`;
                              }}
                            >
                              <TagIcon className="w-3 h-3 mr-1" />
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
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
                {currentPage >= totalPages && tagPosts.length > 6 && (
                  <p className="text-muted-foreground text-sm">Tous les articles ont été chargés</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default TagPage;
