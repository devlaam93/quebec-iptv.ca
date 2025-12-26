import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RenewalPlans from "@/components/RenewalPlans";
import Features from "@/components/Features";
import ContentShowcase from "@/components/ContentShowcase";
import BestChoiceSection from "@/components/BestChoiceSection";
import FreeTrialSection from "@/components/FreeTrialSection";
import DeviceCompatibility from "@/components/DeviceCompatibility";
import FAQ from "@/components/FAQ";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";

import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const Index = () => {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="IPTV Québec | 45 000+ Chaînes TV en 4K - Essai Gratuit"
        description="Service IPTV premium au Québec : 45 000+ chaînes en direct, 140 000+ films et séries en 4K. Essai gratuit 24h, support 24/7. Commencez maintenant!"
        path="/"
        keywords={["IPTV premium", "streaming 4K", "chaînes canadiennes", "VOD", "sports en direct"]}
        image="/og-image.jpg"
      />
      <StructuredData
        type="organization"
        data={{
          name: "IPTV Québec",
          url: "https://quebec-iptv.ca",
          logo: "https://quebec-iptv.ca/og-image.jpg",
          description: "Service IPTV premium au Québec et Canada avec 45 000+ chaînes et 140 000+ films/séries en qualité 4K. Support technique 24/7.",
          contactEmail: "support@quebec-iptv.ca",
          sameAs: [],
        }}
      />
      <StructuredData
        type="local-business"
        data={{
          name: "IPTV Québec",
          url: "https://quebec-iptv.ca",
          logo: "https://quebec-iptv.ca/og-image.jpg",
          description: "Fournisseur de services IPTV premium au Québec offrant plus de 45 000 chaînes TV en direct, 140 000+ films et séries en 4K. Essai gratuit 24h disponible.",
          telephone: "+1-438-000-0000",
          priceRange: "$$",
          address: {
            addressLocality: "Montréal",
            addressRegion: "QC",
            addressCountry: "CA",
          },
          geo: {
            latitude: 45.5017,
            longitude: -73.5673,
          },
          openingHours: ["Mo-Su 00:00-23:59"],
          paymentAccepted: ["Visa", "MasterCard", "PayPal", "Interac", "Crypto"],
          currenciesAccepted: "CAD, USD",
          areaServed: ["Canada", "France", "Belgique", "Suisse"],
          sameAs: [],
        }}
      />
      <StructuredData
        type="website"
        data={{
          name: "IPTV Québec",
          url: "https://quebec-iptv.ca",
          description: "Meilleur service IPTV au Québec et Canada avec 45 000+ chaînes TV, films et séries en streaming 4K.",
        }}
      />
      <Header />
      <main role="main">
        <article>
          <HeroSection />
        </article>
        <ContentShowcase />
        <RenewalPlans />
        <Features />
        <BestChoiceSection />
        <FreeTrialSection />
        <DeviceCompatibility />
        <aside aria-label="Questions fréquentes">
          <FAQ />
        </aside>
      </main>
      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;