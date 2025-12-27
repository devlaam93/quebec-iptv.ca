import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag, ArrowLeft, TrendingUp, ArrowDownAZ, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWordPressTags } from "@/hooks/useWordPressPosts";
import { cn } from "@/lib/utils";

type SortMode = 'popular' | 'alpha-asc' | 'alpha-desc';

const Tags = () => {
  const { tags, loading } = useWordPressTags();
  const [sortMode, setSortMode] = useState<SortMode>('popular');

  // Filter and sort tags based on mode
  const sortedTags = useMemo(() => {
    const filtered = tags.filter(tag => tag.count > 0);
    
    switch (sortMode) {
      case 'alpha-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
      case 'alpha-desc':
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name, 'fr'));
      case 'popular':
      default:
        return [...filtered].sort((a, b) => b.count - a.count);
    }
  }, [tags, sortMode]);

  // Calculate size classes based on count
  const maxCount = Math.max(...sortedTags.map(t => t.count), 1);
  const minCount = Math.min(...sortedTags.map(t => t.count), 1);
  
  const getTagStyle = (count: number) => {
    if (maxCount === minCount) return { size: 'text-base', bg: 'bg-muted' };
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio > 0.8) return { size: 'text-lg font-bold', bg: 'bg-primary/20 border-primary/40' };
    if (ratio > 0.6) return { size: 'text-base font-semibold', bg: 'bg-primary/15 border-primary/30' };
    if (ratio > 0.4) return { size: 'text-base font-medium', bg: 'bg-primary/10 border-primary/20' };
    if (ratio > 0.2) return { size: 'text-sm', bg: 'bg-muted' };
    return { size: 'text-sm', bg: 'bg-muted/50' };
  };

  const totalArticles = sortedTags.reduce((sum, tag) => sum + tag.count, 0);

  const cycleSortMode = () => {
    setSortMode(prev => {
      if (prev === 'popular') return 'alpha-asc';
      if (prev === 'alpha-asc') return 'alpha-desc';
      return 'popular';
    });
  };

  const getSortLabel = () => {
    switch (sortMode) {
      case 'alpha-asc': return 'A → Z';
      case 'alpha-desc': return 'Z → A';
      default: return 'Populaires';
    }
  };

  const getSortIcon = () => {
    switch (sortMode) {
      case 'alpha-asc':
      case 'alpha-desc':
        return <ArrowDownAZ className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <PageLayout>
      <SEO
        title="Tous les Tags | Blog IPTV Québec"
        description="Explorez tous les sujets abordés dans notre blog IPTV. Trouvez des articles par thème: installation, configuration, appareils, guides et plus."
        path="/tags"
        keywords={["tags IPTV", "sujets IPTV", "thèmes blog", "catégories articles"]}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Blog", url: "https://quebec-iptv.ca/blog" },
          { name: "Tags", url: "https://quebec-iptv.ca/tags" },
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
              <Tag className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tous les Tags
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explorez nos {sortedTags.length} sujets couvrant {totalArticles} articles sur l'IPTV au Québec.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{sortedTags.length}</p>
              <p className="text-sm text-muted-foreground">Tags</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div>
              <p className="text-3xl font-bold text-primary">{totalArticles}</p>
              <p className="text-sm text-muted-foreground">Articles tagués</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div>
              <p className="text-3xl font-bold text-primary">
                {sortedTags.length > 0 ? Math.round(totalArticles / sortedTags.length) : 0}
              </p>
              <p className="text-sm text-muted-foreground">Moy. articles/tag</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          ) : sortedTags.length > 0 ? (
            <>
              {/* Top Tags Section */}
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Tags les plus populaires
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sortedTags.slice(0, 8).map(tag => (
                    <Link
                      key={tag.id}
                      to={`/tag/${tag.slug}`}
                      className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Tag className="w-5 h-5 text-primary" />
                        <Badge variant="secondary" className="text-xs">
                          {tag.count} article{tag.count !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {tag.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Tags Cloud */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Tous les tags</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cycleSortMode}
                    className="gap-2"
                  >
                    {getSortIcon()}
                    {getSortLabel()}
                    <ArrowUpDown className="w-3 h-3 opacity-50" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 justify-center p-8 rounded-2xl bg-card border border-border">
                  {sortedTags.map(tag => {
                    const style = getTagStyle(tag.count);
                    return (
                      <Link
                        key={tag.id}
                        to={`/tag/${tag.slug}`}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200",
                          "hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105",
                          style.size,
                          style.bg
                        )}
                      >
                        <Tag className="w-3.5 h-3.5" />
                        {tag.name}
                        <span className="text-xs opacity-70">({tag.count})</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Tag className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun tag disponible</h3>
              <p className="text-muted-foreground mb-6">
                Les tags seront disponibles prochainement.
              </p>
              <Button asChild>
                <Link to="/blog">Parcourir les articles</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Explorez notre blog complet ou contactez-nous pour toute question sur l'IPTV au Québec.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link to="/blog">Voir tous les articles</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Tags;
