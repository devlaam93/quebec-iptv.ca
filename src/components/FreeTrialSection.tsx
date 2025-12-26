import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FreeTrialSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden" aria-labelledby="free-trial-heading">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-primary/5" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <h2 id="free-trial-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            Essai IPTV Gratuitement – Testez dès maintenant !
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 px-4">
            Ne manquez pas l'occasion de découvrir gratuitement les avantages de IPTV Québec. 
            Avec notre essai gratuit, vous avez la possibilité de tester la qualité exceptionnelle 
            et la diversité de notre service.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-14 md:mb-16">
            <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base w-full sm:w-auto">
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Obtenez un test de 12 heures !
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm sm:text-base w-full sm:w-auto">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
              Obtenez un test de 12 heures !
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 sm:p-8 text-center hover:bg-card/70 transition-all duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1.5 sm:mb-2">5k+</div>
            <div className="text-muted-foreground font-medium tracking-wide uppercase text-xs sm:text-sm">
              Utilisateur Actif
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 sm:p-8 text-center hover:bg-card/70 transition-all duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1.5 sm:mb-2">20k+</div>
            <div className="text-muted-foreground font-medium tracking-wide uppercase text-xs sm:text-sm">
              Chaînes
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 sm:p-8 text-center hover:bg-card/70 transition-all duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1.5 sm:mb-2">75k+</div>
            <div className="text-muted-foreground font-medium tracking-wide uppercase text-xs sm:text-sm">
              Films et Émissions de Télévision (VOD)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;