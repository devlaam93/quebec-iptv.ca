import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

const PolitiqueRemboursement = () => {
  return (
    <PageLayout container>
      <SEO
        title="Politique de Remboursement - IPTV Québec"
        description="Politique de remboursement IPTV Québec. Conditions, délais et procédure pour demander un remboursement de votre abonnement IPTV."
        path="/politique-remboursement"
        image="/og-remboursement.jpg"
        noIndex
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Politique de Remboursement", url: "https://quebec-iptv.ca/politique-remboursement" },
        ]}
      />
      {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Politique de Remboursement
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparence et équité dans nos conditions de remboursement
          </p>
        </div>

        {/* Quick Summary */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-center">Résumé rapide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Remboursement complet</h3>
                    <p className="text-sm text-muted-foreground">
                      Dans les 24h avant activation du service
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Délai de traitement</h3>
                    <p className="text-sm text-muted-foreground">
                      5-7 jours ouvrables selon le mode de paiement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Pas de remboursement</h3>
                    <p className="text-sm text-muted-foreground">
                      Après activation ou utilisation du service
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Cas particuliers</h3>
                    <p className="text-sm text-muted-foreground">
                      Étudiés au cas par cas par notre équipe
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">1. Conditions générales de remboursement</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    IPTV Quebec s'engage à fournir un service de qualité à tous ses clients. Notre politique de remboursement 
                    est conçue pour être juste et transparente tout en protégeant l'intégrité de notre service.
                  </p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-3">Période de garantie</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>
                        Les demandes de remboursement doivent être effectuées dans les <strong className="text-foreground">24 heures</strong> suivant l'achat
                      </li>
                      <li>
                        Le service ne doit <strong className="text-foreground">pas avoir été activé</strong> ou utilisé
                      </li>
                      <li>
                        Le code d'activation ne doit <strong className="text-foreground">pas avoir été communiqué</strong> ou révélé
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">2. Cas éligibles au remboursement</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Achat non activé</h3>
                      <p className="text-muted-foreground">
                        Si vous n'avez pas encore activé votre abonnement et que vous souhaitez annuler dans les 24 heures, 
                        un remboursement complet sera effectué.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Erreur de facturation</h3>
                      <p className="text-muted-foreground">
                        En cas de double facturation ou d'erreur de notre part, nous procéderons à un remboursement immédiat 
                        du montant facturé en trop.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Problème technique non résolu</h3>
                      <p className="text-muted-foreground">
                        Si notre équipe technique n'est pas en mesure de résoudre un problème majeur dans un délai de 48 heures, 
                        nous étudierons votre demande de remboursement proportionnel.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Interruption prolongée du service</h3>
                      <p className="text-muted-foreground">
                        En cas d'interruption de service de plus de 72 heures consécutives de notre fait, un remboursement 
                        proportionnel au temps d'arrêt sera appliqué.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">3. Cas NON éligibles au remboursement</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Service activé</h3>
                      <p className="text-muted-foreground">
                        Une fois que votre code d'activation a été utilisé et que vous avez accédé au service, 
                        aucun remboursement ne sera possible.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Incompatibilité matérielle</h3>
                      <p className="text-muted-foreground">
                        Les remboursements pour incompatibilité avec votre équipement ne sont pas acceptés. 
                        Nous fournissons la liste des appareils compatibles et recommandons de tester avec l'essai gratuit.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Problèmes de connexion Internet</h3>
                      <p className="text-muted-foreground">
                        Les problèmes liés à votre connexion Internet (vitesse insuffisante, coupures, etc.) 
                        ne donnent pas droit à un remboursement.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Changement d'avis après utilisation</h3>
                      <p className="text-muted-foreground">
                        Si vous avez utilisé le service, même partiellement, et que vous changez d'avis, 
                        aucun remboursement ne sera accordé.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Violation des conditions d'utilisation</h3>
                      <p className="text-muted-foreground">
                        En cas de violation de nos conditions d'utilisation (partage de compte, revente, etc.), 
                        votre abonnement sera résilié sans remboursement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">4. Processus de demande de remboursement</h2>
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-3">Étapes à suivre</h3>
                    <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                      <li>
                        <strong className="text-foreground">Contactez notre support :</strong> Envoyez un email à support@quebeciptv.ca 
                        avec l'objet "Demande de remboursement"
                      </li>
                      <li>
                        <strong className="text-foreground">Informations requises :</strong> Incluez votre numéro de commande, 
                        nom complet, email d'achat et la raison de votre demande
                      </li>
                      <li>
                        <strong className="text-foreground">Analyse de la demande :</strong> Notre équipe étudiera votre demande 
                        dans un délai de 24-48 heures
                      </li>
                      <li>
                        <strong className="text-foreground">Décision et notification :</strong> Vous recevrez une réponse par email 
                        avec la décision et les prochaines étapes
                      </li>
                      <li>
                        <strong className="text-foreground">Traitement du remboursement :</strong> Si approuvé, le remboursement 
                        sera traité selon votre mode de paiement
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">5. Délais et modalités de remboursement</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Les délais de remboursement varient selon le mode de paiement utilisé lors de l'achat :
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-border/50">
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-foreground mb-2">Carte bancaire (Visa, Mastercard, Amex)</h3>
                        <p className="text-sm">Délai : 5-7 jours ouvrables</p>
                        <p className="text-sm mt-1 text-muted-foreground/80">
                          Le remboursement apparaîtra sur votre relevé bancaire
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50">
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-foreground mb-2">Virement Interac</h3>
                        <p className="text-sm">Délai : 3-5 jours ouvrables</p>
                        <p className="text-sm mt-1 text-muted-foreground/80">
                          Remboursement direct sur votre compte bancaire
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50">
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-foreground mb-2">PayPal</h3>
                        <p className="text-sm">Délai : 2-4 jours ouvrables</p>
                        <p className="text-sm mt-1 text-muted-foreground/80">
                          Crédit sur votre compte PayPal
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50">
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-foreground mb-2">Cryptomonnaie</h3>
                        <p className="text-sm">Délai : 1-3 jours ouvrables</p>
                        <p className="text-sm mt-1 text-muted-foreground/80">
                          Remboursement dans la même cryptomonnaie
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">6. Remboursement partiel</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Dans certains cas exceptionnels, un remboursement partiel peut être accordé :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong className="text-foreground">Interruption prolongée :</strong> Remboursement proportionnel 
                      au temps d'indisponibilité du service
                    </li>
                    <li>
                      <strong className="text-foreground">Qualité dégradée :</strong> Si la qualité du service est 
                      significativement inférieure à ce qui est annoncé
                    </li>
                    <li>
                      <strong className="text-foreground">Problème non résolu :</strong> Compensation partielle si un 
                      problème persiste malgré nos efforts de résolution
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">7. Alternative au remboursement</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Avant de procéder à un remboursement, nous proposons généralement des alternatives :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Extension gratuite</h3>
                      <p className="text-sm">
                        Prolongation de votre abonnement en compensation des désagréments
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Changement de formule</h3>
                      <p className="text-sm">
                        Migration vers une formule plus adaptée à vos besoins sans frais
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Crédit sur compte</h3>
                      <p className="text-sm">
                        Crédit utilisable pour un futur achat ou renouvellement
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Support prioritaire</h3>
                      <p className="text-sm">
                        Assistance technique dédiée pour résoudre vos problèmes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">8. Frais de traitement</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Important :</strong> IPTV Quebec ne facture aucun frais de traitement 
                    pour les remboursements. Cependant, veuillez noter que :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Les frais bancaires ou de change appliqués par votre institution financière restent à votre charge
                    </li>
                    <li>
                      Pour les paiements en cryptomonnaie, les frais de transaction blockchain s'appliquent
                    </li>
                    <li>
                      Le montant remboursé correspond au montant exact payé, hors frais tiers
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Recommandation importante</h3>
                  <p className="text-muted-foreground">
                    Nous vous recommandons fortement de profiter de notre <strong className="text-foreground">essai gratuit de 24 heures</strong> 
                    avant de souscrire à un abonnement payant. Cela vous permet de tester la compatibilité avec vos appareils, 
                    la qualité du service et les chaînes disponibles sans engagement financier.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/essai-gratuit">Essayer gratuitement</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Questions sur notre politique ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Notre équipe est disponible 24/7 pour répondre à toutes vos questions concernant notre politique de remboursement.
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

          {/* Last Update */}
          <p className="text-center text-sm text-muted-foreground">
            Dernière mise à jour : Octobre 2025 | Cette politique peut être modifiée à tout moment. 
            Les changements seront communiqués par email aux clients existants.
          </p>
        </div>
    </PageLayout>
  );
};

export default PolitiqueRemboursement;
