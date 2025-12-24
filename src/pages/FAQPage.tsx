import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const FAQPage = () => {
  // FAQ items for structured data
  const faqItems = [
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
  ];

  return (
    <PageLayout heroSection>
      <SEO
        title="FAQ IPTV Québec - Questions Fréquentes"
        description="Trouvez les réponses à toutes vos questions sur IPTV Québec. Guide complet sur l'installation, le paiement, la qualité et le support technique."
        path="/faq"
        keywords={["FAQ IPTV", "questions IPTV", "aide IPTV", "support IPTV Québec"]}
      />
      <StructuredData type="faq" data={faqItems} />
      
      {/* FAQ Component */}
      <FAQ />

      {/* Additional Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Notre équipe de support est disponible 24/7 pour répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <a href="https://wa.me/15141234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Contacter via WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/contact">
                  <Mail className="w-5 h-5" />
                  Envoyer un Email
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQPage;
