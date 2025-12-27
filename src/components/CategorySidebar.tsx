import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen, ChevronRight, Tag } from "lucide-react";
import { useWordPressCategories, useWordPressTags } from "@/hooks/useWordPressPosts";
import { cn } from "@/lib/utils";

const CategorySidebar = () => {
  const { slug: currentSlug } = useParams<{ slug: string }>();
  const { categories, loading: categoriesLoading } = useWordPressCategories();
  const { tags, loading: tagsLoading } = useWordPressTags();

  // Filter out "Uncategorized" and sort by count
  const sortedCategories = categories
    .filter(cat => cat.slug !== 'uncategorized' && cat.slug !== 'non-classe')
    .sort((a, b) => (b.count || 0) - (a.count || 0));

  // Sort tags by count and take top 15
  const sortedTags = [...tags]
    .filter(tag => tag.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Calculate font size based on count (for tag cloud effect)
  const maxCount = Math.max(...sortedTags.map(t => t.count), 1);
  const minCount = Math.min(...sortedTags.map(t => t.count), 1);
  const getTagSize = (count: number) => {
    if (maxCount === minCount) return 'text-xs';
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio > 0.7) return 'text-sm font-medium';
    if (ratio > 0.4) return 'text-xs font-medium';
    return 'text-xs';
  };

  if (categoriesLoading) {
    return (
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Catégories
          </h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Categories Section */}
      <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Catégories
        </h3>
        
        {/* All articles link */}
        <Link
          to="/blog"
          className={cn(
            "flex items-center justify-between p-3 rounded-lg transition-colors mb-2",
            "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="font-medium">Tous les articles</span>
          <ChevronRight className="w-4 h-4" />
        </Link>

        <div className="space-y-1">
          {sortedCategories.map(category => {
            const isActive = currentSlug === category.slug;
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <span className={cn("font-medium", isActive && "text-primary-foreground")}>
                  {category.name}
                </span>
                <Badge 
                  variant={isActive ? "secondary" : "outline"} 
                  className={cn(
                    "text-xs",
                    isActive && "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                  )}
                >
                  {category.count || 0}
                </Badge>
              </Link>
            );
          })}
        </div>

        {sortedCategories.length === 0 && (
          <p className="text-muted-foreground text-sm">Aucune catégorie disponible</p>
        )}
      </div>

      {/* Tag Cloud Section */}
      <div className="sticky top-[400px] bg-card rounded-xl border border-border p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Tags populaires
        </h3>
        
        {tagsLoading ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        ) : sortedTags.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {sortedTags.map(tag => (
                <Link
                  key={tag.id}
                  to={`/tag/${tag.slug}`}
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all duration-200",
                    "border-border bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:border-primary",
                    getTagSize(tag.count)
                  )}
                >
                  {tag.name}
                  <span className="text-[10px] opacity-60">({tag.count})</span>
                </Link>
              ))}
            </div>
            <Link
              to="/tags"
              className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline font-medium"
            >
              Voir tous les tags
              <ChevronRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">Aucun tag disponible</p>
        )}
      </div>
    </aside>
  );
};

export default CategorySidebar;