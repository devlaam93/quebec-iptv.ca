import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, TrendingUp, Headphones, Shield, Zap } from "lucide-react";

const Revendeur = () => {
  return (
    <PageLayout>
      <SEO
        title="Programme Revendeur IPTV - Devenez Partenaire"
        description="Rejoignez notre programme revendeur IPTV. Tarifs préférentiels, panel de gestion, support dédié et marges attractives. Développez votre business IPTV."
        path="/revendeur"
        keywords={["revendeur IPTV", "partenaire IPTV", "revente IPTV", "panel revendeur"]}
      />
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-orange bg-clip-text text-transparent">
              Programme Revendeur
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Développez votre entreprise avec notre programme de revente IPTV. 
              Bénéficiez de tarifs préférentiels et d'un support dédié.
            </p>
            <Button size="lg" className="text-base sm:text-lg">
              Devenir Revendeur
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Pourquoi Devenir Revendeur ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "Marges Attractives",
                description: "Profitez de tarifs de gros très compétitifs et maximisez vos profits"
              },
              {
                icon: Headphones,
                title: "Support Prioritaire",
                description: "Assistance technique 24/7 dédiée aux revendeurs"
              },
              {
                icon: Users,
                title: "Panel de Gestion",
                description: "Interface intuitive pour gérer tous vos clients facilement"
              },
              {
                icon: Shield,
                title: "Crédits Garantis",
                description: "Protection de vos investissements avec notre garantie"
              },
              {
                icon: Zap,
                title: "Activation Instantanée",
                description: "Activez les abonnements de vos clients en quelques secondes"
              },
              {
                icon: CheckCircle2,
                title: "Sans Engagement",
                description: "Aucun contrat à long terme, démarrez quand vous voulez"
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 sm:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Tarifs Revendeur
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Starter", credits: "50", price: "250", discount: "20%" },
              { name: "Business", credits: "150", price: "675", discount: "30%", popular: true },
              { name: "Enterprise", credits: "500", price: "2000", discount: "40%" }
            ].map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-primary ring-2 ring-primary' : 'border-border/50'}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-orange text-white px-4 py-1 rounded-full text-sm font-bold">
                    Populaire
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground mb-4">{tier.credits} Crédits</p>
                  <div className="mb-4">
                    <span className="text-4xl font-black">${tier.price}</span>
                    <span className="text-muted-foreground ml-2">CAD</span>
                  </div>
                  <p className="text-primary font-semibold mb-6">Économie de {tier.discount}</p>
                  <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                    Choisir
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl p-8 sm:p-12 border border-primary/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Prêt à Commencer ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Rejoignez notre réseau de revendeurs et développez votre activité dès aujourd'hui
            </p>
            <Button asChild size="lg" className="text-base sm:text-lg">
              <Link to="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Revendeur;
