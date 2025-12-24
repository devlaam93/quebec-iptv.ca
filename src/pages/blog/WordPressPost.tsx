import { useParams, useNavigate } from "react-router-dom";
import { useWordPressPost } from "@/hooks/useWordPressPosts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, Tag, Loader2 } from "lucide-react";
import logo from "@/assets/iptv-quebec-premium-logo.png";
import { Link } from "react-router-dom";

const WordPressPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useWordPressPost(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin mr-3 text-primary" />
            <span className="text-muted-foreground text-lg">Chargement de l&apos;article...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              L&apos;article que vous recherchez n&apos;existe pas ou a été supprimé.
            </p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Lien copié dans le presse-papier!");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={post.yoast?.title || post.title}
        description={post.yoast?.description || post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={post.tags?.map(t => t.name) || []}
        image={post.yoast?.ogImage || post.image}
        type="article"
      />
      <Header />
      <main className="pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Button>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.categories?.slice(1).map((cat) => (
                <Badge key={cat.id} variant="outline">{cat.name}</Badge>
              ))}
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
                  <Badge key={tag.id} variant="outline" className="text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative mb-12 rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.imageAlt || post.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                <img src={logo} alt="IPTV Quebec" className="h-6" />
              </div>
            </div>
          )}

          {/* Article Content - Render HTML from WordPress */}
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

          {/* Related Articles Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-4">Explorer plus d&apos;articles</h3>
            <Button variant="outline" asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voir tous les articles
              </Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default WordPressPost;
