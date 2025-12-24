import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, Shield } from "lucide-react";

const AvisNonResponsabilite = () => {
  return (
    <PageLayout heroSection>
      <SEO
        title="Avis de Non-Responsabilité - IPTV Québec"
        description="Avis de non-responsabilité et limitations d'utilisation du service IPTV Québec. Informations importantes sur les conditions du service."
        path="/avis-non-responsabilite"
        noIndex
      />
      {/* Hero Section */}
      <section className="bg-gradient-hero border-b border-border/50 pt-36 sm:pt-40 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Avis de Non-Responsabilité
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Limitations et conditions d'utilisation du service
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Service "Tel Quel"</h3>
                <p className="text-sm text-muted-foreground">
                  Service fourni sans garanties expresses ou implicites
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <Info className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Disponibilité Variable</h3>
                <p className="text-sm text-muted-foreground">
                  Le contenu peut varier selon les licences
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Utilisation Responsable</h3>
                <p className="text-sm text-muted-foreground">
                  L'utilisateur est responsable de son utilisation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">1. Avis Général</h2>
                <p className="text-muted-foreground mb-4">
                  Les informations contenues sur ce site web sont fournies à titre informatif général uniquement. 
                  Bien que nous nous efforcions de maintenir les informations à jour et correctes, nous ne faisons 
                  aucune déclaration ou garantie d'aucune sorte, expresse ou implicite, concernant l'exactitude, 
                  l'adéquation, la validité, la fiabilité, la disponibilité ou l'exhaustivité des informations, 
                  produits, services ou graphiques connexes contenus sur le site web.
                </p>
                <p className="text-muted-foreground">
                  En aucun cas, nous ne serons responsables de toute perte ou dommage, y compris, sans limitation, 
                  indirect ou consécutif, ou toute perte ou dommage résultant de la perte de données ou de bénéfices 
                  découlant de, ou en relation avec, l'utilisation de ce site web.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Disponibilité du Service</h2>
                <p className="text-muted-foreground mb-4">
                  IPTV Quebec s'efforce de fournir un service ininterrompu, mais nous ne garantissons pas que le service 
                  sera disponible en tout temps. Le service peut être temporairement indisponible pour des raisons de 
                  maintenance, de mises à jour, ou en raison de circonstances indépendantes de notre volonté, notamment :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Pannes de réseau ou de serveur</li>
                  <li>Problèmes techniques chez nos fournisseurs de contenu</li>
                  <li>Maintenance planifiée ou d'urgence</li>
                  <li>Force majeure ou circonstances exceptionnelles</li>
                  <li>Modifications des licences de diffusion</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Nous ne sommes pas responsables des interruptions de service, des pertes de données ou de tout 
                  autre dommage résultant de l'indisponibilité du service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">3. Contenu et Disponibilité des Chaînes</h2>
                <p className="text-muted-foreground mb-4">
                  Le contenu disponible via notre service IPTV, y compris les chaînes, les films et les séries, 
                  peut varier en fonction des accords de licence et des droits de diffusion. IPTV Quebec ne garantit pas :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>La disponibilité continue de chaînes ou contenus spécifiques</li>
                  <li>La qualité de diffusion constante (peut varier selon votre connexion Internet)</li>
                  <li>L'accès à des événements sportifs ou émissions en direct particuliers</li>
                  <li>La disponibilité de contenu dans une langue ou région spécifique</li>
                  <li>L'absence d'interruptions pendant la diffusion</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Les chaînes et le contenu peuvent être ajoutés, modifiés ou retirés à tout moment sans préavis 
                  en fonction des accords de licence et des droits de diffusion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Exigences Techniques</h2>
                <p className="text-muted-foreground mb-4">
                  L'utilisation de notre service IPTV nécessite une connexion Internet stable et un équipement compatible. 
                  IPTV Quebec n'est pas responsable de :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Problèmes de qualité de diffusion dus à une connexion Internet insuffisante</li>
                  <li>Incompatibilité avec certains appareils ou systèmes d'exploitation</li>
                  <li>Problèmes causés par des logiciels tiers ou des modifications non autorisées</li>
                  <li>Mise en tampon ou interruptions dues à la congestion du réseau</li>
                  <li>Problèmes liés à votre fournisseur d'accès Internet (FAI)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Nous recommandons une connexion Internet d'au moins 25 Mbps pour une expérience optimale, mais 
                  nous ne pouvons garantir la qualité de service en fonction de votre infrastructure réseau.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">5. Utilisation du Service</h2>
                <p className="text-muted-foreground mb-4">
                  L'utilisateur est seul responsable de l'utilisation du service IPTV Quebec. Cela inclut, sans s'y limiter :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Le respect des lois et réglementations locales concernant le contenu diffusé</li>
                  <li>L'utilisation conforme aux termes et conditions du service</li>
                  <li>La protection de ses identifiants de connexion et la non-divulgation à des tiers</li>
                  <li>L'utilisation du service uniquement pour un usage personnel et non commercial</li>
                  <li>La conformité avec les restrictions géographiques et les droits de diffusion</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  IPTV Quebec se réserve le droit de suspendre ou de résilier tout compte en cas d'utilisation 
                  abusive ou non conforme aux conditions d'utilisation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">6. Liens Externes</h2>
                <p className="text-muted-foreground mb-4">
                  Notre site web peut contenir des liens vers des sites web externes qui ne sont pas fournis ou 
                  maintenus par nous. Veuillez noter que nous ne garantissons pas l'exactitude, la pertinence, 
                  l'actualité ou l'exhaustivité de toute information sur ces sites web externes.
                </p>
                <p className="text-muted-foreground">
                  Nous n'avons aucun contrôle sur la nature, le contenu et la disponibilité de ces sites. 
                  L'inclusion de tout lien n'implique pas nécessairement une recommandation ou n'approuve les 
                  points de vue exprimés à l'intérieur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">7. Limitation de Responsabilité</h2>
                <p className="text-muted-foreground mb-4">
                  Dans toute la mesure permise par la loi applicable, IPTV Quebec, ses directeurs, employés, 
                  partenaires, agents, fournisseurs ou affiliés ne seront pas responsables de tout dommage 
                  indirect, accidentel, spécial, consécutif ou punitif, y compris, sans limitation :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Perte de profits, de données, d'utilisation, de bonne volonté ou d'autres pertes intangibles</li>
                  <li>Dommages résultant de l'utilisation ou de l'incapacité d'utiliser le service</li>
                  <li>Accès non autorisé à vos transmissions ou données</li>
                  <li>Déclarations ou conduite d'un tiers sur le service</li>
                  <li>Tout autre élément relatif au service</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">8. Modifications</h2>
                <p className="text-muted-foreground">
                  IPTV Quebec se réserve le droit de modifier, suspendre ou interrompre tout aspect du service 
                  à tout moment, y compris la disponibilité de toute fonctionnalité, base de données ou contenu, 
                  sans préavis. Nous nous réservons également le droit de modifier cet avis de non-responsabilité 
                  à tout moment, il est donc de votre responsabilité de le consulter régulièrement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Questions ?</h2>
                <p className="text-muted-foreground mb-4">
                  Pour toute question concernant cet avis de non-responsabilité, veuillez nous contacter :
                </p>
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-semibold">Email :</span> support@quebeciptv.ca
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

export default AvisNonResponsabilite;
