import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Tv, 
  Film, 
  Trophy, 
  Music, 
  Baby, 
  Newspaper, 
  Globe, 
  Play, 
  CheckCircle2, 
  Sparkles,
  MessageCircle,
  Zap,
  Eye,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

const ListeChaines = () => {
  const stats = [
    { value: "45 000+", label: "Chaînes en Direct", icon: Tv },
    { value: "140 000+", label: "Films & Séries", icon: Film },
    { value: "4K/HD", label: "Qualité Premium", icon: Sparkles },
    { value: "24/7", label: "Support Client", icon: MessageCircle }
  ];

  const categories = [
    {
      name: "Sports Premium",
      icon: Trophy,
      description: "Tous les sports en direct - Hockey, Football, Soccer, Basketball et plus",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500"
    },
    {
      name: "Films & Séries",
      icon: Film,
      description: "Dernières sorties cinéma et séries exclusives en 4K",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500"
    },
    {
      name: "Chaînes Québécoises",
      icon: Globe,
      description: "TVA, Radio-Canada, V, Télé-Québec, Noovo et plus",
      color: "from-primary/20 to-blue-500/20",
      iconColor: "text-primary"
    },
    {
      name: "Divertissement",
      icon: Tv,
      description: "Discovery, History, HGTV, National Geographic",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      name: "Jeunesse",
      icon: Baby,
      description: "Disney, Nickelodeon, Cartoon Network, Télétoon",
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-500"
    },
    {
      name: "International",
      icon: Newspaper,
      description: "Chaînes du monde entier - Europe, Moyen-Orient, Asie",
      color: "from-indigo-500/20 to-violet-500/20",
      iconColor: "text-indigo-500"
    }
  ];

  const features = [
    {
      icon: Eye,
      title: "Vérifiez le contenu en direct",
      description: "Accédez immédiatement pour voir toutes les chaînes et VOD disponibles"
    },
    {
      icon: Zap,
      title: "Streaming sans interruption",
      description: "Technologie anti-freeze pour une expérience fluide en 4K"
    },
    {
      icon: Send,
      title: "Demandez du contenu",
      description: "Films, séries ou sports manquants? Faites une demande et nous l'ajoutons!"
    }
  ];

  return (
    <PageLayout heroSection>
      <SEO
        title="Liste des Chaînes IPTV - 45 000+ Chaînes TV et VOD"
        description="Explorez notre catalogue IPTV : 45 000+ chaînes en direct, 140 000+ films et séries. Sports, divertissement, chaînes québécoises et internationales en 4K."
        path="/liste-chaines"
        keywords={["chaînes IPTV", "liste chaînes", "catalogue IPTV", "chaînes TV"]}
        image="/og-liste-chaines.jpg"
      />
      <StructuredData
        type="service"
        data={{
          name: "Catalogue IPTV Quebec",
          description: "45 000+ chaines en direct, 140 000+ films et series en qualite 4K.",
          provider: "Quebec IPTV",
          url: "https://quebec-iptv.ca/liste-chaines",
          areaServed: "Canada",
          serviceType: "IPTV Streaming Service",
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Liste des Chaines", url: "https://quebec-iptv.ca/liste-chaines" },
        ]}
      />
      {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Catalogue Complet IPTV
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Plus de <span className="text-primary">45 000</span> Chaînes
                <br />
                <span className="text-primary">140 000+</span> Films & Séries
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Le plus grand catalogue IPTV au Québec. Accédez à tout le contenu premium en qualité 4K.
              </p>

              {/* Important Alert */}
              <Alert className="max-w-2xl mx-auto mb-8 bg-gradient-to-r from-primary/20 via-primary/30 to-purple-500/20 border-2 border-primary shadow-lg shadow-primary/20 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary rounded-full flex-shrink-0">
                    <Play className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <AlertDescription className="text-left">
                    <span className="font-bold text-lg text-foreground block mb-1">Pas besoin de voir la liste complète!</span>
                    <span className="text-foreground/80">
                      Obtenez un accès direct pour vérifier toutes les chaînes et VOD disponibles par vous-même. 
                      <span className="font-semibold text-primary"> Essai gratuit disponible!</span>
                    </span>
                  </AlertDescription>
                </div>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/essai-gratuit">
                    <Play className="w-5 h-5 mr-2" />
                    Essai Gratuit
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link to="/tarifs">
                    Voir les Tarifs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Catégories de <span className="text-primary">Contenu</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tout le divertissement que vous recherchez, organisé par catégories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={index} 
                    className={`p-6 bg-gradient-to-br ${category.color} border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-background/80 ${category.iconColor} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                    <p className="text-muted-foreground">{category.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi <span className="text-primary">Nous Choisir</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Request Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 border-primary/20">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <Send className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Demandez du <span className="text-primary">Contenu</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Un film, une série ou un événement sportif vous manque? Contactez-nous et nous l'ajouterons à notre catalogue!
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <Badge variant="outline" className="text-base py-2 px-4">
                    <Film className="w-4 h-4 mr-2" />
                    Films
                  </Badge>
                  <Badge variant="outline" className="text-base py-2 px-4">
                    <Tv className="w-4 h-4 mr-2" />
                    Séries
                  </Badge>
                  <Badge variant="outline" className="text-base py-2 px-4">
                    <Trophy className="w-4 h-4 mr-2" />
                    Sports
                  </Badge>
                  <Badge variant="outline" className="text-base py-2 px-4">
                    <Music className="w-4 h-4 mr-2" />
                    Concerts
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link to="/contact">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Faire une Demande
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8">
                    <Link to="/essai-gratuit">
                      <Play className="w-5 h-5 mr-2" />
                      Essayer Maintenant
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-primary/20 via-background to-purple-500/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à explorer notre catalogue?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obtenez votre accès gratuit et découvrez 45 000+ chaînes et 140 000+ films & séries
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Essai 24h Gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Sans Engagement</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Support 24/7</span>
              </div>
            </div>
            <Button asChild size="lg" className="text-lg px-10 py-6">
              <Link to="/essai-gratuit">
                <Zap className="w-5 h-5 mr-2" />
                Commencer Maintenant
              </Link>
            </Button>
          </div>
        </section>
    </PageLayout>
  );
};

export default ListeChaines;
