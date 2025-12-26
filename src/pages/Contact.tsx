import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, MessageCircle, HeadphonesIcon, Zap } from "lucide-react";

const Contact = () => {
  return (
    <PageLayout container>
      <SEO
        title="Contact IPTV Québec | Support Client 24/7"
        description="Contactez notre équipe IPTV Québec. Support disponible 24/7 par WhatsApp, email ou téléphone. Réponse rapide garantie pour toutes vos questions."
        path="/contact"
        keywords={["contact IPTV", "support IPTV", "service client IPTV"]}
      />
      <StructuredData
        type="local-business"
        data={{
          name: "Quebec IPTV",
          url: "https://quebec-iptv.ca",
          logo: "https://quebec-iptv.ca/og-image.jpg",
          description: "Service IPTV premium au Quebec avec support 24/7.",
          telephone: "+1-514-900-0626",
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Contact", url: "https://quebec-iptv.ca/contact" },
        ]}
      />
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <HeadphonesIcon className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Contactez Notre Équipe
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Support disponible 24/7 pour répondre à toutes vos questions
        </p>
      </div>

      {/* Main Contact Methods */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* WhatsApp */}
          <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-glow group">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Chat instantané 24/7
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-sm font-medium text-green-500">Disponible maintenant</p>
                  </div>
                  <p className="text-base font-semibold">+1 (514) 123-4567</p>
                </div>
                <Button className="w-full gap-2" size="lg" onClick={() => window.open('https://wa.me/15141234567', '_blank')}>
                  <MessageCircle className="w-4 h-4" />
                  Ouvrir WhatsApp
                </Button>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap className="w-3 h-3 text-primary" />
                  <span>Réponse en quelques minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Chat */}
          <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-glow group">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Chat en Direct</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Support en temps réel
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-sm font-medium text-green-500">En ligne</p>
                  </div>
                  <p className="text-base font-semibold">Chat Web</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary" />
                  <span>Lun-Dim 9h00-21h00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-glow group">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Email Pro</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Pour demandes détaillées
                  </p>
                  <div className="mb-3 h-6"></div>
                  <p className="text-sm font-semibold break-all px-2">support@quebeciptv.ca</p>
                </div>
                <Button className="w-full gap-2" size="lg" asChild>
                  <a href="mailto:support@quebeciptv.ca">
                    <Mail className="w-4 h-4" />
                    Envoyer un Email
                  </a>
                </Button>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary" />
                  <span>Réponse sous 24h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Phone Contact */}
        <Card className="bg-gradient-card border-primary/20">
          
        </Card>
      </div>

      {/* Info Cards Grid */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-6 mb-12 justify-center">
        {/* Opening Hours */}
        

        {/* Location */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-4">Notre Emplacement</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Montreal, Quebec
                  </p>
                  <p className="text-muted-foreground">
                    Canada
                  </p>
                  <div className="pt-4">
                    <p className="text-xs text-muted-foreground">
                      Service disponible partout au Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-lg mb-3">Questions Fréquentes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Trouvez rapidement des réponses aux questions les plus courantes sur notre service IPTV.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/#faq">Consulter la FAQ</a>
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* Support Categories */}
      <div className="max-w-4xl mx-auto">
        <Card>
          
        </Card>
      </div>
    </PageLayout>
  );
};

export default Contact;
