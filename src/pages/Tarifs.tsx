import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RenewalPlans from "@/components/RenewalPlans";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Shield, Zap, HeadphonesIcon, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { buildSeoLinks, buildSeoMeta } from "@/lib/seo";

export const meta = () =>
  buildSeoMeta({
    title: "Abonnement IPTV - Forfaits dès 14,99$/mois | IPTV From Canada""Abonnement IPTV - Forfaits dès 14,99$/mois | IPTV From Canada""Tarifs IPTV Québec | Forfaits dès 14,99$/mois"
    description:
      "Abonnement IPTV flexible au Québec : forfaits 1, 3, 6 ou 12 mois dès 14,99$. Plus de 45 000 chaînes et VOD 4K. Activation instantanée avec garantie 7 jours.""Abonnement IPTV flexible au Québec : forfaits 1, 3, 6 ou 12 mois dès 14,99$. Plus de 45 000 chaînes et VOD 4K. Activation instantanée avec garantie 7 jours.""Forfaits IPTV flexibles : 1, 3, 6 ou 12 mois. Accès à 45 000+ chaînes et VOD 4K. Activation instantanée, garantie 7 jours. Choisissez votre plan!"
    keywords: ["prix IPTV", "abonnement IPTV", "forfait IPTV Québec", "IPTV pas cher"],
    image: "/generated/social/tarifs-social-20260408101259.png""/og-tarifs.jpg""/og-tarifs.jpg"
    path: "/tarifs""/tarifs""/tarifs"
  });

export const links = () => buildSeoLinks("/tarifs""/tarifs";

// Animated counter hook
const useAnimatedCounter = (target: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, {
      threshold: 0.5
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [hasStarted, startOnView]);
  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, target, duration]);
  return {
    count,
    ref
  };
};

// Live indicator component
const LiveIndicator = () => <span className="flex items-center gap-1.5">
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
    </span>
    <span className="text-xs text-green-500 font-medium">EN DIRECT</span>
  </span>;

// Recent clients avatars data
const recentClients = [{
  name: "Marie L.",
  color: "bg-pink-500",
  initial: "M"
}, {
  name: "Jean-Pierre D.",
  color: "bg-blue-500",
  initial: "J"
}, {
  name: "Sophie T.",
  color: "bg-purple-500",
  initial: "S"
}, {
  name: "Marc A.",
  color: "bg-green-500",
  initial: "M"
}, {
  name: "Isabelle R.",
  color: "bg-amber-500",
  initial: "I"
}, {
  name: "François B.",
  color: "bg-red-500",
  initial: "F"
}, {
  name: "Nathalie C.",
  color: "bg-cyan-500",
  initial: "N"
}];

// Client counter component
const ClientCounter = () => {
  const {
    count: clientCount,
    ref: counterRef
  } = useAnimatedCounter(52847, 2500);
  const baseActiveUsers = useRef(Math.floor(Math.random() * (7000 - 1000 + 1)) + 1000).current;
  const [fluctuatingCount, setFluctuatingCount] = useState(baseActiveUsers);
  const {
    count: activeCount
  } = useAnimatedCounter(fluctuatingCount, 2000);

  // Add subtle fluctuation every 3-8 seconds
  useEffect(() => {
    const fluctuate = () => {
      const fluctuation = Math.floor(Math.random() * 100) - 50; // -50 to +50
      setFluctuatingCount(prev => Math.max(1000, Math.min(7000, prev + fluctuation)));
    };
    const interval = setInterval(() => {
      fluctuate();
    }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds

    return () => clearInterval(interval);
  }, []);
  return <div ref={counterRef} className="mb-10">
      {/* Main counter */}
      <div className="inline-flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border mb-4">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-primary" />
          <LiveIndicator />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tabular-nums">
            {clientCount.toLocaleString('fr-CA')}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-primary">+</span>
        </div>
        <p className="text-muted-foreground mt-2">clients satisfaits au Québec</p>
        
        {/* Recent clients avatars */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex -space-x-3">
            {recentClients.map((client, i) => <div key={i} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${client.color} flex items-center justify-center text-white font-bold text-sm sm:text-base border-2 border-card shadow-lg transition-transform duration-300 hover:scale-110 hover:z-10`} style={{
            animationDelay: `${i * 100}ms`,
            zIndex: recentClients.length - i
          }} title={client.name}>
                {client.initial}
              </div>)}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center shadow-lg">
              <span className="text-primary text-xs sm:text-sm font-bold">+52K</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Nouveaux abonnés cette semaine
          </p>
        </div>
      </div>

      {/* Active users indicator */}
      
    </div>;
};
const Tarifs = () => {
  return <PageLayout>
      <SEO title={"Abonnement IPTV - Forfaits dès 14,99$/mois | IPTV From Canada"} description={"Abonnement IPTV flexible au Québec : forfaits 1, 3, 6 ou 12 mois dès 14,99$. Plus de 45 000 chaînes et VOD 4K. Activation instantanée avec garantie 7 jours."} path={"/tarifs"} keywords={["prix IPTV", "abonnement IPTV", "forfait IPTV Québec", "IPTV pas cher"]} image={"/generated/social/tarifs-social-20260408101259.png"} />
      <StructuredData
        type="service"
        data={{
          name: "Abonnement IPTV Quebec",
          description: "Service IPTV premium avec 45 000+ chaines, films et series en qualite 4K. Support 24/7.",
          provider: "Quebec IPTV",
          url: "https://iptvfromcanada.ca/tarifs",
          areaServed: "Canada",
          serviceType: "IPTV Streaming Service",
        }}
      />
      <StructuredData
        type="product-group"
        data={{
          name: "Abonnements IPTV Québec",
          description: "Forfaits IPTV premium avec 45 000+ chaînes TV, films et séries en qualité 4K. Activation instantanée, garantie 7 jours.",
          brand: "IPTV Québec",
          url: "https://iptvfromcanada.ca/tarifs",
          image: "https://iptvfromcanada.ca/og-tarifs.jpg",
          reviewCount: 2847,
          ratingValue: 4.9,
          variants: [
            {
              name: "IPTV Legacy - 1 Mois",
              description: "Forfait IPTV 1 mois avec +15,000 chaînes TV, +50,000 VOD, sports inclus, qualité UHD/FHD/HD, 2 connexions.",
              sku: "IPTV-LEGACY-1M",
              price: "19.99",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 1,
            },
            {
              name: "IPTV Legacy - 3 Mois",
              description: "Forfait IPTV 3 mois avec +15,000 chaînes TV, +50,000 VOD, sports inclus, qualité UHD/FHD/HD, 2 connexions.",
              sku: "IPTV-LEGACY-3M",
              price: "44.99",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 3,
            },
            {
              name: "IPTV Legacy - 6 Mois",
              description: "Forfait IPTV 6 mois avec +15,000 chaînes TV, +50,000 VOD, sports inclus, qualité UHD/FHD/HD, 2 connexions.",
              sku: "IPTV-LEGACY-6M",
              price: "74.99",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 6,
            },
            {
              name: "IPTV Legacy - 12 Mois",
              description: "Forfait IPTV 12 mois avec +15,000 chaînes TV, +50,000 VOD, sports inclus, qualité UHD/FHD/HD, 2 connexions.",
              sku: "IPTV-LEGACY-12M",
              price: "139",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 12,
            },
            {
              name: "IPTV Advanced - 1 Mois",
              description: "Forfait IPTV Premium 1 mois avec +45,000 chaînes TV, +100,000 VOD 4K, sports premium, qualité 8K/UHD, 4 connexions.",
              sku: "IPTV-ADVANCED-1M",
              price: "24.99",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 1,
            },
            {
              name: "IPTV Advanced - 3 Mois",
              description: "Forfait IPTV Premium 3 mois avec +45,000 chaînes TV, +100,000 VOD 4K, sports premium, qualité 8K/UHD, 4 connexions.",
              sku: "IPTV-ADVANCED-3M",
              price: "59.99",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 3,
            },
            {
              name: "IPTV Advanced - 6 Mois",
              description: "Forfait IPTV Premium 6 mois avec +45,000 chaînes TV, +100,000 VOD 4K, sports premium, qualité 8K/UHD, 4 connexions.",
              sku: "IPTV-ADVANCED-6M",
              price: "99.99",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 6,
            },
            {
              name: "IPTV Advanced - 12 Mois",
              description: "Forfait IPTV Premium 12 mois avec +45,000 chaînes TV, +100,000 VOD 4K, sports premium, qualité 8K/UHD, 4 connexions.",
              sku: "IPTV-ADVANCED-12M",
              price: "189",
              currency: "CAD",
              availability: "InStock",
              subscriptionMonths: 12,
            },
          ],
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://iptvfromcanada.ca" },
          { name: "Tarifs", url: "https://iptvfromcanada.ca/tarifs" },
        ]}
      />
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos <span className="text-primary">Tarifs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des plans flexibles adaptés à vos besoins. Accédez à{" "}
            <a href="/liste-chaines" className="text-primary hover:underline font-semibold">45 000+ chaînes en direct</a>{" "}
            avec activation instantanée et support 24/7.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Activation Instantanée</h3>
              <p className="text-muted-foreground">
                Commencez à regarder immédiatement après votre abonnement
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Service Fiable</h3>
              <p className="text-muted-foreground">
                99.9% de disponibilité avec une qualité HD exceptionnelle
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Support 24/7</h3>
              <p className="text-muted-foreground">
                Notre équipe est toujours disponible pour vous aider
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <RenewalPlans />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Live Counter */}
            <ClientCounter />

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6">
              Prêt à transformer votre{" "}
              <span className="text-primary">expérience TV</span>?
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Activation instantanée, garantie 7 jours satisfait ou remboursé.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button variant="renewal" size="lg" className="w-full sm:w-auto sm:min-w-[180px]" asChild>
                <Link to="/essai-gratuit">
                  <Zap className="w-5 h-5" />
                  Essai Gratuit 24h
                </Link>
              </Button>
              <Button variant="outline-hero" size="lg" className="w-full sm:w-auto sm:min-w-[180px]" onClick={() => {
              const element = document.getElementById('renewal');
              element?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}>
                Voir les forfaits
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Paiement sécurisé
              </span>
              <span className="flex items-center gap-2">
                <HeadphonesIcon className="w-4 h-4 text-primary" />
                Support 24/7
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Activation instantanée
              </span>
            </div>

            {/* Contextual Links */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-muted-foreground">
                Besoin d'aide? Consultez notre{" "}
                <a href="/faq" className="text-primary hover:underline font-medium">foire aux questions</a>, 
                lisez <a href="/tutorial" className="text-primary hover:underline font-medium">notre guide d'installation</a>, 
                ou découvrez <a href="/blog" className="text-primary hover:underline font-medium">nos articles sur l'IPTV</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>;
};
export default Tarifs;
