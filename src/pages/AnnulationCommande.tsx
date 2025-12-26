import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock, RefreshCw, CheckCircle } from "lucide-react";

const AnnulationCommande = () => {
  return (
    <PageLayout container>
      <SEO
        title="Annulation de Commande - IPTV Québec"
        description="Politique d'annulation de commande IPTV Québec. Découvrez les conditions et démarches pour annuler votre abonnement IPTV."
        path="/annulation-commande"
        image="/og-annulation.jpg"
        noIndex
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Annulation de Commande", url: "https://quebec-iptv.ca/annulation-commande" },
        ]}
      />
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Annulation de la Commande
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprendre notre politique d'annulation et les démarches à suivre
        </p>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <Clock className="w-12 h-12 text-primary" />
              <h3 className="font-semibold text-lg">Délai d'annulation</h3>
              <p className="text-sm text-muted-foreground">
                Annulation possible dans les 24h suivant l'achat
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <RefreshCw className="w-12 h-12 text-primary" />
              <h3 className="font-semibold text-lg">Remboursement</h3>
              <p className="text-sm text-muted-foreground">
                Traitement sous 5-7 jours ouvrables
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-primary" />
              <h3 className="font-semibold text-lg">Support rapide</h3>
              <p className="text-sm text-muted-foreground">
                Assistance disponible 24/7
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Conditions d'annulation
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Chez IPTV Quebec, nous comprenons que des circonstances peuvent vous amener à vouloir annuler votre commande. 
                  Voici les conditions applicables :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">Avant activation :</strong> Annulation complète possible dans les 24 heures suivant l'achat, 
                    avant l'activation du service
                  </li>
                  <li>
                    <strong className="text-foreground">Après activation :</strong> Les annulations après activation du service ne sont plus éligibles 
                    au remboursement complet
                  </li>
                  <li>
                    <strong className="text-foreground">Essai gratuit :</strong> L'essai gratuit de 24h peut être annulé à tout moment sans frais
                  </li>
                  <li>
                    <strong className="text-foreground">Abonnements renouvelés :</strong> Les renouvellements automatiques peuvent être annulés avant 
                    la date de renouvellement
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Comment annuler votre commande</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contactez notre support</h3>
                    <p className="text-muted-foreground">
                      Envoyez un email à support@quebeciptv.ca avec votre numéro de commande
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Fournissez les informations</h3>
                    <p className="text-muted-foreground">
                      Incluez votre nom complet, email utilisé lors de l'achat et la raison de l'annulation
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Confirmation</h3>
                    <p className="text-muted-foreground">
                      Vous recevrez une confirmation d'annulation par email sous 24 heures
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Délais de remboursement</h2>
              <p className="text-muted-foreground mb-4">
                Une fois votre annulation approuvée, le remboursement sera traité selon les modalités suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>Traitement de la demande : 1-2 jours ouvrables</li>
                <li>Remboursement par carte bancaire : 5-7 jours ouvrables</li>
                <li>Remboursement par virement Interac : 3-5 jours ouvrables</li>
                <li>Remboursement par cryptomonnaie : 1-3 jours ouvrables</li>
              </ul>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Cas particuliers</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Problèmes techniques :</strong> En cas de problème technique majeur non résolu, 
                  nous pouvons étudier votre demande d'annulation au cas par cas, même après activation.
                </p>
                <p>
                  <strong className="text-foreground">Service non conforme :</strong> Si le service ne correspond pas à la description, 
                  contactez-nous immédiatement pour trouver une solution ou procéder à l'annulation.
                </p>
                <p>
                  <strong className="text-foreground">Force majeure :</strong> Des circonstances exceptionnelles peuvent être prises en compte 
                  pour l'étude de votre demande.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-card border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Besoin d'aide ?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Notre équipe de support est disponible 24/7 pour répondre à vos questions et traiter votre demande d'annulation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="/contact">Contacter le support</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/">Retour à l'accueil</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AnnulationCommande;
