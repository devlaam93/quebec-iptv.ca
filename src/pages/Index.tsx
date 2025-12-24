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
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://iptvquebec.ca";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="IPTV Québec - Meilleur Service IPTV au Canada | 45 000+ Chaînes"
        description="IPTV Québec offre le meilleur service IPTV au Canada avec 45 000+ chaînes, 140 000+ films et séries en 4K. Essai gratuit 24h. Support 24/7."
        path="/"
        keywords={["IPTV premium", "streaming 4K", "chaînes canadiennes", "VOD", "sports en direct"]}
      />
      <StructuredData
        type="organization"
        data={{
          name: "IPTV Québec",
          url: baseUrl,
          logo: `${baseUrl}/favicon.ico`,
          description: "Service IPTV premium au Québec et Canada avec 45 000+ chaînes et 140 000+ films/séries en qualité 4K.",
          contactEmail: "support@quebeciptv.ca",
          sameAs: [],
        }}
      />
      <StructuredData
        type="website"
        data={{
          name: "IPTV Québec",
          url: baseUrl,
          description: "Meilleur service IPTV au Québec et Canada",
        }}
      />
      <Header />
      <main>
        <HeroSection />
        <ContentShowcase />
        <RenewalPlans />
        <Features />
        <BestChoiceSection />
        <FreeTrialSection />
        <DeviceCompatibility />
        <FAQ />
      </main>
      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;