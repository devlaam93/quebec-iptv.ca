import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, AlertCircle } from "lucide-react";

const DmcaPolicy = () => {
  return (
    <PageLayout heroSection>
      <SEO
        title="Politique DMCA - IPTV Québec"
        description="Politique DMCA d'IPTV Québec. Procédure de notification pour les droits d'auteur et respect de la propriété intellectuelle."
        path="/dmca-policy"
        noIndex
      />
      {/* Hero Section */}
      <section className="bg-gradient-hero border-b border-border/50 pt-36 sm:pt-40 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Politique DMCA
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Respect des droits d'auteur et procédure de notification
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Conformité DMCA</h3>
                <p className="text-sm text-muted-foreground">
                  Nous respectons les droits de propriété intellectuelle
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Procédure Claire</h3>
                <p className="text-sm text-muted-foreground">
                  Processus simple pour déposer une réclamation
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Réponse Rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Traitement prioritaire des notifications
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">1. Politique de Conformité DMCA</h2>
                <p className="text-muted-foreground mb-4">
                  IPTV Quebec respecte les droits de propriété intellectuelle d'autrui et s'attend à ce que nos utilisateurs 
                  fassent de même. Conformément au Digital Millennium Copyright Act (DMCA), nous répondrons rapidement aux 
                  notifications de violations présumées des droits d'auteur qui nous sont signalées.
                </p>
                <p className="text-muted-foreground">
                  Si vous croyez que votre œuvre protégée par le droit d'auteur a été copiée d'une manière qui constitue 
                  une violation des droits d'auteur, veuillez nous fournir une notification écrite contenant les informations 
                  requises ci-dessous.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Comment Déposer une Notification DMCA</h2>
                <p className="text-muted-foreground mb-4">
                  Pour déposer une notification de violation des droits d'auteur, veuillez fournir les informations suivantes 
                  par écrit à notre agent DMCA désigné :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Une signature physique ou électronique d'une personne autorisée à agir au nom du propriétaire du droit 
                    d'auteur prétendument violé
                  </li>
                  <li>
                    Identification de l'œuvre protégée par le droit d'auteur que vous prétendez avoir été violée, ou, 
                    si plusieurs œuvres sont couvertes par une seule notification, une liste représentative de ces œuvres
                  </li>
                  <li>
                    Identification du matériel qui serait en infraction et qui doit être retiré ou dont l'accès doit être 
                    désactivé, ainsi que des informations suffisantes pour nous permettre de localiser le matériel
                  </li>
                  <li>
                    Vos coordonnées, incluant votre adresse, numéro de téléphone et adresse électronique
                  </li>
                  <li>
                    Une déclaration que vous croyez de bonne foi que l'utilisation du matériel de la manière contestée 
                    n'est pas autorisée par le propriétaire du droit d'auteur, son agent ou la loi
                  </li>
                  <li>
                    Une déclaration que les informations contenues dans la notification sont exactes et, sous peine de 
                    parjure, que vous êtes autorisé à agir au nom du propriétaire du droit d'auteur
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">3. Procédure de Contre-Notification</h2>
                <p className="text-muted-foreground mb-4">
                  Si vous croyez que votre contenu a été retiré ou désactivé par erreur ou par mauvaise identification, 
                  vous pouvez déposer une contre-notification contenant les informations suivantes :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Votre signature physique ou électronique</li>
                  <li>Identification du contenu qui a été retiré ou désactivé et l'emplacement où il apparaissait</li>
                  <li>
                    Une déclaration sous peine de parjure que vous croyez de bonne foi que le contenu a été retiré ou 
                    désactivé par erreur ou par mauvaise identification
                  </li>
                  <li>Votre nom, adresse, numéro de téléphone et adresse électronique</li>
                  <li>
                    Une déclaration que vous consentez à la juridiction du tribunal fédéral du district dans lequel 
                    votre adresse est située
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Politique de Récidive</h2>
                <p className="text-muted-foreground mb-4">
                  Conformément au DMCA et à d'autres lois applicables, IPTV Quebec a adopté une politique de résiliation, 
                  dans des circonstances appropriées, des utilisateurs qui sont considérés comme des contrevenants récidivistes.
                </p>
                <p className="text-muted-foreground">
                  Nous pouvons également, à notre seule discrétion, limiter l'accès au service et/ou résilier les comptes 
                  des utilisateurs qui portent atteinte aux droits de propriété intellectuelle d'autrui, que ces utilisateurs 
                  soient ou non des contrevenants récidivistes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">5. Agent DMCA Désigné</h2>
                <p className="text-muted-foreground mb-4">
                  Toutes les notifications DMCA doivent être envoyées à notre agent désigné :
                </p>
                <div className="bg-muted/50 p-6 rounded-lg space-y-2">
                  <p className="text-foreground font-semibold">Agent DMCA - IPTV Quebec</p>
                  <p className="text-muted-foreground">Email : dmca@quebeciptv.ca</p>
                  <p className="text-muted-foreground">Adresse : Montreal, Quebec, Canada</p>
                  <p className="text-muted-foreground">Téléphone : +1 (514) 123-4567</p>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Veuillez noter que toute déclaration matériellement fausse dans une notification ou contre-notification 
                  DMCA peut vous exposer à une responsabilité pour dommages-intérêts, y compris les coûts et les honoraires 
                  d'avocat.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Besoin d'Aide ?</h2>
                <p className="text-muted-foreground mb-4">
                  Pour toute question concernant notre politique DMCA, veuillez nous contacter :
                </p>
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-semibold">Email :</span> dmca@quebeciptv.ca
                  </p>
                  <p className="text-foreground">
                    <span className="font-semibold">Téléphone :</span> +1 (514) 123-4567
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

export default DmcaPolicy;
