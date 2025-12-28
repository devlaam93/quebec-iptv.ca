import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BunnyCardImage } from "@/components/ui/bunny-image";
import { useBlogImagePreload } from "@/hooks/useBlogImagePreload";
import { startPrefetch, cancelRoutePrefetch } from "@/lib/route-prefetch";
import PrefetchLink from "@/components/PrefetchLink";

const LatestArticles = () => {
  const { onHover, onHoverEnd } = useBlogImagePreload();
  
  // Combined hover handler for image + route prefetching
  const handleCardHover = (article: { image: string; slug: string }) => {
    onHover(article.image, article.slug);
    startPrefetch(`/blog/${article.slug}`);
  };
  
  const handleCardHoverEnd = () => {
    onHoverEnd();
    cancelRoutePrefetch();
  };
  const articles = [
    {
      title: "Guide complet IPTV 2025",
      description: "Découvrez tout ce qu'il faut savoir sur l'IPTV et comment profiter pleinement de votre abonnement.",
      date: "15 Mars 2025",
      readTime: "8 min",
      category: "Guides",
      image: "/src/assets/blog/meilleur-service-iptv.jpg",
      slug: "meilleur-service-iptv-quebec"
    },
    {
      title: "Les meilleures chaînes sportives",
      description: "Notre sélection des chaînes incontournables pour suivre tous vos sports favoris en direct.",
      date: "12 Mars 2025",
      readTime: "6 min",
      category: "Sports",
      image: "/src/assets/blog/iptv-fonctionnement.jpg",
      slug: "comment-iptv-fonctionne"
    },
    {
      title: "Configuration optimale pour IPTV",
      description: "Conseils d'experts pour optimiser votre connexion et profiter d'une qualité de streaming parfaite.",
      date: "10 Mars 2025",
      readTime: "5 min",
      category: "Tutoriels",
      image: "/src/assets/blog/fire-stick-guide.jpg",
      slug: "fire-stick-iptv"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Blog</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Derniers Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Guides, tutoriels et actualités sur l'IPTV au Québec
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-card hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 transition-all duration-500"
              onMouseEnter={() => handleCardHover(article)}
              onMouseLeave={handleCardHoverEnd}
            >
              <PrefetchLink to={`/blog/${article.slug}`} className="block" noPrefetch>
                <div className="relative aspect-video overflow-hidden">
                  <BunnyCardImage
                    src={article.image}
                    alt={`Article: ${article.title}`}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {article.category}
                    </Badge>
                  </div>
                </div>
              </PrefetchLink>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>
                
                <PrefetchLink to={`/blog/${article.slug}`} noPrefetch>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                </PrefetchLink>
                
                <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-sm">
                  {article.description}
                </p>
                
                <PrefetchLink 
                  to={`/blog/${article.slug}`}
                  className="flex items-center text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300"
                  noPrefetch
                >
                  <span>Lire l'article</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </PrefetchLink>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" variant="outline" className="group">
            <PrefetchLink to="/blog">
              Voir tous les articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </PrefetchLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;