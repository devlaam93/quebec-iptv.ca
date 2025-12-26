import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
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
  slug?: string;
}

const BlogPost = ({ title, excerpt, category, date, readTime, image, content, slug }: BlogPostProps) => {
  // Convert French date format to ISO format for structured data
  const parseDate = (frenchDate: string): string => {
    const months: { [key: string]: string } = {
      'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
      'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
      'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
    };
    const parts = frenchDate.toLowerCase().match(/(\d+)\s+(\w+)\s+(\d+)/);
    if (parts) {
      const day = parts[1].padStart(2, '0');
      const month = months[parts[2]] || '01';
      const year = parts[3];
      return `${year}-${month}-${day}`;
    }
    return new Date().toISOString().split('T')[0];
  };

  const articleSlug = slug || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');
  const articleUrl = `https://quebec-iptv.ca/blog/${articleSlug}`;
  const articlePath = `/blog/${articleSlug}`;

  const imageUrl = typeof image === 'string' && image.startsWith('http') 
    ? image 
    : `https://quebec-iptv.ca${image}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={`${title} | IPTV Québec`}
        description={excerpt}
        path={articlePath}
        image={imageUrl}
        type="article"
        keywords={[category, "IPTV", "Québec", "streaming"]}
      />
      <StructuredData 
        type="article" 
        data={{
          headline: title,
          description: excerpt,
          image: imageUrl,
          datePublished: parseDate(date),
          author: "Quebec IPTV",
          url: articleUrl,
        }} 
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Blog", url: "https://quebec-iptv.ca/blog" },
          { name: title, url: articleUrl }
        ]}
      />
      <Header />
      <main className="pt-20" role="main">
        {/* Hero Section */}
        <article className="max-w-4xl mx-auto px-4 py-12" itemScope itemType="https://schema.org/Article">
          <nav aria-label="Retour">
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </nav>

          <header className="mb-6">
            <Badge variant="secondary" className="mb-4">{category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" itemProp="headline">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6" itemProp="description">
              {excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={parseDate(date)} itemProp="datePublished">{date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </header>

          {/* Featured Image with Watermark */}
          <figure className="relative mb-12 rounded-xl overflow-hidden">
            <OptimizedImage 
              src={image} 
              alt={`Image principale de l'article: ${title} - Guide IPTV Quebec`}
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
              <img src={logo} alt="" width={60} height={24} className="h-6" aria-hidden="true" />
            </div>
          </figure>

          {/* Article Content */}
          <section className="prose prose-lg dark:prose-invert max-w-none" itemProp="articleBody">
            {content}
          </section>

          {/* Call to Action */}
          <aside className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à profiter de l'IPTV au Québec ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Découvrez notre service IPTV premium avec plus de 20 000 chaînes en qualité 8K/4K/HD, 
              support 24/7 et activation instantanée.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="/tarifs">Voir nos forfaits</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/essai-gratuit">Essai gratuit</a>
              </Button>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
