import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Eye, 
  Keyboard, 
  Volume2, 
  Smartphone, 
  Palette, 
  Globe,
  CheckCircle,
  Mail,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AccessibilityFeature = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Accessibilite = () => {
  const features = [
    {
      icon: Keyboard,
      title: "Navigation au clavier",
      description: "Toutes les fonctionnalités sont accessibles via le clavier. Utilisez Tab pour naviguer, Entrée pour activer, et Échap pour fermer les menus. Un lien 'Aller au contenu principal' apparaît au focus."
    },
    {
      icon: Eye,
      title: "Contraste des couleurs",
      description: "Nos couleurs respectent un ratio de contraste minimum de 4.5:1 pour le texte normal et 3:1 pour le texte large, conformément aux directives WCAG 2.1 AA."
    },
    {
      icon: Volume2,
      title: "Compatibilité lecteurs d'écran",
      description: "Le site utilise des balises ARIA appropriées, des régions live pour les notifications, et des annonces de changement de page pour une expérience optimale avec les lecteurs d'écran."
    },
    {
      icon: Smartphone,
      title: "Design responsive",
      description: "L'interface s'adapte à toutes les tailles d'écran. Le contenu reste lisible et fonctionnel sur mobile, tablette et ordinateur."
    },
    {
      icon: Palette,
      title: "Préférences de mouvement",
      description: "Les animations sont automatiquement désactivées pour les utilisateurs ayant activé 'Réduire les animations' dans leurs paramètres système."
    },
    {
      icon: Globe,
      title: "Structure sémantique",
      description: "Utilisation de balises HTML sémantiques (header, main, nav, footer, article) et d'une hiérarchie de titres logique pour faciliter la navigation."
    }
  ];

  const conformanceItems = [
    "Textes alternatifs descriptifs pour toutes les images",
    "Liens de saut de navigation pour accéder au contenu principal",
    "Régions ARIA live pour les notifications dynamiques",
    "Annonces vocales lors des changements de page",
    "Indicateurs de focus visibles et contrastés",
    "Support du mode contraste élevé (Windows)",
    "Attribut lang dynamique selon le contenu",
    "Structure de titres hiérarchique (H1-H6)",
    "Formulaires avec labels associés et messages d'erreur accessibles",
    "Carrousels et accordéons navigables au clavier"
  ];

  return (
    <PageLayout container>
      <SEO 
        title="Déclaration d'Accessibilité | IPTV Quebec"
        description="Notre engagement pour l'accessibilité numérique. Découvrez les mesures prises pour rendre notre site accessible à tous selon les normes WCAG 2.1 AA."
        path="/accessibilite"
      />
      <StructuredData
        type="article"
        data={{
          headline: "Déclaration d'Accessibilité - IPTV Québec",
          description: "Engagement pour l'accessibilité numérique selon les normes WCAG 2.1 AA. Navigation au clavier, lecteurs d'écran, contraste des couleurs.",
          datePublished: "2025-01-01",
          dateModified: "2025-01-15",
          author: "IPTV Québec",
          url: "https://quebec-iptv.ca/accessibilite",
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Accessibilité", url: "https://quebec-iptv.ca/accessibilite" },
        ]}
      />

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Déclaration d'Accessibilité
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            IPTV Quebec s'engage à garantir l'accessibilité numérique de son site web 
            pour les personnes en situation de handicap.
          </p>
        </header>

        {/* Commitment Section */}
        <section className="mb-12" aria-labelledby="engagement">
          <h2 id="engagement" className="text-2xl font-bold text-foreground mb-4">
            Notre engagement
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Nous nous efforçons de rendre notre site web accessible à tous les utilisateurs, 
              indépendamment de leurs capacités ou des technologies qu'ils utilisent. Notre objectif 
              est de respecter les <strong>Règles pour l'accessibilité des contenus Web (WCAG) 2.1</strong> 
              au niveau <strong>AA</strong>.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12" aria-labelledby="fonctionnalites">
          <h2 id="fonctionnalites" className="text-2xl font-bold text-foreground mb-6">
            Fonctionnalités d'accessibilité
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <AccessibilityFeature key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* Conformance Checklist */}
        <section className="mb-12" aria-labelledby="conformite">
          <h2 id="conformite" className="text-2xl font-bold text-foreground mb-6">
            Mesures de conformité
          </h2>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <ul className="space-y-3" role="list">
                {conformanceItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Technical Standards */}
        <section className="mb-12" aria-labelledby="normes">
          <h2 id="normes" className="text-2xl font-bold text-foreground mb-4">
            Normes techniques
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Ce site web a été conçu et développé selon les normes suivantes :</p>
            <ul>
              <li><strong>WCAG 2.1 Niveau AA</strong> - Règles pour l'accessibilité des contenus Web</li>
              <li><strong>WAI-ARIA 1.2</strong> - Applications Internet riches accessibles</li>
              <li><strong>HTML5 sémantique</strong> - Structure de document accessible</li>
              <li><strong>CSS3</strong> - Styles adaptatifs et support du mode contraste élevé</li>
            </ul>
          </div>
        </section>

        {/* Browser Support */}
        <section className="mb-12" aria-labelledby="navigateurs">
          <h2 id="navigateurs" className="text-2xl font-bold text-foreground mb-4">
            Technologies d'assistance compatibles
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Notre site est compatible avec :</p>
            <ul>
              <li>NVDA (Windows)</li>
              <li>JAWS (Windows)</li>
              <li>VoiceOver (macOS, iOS)</li>
              <li>TalkBack (Android)</li>
              <li>Navigation au clavier standard</li>
              <li>Loupes d'écran et agrandissement</li>
            </ul>
          </div>
        </section>

        {/* Known Limitations */}
        <section className="mb-12" aria-labelledby="limitations">
          <h2 id="limitations" className="text-2xl font-bold text-foreground mb-4">
            Limitations connues
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Malgré nos efforts, certaines limitations peuvent exister. Nous travaillons 
              continuellement à améliorer l'accessibilité de notre site. Si vous rencontrez 
              des difficultés, n'hésitez pas à nous contacter.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12" aria-labelledby="contact">
          <h2 id="contact" className="text-2xl font-bold text-foreground mb-6">
            Nous contacter
          </h2>
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                Si vous rencontrez des problèmes d'accessibilité sur notre site ou si vous 
                avez des suggestions d'amélioration, veuillez nous contacter :
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/contact">
                    <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                    Page de contact
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="https://wa.me/15819995516" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Last Updated */}
        <footer className="text-center text-sm text-muted-foreground border-t border-border pt-8">
          <p>
            Cette déclaration d'accessibilité a été mise à jour le{" "}
            <time dateTime="2025-06-26">26 juin 2025</time>.
          </p>
        </footer>
      </article>
    </PageLayout>
  );
};

export default Accessibilite;
