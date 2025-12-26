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
            answer: "Pour choisir le meilleur service IPTV au Québec, considérez la qualité vidéo (HD/4K), la stabilité du signal, la variété des chaînes, le support client, les prix compétitifs, et la compatibilité avec vos appareils."
          },
          {
            question: "Comment Éviter Les Arnaques Et Choisir Un Fournisseur IPTV Légitime ?",
            answer: "Recherchez des fournisseurs établis avec de bonnes critiques, évitez les prix anormalement bas, vérifiez les garanties de remboursement, et assurez-vous qu'ils offrent un support client réactif."
          },
          {
            question: "Puis-Je Souscrire À L'IPTV Quebec Sans Service Satellite ?",
            answer: "Oui, l'IPTV fonctionne uniquement avec une connexion Internet haut débit. Aucun équipement satellite n'est nécessaire, juste une connexion Internet stable."
          },
          {
            question: "Puis-Je Utiliser Mon Abonnement IPTV Quebec Sur Plusieurs Appareils ?",
            answer: "Oui, selon votre abonnement, vous pouvez généralement utiliser votre service IPTV sur plusieurs appareils simultanément (TV, smartphone, tablette, ordinateur)."
          },
          {
            question: "Offrez-Vous Un Remboursement ?",
            answer: "Oui, nous offrons une garantie de remboursement de 7 jours. Si vous n'êtes pas satisfait de notre service, nous vous remboursons intégralement."
          },
          {
            question: "Mon Abonnement Est-Il Actif Dès Que J'effectue Un Paiement ?",
            answer: "Oui, votre abonnement est activé immédiatement après confirmation du paiement. Vous recevrez vos identifiants de connexion par email dans les minutes qui suivent."
          },
          {
            question: "Disposez-Vous D'un Guide TV Epg (Electronic Program Guide) ?",
            answer: "Oui, nous fournissons un guide TV électronique complet avec les programmes de toutes les chaînes, vous permettant de voir ce qui passe maintenant et plus tard."
          },
          {
            question: "Comment Vérifier La Vitesse Et La Qualité De Mon Internet ?",
            answer: "Nous recommandons au minimum 10 Mbps pour une qualité HD et 25 Mbps pour la 4K. Vous pouvez tester votre connexion avec des outils comme Speedtest.net."
          },
          {
            question: "Combien De Bande Passante Le Flux IPTV Quebec Utilise-T-Il ?",
            answer: "Le flux IPTV utilise environ 5-8 Mbps pour du contenu HD et 15-25 Mbps pour du contenu 4K. La consommation varie selon la qualité choisie."
          },
          {
            question: "Quels Sont Les Modes De Paiement Disponibles ?",
            answer: "Nous acceptons les cartes de crédit (Visa, MasterCard), PayPal, Interac, et les virements bancaires pour votre commodité et sécurité."
          },
          {
            question: "Comment Puis-Je Stabiliser Mon Canal Lorsqu'il Connaît Des Interruptions ?",
            answer: "Vérifiez votre connexion Internet, redémarrez votre appareil, changez de serveur si l'option est disponible, ou contactez notre support technique."
          },
          {
            question: "Comment Puis-Je Réactiver Mon Compte Lorsqu'il Ne Fonctionne Pas ?",
            answer: "Contactez notre service client avec vos identifiants. Nous vérifierons votre compte et vous aiderons à le réactiver rapidement."
          }
        ]}
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