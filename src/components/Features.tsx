import { Card, CardContent } from "@/components/ui/card";
import { 
  Tv, 
  Film, 
  Smartphone, 
  Wifi, 
  Shield, 
  Clock,
  Headphones,
  Globe
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Tv,
      title: "+20.000 Chaînes premium avec Quebec HD",
      description: "Voyez plus grand ! Accédez à plus de 20 000 chaînes, regardez la télévision du monde entier en Full HD."
    },
    {
      icon: Film,
      title: "Dernières sorties de films",
      description: "Tout le cinéma canadien et international diffusé juste après la sortie en salle. Rien que du cinéma très frais."
    },
    {
      icon: Smartphone,
      title: "Compatible avec tous les appareils",
      description: "Smart TV, Android Box, iPhone, iPad, ordinateur... Regardez où vous voulez, quand vous voulez."
    },
    {
      icon: Wifi,
      title: "Serveur de haute performance",
      description: "Streaming en 4K Ultra HD sans interruption grâce à nos serveurs optimisés partout au Canada."
    },
    {
      icon: Shield,
      title: "Service sécurisé et fiable",
      description: "Connexion cryptée, protection de vos données et disponibilité 99.9% garantie."
    },
    {
      icon: Clock,
      title: "Activation instantanée",
      description: "Votre abonnement est activé immédiatement après le paiement. Pas d'attente !"
    },
    {
      icon: Headphones,
      title: "Support technique 24/7",
      description: "Notre équipe d'experts est disponible 24h/24 et 7j/7 pour vous accompagner."
    },
    {
      icon: Globe,
      title: "Contenu international",
      description: "Chaînes du Canada, France, États-Unis, Royaume-Uni et plus de 50 pays."
    }
  ];

  return (
    <section aria-labelledby="features-heading" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 id="features-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Pourquoi choisir Quebec IPTV ?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Découvrez tous les avantages de notre service IPTV premium
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="flex justify-center">
                    <div className="p-2.5 sm:p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;