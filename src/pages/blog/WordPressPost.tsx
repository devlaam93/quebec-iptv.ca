import { useParams, useNavigate, Link } from "react-router-dom";
import { useMemo, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import ReadingProgress from "@/components/ReadingProgress";
import BackToTop from "@/components/BackToTop";
import SocialShare from "@/components/SocialShare";
import BookmarkButton from "@/components/BookmarkButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BunnyImage, BunnyHeroImage, BunnyCardImage } from "@/components/ui/bunny-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Loader2, Globe, User, FileText, Timer } from "lucide-react";
import logo from "@/assets/iptv-quebec-premium-logo.png";
import { useWordPressPost, useWordPressPosts, WordPressPost as WordPressPostType, prefetchPostOnHover, cancelPrefetch } from "@/hooks/useWordPressPosts";
import { useReadingList } from "@/hooks/useReadingList";
import { toast } from "@/hooks/use-toast";
import { useViewCount } from "@/hooks/useViewCount";
import { AUTHOR, SITE } from "@/config/author";

interface WordPressPostProps {
  basePath?: string;
}

const WordPressPost = ({ basePath = "blog" }: WordPressPostProps) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { post, loading, error } = useWordPressPost(slug);
  const { posts: allPosts } = useWordPressPosts({ perPage: 100 }); // Fetch more for accurate stats
  const { addToReadingList, removeFromReadingList, isInReadingList } = useReadingList();
  const { incrementViewCount } = useViewCount(slug);
  
  // Calculate author stats from all posts
  const authorStats = useMemo(() => {
    const articleCount = allPosts.length;
    // Calculate total reading time in minutes
    const totalMinutes = allPosts.reduce((acc, p) => {
      const match = p.readTime?.match(/(\d+)/);
      return acc + (match ? parseInt(match[1], 10) : 5);
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const totalReadingTime = hours > 0 ? `${hours}h ${mins}min` : `${mins} min`;
    return { articleCount, totalReadingTime };
  }, [allPosts]);
  
  const isBookmarked = post ? isInReadingList(post.slug) : false;

  // Track view count when post loads
  useEffect(() => {
    if (post?.slug) {
      incrementViewCount(post.slug);
    }
  }, [post?.slug, incrementViewCount]);

  const handleBookmarkToggle = useCallback(() => {
    if (!post) return;
    if (isBookmarked) {
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
  }, [post, isBookmarked, addToReadingList, removeFromReadingList]);
  
  // Get related articles by shared tags first, then by category
  const relatedArticles = useMemo(() => {
    if (!post || !allPosts.length) return [];
    
    const currentTagIds = new Set(post.tags?.map(t => t.id) || []);
    const otherPosts = allPosts.filter(p => p.slug !== post.slug);
    
    // Score posts by number of shared tags and include shared tag info
    const scoredPosts = otherPosts.map(p => {
      const sharedTags = p.tags?.filter(t => currentTagIds.has(t.id)) || [];
      const sameCategory = p.category === post.category ? 1 : 0;
      return { post: p, sharedTags, score: sharedTags.length * 2 + sameCategory };
    });
    
    // Sort by score descending and take top 3
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .filter(item => item.score > 0)
      .slice(0, 3);
  }, [post, allPosts]);

  // Get previous and next articles for sequential navigation
  const { prevArticle, nextArticle } = useMemo(() => {
    if (!post || !allPosts.length) return { prevArticle: null, nextArticle: null };
    const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
    if (currentIndex === -1) return { prevArticle: null, nextArticle: null };
    
    return {
      prevArticle: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
      nextArticle: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    };
  }, [post, allPosts]);

  const handleArticleClick = (article: WordPressPostType) => {
    window.location.href = `/${basePath}/${article.slug}`;
  };

  const handleArticleHover = useCallback((slug: string) => {
    prefetchPostOnHover(slug);
  }, []);

  const handleArticleHoverEnd = useCallback(() => {
    cancelPrefetch();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
            <span className="text-muted-foreground">Chargement de l'article...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-4">Erreur de chargement</h1>
            <p className="text-muted-foreground mb-6">
              Une erreur est survenue lors du chargement de l'article.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
              <Button variant="outline" onClick={() => navigate(`/${basePath}`)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not found state
  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <SEO 
          title="Article Non Trouvé - Erreur 404 | IPTV Québec"
          description="L'article que vous recherchez n'existe pas ou a été déplacée."
          path={`/${basePath}/${slug}`}
          noIndex={true}
        />
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-16">
          <div className="text-center max-w-lg mx-auto">
            {/* 404 Number with gradient */}
            <div className="relative mb-6">
              <span className="text-[100px] md:text-[140px] font-bold leading-none bg-gradient-to-b from-primary to-primary/20 bg-clip-text text-transparent select-none block">
                404
              </span>
              <div className="absolute inset-0 blur-3xl bg-primary/20 -z-10" aria-hidden="true" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {basePath === "tutorial" ? "Tutoriel Non Trouvé" : "Article Non Trouvé"}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {basePath === "tutorial" 
                ? "Le tutoriel que vous recherchez n'existe pas ou a été supprimé."
                : "L'article que vous recherchez n'existe pas ou a été supprimé."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate(`/${basePath}`)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {basePath === "tutorial" ? "Voir tous les tutoriels" : "Voir tous les articles"}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/")}>
                Retour à l'accueil
              </Button>
            </div>
            
            <button
              onClick={() => window.history.back()}
              className="mt-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retourner à la page précédente
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress readTime={post.readTime} />
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        path={`/${basePath}/${post.slug}`}
        keywords={post.tags?.map(t => t.name) || []}
        image={post.image}
        type="article"
      />
      <StructuredData
        type="article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          author: AUTHOR.name,
          authorUrl: AUTHOR.url,
          authorImage: `${SITE.url}${AUTHOR.avatar}`,
          authorDescription: AUTHOR.description,
          url: `${SITE.url}/${basePath}/${post.slug}`,
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: basePath === "tutorial" ? "Tutoriels" : "Blog", url: `https://quebec-iptv.ca/${basePath}` },
          { name: post.title, url: `https://quebec-iptv.ca/${basePath}/${post.slug}` },
        ]}
      />
      <Header />
      <main className="pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(`/${basePath}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag.id} 
                    variant="outline" 
                    className="text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                    onClick={() => navigate(`/tag/${tag.slug}`)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Author & Meta Info */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage src={AUTHOR.avatar} alt={AUTHOR.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{AUTHOR.name}</span>
                  <span className="text-xs text-muted-foreground">{AUTHOR.shortDescription}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
            
            {/* Social Share & Bookmark Buttons */}
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <SocialShare 
                url={`https://quebec-iptv.ca/${basePath}/${post.slug}`}
                title={post.title}
                description={post.excerpt}
              />
              <BookmarkButton 
                isBookmarked={isBookmarked}
                onToggle={handleBookmarkToggle}
                size="default"
                variant="outline"
                showLabel
              />
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative mb-12 rounded-xl overflow-hidden">
              <BunnyHeroImage 
                src={post.image} 
                alt={post.imageAlt || `Image de l'article: ${post.title} - Guide complet IPTV Quebec`}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                <img src={logo} alt="" width={60} height={24} className="h-6" aria-hidden="true" />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-foreground
              prose-p:text-muted-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground
              prose-ol:text-muted-foreground
              prose-li:text-muted-foreground
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground
              prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:text-foreground
              prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio Section */}
          <div className="mt-12 p-6 bg-card rounded-xl border border-border">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={AUTHOR.avatar} alt={AUTHOR.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg text-foreground">À propos de l'auteur</h4>
                </div>
                <p className="font-semibold text-primary mb-2">{AUTHOR.name}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {AUTHOR.description}
                </p>
                {/* Author Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-medium">{authorStats.articleCount}</span>
                    <span>articles</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Timer className="w-4 h-4 text-primary" />
                    <span className="font-medium">{authorStats.totalReadingTime}</span>
                    <span>de lecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à profiter de l&apos;IPTV au Québec ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Découvrez notre service IPTV premium avec plus de 20 000 chaînes en qualité 8K/4K/HD, 
              support 24/7 et activation instantanée.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/tarifs">Voir nos forfaits</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/essai-gratuit">Essai gratuit</Link>
              </Button>
            </div>
          </div>

          {/* Previous/Next Navigation */}
          {(prevArticle || nextArticle) && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Previous Article */}
                <div className={prevArticle ? "" : "md:col-start-2"}>
                  {prevArticle && (
                    <button
                      onClick={() => handleArticleClick(prevArticle)}
                      onMouseEnter={() => handleArticleHover(prevArticle.slug)}
                      onMouseLeave={handleArticleHoverEnd}
                      className="w-full p-4 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Article précédent
                      </div>
                      <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {prevArticle.title}
                      </h4>
                    </button>
                  )}
                </div>
                
                {/* Next Article */}
                <div>
                  {nextArticle && (
                    <button
                      onClick={() => handleArticleClick(nextArticle)}
                      onMouseEnter={() => handleArticleHover(nextArticle.slug)}
                      onMouseLeave={handleArticleHoverEnd}
                      className="w-full p-4 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 text-right group"
                    >
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                        Article suivant
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {nextArticle.title}
                      </h4>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related Articles by Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Articles connexes</h3>
              <Button variant="outline" size="sm" asChild>
                <Link to="/blog">
                  Voir tous les articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            {relatedArticles.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map(({ post: article, sharedTags }) => (
                  <Tooltip key={article.id}>
                    <TooltipTrigger asChild>
                      <Card 
                        className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group cursor-pointer"
                        onClick={() => handleArticleClick(article)}
                        onMouseEnter={() => handleArticleHover(article.slug)}
                        onMouseLeave={handleArticleHoverEnd}
                      >
                        <div className="relative h-36 overflow-hidden">
                          {article.image ? (
                            <BunnyCardImage 
                              src={article.image} 
                              alt={article.imageAlt || article.title}
                              width={300}
                              height={170}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <Globe className="w-8 h-8 text-primary/50" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <Badge variant="secondary" className="mb-2 text-xs">{article.category}</Badge>
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h4>
                          {/* Shared Tags */}
                          {sharedTags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {sharedTags.slice(0, 2).map(tag => (
                                <Badge 
                                  key={tag.id} 
                                  variant="outline" 
                                  className="text-[10px] px-1.5 py-0 bg-primary/10 border-primary/30 text-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/tag/${tag.slug}`);
                                  }}
                                >
                                  <Tag className="w-2.5 h-2.5 mr-0.5" />
                                  {tag.name}
                                </Badge>
                              ))}
                              {sharedTags.length > 2 && (
                                <span className="text-[10px] text-muted-foreground">+{sharedTags.length - 2}</span>
                              )}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </div>
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="font-medium mb-1">Vous aimerez peut-être</p>
                      {sharedTags.length > 0 ? (
                        <p className="text-xs text-muted-foreground">
                          Cet article partage {sharedTags.length === 1 ? 'le tag' : 'les tags'}{' '}
                          <span className="text-primary font-medium">
                            {sharedTags.map(t => t.name).join(', ')}
                          </span>{' '}
                          avec l'article actuel.
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Article de la même catégorie: {article.category}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Explorez d'autres articles sur notre blog.</p>
                <Button variant="outline" asChild>
                  <Link to="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au blog
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default WordPressPost;
