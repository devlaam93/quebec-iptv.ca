import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, Tag } from "lucide-react";
import logo from "@/assets/iptv-quebec-premium-logo.png";

// Static blog posts data - matches Blog.tsx
const staticPosts = [
  {
    id: 1,
    title: "Meilleur IPTV Québec 2025 : Guide Complet",
    excerpt: "Découvrez les meilleurs services IPTV au Québec en 2025. Comparatif complet, prix, qualité et support.",
    content: `
      <h2>Introduction à l'IPTV au Québec</h2>
      <p>L'IPTV (Internet Protocol Television) révolutionne la façon dont les Québécois consomment le contenu télévisuel. En 2025, les services IPTV offrent une alternative économique et flexible aux abonnements traditionnels de câble.</p>
      
      <h2>Pourquoi choisir l'IPTV?</h2>
      <ul>
        <li>Plus de 20,000 chaînes disponibles</li>
        <li>Contenu en 4K et HD</li>
        <li>Films et séries à la demande</li>
        <li>Compatible avec tous les appareils</li>
      </ul>
      
      <h2>Notre recommandation</h2>
      <p>Quebec IPTV offre le meilleur rapport qualité-prix avec un support technique 24/7 et une garantie de satisfaction.</p>
    `,
    slug: "meilleur-iptv-quebec-2025",
    date: "2025-01-15",
    readTime: "8 min",
    image: "",
    imageAlt: "Meilleur IPTV Québec 2025",
    category: "Guides",
    tags: [{ id: 1, name: "IPTV", slug: "iptv" }, { id: 2, name: "Québec", slug: "quebec" }]
  },
  {
    id: 2,
    title: "Comment Installer IPTV sur Fire Stick",
    excerpt: "Guide étape par étape pour installer et configurer IPTV sur votre Amazon Fire Stick.",
    content: `
      <h2>Prérequis</h2>
      <p>Avant de commencer, assurez-vous d'avoir un Amazon Fire Stick connecté à internet et un abonnement IPTV actif.</p>
      
      <h2>Étape 1: Activer les sources inconnues</h2>
      <p>Allez dans Paramètres > Ma Fire TV > Options pour les développeurs et activez "Applications de sources inconnues".</p>
      
      <h2>Étape 2: Installer Downloader</h2>
      <p>Depuis l'App Store de Fire TV, recherchez et installez l'application "Downloader".</p>
      
      <h2>Étape 3: Configurer votre IPTV</h2>
      <p>Utilisez les informations de connexion fournies par votre service IPTV pour configurer l'application.</p>
    `,
    slug: "installer-iptv-fire-stick",
    date: "2025-01-10",
    readTime: "6 min",
    image: "",
    imageAlt: "Installer IPTV Fire Stick",
    category: "Tutoriels",
    tags: [{ id: 3, name: "Fire Stick", slug: "fire-stick" }, { id: 4, name: "Installation", slug: "installation" }]
  },
  {
    id: 3,
    title: "IPTV Légal au Québec : Ce Que Vous Devez Savoir",
    excerpt: "Tout savoir sur la légalité de l'IPTV au Québec et au Canada. Informations importantes pour les utilisateurs.",
    content: `
      <h2>La légalité de l'IPTV</h2>
      <p>L'IPTV en soi est une technologie parfaitement légale. C'est simplement une méthode de diffusion de contenu télévisuel via internet.</p>
      
      <h2>Ce qui est légal</h2>
      <ul>
        <li>Utiliser des services IPTV légitimes</li>
        <li>Regarder du contenu dont vous avez les droits</li>
        <li>Utiliser des applications IPTV officielles</li>
      </ul>
      
      <h2>Conseils pour les utilisateurs</h2>
      <p>Choisissez toujours un fournisseur IPTV réputé qui respecte les droits d'auteur et offre un service de qualité.</p>
    `,
    slug: "iptv-legal-quebec",
    date: "2025-01-05",
    readTime: "5 min",
    image: "",
    imageAlt: "IPTV Légal Québec",
    category: "Légal",
    tags: [{ id: 5, name: "Légal", slug: "legal" }, { id: 6, name: "Canada", slug: "canada" }]
  }
];

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  category: string;
  tags: { id: number; name: string; slug: string }[];
}

const WordPressPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find post by slug from static data
  const post: BlogPost | undefined = staticPosts.find(p => p.slug === slug);

  if (!post) {
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
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={post.tags?.map(t => t.name) || []}
        image={post.image}
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