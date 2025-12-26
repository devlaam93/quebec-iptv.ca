import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Shield, DollarSign } from "lucide-react";

const ConditionsPaiement = () => {
  return (
    <PageLayout heroSection>
      <SEO
        title="Conditions de Paiement - IPTV Québec"
        description="Méthodes de paiement acceptées par IPTV Québec : Visa, Mastercard, PayPal, Interac, crypto. Paiement sécurisé et conditions de facturation."
        path="/conditions-paiement"
        image="/og-paiement.jpg"
        noIndex
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Conditions de Paiement", url: "https://quebec-iptv.ca/conditions-paiement" },
        ]}
      />
      {/* Hero Section */}
      <section className="bg-gradient-hero border-b border-border/50 pt-36 sm:pt-40 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Conditions de Paiement
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Méthodes de paiement acceptées et conditions d'utilisation
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Paiements Sécurisés</h3>
                <p className="text-sm text-muted-foreground">
                  Multiples options de paiement sécurisées
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Protection SSL</h3>
                <p className="text-sm text-muted-foreground">
                  Toutes les transactions sont cryptées
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Prix Transparents</h3>
                <p className="text-sm text-muted-foreground">
                  Pas de frais cachés ni de surprises
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">1. Méthodes de Paiement Acceptées</h2>
                <p className="text-muted-foreground mb-4">
                  IPTV Quebec accepte les méthodes de paiement suivantes pour faciliter vos transactions :
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Cartes de Crédit et Débit</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Nous acceptons les principales cartes bancaires :
                    </p>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                      <li>Visa</li>
                      <li>Mastercard</li>
                      <li>American Express</li>
                      <li>Cartes Interac (Canada)</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Portefeuilles Numériques</h3>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                      <li>PayPal</li>
                      <li>Apple Pay</li>
                      <li>Google Pay</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Autres Options</h3>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                      <li>Virement bancaire (pour les abonnements annuels)</li>
                      <li>Cryptomonnaies (Bitcoin, Ethereum)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Processus de Paiement</h2>
                <p className="text-muted-foreground mb-4">
                  Tous les paiements sont traités via des passerelles de paiement sécurisées (Stripe et PayPal) 
                  qui respectent les normes de sécurité PCI-DSS niveau 1, le plus haut niveau de conformité dans 
                  l'industrie des paiements.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Étapes du Paiement :</h3>
                    <ol className="list-decimal pl-6 text-sm text-muted-foreground space-y-2">
                      <li>Sélectionnez votre forfait d'abonnement</li>
                      <li>Choisissez votre méthode de paiement préférée</li>
                      <li>Entrez vos informations de paiement de manière sécurisée</li>
                      <li>Confirmez votre transaction</li>
                      <li>Recevez une confirmation par email avec vos identifiants d'accès</li>
                    </ol>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Note de Sécurité :</strong> IPTV Quebec ne stocke jamais 
                      vos informations de carte de crédit complètes. Toutes les données sensibles sont traitées 
                      directement par nos partenaires de paiement certifiés.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">3. Tarification et Facturation</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Prix et Devise</h3>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
                      <li>Tous les prix sont affichés en dollars canadiens (CAD)</li>
                      <li>Les prix incluent toutes les taxes applicables (TPS/TVH/TVQ)</li>
                      <li>Aucun frais caché ou supplément surprise</li>
                      <li>Les prix peuvent varier selon les promotions en cours</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Cycles de Facturation</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Nous proposons différents cycles de facturation pour s'adapter à vos besoins :
                    </p>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
                      <li><strong className="text-foreground">Mensuel :</strong> Facturation le même jour chaque mois</li>
                      <li><strong className="text-foreground">Trimestriel (3 mois) :</strong> Facturation tous les 3 mois avec réduction</li>
                      <li><strong className="text-foreground">Semestriel (6 mois) :</strong> Facturation tous les 6 mois avec réduction</li>
                      <li><strong className="text-foreground">Annuel (12 mois) :</strong> Paiement unique avec réduction maximale</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Renouvellement Automatique</h3>
                    <p className="text-sm text-muted-foreground">
                      Sauf indication contraire, tous les abonnements sont renouvelés automatiquement à la fin de 
                      chaque période de facturation. Vous recevrez un email de rappel 7 jours avant le renouvellement. 
                      Vous pouvez annuler le renouvellement automatique à tout moment depuis votre compte.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Échecs de Paiement</h2>
                <p className="text-muted-foreground mb-4">
                  En cas d'échec de paiement (fonds insuffisants, carte expirée, etc.), nous effectuerons les actions suivantes :
                </p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
                  <li>Vous serez immédiatement notifié par email de l'échec du paiement</li>
                  <li>Nous tenterons automatiquement de traiter le paiement à nouveau après 3 jours</li>
                  <li>Une deuxième tentative sera effectuée après 7 jours</li>
                  <li>Si tous les paiements échouent, votre abonnement sera suspendu après 10 jours</li>
                  <li>Votre compte sera définitivement fermé après 30 jours sans paiement</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Pour éviter toute interruption de service, veuillez vous assurer que vos informations de paiement 
                  sont à jour dans votre compte.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">5. Modifications de Prix</h2>
                <p className="text-muted-foreground mb-4">
                  IPTV Quebec se réserve le droit de modifier ses tarifs à tout moment. Cependant :
                </p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
                  <li>Les abonnés existants bénéficieront de leur tarif actuel jusqu'à la fin de leur période d'abonnement</li>
                  <li>Vous serez notifié par email au moins 30 jours avant toute modification de prix</li>
                  <li>Les nouveaux tarifs s'appliqueront uniquement lors du renouvellement de votre abonnement</li>
                  <li>Vous aurez toujours la possibilité d'annuler avant l'application des nouveaux tarifs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">6. Remboursements</h2>
                <p className="text-muted-foreground mb-4">
                  Notre politique de remboursement est conçue pour être juste et transparente. Pour plus de détails, 
                  veuillez consulter notre{" "}
                  <a href="/politique-remboursement" className="text-primary hover:underline font-semibold">
                    Politique de Remboursement
                  </a>
                  .
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Résumé :</strong> Nous offrons une garantie de satisfaction 
                    avec remboursement possible dans les 7 premiers jours suivant votre premier achat, sous certaines conditions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">7. Sécurité des Transactions</h2>
                <p className="text-muted-foreground mb-4">
                  La sécurité de vos informations financières est notre priorité absolue :
                </p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
                  <li>
                    <strong className="text-foreground">Cryptage SSL/TLS :</strong> Toutes les communications sont 
                    cryptées avec les protocoles les plus récents
                  </li>
                  <li>
                    <strong className="text-foreground">Conformité PCI-DSS :</strong> Nos partenaires de paiement 
                    respectent les normes de sécurité de l'industrie
                  </li>
                  <li>
                    <strong className="text-foreground">Authentification 3D Secure :</strong> Protection supplémentaire 
                    pour les transactions par carte de crédit
                  </li>
                  <li>
                    <strong className="text-foreground">Détection de fraude :</strong> Systèmes automatisés pour 
                    détecter les activités suspectes
                  </li>
                  <li>
                    <strong className="text-foreground">Aucun stockage de données :</strong> Nous ne conservons jamais 
                    vos informations de carte bancaire complètes
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">8. Factures et Reçus</h2>
                <p className="text-muted-foreground mb-4">
                  Pour chaque paiement effectué :
                </p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
                  <li>Vous recevrez automatiquement une facture par email</li>
                  <li>Les factures sont également disponibles dans votre compte utilisateur</li>
                  <li>Chaque facture inclut tous les détails de la transaction et les taxes applicables</li>
                  <li>Vous pouvez télécharger vos factures au format PDF à tout moment</li>
                  <li>Conservation des factures pendant 7 ans conformément aux exigences fiscales canadiennes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Questions sur les Paiements ?</h2>
                <p className="text-muted-foreground mb-4">
                  Notre équipe de support est disponible pour répondre à toutes vos questions concernant les paiements :
                </p>
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-semibold">Email :</span> billing@quebeciptv.ca
                  </p>
                  <p className="text-foreground">
                    <span className="font-semibold">Téléphone :</span> +1 (514) 123-4567
                  </p>
                  <p className="text-foreground">
                    <span className="font-semibold">Heures d'ouverture :</span> Lundi - Vendredi, 9h - 17h EST
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ConditionsPaiement;
