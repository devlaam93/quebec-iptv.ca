import { useState, useCallback, useEffect, useRef, useMemo } from "react";
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
  Calendar, Clock, ArrowRight, Globe, Tag, Loader2, SearchX, 
  ArrowUpDown, FileText, Eye, Sparkles, TrendingUp, BookOpen
} from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import BlogPagination from "@/components/BlogPagination";
import CategorySidebar from "@/components/CategorySidebar";
import { useWordPressPosts, prefetchPostOnHover, cancelPrefetch } from "@/hooks/useWordPressPosts";
import { useAllViewCounts } from "@/hooks/useViewCount";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(() => {
    const saved = localStorage.getItem('blog_pagination_mode');
    return saved !== 'pagination';
  });
  const [postsPerPage, setPostsPerPage] = useState(() => {
    const saved = localStorage.getItem('blog_posts_per_page');
    return saved ? parseInt(saved, 10) : 12;
  });
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem('blog_sort_order') || 'date-desc';
  });
  const [readingTimeFilter, setReadingTimeFilter] = useState(() => {
    return localStorage.getItem('blog_reading_time_filter') || 'all';
  });
  
  const { posts, loading, loadingMore, error, totalPages, categoryName, categoryDescription, categoryCount, categoryNotFound } = useWordPressPosts({ 
    perPage: postsPerPage, 
    page: currentPage,
    categorySlug: slug,
    append: useInfiniteScroll && currentPage > 1
  });
  const { getViewCount } = useAllViewCounts();

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

  // Helper to parse reading time from string like "5 min"
  const parseReadingTime = (readTime: string): number => {
    const match = readTime.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Calculate total reading time
  const totalReadTime = useMemo(() => {
    const totalMinutes = posts.reduce((acc, post) => acc + parseReadingTime(post.readTime), 0);
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${totalMinutes} min`;
  }, [posts]);

  // Filter and sort posts
  const sortedPosts = useMemo(() => {
    let filtered = [...posts];
    
    // Filter by reading time
    if (readingTimeFilter !== 'all') {
      filtered = filtered.filter(post => {
        const minutes = parseReadingTime(post.readTime);
        switch (readingTimeFilter) {
          case 'quick': return minutes <= 3;
          case 'medium': return minutes > 3 && minutes <= 7;
          case 'long': return minutes > 7;
          default: return true;
        }
      });
    }
    
    // Sort
    switch (sortOrder) {
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'alpha-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
        break;
      case 'alpha-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title, 'fr'));
        break;
      case 'popular':
        filtered.sort((a, b) => getViewCount(b.slug) - getViewCount(a.slug));
        break;
      default:
        break;
    }
    return filtered;
  }, [posts, sortOrder, readingTimeFilter, getViewCount]);

  // Infinite scroll observer
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!useInfiniteScroll) return;
    
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
  }, [currentPage, totalPages, loadingMore, loading, useInfiniteScroll]);

  // Handle pagination page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Toggle pagination mode
  const togglePaginationMode = () => {
    const newMode = !useInfiniteScroll;
    setUseInfiniteScroll(newMode);
    setCurrentPage(1);
    localStorage.setItem('blog_pagination_mode', newMode ? 'infinite' : 'pagination');
  };

  // Handle posts per page change
  const handlePostsPerPageChange = (value: string) => {
    const newValue = parseInt(value, 10);
    setPostsPerPage(newValue);
    setCurrentPage(1);
    localStorage.setItem('blog_posts_per_page', value);
  };

  // Handle sort order change
  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    localStorage.setItem('blog_sort_order', value);
  };

  // Handle reading time filter change
  const handleReadingTimeFilterChange = (value: string) => {
    setReadingTimeFilter(value);
    localStorage.setItem('blog_reading_time_filter', value);
  };

  const handleArticleClick = (postSlug: string) => {
    window.location.href = `/blog/${postSlug}`;
  };

  const handleArticleHover = useCallback((postSlug: string) => {
    prefetchPostOnHover(postSlug);
  }, []);

  const handleArticleHoverEnd = useCallback(() => {
    cancelPrefetch();
  }, []);

  // Get sort label for display
  const getSortLabel = () => {
    switch (sortOrder) {
      case 'date-desc': return 'Plus récent';
      case 'date-asc': return 'Plus ancien';
      case 'popular': return 'Populaire';
      case 'alpha-asc': return 'A → Z';
      case 'alpha-desc': return 'Z → A';
      default: return 'Trier';
    }
  };

  // Category Not Found State
  if (!loading && categoryNotFound) {
    return (
      <PageLayout>
        <SEO
          title="Catégorie introuvable | IPTV Québec"
          description="La catégorie demandée n'existe pas. Découvrez nos autres catégories d'articles."
          path={`/category/${slug}`}
        />
        <section className="py-24 sm:py-32 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                <SearchX className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-6">Catégorie introuvable</h1>
              <p className="text-lg text-muted-foreground mb-8">
                La catégorie « <span className="font-semibold text-foreground">{slug}</span> » n'existe pas ou a été supprimée.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = '/blog'} size="lg" className="group">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
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

      {/* Immersive Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-3 h-3 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-40 right-20 w-2 h-2 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }} />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 rotate-3 hover:rotate-0 transition-all duration-300">
              <BookOpen className="w-10 h-10" />
            </div>

            {/* Badges */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                {displayName}
              </Badge>
              {postCountText && (
                <Badge variant="outline" className="px-4 py-1.5">
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  {postCountText}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Articles{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  {displayName}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-50" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {cleanDescription || `Explorez tous nos articles dans la catégorie ${displayName}. Guides détaillés, tutoriels pratiques et conseils d'experts.`}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <span className="font-semibold">{categoryCount || posts.length}</span>
                <span className="text-muted-foreground text-sm">articles</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <span className="font-semibold">{totalReadTime}</span>
                <span className="text-muted-foreground text-sm">de lecture</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-muted-foreground text-sm">Contenu mis à jour</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {sortedPosts.length} résultat{sortedPosts.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Sort selector */}
              <Select value={sortOrder} onValueChange={handleSortOrderChange}>
                <SelectTrigger className="w-40 h-9 bg-card border-border/50">
                  <ArrowUpDown className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue>{getSortLabel()}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  <SelectItem value="date-desc">Plus récent</SelectItem>
                  <SelectItem value="date-asc">Plus ancien</SelectItem>
                  <SelectItem value="popular">Plus populaire</SelectItem>
                  <SelectItem value="alpha-asc">A → Z</SelectItem>
                  <SelectItem value="alpha-desc">Z → A</SelectItem>
                </SelectContent>
              </Select>

              {/* Reading time filter */}
              <Select value={readingTimeFilter} onValueChange={handleReadingTimeFilterChange}>
                <SelectTrigger className="w-36 h-9 bg-card border-border/50">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="quick">≤ 3 min</SelectItem>
                  <SelectItem value="medium">4-7 min</SelectItem>
                  <SelectItem value="long">&gt; 7 min</SelectItem>
                </SelectContent>
              </Select>

              {/* Pagination mode toggle */}
              {totalPages > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePaginationMode}
                  className="text-muted-foreground hover:text-foreground h-9"
                >
                  {useInfiniteScroll ? "Pagination" : "Défilement infini"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid with Sidebar */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <CategorySidebar />

            {/* Main Content */}
            <div className="flex-1">
              {/* Loading State with Skeletons */}
              {loading && (
                <div className="grid md:grid-cols-2 gap-6">
                  <BlogCardSkeleton count={6} />
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center">
                    <SearchX className="w-8 h-8 text-destructive" />
                  </div>
                  <p className="text-destructive text-lg mb-4">Une erreur est survenue lors du chargement des articles.</p>
                  <Button onClick={() => window.location.reload()}>Réessayer</Button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && posts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg mb-4">Aucun article disponible dans cette catégorie.</p>
                  <Button onClick={() => window.location.href = '/blog'}>Voir tous les articles</Button>
                </div>
              )}

              {/* Articles Grid */}
              {!loading && !error && sortedPosts.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {sortedPosts.map((post, index) => (
                      <Card 
                        key={post.id} 
                        className="group overflow-hidden bg-card hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onMouseEnter={() => handleArticleHover(post.slug)}
                        onMouseLeave={handleArticleHoverEnd}
                        onClick={() => handleArticleClick(post.slug)}
                      >
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden">
                          {post.image ? (
                            <OptimizedImage 
                              src={post.image} 
                              alt={post.imageAlt || `Article: ${post.title}`}
                              width={600}
                              height={338}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-muted flex items-center justify-center">
                              <Globe className="w-16 h-16 text-primary/30" />
                            </div>
                          )}
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Category badge on image */}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                              {post.category}
                            </Badge>
                          </div>

                          {/* View count */}
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                            <Eye className="w-3 h-3" />
                            {getViewCount(post.slug)}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          {/* Meta info */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </div>
                          </div>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge 
                                  key={tag.id} 
                                  variant="outline" 
                                  className="text-xs font-normal border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-sm">
                            {post.excerpt}
                          </p>
                          
                          {/* Read link */}
                          <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                            <span>Lire l'article</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Infinite Scroll Trigger or Pagination */}
                  {useInfiniteScroll ? (
                    <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
                      {loadingMore && (
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          <span>Chargement des articles...</span>
                        </div>
                      )}
                      {currentPage >= totalPages && sortedPosts.length > postsPerPage && (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Sparkles className="w-4 h-4" />
                          <span>Tous les articles ont été chargés</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <BlogPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      loading={loading}
                    />
                  )}

                  {/* Posts per page selector */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                      <span className="text-sm text-muted-foreground">Articles par page:</span>
                      <Select value={postsPerPage.toString()} onValueChange={handlePostsPerPageChange}>
                        <SelectTrigger className="w-20 h-9 bg-card border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border z-50">
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-40 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Service IPTV Premium
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Prêt à découvrir l'IPTV Premium?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Profitez de plus de 20,000 chaînes, films et séries en qualité HD/4K. Essai gratuit disponible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <Link to="/essai-gratuit">
                  Essai gratuit
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/tarifs">
                  Voir les tarifs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Category;
