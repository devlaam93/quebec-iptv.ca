import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { HelpCircle, Shield, CreditCard, Wifi, Monitor, Settings } from "lucide-react";
const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = [{
    id: "all",
    label: "Tous",
    icon: HelpCircle
  }, {
    id: "service",
    label: "Service",
    icon: Monitor
  }, {
    id: "technical",
    label: "Technique",
    icon: Settings
  }, {
    id: "payment",
    label: "Paiement",
    icon: CreditCard
  }, {
    id: "security",
    label: "Garantie",
    icon: Shield
  }];
  const faqItems = [{
    question: "Quels Critères Dois-Je Considérer Pour Choisir Un Service IPTV Au Québec ?",
    answer: "Vérifiez la qualité vidéo (HD/4K), la stabilité du signal, le nombre de chaînes, le support client 24/7, et la compatibilité avec vos appareils (Smart TV, Fire Stick, Android, iOS).",
    category: "service"
  }, {
    question: "Comment Éviter Les Arnaques Et Choisir Un Fournisseur IPTV Légitime ?",
    answer: "Choisissez un fournisseur avec garantie de remboursement 7 jours, support client joignable, et avis vérifiables. Évitez les offres à vie ou les prix inférieurs à 5$/mois.",
    category: "security"
  }, {
    question: "Puis-Je Souscrire À L'IPTV Quebec Sans Service Satellite ?",
    answer: "Oui. L'IPTV nécessite uniquement une connexion Internet. Aucune antenne satellite ni câble coaxial requis.",
    category: "technical"
  }, {
    question: "Puis-Je Utiliser Mon Abonnement IPTV Quebec Sur Plusieurs Appareils ?",
    answer: "Oui, jusqu'à 2 appareils simultanés selon l'abonnement. Compatible Smart TV, smartphone, tablette, ordinateur et Fire Stick.",
    category: "service"
  }, {
    question: "Offrez-Vous Un Remboursement ?",
    answer: "Oui, remboursement complet sous 7 jours sans condition. Contactez le support par WhatsApp ou email pour initier la demande.",
    category: "security"
  }, {
    question: "Mon Abonnement Est-Il Actif Dès Que J'effectue Un Paiement ?",
    answer: "Oui, activation immédiate. Les identifiants sont envoyés par email dans les 5 minutes suivant le paiement.",
    category: "payment"
  }, {
    question: "Disposez-Vous D'un Guide TV Epg (Electronic Program Guide) ?",
    answer: "Oui, guide EPG inclus avec programmation sur 7 jours pour toutes les chaînes. Disponible sur toutes les applications compatibles.",
    category: "service"
  }, {
    question: "Comment Vérifier La Vitesse Et La Qualité De Mon Internet ?",
    answer: "Minimum requis: 10 Mbps pour HD, 25 Mbps pour 4K. Testez sur speedtest.net. Connexion filaire recommandée pour la 4K.",
    category: "technical"
  }, {
    question: "Combien De Bande Passante Le Flux IPTV Quebec Utilise-T-Il ?",
    answer: "Consommation: 3-5 Mbps en SD, 5-8 Mbps en HD, 15-25 Mbps en 4K. Environ 2-4 Go par heure en HD.",
    category: "technical"
  }, {
    question: "Quels Sont Les Modes De Paiement Disponibles ?",
    answer: "Visa, MasterCard, PayPal, Interac e-Transfer, et crypto-monnaies (Bitcoin, Ethereum). Paiements sécurisés par Stripe.",
    category: "payment"
  }, {
    question: "Comment Puis-Je Stabiliser Mon Canal Lorsqu'il Connaît Des Interruptions ?",
    answer: "1) Redémarrez l'application. 2) Vérifiez votre connexion Internet. 3) Changez de serveur dans les paramètres. 4) Contactez le support si le problème persiste.",
    category: "technical"
  }, {
    question: "Comment Puis-Je Réactiver Mon Compte Lorsqu'il Ne Fonctionne Pas ?",
    answer: "Contactez le support via WhatsApp avec votre email d'inscription. Réactivation sous 10 minutes en heures ouvrables.",
    category: "service"
  }];
  const filteredFaqs = activeCategory === "all" ? faqItems : faqItems.filter(item => item.category === activeCategory);
  return <section id="faq" aria-labelledby="faq-heading" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Animation */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Support & Aide
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Trouvez rapidement les réponses à vos questions sur notre service IPTV
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat, index) => {
          const Icon = cat.icon;
          return <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`group flex items-center gap-2 px-4 py-3 min-h-[48px] rounded-full text-sm font-medium transition-all duration-300 touch-manipulation ${activeCategory === cat.id ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"}`} style={{
            animationDelay: `${index * 50}ms`
          }}>
                <Icon className={`w-4 h-4 transition-transform duration-300 ${activeCategory === cat.id ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="text-base">{cat.label}</span>
              </button>;
        })}
        </div>

        {/* FAQ Grid with Staggered Animation */}
        <div className="max-w-4xl mx-auto mb-16">
          <Accordion type="single" collapsible className="space-y-3">
            {filteredFaqs.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="group bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden data-[state=open]:border-primary/50 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all duration-300 animate-fade-in" style={{
            animationDelay: `${index * 75}ms`
          }}>
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-muted/30 transition-all duration-200 [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <span className="text-foreground font-medium text-sm md:text-base leading-relaxed pr-4">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5">
                  <div className="pl-12 text-muted-foreground text-sm md:text-base leading-relaxed border-l-2 border-primary/20 ml-4">
                    <p className="pl-4">{item.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {[{
          value: "24/7",
          label: "Support Disponible"
        }, {
          value: "< 5min",
          label: "Temps de Réponse"
        }, {
          value: "99%",
          label: "Satisfaction Client"
        }, {
          value: "7 jours",
          label: "Garantie Remboursement"
        }].map((stat, index) => <div key={index} className="text-center p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors duration-300 animate-fade-in" style={{
          animationDelay: `${(index + filteredFaqs.length) * 75}ms`
        }}>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>)}
        </div>

        {/* Guarantee Section - Modern Design */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl" />
          <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-primary/20 overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-tr-full" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Animated Shield Badge */}
              <div className="flex-shrink-0 relative">
                <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-primary to-primary/80 rounded-2xl rotate-3 flex items-center justify-center shadow-2xl shadow-primary/30 group hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-2 border-2 border-white/20 rounded-xl" />
                  <Shield className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  ✓ Actif
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Sans Risque : Garantie de Remboursement 7 Jours
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Satisfait ou remboursé ! Profitez de notre service IPTV Quebec sans risque. 
                  Si vous n'êtes pas entièrement satisfait, nous vous rembourserons votre paiement, sans poser de questions.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Remboursement Complet
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Sans Questions
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Processus Rapide
                  </div>
                </div>
                
                {/* Payment Methods Section */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FAQ;