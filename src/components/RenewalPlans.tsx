import { Button } from "@/components/ui/button";
import { Check, Sparkles, Shield, Crown, Tv, Film, Trophy, Headphones, Wifi, Lock, Star, Play, Zap, Clock } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { BunnyImage } from "@/components/ui/bunny-image";

// Payment logo paths for BunnyCDN
const paymentLogoPaths = {
  visa: "/src/assets/logos/visa-logo.png",
  mastercard: "/src/assets/logos/mastercard-new.png",
  crypto: "/src/assets/logos/crypto-logo.png",
  paypal: "/src/assets/logos/paypal-logo.png",
  applePay: "/src/assets/logos/apple-pay-logo.png",
  interac: "/src/assets/logos/interac-logo.svg",
};
const RenewalPlans = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const plans = [{
    name: "Legacy",
    price: "139",
    originalPrice: "199",
    discount: "30%",
    monthlyEquiv: "11.58",
    tagline: "Pour les amateurs",
    highlights: [{
      icon: Tv,
      text: "+15,000 Chaînes TV",
      detail: "Canada, USA, Europe, Monde"
    }, {
      icon: Film,
      text: "+50,000 VOD",
      detail: "Films & Séries à jour"
    }, {
      icon: Trophy,
      text: "Sports Inclus",
      detail: "NBA, NFL, NHL, MLB"
    }, {
      icon: Play,
      text: "Streaming",
      detail: "Netflix, Disney+, Prime"
    }],
    features: ["Qualité UHD / FHD / HD", "Catch-up TV (7 jours)", "Guide TV électronique (EPG)", "Anti-Freeze™ Technology", "Compatible tous appareils", "2 connexions simultanées", "Support technique 24/7", "Activation en 5 minutes"],
    isPopular: false
  }, {
    name: "Advanced",
    price: "189",
    originalPrice: "299",
    discount: "37%",
    monthlyEquiv: "15.75",
    tagline: "L'expérience ultime",
    highlights: [{
      icon: Tv,
      text: "+45,000 Chaînes TV",
      detail: "Monde entier en direct"
    }, {
      icon: Film,
      text: "+100,000 VOD",
      detail: "Films 4K & Séries exclusives"
    }, {
      icon: Trophy,
      text: "Sports Premium",
      detail: "NBA, NFL, NHL, UFC, F1, PPV"
    }, {
      icon: Play,
      text: "Tous Streaming",
      detail: "Netflix, Disney+, HBO, Crave+"
    }],
    features: ["Qualité 8K / UHD / FHD / HD", "Catch-up TV (14 jours)", "Guide TV électronique (EPG)", "Anti-Freeze™ 9.9 Pro", "VPN Premium intégré", "4 connexions simultanées", "Support VIP prioritaire", "Activation instantanée", "Mises à jour prioritaires", "Chaînes adultes incluses"],
    isPopular: true
  }];
  return <section ref={sectionRef} id="renewal" aria-labelledby="plans-heading" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Limited Time Offer Banner */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 mb-4 animate-pulse">
            <Clock className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-500">
              Offre Limitée — Expire Bientôt!
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/20 mb-6 ml-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Jusqu'à 30% de Réduction
            </span>
          </div>
          <h2 id="plans-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
            Choisissez votre <span className="text-primary">Forfait</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Accès illimité à tout le divertissement. Sans engagement.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {plans.map((plan, idx) => <div key={idx} className={`relative rounded-[2rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] ${plan.isPopular ? 'lg:-mt-4 lg:mb-4' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{
            transitionDelay: `${200 + idx * 150}ms`
          }}>
                {/* Card border glow */}
                <div className={`absolute inset-0 rounded-[2rem] ${plan.isPopular ? 'bg-gradient-to-b from-amber-500 via-amber-500/50 to-amber-500 p-[2px]' : 'bg-gradient-to-b from-border via-border/50 to-border p-[1px]'}`}>
                  <div className="absolute inset-[1px] rounded-[2rem] bg-card"></div>
                </div>

                {/* Popular ribbon */}
                {plan.isPopular && <div className={`absolute top-6 -right-8 z-20 rotate-45 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{
              transitionDelay: '600ms'
            }}>
                    <div className="bg-amber-500 text-white text-xs font-bold py-1 px-10 shadow-lg">
                      POPULAIRE
                    </div>
                  </div>}

                <div className="relative p-6 sm:p-8 lg:p-10">
                  {/* Discount Badge */}
                  <div className={`absolute top-4 left-4 z-20 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '400ms' }}>
                    <div className={`px-3 py-1.5 rounded-full font-bold text-sm ${plan.isPopular ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}>
                      -{plan.discount}
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6 pt-8">
                    <div>
                      <h3 className={`text-2xl sm:text-3xl font-black mb-1 ${plan.isPopular ? 'text-amber-400' : 'text-foreground'}`}>
                        {plan.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-border">
                    <div className="flex items-end gap-3 mb-2">
                      <span className="text-2xl text-muted-foreground line-through">${plan.originalPrice}</span>
                      <span className={`text-5xl sm:text-6xl font-black ${plan.isPopular ? 'text-amber-400' : 'text-foreground'}`}>
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground text-lg mb-2">CAD/an</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Soit seulement <span className={`font-bold ${plan.isPopular ? 'text-amber-400' : 'text-primary'}`}>${plan.monthlyEquiv}/mois</span>
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {plan.highlights.map((item, i) => <div key={i} className={`p-4 rounded-2xl transition-all duration-500 ${plan.isPopular ? 'bg-amber-500/10' : 'bg-primary/5'} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{
                  transitionDelay: `${400 + idx * 150 + i * 100}ms`
                }}>
                        <item.icon className={`w-6 h-6 mb-2 ${plan.isPopular ? 'text-amber-400' : 'text-primary'}`} />
                        <p className="font-bold text-foreground text-sm">{item.text}</p>
                        <p className="text-muted-foreground text-xs">{item.detail}</p>
                      </div>)}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{
                  transitionDelay: `${600 + idx * 100 + i * 50}ms`
                }}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.isPopular ? 'bg-amber-500' : 'bg-primary'}`}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </div>)}
                  </div>

                  {/* CTA */}
                  <Button className={`w-full h-11 text-sm font-bold rounded-xl transition-all duration-300 ${plan.isPopular ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40' : 'bg-foreground hover:bg-foreground/90 text-background'}`}>
                    {plan.isPopular && <Crown className="w-4 h-4 mr-2" />}
                    Choisir {plan.name}
                  </Button>

                  {/* Guarantee */}
                  <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    Garantie satisfait ou remboursé 7 jours
                  </p>
                </div>
              </div>)}
          </div>
        </div>

        {/* Payment Section */}
        <div className={`mt-16 max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
        transitionDelay: '800ms'
      }}>
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-green-500" />
              <span className="font-bold text-foreground">Paiement 100% Sécurisé</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {[
                { logo: paymentLogoPaths.visa, name: "Visa" },
                { logo: paymentLogoPaths.mastercard, name: "Mastercard" },
                { logo: paymentLogoPaths.paypal, name: "PayPal" },
                { logo: paymentLogoPaths.applePay, name: "Apple Pay" },
                { logo: paymentLogoPaths.interac, name: "Interac" },
                { logo: paymentLogoPaths.crypto, name: "Cryptomonnaie" }
              ].map((payment, index) => <div key={index} className={`bg-background border border-border rounded-xl px-4 py-2.5 hover:border-primary/30 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{
              transitionDelay: `${900 + index * 50}ms`
            }}>
                  <BunnyImage 
                    src={payment.logo} 
                    alt={`Mode de paiement ${payment.name} accepté - paiement sécurisé`} 
                    width={60} 
                    height={24}
                    responsiveWidths={[60, 120]}
                    quality={90}
                    className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" 
                  />
                </div>)}
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Activation instantanée
              </span>
              <span className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-500" /> Serveur 99.9% uptime
              </span>
              <span className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-amber-400" /> Support 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default RenewalPlans;