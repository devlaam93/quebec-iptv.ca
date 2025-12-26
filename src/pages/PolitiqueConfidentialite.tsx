import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

const PolitiqueConfidentialite = () => {
  return (
    <PageLayout container>
      <SEO
        title="Politique de Confidentialité - IPTV Québec"
        description="Découvrez comment IPTV Québec protège vos données personnelles. Notre politique de confidentialité détaille la collecte, l'utilisation et la protection de vos informations."
        path="/politique-confidentialite"
        keywords={["confidentialité", "protection données", "vie privée"]}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Politique de Confidentialite", url: "https://quebec-iptv.ca/politique-confidentialite" },
        ]}
      />
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex justify-center mb-6 pt-[20px]">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Politique de Confidentialité
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Votre vie privée est importante pour nous
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        </p>
      </div>

      {/* Quick Overview */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Données Sécurisées</h3>
              <p className="text-sm text-muted-foreground">
                Vos informations sont protégées par un cryptage de niveau bancaire
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <Eye className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Transparence Totale</h3>
              <p className="text-sm text-muted-foreground">
                Nous vous expliquons clairement comment vos données sont utilisées
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <UserCheck className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Vos Droits</h3>
              <p className="text-sm text-muted-foreground">
                Vous gardez le contrôle total de vos informations personnelles
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
                <Database className="w-6 h-6 text-primary" />
                1. Informations que nous collectons
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Chez IPTV Quebec, nous collectons uniquement les informations nécessaires pour vous fournir 
                  nos services de streaming IPTV de la meilleure qualité possible.
                </p>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Informations personnelles :</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse de facturation</li>
                    <li>Informations de paiement (traitées de manière sécurisée)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Informations techniques :</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresse IP</li>
                    <li>Type d'appareil et système d'exploitation</li>
                    <li>Données de navigation sur notre site</li>
                    <li>Préférences de visionnage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                2. Comment nous utilisons vos informations
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Vos informations sont utilisées pour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Traiter et gérer vos abonnements IPTV</li>
                  <li>Fournir un support client personnalisé</li>
                  <li>Améliorer nos services et notre contenu</li>
                  <li>Envoyer des mises à jour importantes sur votre service</li>
                  <li>Prévenir la fraude et assurer la sécurité de notre plateforme</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                3. Protection de vos données
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous prenons la sécurité de vos données très au sérieux et mettons en place des mesures 
                  techniques et organisationnelles appropriées :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cryptage SSL/TLS pour toutes les transmissions de données</li>
                  <li>Serveurs sécurisés avec pare-feu et protection contre les intrusions</li>
                  <li>Accès limité aux données personnelles uniquement au personnel autorisé</li>
                  <li>Audits de sécurité réguliers</li>
                  <li>Conformité aux normes internationales de protection des données</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-primary" />
                4. Vos droits
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Conformément aux lois sur la protection des données, vous avez le droit de :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-foreground">Accéder</strong> à vos données personnelles</li>
                  <li><strong className="text-foreground">Rectifier</strong> les informations inexactes</li>
                  <li><strong className="text-foreground">Supprimer</strong> vos données (droit à l'oubli)</li>
                  <li><strong className="text-foreground">Limiter</strong> le traitement de vos données</li>
                  <li><strong className="text-foreground">Porter</strong> vos données vers un autre service</li>
                  <li><strong className="text-foreground">Vous opposer</strong> au traitement de vos données</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à l'adresse email ci-dessous.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Partage de vos informations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous ne vendons jamais vos informations personnelles. Nous pouvons partager vos données 
                  uniquement avec :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nos processeurs de paiement sécurisés</li>
                  <li>Nos fournisseurs de services cloud (hébergement sécurisé)</li>
                  <li>Les autorités légales, si requis par la loi</li>
                </ul>
                <p className="mt-4">
                  Tous nos partenaires sont contractuellement tenus de protéger vos données et de les utiliser 
                  uniquement dans le cadre des services fournis.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Cookies et technologies similaires</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience. Ces cookies nous aident à :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mémoriser vos préférences</li>
                  <li>Analyser le trafic du site</li>
                  <li>Personnaliser votre expérience</li>
                </ul>
                <p className="mt-4">
                  Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Conservation des données</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous conservons vos données personnelles aussi longtemps que nécessaire pour vous fournir 
                  nos services et respecter nos obligations légales. Généralement :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Données de compte : pendant la durée de votre abonnement + 3 ans</li>
                  <li>Données de facturation : 7 ans (exigence légale)</li>
                  <li>Données de support : 2 ans après la dernière interaction</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Modifications de cette politique</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous 
                  informerons de tout changement important par email ou via une notification sur notre site.
                </p>
                <p>
                  La date de la dernière mise à jour est indiquée en haut de cette page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-card border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Mail className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-bold">Questions sur votre vie privée ?</h3>
              <p className="text-muted-foreground">
                Si vous avez des questions concernant cette politique de confidentialité ou le traitement 
                de vos données personnelles, n'hésitez pas à nous contacter.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Email : support@quebeciptv.ca</p>
                <p className="font-semibold">Téléphone : +1 (514) 123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PolitiqueConfidentialite;
