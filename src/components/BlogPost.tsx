import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/iptv-quebec-premium-logo.png";

interface BlogPostProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: React.ReactNode;
}

const BlogPost = ({ title, excerpt, category, date, readTime, image, content }: BlogPostProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Button>

          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">{category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readTime}
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          {/* Featured Image with Watermark */}
          <div className="relative mb-12 rounded-xl overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
              <img src={logo} alt="IPTV Quebec" className="h-6" />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content}
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à profiter de l'IPTV au Québec ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Découvrez notre service IPTV premium avec plus de 20 000 chaînes en qualité 8K/4K/HD, 
              support 24/7 et activation instantanée.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Voir nos forfaits
              </Button>
              <Button size="lg" variant="outline">
                Essai gratuit
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
