import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { BunnyHeroImage } from "@/components/ui/bunny-image";
import { Calendar, Clock, ArrowLeft, Share2, User, FileText, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/iptv-quebec-premium-logo.png";
import { AUTHOR, SITE } from "@/config/author";

// Author stats - these could be fetched dynamically in the future
const AUTHOR_STATS = {
  articleCount: 25,
  totalReadingTime: "2h 30min",
};

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
          author: AUTHOR.name,
          authorUrl: AUTHOR.url,
          authorImage: `${SITE.url}${AUTHOR.avatar}`,
          authorDescription: AUTHOR.description,
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
                  <span className="font-medium text-foreground" itemProp="author">{AUTHOR.name}</span>
                  <span className="text-xs text-muted-foreground">{AUTHOR.shortDescription}</span>
                </div>
              </div>
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
            <BunnyHeroImage 
              src={image} 
              alt={`Image principale de l'article: ${title} - Guide IPTV Quebec`}
              width={1200}
              height={630}
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

          {/* Author Bio Section */}
          <aside className="mt-12 p-6 bg-card rounded-xl border border-border">
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
                    <span className="font-medium">{AUTHOR_STATS.articleCount}</span>
                    <span>articles</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Timer className="w-4 h-4 text-primary" />
                    <span className="font-medium">{AUTHOR_STATS.totalReadingTime}</span>
                    <span>de lecture</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

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
