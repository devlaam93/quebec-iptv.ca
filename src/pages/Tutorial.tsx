import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Tv, Monitor, Download, PlayCircle, Settings, CheckCircle } from "lucide-react";

const Tutorial = () => {
  const devices = [
    {
      id: "android",
      label: "Android TV",
      icon: Tv,
      steps: [
        { icon: Download, title: "Télécharger l'application", description: "Installez IPTV Smarters Pro depuis le Google Play Store" },
        { icon: Settings, title: "Configurer l'application", description: "Ouvrez l'app et sélectionnez 'Login with Xtream Codes API'" },
        { icon: PlayCircle, title: "Entrer vos identifiants", description: "Saisissez le nom d'utilisateur, mot de passe et URL fournis" },
        { icon: CheckCircle, title: "Profiter du contenu", description: "Parcourez les chaînes et commencez à regarder" }
      ]
    },
    {
      id: "ios",
      label: "iOS / Apple TV",
      icon: Smartphone,
      steps: [
        { icon: Download, title: "Télécharger IPTV Smarters", description: "Téléchargez l'app depuis l'App Store" },
        { icon: Settings, title: "Lancer la configuration", description: "Ouvrez l'application et choisissez 'Add User'" },
        { icon: PlayCircle, title: "Connecter votre compte", description: "Entrez vos informations de connexion IPTV" },
        { icon: CheckCircle, title: "Commencer à regarder", description: "Accédez à tous vos contenus favoris" }
      ]
    },
    {
      id: "windows",
      label: "Windows / Mac",
      icon: Monitor,
      steps: [
        { icon: Download, title: "Installer VLC Player", description: "Téléchargez et installez VLC Media Player" },
        { icon: Settings, title: "Ouvrir la playlist", description: "Allez dans Media > Open Network Stream" },
        { icon: PlayCircle, title: "Ajouter l'URL M3U", description: "Collez l'URL de votre playlist M3U" },
        { icon: CheckCircle, title: "Regarder en streaming", description: "Profitez de vos chaînes sur votre ordinateur" }
      ]
    }
  ];

  return (
    <PageLayout>
      <SEO
        title="Guide Installation IPTV | Tutoriels Tous Appareils"
        description="Installez IPTV en quelques minutes sur Android TV, Fire Stick, iOS, Smart TV. Guides étape par étape avec captures d'écran. Configuration facile!"
        path="/tutorial"
        keywords={["tutoriel IPTV", "installation IPTV", "configurer IPTV", "guide IPTV"]}
        image="/og-tutorial.jpg"
      />
      <StructuredData
        type="article"
        data={{
          headline: "Guide d'Installation IPTV - Tutoriels pour Tous Appareils",
          description: "Guides d'installation IPTV étape par étape pour Android TV, iOS, Fire Stick et Smart TV. Configuration facile en quelques minutes.",
          datePublished: "2025-01-01",
          dateModified: "2025-01-15",
          author: "IPTV Québec",
          url: "https://quebec-iptv.ca/tutorial",
          image: "https://quebec-iptv.ca/og-tutorial.jpg",
        }}
      />
      <StructuredData
        type="how-to"
        data={{
          name: "Comment installer IPTV sur Android TV",
          description: "Guide étape par étape pour installer et configurer IPTV sur votre Android TV en moins de 5 minutes.",
          totalTime: "PT5M",
          estimatedCost: "0",
          steps: [
            { name: "Télécharger l'application", text: "Installez IPTV Smarters Pro depuis le Google Play Store sur votre Android TV." },
            { name: "Configurer l'application", text: "Ouvrez l'application et sélectionnez 'Login with Xtream Codes API'." },
            { name: "Entrer vos identifiants", text: "Saisissez le nom d'utilisateur, mot de passe et URL fournis par IPTV Québec." },
            { name: "Profiter du contenu", text: "Parcourez les chaînes et commencez à regarder vos émissions favorites." },
          ],
        }}
      />
      <StructuredData
        type="software-application"
        data={{
          name: "IPTV Smarters Pro",
          description: "Application IPTV recommandée pour regarder vos chaînes TV en streaming sur tous vos appareils.",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Android, iOS, Windows, macOS",
          url: "https://quebec-iptv.ca/tutorial",
          aggregateRating: {
            ratingValue: 4.8,
            ratingCount: 15000,
          },
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Tutoriels", url: "https://quebec-iptv.ca/tutorial" },
        ]}
      />
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-orange bg-clip-text text-transparent">
              Guide d'Installation
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Installez et configurez IPTV Quebec sur tous vos appareils en quelques minutes
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial Tabs */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="android" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              {devices.map((device) => (
                <TabsTrigger key={device.id} value={device.id} className="flex items-center gap-2">
                  <device.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{device.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {devices.map((device) => (
              <TabsContent key={device.id} value={device.id}>
                <div className="grid gap-6">
                  {device.steps.map((step, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-orange flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <step.icon className="w-6 h-6 text-primary" />
                              <h3 className="text-xl font-bold">{step.title}</h3>
                            </div>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Apps Recommendations */}
      <section className="py-16 sm:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Applications Recommandées
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "IPTV Smarters Pro", platform: "Tous appareils", recommended: true },
              { name: "TiviMate", platform: "Android TV", recommended: true },
              { name: "VLC Player", platform: "Windows / Mac", recommended: false },
              { name: "GSE Smart IPTV", platform: "iOS / Apple TV", recommended: false }
            ].map((app, index) => (
              <Card key={index} className={`border-border/50 ${app.recommended ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-6 text-center">
                  {app.recommended && (
                    <span className="inline-block bg-gradient-orange text-white text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                      Recommandé
                    </span>
                  )}
                  <h3 className="text-lg font-bold mb-2">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.platform}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Besoin d'Aide ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe de support est disponible 24/7 pour vous aider avec l'installation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">Support par Email</p>
                  <p className="font-semibold">support@iptvquebec.com</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                  <p className="font-semibold">+1 (514) 123-4567</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Tutorial;
