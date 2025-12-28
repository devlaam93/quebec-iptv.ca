import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BunnyImage, BunnyCardImage } from "@/components/ui/bunny-image";
import { 
  Calendar, Clock, ArrowRight, Globe, Tag, Loader2, BookmarkX, Library, ArrowUpDown,
  FileText, Eye, Sparkles, TrendingUp, BookOpen, Newspaper
} from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import BlogPagination from "@/components/BlogPagination";
import CategorySidebar from "@/components/CategorySidebar";
import { useWordPressPosts, WordPressPost, prefetchPostOnHover, cancelPrefetch } from "@/hooks/useWordPressPosts";
import { useReadingList } from "@/hooks/useReadingList";
import BookmarkButton from "@/components/BookmarkButton";
import { toast } from "@/hooks/use-toast";
import { useAllViewCounts } from "@/hooks/useViewCount";

const Blog = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [showReadingList, setShowReadingList] = useState(false);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(() => {
    const saved = localStorage.getItem('blog_pagination_mode');
    return saved !== 'pagination';
  });
  const [postsPerPage, setPostsPerPage] = useState(() => {
    const saved = localStorage.getItem('blog_posts_per_page');
    return saved ? parseInt(saved, 10) : 6;
  });
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem('blog_sort_order') || 'date-desc';
  });
  const [readingTimeFilter, setReadingTimeFilter] = useState(() => {
    return localStorage.getItem('blog_reading_time_filter') || 'all';
  });
  
  const { posts, loading, loadingMore, error, totalPages } = useWordPressPosts({ 
    perPage: postsPerPage, 
    page: currentPage,
    append: useInfiniteScroll && currentPage > 1
  });
  const { readingList, addToReadingList, removeFromReadingList, isInReadingList } = useReadingList();
  const { getViewCount } = useAllViewCounts();

  const handleBookmarkToggle = useCallback((post: WordPressPost) => {
    if (isInReadingList(post.slug)) {
      removeFromReadingList(post.slug);
      toast({ title: "Article retiré", description: "L'article a été retiré de votre liste de lecture." });
    } else {
      addToReadingList({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image,
        category: post.category,
        date: post.date,
        readTime: post.readTime,
      });
      toast({ title: "Article enregistré", description: "L'article a été ajouté à votre liste de lecture." });
    }
  }, [isInReadingList, addToReadingList, removeFromReadingList]);

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

  // Filter and sort articles based on selected category, reading time, and sort order
  const filteredArticles = useMemo(() => {
    let articles = selectedCategory === "Tous" 
      ? [...posts] 
      : posts.filter(post => post.category === selectedCategory);
    
    // Filter by reading time
    if (readingTimeFilter !== 'all') {
      articles = articles.filter(post => {
        const minutes = parseReadingTime(post.readTime);
        switch (readingTimeFilter) {
          case 'quick': return minutes <= 3;
          case 'medium': return minutes > 3 && minutes <= 7;
          case 'long': return minutes > 7;
          default: return true;
        }
      });
    }
    
    // Sort articles
    switch (sortOrder) {
      case 'date-asc':
        articles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'alpha-asc':
        articles.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
        break;
      case 'alpha-desc':
        articles.sort((a, b) => b.title.localeCompare(a.title, 'fr'));
        break;
      case 'popular':
        articles.sort((a, b) => getViewCount(b.slug) - getViewCount(a.slug));
        break;
      default:
        break;
    }
    
    return articles;
  }, [posts, selectedCategory, sortOrder, readingTimeFilter, getViewCount]);

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

  // Reset pagination when category changes
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleArticleClick = (post: WordPressPost) => {
    window.location.href = `/blog/${post.slug}`;
  };

  const handleArticleHover = useCallback((slug: string) => {
    prefetchPostOnHover(slug);
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
            {/* Blog icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 rotate-3 hover:rotate-0 transition-all duration-300">
              <Newspaper className="w-10 h-10" />
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Blog IPTV{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Québec
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-50" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              Guides experts, tutoriels détaillés et conseils pour maîtriser l'IPTV au Québec.
            </p>
            <p className="text-base text-muted-foreground">
              Prêt à essayer?{" "}
              <Link to="/essai-gratuit" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">
                Obtenez votre essai gratuit de 24h
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <span className="font-semibold">{posts.length}</span>
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

      {/* Categories Filter */}
      {!loading && posts.length > 0 && (
        <section className="py-6 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, index) => (
                <Button 
                  key={index}
                  variant={selectedCategory === cat.name && !showReadingList ? "default" : "outline"}
                  className="rounded-full group"
                  onClick={() => { handleCategoryChange(cat.name); setShowReadingList(false); }}
                >
                  {cat.name} 
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${selectedCategory === cat.name && !showReadingList ? 'bg-primary-foreground/20 text-primary-foreground' : ''}`}
                  >
                    {cat.count}
                  </Badge>
                </Button>
              ))}
              <Button 
                variant={showReadingList ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setShowReadingList(!showReadingList)}
              >
                <Library className="w-4 h-4 mr-2" />
                Ma liste 
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${showReadingList ? 'bg-primary-foreground/20 text-primary-foreground' : ''}`}
                >
                  {readingList.length}
                </Badge>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {filteredArticles.length} résultat{filteredArticles.length > 1 ? 's' : ''}
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

      {/* Articles Grid */}
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
                  <BlogCardSkeleton count={postsPerPage} />
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-destructive" />
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
                  <p className="text-muted-foreground text-lg">Aucun article disponible pour le moment.</p>
                </div>
              )}

              {/* Reading List View */}
              {showReadingList && (
                <>
                  {readingList.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center rotate-3">
                        <Library className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Votre liste de lecture est vide</h3>
                      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Cliquez sur l'icône de signet pour enregistrer des articles à lire plus tard.
                      </p>
                      <Button onClick={() => setShowReadingList(false)} size="lg" className="group">
                        Parcourir les articles
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {readingList.map((item, index) => (
                        <Card 
                          key={item.slug} 
                          className="group overflow-hidden bg-card hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 transition-all duration-500"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onMouseEnter={() => handleArticleHover(item.slug)}
                          onMouseLeave={handleArticleHoverEnd}
                        >
                          <div 
                            className="relative aspect-video overflow-hidden cursor-pointer"
                            onClick={() => window.location.href = `/blog/${item.slug}`}
                          >
                            {item.image ? (
                              <BunnyCardImage 
                                src={item.image} 
                                alt={`Article: ${item.title}`}
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
                            
                            {/* Category badge */}
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                                {item.category}
                              </Badge>
                            </div>

                            {/* Remove button */}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute top-4 right-4 h-9 w-9 bg-black/50 backdrop-blur-sm text-white hover:text-destructive hover:bg-black/70"
                              onClick={(e) => { e.stopPropagation(); removeFromReadingList(item.slug); toast({ title: "Article retiré" }); }}
                            >
                              <BookmarkX className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="p-6">
                            {/* Meta info */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {item.readTime}
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h3 
                              className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 cursor-pointer"
                              onClick={() => window.location.href = `/blog/${item.slug}`}
                            >
                              {item.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-sm">
                              {item.excerpt}
                            </p>
                            
                            {/* Read link */}
                            <div 
                              className="flex items-center text-primary font-medium text-sm cursor-pointer group-hover:gap-3 transition-all duration-300"
                              onClick={() => window.location.href = `/blog/${item.slug}`}
                            >
                              <span>Lire l'article</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Articles Grid */}
              {!loading && !error && posts.length > 0 && !showReadingList && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredArticles.map((post, index) => (
                      <Card 
                        key={post.id} 
                        className="group overflow-hidden bg-card hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onMouseEnter={() => handleArticleHover(post.slug)}
                        onMouseLeave={handleArticleHoverEnd}
                        onClick={() => handleArticleClick(post)}
                      >
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden">
                          {post.image ? (
                            <BunnyCardImage 
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
                          <a 
                            href={`/category/${post.categorySlug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-4 left-4"
                          >
                            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg hover:bg-primary transition-colors">
                              {post.category}
                            </Badge>
                          </a>

                          {/* Bookmark & View count */}
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                              <Eye className="w-3 h-3" />
                              {getViewCount(post.slug)}
                            </div>
                            <BookmarkButton 
                              isBookmarked={isInReadingList(post.slug)} 
                              onToggle={() => handleBookmarkToggle(post)}
                              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                            />
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
                                  className="text-xs font-normal border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.location.href = `/tag/${tag.slug}`;
                                  }}
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
                      {currentPage >= totalPages && posts.length > postsPerPage && (
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
                          <SelectItem value="48">48</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              {/* CTA Card */}
              <div className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 p-8 sm:p-10">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    Ressources utiles
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Besoin d'aide pour démarrer?</h3>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Consultez notre{" "}
                    <Link to="/tutorial" className="text-primary hover:underline font-medium">guide d'installation complet</Link>, 
                    explorez{" "}
                    <Link to="/liste-chaines" className="text-primary hover:underline font-medium">notre catalogue de chaînes</Link>, 
                    ou découvrez{" "}
                    <Link to="/tarifs" className="text-primary hover:underline font-medium">nos forfaits abordables</Link>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="group" asChild>
                      <Link to="/essai-gratuit">
                        Essai gratuit
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/faq">
                        Foire aux questions
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
