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
          description: "Service IPTV premium au Québec et Canada offrant plus de 15 000 chaînes TV en direct, 40 000+ films et séries VOD en qualité 4K Ultra HD. Activation instantanée, support technique 24/7, compatible avec tous les appareils.",
          contactEmail: "support@quebec-iptv.ca",
          sameAs: [
            "https://www.facebook.com/iptvquebec",
            "https://twitter.com/iptvquebec",
            "https://www.instagram.com/iptvquebec",
            "https://www.youtube.com/@iptvquebec"
          ],
          foundingDate: "2020",
          contactPoint: {
            telephone: "+1-438-000-0000",
            contactType: "customer service",
            availableLanguage: ["French", "English"],
            areaServed: ["CA", "FR", "BE", "CH"]
          }
        }}
      />
      <StructuredData
        type="local-business"
        data={{
          name: "IPTV Québec",
          url: "https://quebec-iptv.ca",
          logo: "https://quebec-iptv.ca/og-image.jpg",
          description: "Fournisseur de services IPTV premium au Québec offrant plus de 15 000 chaînes TV en direct, 40 000+ films et séries VOD en qualité 4K Ultra HD. Essai gratuit disponible.",
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
          sameAs: [
            "https://www.facebook.com/iptvquebec",
            "https://twitter.com/iptvquebec",
            "https://www.instagram.com/iptvquebec",
            "https://www.youtube.com/@iptvquebec"
          ],
        }}
      />
      <StructuredData
        type="website"
        data={{
          name: "IPTV Québec",
          url: "https://quebec-iptv.ca",
          description: "Meilleur service IPTV au Québec et Canada avec 15 000+ chaînes TV, films et séries en streaming 4K.",
        }}
      />
      <StructuredData
        type="faq"
        data={[
          {
            question: "Quels Critères Dois-Je Considérer Pour Choisir Un Service IPTV Au Québec ?",
            answer: "Vérifiez la qualité vidéo (HD/4K), la stabilité du signal, le nombre de chaînes, le support client 24/7, et la compatibilité avec vos appareils (Smart TV, Fire Stick, Android, iOS)."
          },
          {
            question: "Comment Éviter Les Arnaques Et Choisir Un Fournisseur IPTV Légitime ?",
            answer: "Choisissez un fournisseur avec garantie de remboursement 7 jours, support client joignable, et avis vérifiables. Évitez les offres à vie ou les prix inférieurs à 5$/mois."
          },
          {
            question: "Puis-Je Souscrire À L'IPTV Quebec Sans Service Satellite ?",
            answer: "Oui. L'IPTV nécessite uniquement une connexion Internet. Aucune antenne satellite ni câble coaxial requis."
          },
          {
            question: "Puis-Je Utiliser Mon Abonnement IPTV Quebec Sur Plusieurs Appareils ?",
            answer: "Oui, jusqu'à 2 appareils simultanés selon l'abonnement. Compatible Smart TV, smartphone, tablette, ordinateur et Fire Stick."
          },
          {
            question: "Offrez-Vous Un Remboursement ?",
            answer: "Oui, remboursement complet sous 7 jours sans condition. Contactez le support par WhatsApp ou email pour initier la demande."
          },
          {
            question: "Mon Abonnement Est-Il Actif Dès Que J'effectue Un Paiement ?",
            answer: "Oui, activation immédiate. Les identifiants sont envoyés par email dans les 5 minutes suivant le paiement."
          },
          {
            question: "Disposez-Vous D'un Guide TV Epg (Electronic Program Guide) ?",
            answer: "Oui, guide EPG inclus avec programmation sur 7 jours pour toutes les chaînes. Disponible sur toutes les applications compatibles."
          },
          {
            question: "Comment Vérifier La Vitesse Et La Qualité De Mon Internet ?",
            answer: "Minimum requis: 10 Mbps pour HD, 25 Mbps pour 4K. Testez sur speedtest.net. Connexion filaire recommandée pour la 4K."
          },
          {
            question: "Combien De Bande Passante Le Flux IPTV Quebec Utilise-T-Il ?",
            answer: "Consommation: 3-5 Mbps en SD, 5-8 Mbps en HD, 15-25 Mbps en 4K. Environ 2-4 Go par heure en HD."
          },
          {
            question: "Quels Sont Les Modes De Paiement Disponibles ?",
            answer: "Visa, MasterCard, PayPal, Interac e-Transfer, et crypto-monnaies (Bitcoin, Ethereum). Paiements sécurisés par Stripe."
          },
          {
            question: "Comment Puis-Je Stabiliser Mon Canal Lorsqu'il Connaît Des Interruptions ?",
            answer: "1) Redémarrez l'application. 2) Vérifiez votre connexion Internet. 3) Changez de serveur dans les paramètres. 4) Contactez le support si le problème persiste."
          },
          {
            question: "Comment Puis-Je Réactiver Mon Compte Lorsqu'il Ne Fonctionne Pas ?",
            answer: "Contactez le support via WhatsApp avec votre email d'inscription. Réactivation sous 10 minutes en heures ouvrables."
          }
        ]}
      />
      <StructuredData
        type="service"
        data={{
          name: "Abonnement IPTV Québec Premium",
          description: "Service de streaming IPTV premium offrant plus de 15 000 chaînes TV en direct, 40 000+ films et séries VOD en qualité 4K Ultra HD. Compatible avec tous les appareils: Smart TV, Android, iOS, Fire Stick, ordinateurs. Activation instantanée et support technique 24/7.",
          provider: "IPTV Québec",
          url: "https://quebec-iptv.ca/tarifs",
          areaServed: "Canada, France, Belgique, Suisse",
          serviceType: "Streaming IPTV",
          offers: {
            price: "14.99",
            priceCurrency: "CAD"
          }
        }}
      />
      <Header />
      <main id="main-content" role="main">
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