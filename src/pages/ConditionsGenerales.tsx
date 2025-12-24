import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle2, AlertCircle, Scale, Shield, Users } from "lucide-react";

const ConditionsGenerales = () => {
  return (
    <PageLayout container>
      <SEO
        title="Conditions Générales d'Utilisation - IPTV Québec"
        description="Consultez les conditions générales d'utilisation du service IPTV Québec. Règles d'utilisation, droits et obligations des utilisateurs."
        path="/conditions-generales"
        noIndex
      />
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <FileText className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Conditions Générales d'Utilisation
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Veuillez lire attentivement ces conditions avant d'utiliser nos services
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Quick Overview */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Acceptation</h3>
              <p className="text-sm text-muted-foreground">
                En utilisant nos services, vous acceptez ces conditions
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Protection</h3>
              <p className="text-sm text-muted-foreground">
                Vos droits et nos engagements sont clairement définis
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <Scale className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Équité</h3>
              <p className="text-sm text-muted-foreground">
                Des conditions justes pour tous nos utilisateurs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                1. Acceptation des conditions
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  En accédant et en utilisant les services de IPTV Quebec, vous acceptez d'être lié par les 
                  présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez 
                  ne pas utiliser nos services.
                </p>
                <p>
                  Ces conditions s'appliquent à tous les utilisateurs du service, y compris les visiteurs, 
                  les abonnés et les revendeurs.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                2. Description du service
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  IPTV Quebec fournit un service de streaming IPTV permettant l'accès à :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Plus de 45 000 chaînes de télévision en direct</li>
                  <li>Plus de 80 000 films et séries à la demande (VOD)</li>
                  <li>Contenu en haute définition (HD), Full HD et 4K</li>
                  <li>Support multi-appareils</li>
                  <li>Guide électronique des programmes (EPG)</li>
                </ul>
                <p>
                  Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du service 
                  à tout moment, avec ou sans préavis.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Conditions d'abonnement</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">3.1 Éligibilité</h3>
                <p>
                  Pour souscrire à nos services, vous devez :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Avoir au moins 18 ans</li>
                  <li>Fournir des informations exactes et complètes</li>
                  <li>Disposer d'une connexion Internet stable (minimum 10 Mbps recommandé)</li>
                  <li>Accepter de payer les frais d'abonnement convenus</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-4">3.2 Types d'abonnements</h3>
                <p>
                  Nous proposons différentes formules d'abonnement :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Abonnement mensuel</li>
                  <li>Abonnement trimestriel (3 mois)</li>
                  <li>Abonnement semestriel (6 mois)</li>
                  <li>Abonnement annuel (12 mois)</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-4">3.3 Essai gratuit</h3>
                <p>
                  Un essai gratuit de 24 heures peut être proposé aux nouveaux clients. Cet essai est limité 
                  à un par personne/foyer et nécessite une inscription valide.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Paiement et facturation</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">4.1 Modes de paiement</h3>
                <p>
                  Nous acceptons les paiements par :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Carte de crédit (Visa, Mastercard, American Express)</li>
                  <li>PayPal</li>
                  <li>Interac (pour les clients canadiens)</li>
                  <li>Cryptomonnaies (Bitcoin, Ethereum)</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-4">4.2 Renouvellement automatique</h3>
                <p>
                  Les abonnements sont renouvelés automatiquement à la fin de chaque période, sauf annulation 
                  de votre part. Vous serez facturé au tarif en vigueur au moment du renouvellement.
                </p>

                <h3 className="font-semibold text-foreground mt-4">4.3 Remboursement</h3>
                <p>
                  Les remboursements sont régis par notre politique de remboursement. Veuillez consulter 
                  la page dédiée pour plus d'informations.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Utilisation du service</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">5.1 Utilisation personnelle</h3>
                <p>
                  Votre abonnement est strictement personnel et ne peut être partagé. Vous êtes autorisé à 
                  utiliser le service sur le nombre d'appareils spécifié dans votre formule d'abonnement.
                </p>

                <h3 className="font-semibold text-foreground mt-4">5.2 Utilisations interdites</h3>
                <p>
                  Il est strictement interdit de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Partager vos identifiants de connexion avec des tiers</li>
                  <li>Revendre le service sans autorisation écrite</li>
                  <li>Utiliser le service à des fins commerciales sans licence appropriée</li>
                  <li>Tenter de contourner les mesures de sécurité</li>
                  <li>Utiliser des VPN pour accéder à du contenu géo-restreint (sauf autorisation)</li>
                  <li>Effectuer du reverse engineering ou copier le service</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-4">5.3 Connexions simultanées</h3>
                <p>
                  Le nombre de connexions simultanées autorisées dépend de votre formule d'abonnement. 
                  Toute tentative de dépassement peut entraîner la suspension du compte.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Responsabilités et garanties</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">6.1 Qualité du service</h3>
                <p>
                  Nous nous efforçons de fournir un service de haute qualité avec un taux de disponibilité 
                  de 99%. Cependant, nous ne garantissons pas un service ininterrompu en raison de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintenance programmée</li>
                  <li>Problèmes techniques imprévus</li>
                  <li>Force majeure</li>
                  <li>Problèmes de fournisseurs tiers</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-4">6.2 Contenu</h3>
                <p>
                  Le contenu disponible sur notre service peut varier et être modifié sans préavis. 
                  Nous ne sommes pas responsables de la disponibilité ou de la qualité du contenu fourni 
                  par des tiers.
                </p>

                <h3 className="font-semibold text-foreground mt-4">6.3 Limitation de responsabilité</h3>
                <p>
                  IPTV Quebec ne pourra être tenu responsable de tout dommage direct, indirect, accessoire 
                  ou consécutif résultant de l'utilisation ou de l'impossibilité d'utiliser le service.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Propriété intellectuelle</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Tout le contenu disponible sur IPTV Quebec, y compris mais sans s'y limiter, les textes, 
                  graphiques, logos, icônes, images, clips audio et vidéo, est la propriété de IPTV Quebec 
                  ou de ses fournisseurs de contenu et est protégé par les lois sur la propriété intellectuelle.
                </p>
                <p>
                  Vous n'êtes pas autorisé à :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reproduire, dupliquer ou copier le contenu</li>
                  <li>Télécharger ou enregistrer le contenu (sauf fonctionnalité autorisée)</li>
                  <li>Redistribuer ou revendre le contenu</li>
                  <li>Utiliser le contenu à des fins commerciales</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Suspension et résiliation</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">8.1 Par le client</h3>
                <p>
                  Vous pouvez annuler votre abonnement à tout moment via votre compte ou en nous contactant. 
                  L'annulation prendra effet à la fin de la période de facturation en cours.
                </p>

                <h3 className="font-semibold text-foreground mt-4">8.2 Par IPTV Quebec</h3>
                <p>
                  Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violation des présentes conditions</li>
                  <li>Activité frauduleuse ou suspecte</li>
                  <li>Non-paiement</li>
                  <li>Utilisation abusive du service</li>
                  <li>Partage non autorisé du compte</li>
                </ul>
                <p className="mt-4">
                  En cas de résiliation pour violation, aucun remboursement ne sera effectué.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Confidentialité et données personnelles</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  La collecte et l'utilisation de vos données personnelles sont régies par notre politique 
                  de confidentialité. En utilisant nos services, vous consentez à la collecte et à l'utilisation 
                  de vos informations conformément à cette politique.
                </p>
                <p>
                  Pour plus de détails, veuillez consulter notre{" "}
                  <a href="/politique-confidentialite" className="text-primary hover:underline font-semibold">
                    Politique de Confidentialité
                  </a>.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">10. Modifications des conditions</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous nous réservons le droit de modifier ces conditions générales à tout moment. 
                  Les modifications entreront en vigueur dès leur publication sur notre site web.
                </p>
                <p>
                  Nous vous informerons des changements importants par email ou via une notification sur 
                  notre plateforme. Votre utilisation continue du service après la publication des modifications 
                  constitue votre acceptation des nouvelles conditions.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">11. Droit applicable et juridiction</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Les présentes conditions générales sont régies par les lois de la province de Québec et 
                  les lois du Canada qui y sont applicables.
                </p>
                <p>
                  Tout litige découlant de ou en relation avec ces conditions sera soumis à la juridiction 
                  exclusive des tribunaux de la province de Québec, district de Montréal.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">12. Dispositions diverses</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">12.1 Intégralité de l'accord</h3>
                <p>
                  Ces conditions constituent l'intégralité de l'accord entre vous et IPTV Quebec concernant 
                  l'utilisation du service.
                </p>

                <h3 className="font-semibold text-foreground mt-4">12.2 Divisibilité</h3>
                <p>
                  Si une disposition de ces conditions est jugée invalide ou inapplicable, les autres 
                  dispositions resteront en vigueur.
                </p>

                <h3 className="font-semibold text-foreground mt-4">12.3 Renonciation</h3>
                <p>
                  Le fait de ne pas exercer un droit ou une action prévu par ces conditions ne constitue 
                  pas une renonciation à ce droit ou à cette action.
                </p>

                <h3 className="font-semibold text-foreground mt-4">12.4 Contact</h3>
                <p>
                  Pour toute question concernant ces conditions générales, veuillez nous contacter à :
                </p>
                <ul className="list-none space-y-1 ml-4 mt-2">
                  <li><strong className="text-foreground">Email :</strong> support@quebeciptv.ca</li>
                  <li><strong className="text-foreground">Téléphone :</strong> +1 (514) 123-4567</li>
                  <li><strong className="text-foreground">Adresse :</strong> Montreal, Quebec, Canada</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-gradient-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Important</h3>
                <p className="text-muted-foreground">
                  En utilisant les services de IPTV Quebec, vous confirmez avoir lu, compris et accepté 
                  l'intégralité des présentes conditions générales d'utilisation. Si vous avez des questions, 
                  n'hésitez pas à nous contacter avant d'utiliser nos services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ConditionsGenerales;
