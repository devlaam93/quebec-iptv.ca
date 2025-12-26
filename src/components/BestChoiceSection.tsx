import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import showcaseTv from "@/assets/iptv-showcase-tv.jpg";
// WebP version generated at build time by vite-imagetools
import showcaseTvWebp from "@/assets/iptv-showcase-tv.jpg?format=webp";

const BestChoiceSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-background/95 to-background relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Image */}
          <div className="relative order-2 lg:order-1" data-aos="fade-right">
            <div className="relative rounded-xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
              <OptimizedImage 
                src={showcaseTv} 
                webpSrc={showcaseTvWebp}
                alt="Interface IPTV Quebec affichant le menu principal sur une smart TV avec chaînes en direct et films en 4K" 
                width={600}
                height={400}
                className="w-full h-auto"
              />
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-5 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left" data-aos="fade-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Le <span className="text-primary">Meilleur IPTV Quebec</span> est toujours votre choix gagnant!
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Fort de plusieurs années d'expérience et d'une technologie IPTV de pointe, 
              notre fournisseur est reconnu comme le{" "}
              <strong className="text-foreground">meilleur IPTV Quebec</strong>. Il vous 
              assure une expérience de divertissement unique avec une diffusion fluide et 
              stable. Découvrez des bénéfices exclusifs :
            </p>

            <ul className="space-y-3 sm:space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 sm:mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-sm sm:text-base text-muted-foreground flex-1">
                  Des <strong className="text-foreground">prix d'abonnement IPTV</strong> nettement plus compétitifs que ceux du câble ou du satellite.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 sm:mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-sm sm:text-base text-muted-foreground flex-1">
                  Un accompagnement expert avec une équipe constamment à votre disposition pour vous orienter.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 sm:mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-sm sm:text-base text-muted-foreground flex-1">
                  Une interface de gestion conviviale conçue spécialement pour les distributeurs et collaborateurs.
                </span>
              </li>
            </ul>

            <div className="pt-2 sm:pt-4 flex justify-center lg:justify-start">
              <Link to="/tarifs">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                  AUJOURD'HUI SEULEMENT - 30% OFF
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestChoiceSection;
