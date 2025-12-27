import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Calendar, Clock, ArrowRight, Globe, Tag, Loader2, Search, X, Smartphone, Tv, Monitor, Flame, Apple, Play } from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { useWordPressPosts, useWordPressTags, prefetchPostOnHover, cancelPrefetch } from "@/hooks/useWordPressPosts";

// Device filters configuration
const DEVICE_FILTERS = [
  { id: 'all', label: 'Tous', icon: Tv, keywords: [] },
  { id: 'firestick', label: 'Fire Stick', icon: Flame, keywords: ['fire', 'firestick', 'fire stick', 'amazon fire', 'fire tv'] },
  { id: 'android', label: 'Android TV', icon: Play, keywords: ['android', 'android tv', 'google tv', 'nvidia shield', 'chromecast'] },
  { id: 'ios', label: 'iOS / Apple', icon: Apple, keywords: ['ios', 'iphone', 'ipad', 'apple tv', 'apple', 'mac'] },
  { id: 'smarttv', label: 'Smart TV', icon: Monitor, keywords: ['smart tv', 'samsung', 'lg', 'sony', 'philips', 'tcl', 'hisense'] },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, keywords: ['mobile', 'téléphone', 'smartphone', 'tablette'] },
];

const Tutorial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedDevice, setSelectedDevice] = useState<string>("all");
  
  const {
    posts,
    loading,
    loadingMore,
    error,
    totalPages
  } = useWordPressPosts({
    perPage: 12,
    page: currentPage,
    categoryName: "Guides",
    append: currentPage > 1
  });

  const { tags } = useWordPressTags();

  // Get unique tags from posts for the filter
  const availableTags = useMemo(() => {
    const tagMap = new Map<number, { id: number; name: string; slug: string; count: number }>();
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        if (tagMap.has(tag.id)) {
          tagMap.get(tag.id)!.count++;
        } else {
          tagMap.set(tag.id, { ...tag, count: 1 });
        }
      });
    });
    return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
  }, [posts]);

  // Filter posts by search query, selected tag, and device
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === "all" || 
        post.tags?.some(tag => tag.slug === selectedTag);
      
      // Device filter
      const deviceFilter = DEVICE_FILTERS.find(d => d.id === selectedDevice);
      const matchesDevice = selectedDevice === "all" || 
        deviceFilter?.keywords.some(keyword => 
          post.title.toLowerCase().includes(keyword) ||
          post.excerpt.toLowerCase().includes(keyword)
        );
      
      return matchesSearch && matchesTag && matchesDevice;
    });
  }, [posts, searchQuery, selectedTag, selectedDevice]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("all");
    setSelectedDevice("all");
  };

  const hasActiveFilters = searchQuery !== "" || selectedTag !== "all" || selectedDevice !== "all";

  // Infinite scroll observer
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && currentPage < totalPages && !loadingMore && !loading) {
        setCurrentPage(prev => prev + 1);
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    });
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
  return <PageLayout>
      <SEO title="Guide Installation IPTV | Tutoriels Tous Appareils" description="Installez IPTV en quelques minutes sur Android TV, Fire Stick, iOS, Smart TV. Guides étape par étape avec captures d'écran. Configuration facile!" path="/tutorial" keywords={["tutoriel IPTV", "installation IPTV", "configurer IPTV", "guide IPTV"]} image="/og-tutorial.jpg" />
      <StructuredData type="article" data={{
      headline: "Guide d'Installation IPTV - Tutoriels pour Tous Appareils",
      description: "Guides d'installation IPTV étape par étape pour Android TV, iOS, Fire Stick et Smart TV. Configuration facile en quelques minutes.",
      datePublished: "2025-01-01",
      dateModified: "2025-01-15",
      author: "IPTV Québec",
      url: "https://quebec-iptv.ca/tutorial",
      image: "https://quebec-iptv.ca/og-tutorial.jpg"
    }} />
      <StructuredData type="breadcrumb" data={[{
      name: "Accueil",
      url: "https://quebec-iptv.ca"
    }, {
      name: "Tutoriels",
      url: "https://quebec-iptv.ca/tutorial"
    }]} />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Globe className="w-4 h-4" />
              <span>Guides étape par étape</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Guides d'
              </span>
              <span className="bg-gradient-orange bg-clip-text text-transparent">
                Installation
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Tutoriels complets pour installer et configurer IPTV sur tous vos appareils. 
              <span className="text-foreground font-medium"> Simple, rapide et efficace.</span>
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary">{posts.length}+</p>
                <p className="text-sm text-muted-foreground">Guides disponibles</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Appareils couverts</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Support disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Filter Buttons */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {DEVICE_FILTERS.map(device => {
              const Icon = device.icon;
              const isActive = selectedDevice === device.id;
              return (
                <Button
                  key={device.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDevice(device.id)}
                  className={`gap-2 transition-all ${isActive ? 'shadow-md' : 'hover:border-primary/50'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{device.label}</span>
                  <span className="sm:hidden">{device.label.split(' ')[0]}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-3xl mx-auto">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un guide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Tags Select */}
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Tag className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer par tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les tags</SelectItem>
                {availableTags.map(tag => (
                  <SelectItem key={tag.id} value={tag.slug}>
                    {tag.name} ({tag.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                <X className="w-4 h-4 mr-1" />
                Effacer
              </Button>
            )}
          </div>
          
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">
                {filteredPosts.length} résultat{filteredPosts.length !== 1 ? 's' : ''}
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Recherche: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedDevice !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {DEVICE_FILTERS.find(d => d.id === selectedDevice)?.label}
                  <button onClick={() => setSelectedDevice("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedTag !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Tag: {availableTags.find(t => t.slug === selectedTag)?.name}
                  <button onClick={() => setSelectedTag("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State with Skeletons */}
          {loading && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCardSkeleton count={6} />
            </div>}

          {/* Error State */}
          {error && !loading && <div className="text-center py-12">
              <p className="text-destructive text-lg mb-4">Une erreur est survenue lors du chargement des guides.</p>
              <Button onClick={() => window.location.reload()}>Réessayer</Button>
            </div>}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Aucun guide disponible pour le moment.</p>
            </div>}

          {/* No Results State */}
          {!loading && !error && posts.length > 0 && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Aucun guide ne correspond à vos critères de recherche.
              </p>
              <Button onClick={clearFilters}>Effacer les filtres</Button>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && filteredPosts.length > 0 && <>
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border-border group cursor-pointer" onMouseEnter={() => handleArticleHover(post.slug)} onMouseLeave={handleArticleHoverEnd} onClick={() => handleArticleClick(post.slug)}>
                    {/* Full-width image */}
                    <div className="relative aspect-video overflow-hidden">
                      {post.image ? <OptimizedImage src={post.image} alt={post.imageAlt || `Guide: ${post.title}`} width={600} height={338} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Globe className="w-16 h-16 text-primary/50" />
                        </div>}
                    </div>
                    
                    <div className="p-6">
                      {/* Category badge and meta info */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-muted text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors" onClick={e => {
                    e.stopPropagation();
                    window.location.href = `/category/${post.categorySlug}`;
                  }}>
                          {post.category}
                        </Badge>
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
                      {post.tags && post.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map(tag => <Badge 
                              key={tag.id} 
                              variant="outline" 
                              className="text-xs font-normal hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/tag/${tag.slug}`;
                              }}
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag.name}
                            </Badge>)}
                        </div>}
                      
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
                  </Card>)}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
                {loadingMore && <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Chargement...</span>
                  </div>}
                {currentPage >= totalPages && posts.length > 6 && <p className="text-muted-foreground text-sm">Tous les guides ont été chargés</p>}
              </div>
            </>}

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
    </PageLayout>;
};
export default Tutorial;