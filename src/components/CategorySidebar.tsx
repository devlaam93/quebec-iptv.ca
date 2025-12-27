import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen, ChevronRight } from "lucide-react";
import { useWordPressCategories } from "@/hooks/useWordPressPosts";
import { cn } from "@/lib/utils";

const CategorySidebar = () => {
  const { slug: currentSlug } = useParams<{ slug: string }>();
  const { categories, loading } = useWordPressCategories();

  // Filter out "Uncategorized" and sort by count
  const sortedCategories = categories
    .filter(cat => cat.slug !== 'uncategorized' && cat.slug !== 'non-classe')
    .sort((a, b) => (b.count || 0) - (a.count || 0));

  if (loading) {
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
    <aside className="w-full lg:w-64 shrink-0">
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
    </aside>
  );
};

export default CategorySidebar;