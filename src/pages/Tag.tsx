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
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Globe, 
  Tag as TagIcon, 
  Loader2, 
  ArrowLeft, 
  Sparkles,
  TrendingUp,
  Filter,
  LayoutGrid,
  Eye
} from "lucide-react";
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

  // Calculate total reading time
  const totalReadTime = useMemo(() => {
    return tagPosts.reduce((acc, post) => {
      const match = post.readTime?.match(/(\d+)/);
      return acc + (match ? parseInt(match[1], 10) : 5);
    }, 0);
  }, [tagPosts]);

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

      {/* Hero Section - Immersive Design */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        {/* Floating Tag Icons */}
        <div className="absolute top-1/4 left-[15%] opacity-10 animate-bounce" style={{ animationDuration: '3s' }}>
          <TagIcon className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute top-1/3 right-[20%] opacity-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <Sparkles className="w-8 h-8 text-accent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-all duration-300 group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-card border border-border group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </span>
            <span className="font-medium">Retour au blog</span>
          </Link>

          <div className="max-w-4xl">
            {/* Tag Badge with Icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 backdrop-blur-sm">
                  <TagIcon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="outline" className="w-fit text-xs font-medium border-primary/30 text-primary bg-primary/5">
                  Collection d'articles
                </Badge>
                <span className="text-sm text-muted-foreground">Explorez ce sujet</span>
              </div>
            </div>

            {/* Tag Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 capitalize bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {tagName}
            </h1>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border">
                <LayoutGrid className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{tagPosts.length}</span>
                <span className="text-muted-foreground">article{tagPosts.length !== 1 ? 's' : ''}</span>
              </div>
              {totalReadTime > 0 && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">{totalReadTime}</span>
                  <span className="text-muted-foreground">min de lecture</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Découvrez tous nos guides, tutoriels et conseils sur <span className="text-foreground font-medium capitalize">{tagName}</span>. 
              Des articles rédigés par nos experts pour vous aider dans votre expérience IPTV.
            </p>
          </div>
        </div>
      </section>

      {/* Sort Controls - Modern Design */}
      {!loading && tagPosts.length > 1 && (
        <section className="sticky top-16 z-30 py-4 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Trier les résultats</span>
              </div>
              <Select value={sortOrder} onValueChange={handleSortOrderChange}>
                <SelectTrigger className="w-[200px] bg-card border-border">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="date-desc">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Plus récent
                    </span>
                  </SelectItem>
                  <SelectItem value="date-asc">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Plus ancien
                    </span>
                  </SelectItem>
                  <SelectItem value="alpha-asc">A → Z</SelectItem>
                  <SelectItem value="alpha-desc">Z → A</SelectItem>
                  <SelectItem value="popular">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Plus populaire
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCardSkeleton count={6} />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto mb-6">
                <Globe className="w-12 h-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Oups ! Une erreur est survenue</h3>
              <p className="text-muted-foreground mb-6">Impossible de charger les articles pour le moment.</p>
              <Button onClick={() => window.location.reload()} className="gap-2">
                Réessayer
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && tagPosts.length === 0 && (
            <div className="text-center py-20 max-w-lg mx-auto">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
                <div className="relative p-6 rounded-full bg-card border border-border w-fit mx-auto">
                  <TagIcon className="w-16 h-16 text-muted-foreground/50" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Aucun article trouvé</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Aucun article n'est associé au tag "<span className="text-foreground font-medium capitalize">{tagName}</span>" pour le moment.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link to="/blog">
                  <LayoutGrid className="w-4 h-4" />
                  Parcourir tous les articles
                </Link>
              </Button>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && tagPosts.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tagPosts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="group overflow-hidden bg-card border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onMouseEnter={() => handleArticleHover(post.slug)}
                    onMouseLeave={handleArticleHoverEnd}
                    onClick={() => handleArticleClick(post)}
                  >
                    {/* Image Container */}
                    <div className="relative h-52 overflow-hidden">
                      {post.image ? (
                        <OptimizedImage 
                          src={post.image} 
                          alt={post.imageAlt || `Article: ${post.title}`}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Globe className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Logo Watermark */}
                      <div className="absolute top-4 left-4">
                        <img src={logo} alt="" width={80} height={32} className="h-7 opacity-80" aria-hidden="true" />
                      </div>

                      {/* View Count Badge */}
                      {getViewCount(post.slug) > 0 && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                          <Eye className="w-3.5 h-3.5 text-primary" />
                          <span>{getViewCount(post.slug)}</span>
                        </div>
                      )}

                      {/* Category Badge - Positioned at bottom */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                        <Badge 
                          className="bg-primary text-primary-foreground shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/category/${post.categorySlug}`;
                          }}
                        >
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta Row */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary/70" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary/70" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag.id} 
                              variant="outline" 
                              className="text-xs font-normal hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-colors"
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
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-5 line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      {/* Read More */}
                      <div className="flex items-center text-primary font-medium text-sm group/link">
                        <span>Lire l'article</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="h-24 flex items-center justify-center mt-12">
                {loadingMore && (
                  <div className="flex items-center gap-3 text-muted-foreground px-6 py-3 rounded-full bg-card border border-border">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="font-medium">Chargement en cours...</span>
                  </div>
                )}
                {currentPage >= totalPages && tagPosts.length > 6 && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Vous avez tout exploré !</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && tagPosts.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Vous aimez ce contenu ?
              </h2>
              <p className="text-muted-foreground mb-8">
                Découvrez notre service IPTV premium et profitez de +20,000 chaînes en qualité HD/4K.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link to="/tarifs">
                    <Sparkles className="w-4 h-4" />
                    Voir nos forfaits
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/essai-gratuit">Essai gratuit</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default TagPage;
