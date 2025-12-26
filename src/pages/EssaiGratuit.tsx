import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Shield, Zap, Clock, Star, Play, Tv, Film, Globe, Headphones, Sparkles, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PhoneInput, { countryCodes } from "@/components/PhoneInput";

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis (min 2 caractères)").max(100),
  email: z.string().min(1, "L'email est requis").email("Email invalide").max(255),
  phone: z.string().min(7, "Le numéro de téléphone est requis").max(20),
  message: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

const EssaiGratuit = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("CA");
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const messageValue = watch("message") || "";

  const onSubmit = async (data: FormData) => {
    try {
      const selectedCountry = countryCodes.find(c => c.id === selectedCountryId);
      const fullPhone = `${selectedCountry?.code || "+1"} ${data.phone}`;
      
      // Elementor-style form data structure
      const formData = new FormData();
      formData.append("form_name", "Essai Gratuit IPTV");
      formData.append("form_id", "essai-gratuit");
      
      // Required field IDs matching Elementor format
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", fullPhone);
      formData.append("country", selectedCountry?.country || "Canada");
      formData.append("message", data.message || "");
      
      // Also include as fields array (Elementor Advanced Data format)
      const fields = {
        name: { id: "name", type: "text", value: data.name },
        email: { id: "email", type: "email", value: data.email },
        phone: { id: "phone", type: "tel", value: fullPhone },
        country: { id: "country", type: "text", value: selectedCountry?.country || "Canada" },
        message: { id: "message", type: "textarea", value: data.message || "" },
      };

      const webhookPayload = {
        form_name: "Essai Gratuit IPTV",
        form_id: "essai-gratuit",
        name: data.name,
        email: data.email,
        phone: fullPhone,
        country: selectedCountry?.country || "Canada",
        message: data.message || "",
        fields: fields,
        meta: {
          date: new Date().toISOString(),
          time: new Date().toLocaleTimeString(),
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          remote_ip: "client",
          credit: "Lovable IPTV Quebec"
        }
      };

      console.log("Sending Elementor-style form data to webhook:", webhookPayload);

      const response = await fetch("https://iptv-dashboard-xi.vercel.app/api/webhooks/lovanle/elementor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(webhookPayload),
      });

      // With no-cors mode, we can't check response status, but the request is sent
      setIsSubmitted(true);
      toast.success("Demande envoyée avec succès!");
    } catch (error) {
      console.error("Webhook submission error:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  if (isSubmitted) {
    return (
      <PageLayout heroSection>
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 pt-32">
          <div className="max-w-lg w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Demande Reçue! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              Votre essai gratuit de <span className="text-primary font-semibold">24 heures</span> sera activé dans quelques minutes via WhatsApp.
            </p>
            <Button size="lg" onClick={() => window.location.href = "/"}>
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const features = [
    { icon: Tv, label: "45 000+ Chaînes" },
    { icon: Film, label: "100 000+ VOD" },
    { icon: Globe, label: "Contenu Mondial" },
    { icon: Headphones, label: "Support 24/7" },
  ];

  return (
    <PageLayout heroSection>
      <SEO
        title="Essai Gratuit IPTV 24h | Testez Sans Engagement"
        description="Testez notre IPTV gratuitement pendant 24h. Accès complet : 45 000+ chaînes, films 4K. Sans carte bancaire, activation en 5 minutes. Essayez maintenant!"
        path="/essai-gratuit"
        keywords={["essai gratuit IPTV", "test IPTV", "IPTV gratuit", "démo IPTV"]}
        image="/og-essai-gratuit.jpg"
      />
      <StructuredData
        type="offer"
        data={{
          name: "Essai Gratuit IPTV 24 Heures",
          description: "Essai gratuit IPTV de 24 heures avec accès complet à 45 000+ chaînes TV en direct, 100 000+ films et séries en qualité 4K. Sans engagement, sans carte bancaire.",
          price: "0",
          priceCurrency: "CAD",
          availability: "InStock",
          url: "https://quebec-iptv.ca/essai-gratuit",
          seller: "IPTV Québec",
        }}
      />
      <StructuredData
        type="service"
        data={{
          name: "Essai Gratuit IPTV Québec",
          description: "Service d'essai gratuit IPTV de 24 heures. Accès complet à toutes les chaînes TV, films et séries en streaming 4K.",
          provider: "IPTV Québec",
          url: "https://quebec-iptv.ca/essai-gratuit",
          areaServed: "Canada",
          serviceType: "IPTV Free Trial",
          offers: {
            price: "0",
            priceCurrency: "CAD",
          },
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Accueil", url: "https://quebec-iptv.ca" },
          { name: "Essai Gratuit", url: "https://quebec-iptv.ca/essai-gratuit" },
        ]}
      />
      {/* Main Section */}
      <section className="relative pt-40 pb-16 md:pt-40 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6 lg:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>
              <span className="text-sm font-semibold text-destructive">OFFRE LIMITÉE - 50% OFF</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Essai <span className="text-primary">Gratuit</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              24 Heures • Livraison Instantanée
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-16 items-start max-w-5xl mx-auto">
            
            {/* Left - Features */}
            <div className="space-y-10 lg:space-y-8 lg:pt-4 text-center lg:text-left">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Testez notre service IPTV premium sans engagement. Accédez à{" "}
                <a href="/liste-chaines" className="text-primary hover:underline font-semibold">45 000+ chaînes en direct</a> et{" "}
                <strong className="text-foreground">100 000+ films</strong> en qualité 4K.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:max-w-none lg:mx-0">
                {features.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-default group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <item.icon className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground text-sm">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', name: 'Marc' },
                      { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', name: 'Sophie' },
                      { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', name: 'Pierre' },
                      { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', name: 'Marie' }
                    ].map((client, i) => (
                      <img 
                        key={i} 
                        src={client.src} 
                        alt={`Photo de ${client.name}, client satisfait`} 
                        className="w-9 h-9 rounded-full border-2 border-background object-cover" 
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">+10 000</p>
                    <p className="text-xs text-muted-foreground">Clients satisfaits</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-foreground">4.9/5</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-3 pt-4 flex flex-col items-center lg:items-start">
                <h3 className="font-semibold text-foreground">Inclus dans l'essai:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">Accès complet à toutes les chaînes</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">Films et séries en HD, Full HD et 4K</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">Compatible tous appareils - <a href="/tutorial" className="text-primary hover:underline">voir le guide d'installation</a></span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">Guide EPG inclus</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
                {/* Form Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Démarrez Votre Essai</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recevez vos accès via WhatsApp ou Email
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nom Complet <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Jean Dupont" 
                      {...register("name")} 
                      className={`h-11 ${errors.name ? "border-destructive" : ""}`} 
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Adresse Email <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="jean@example.com" 
                      {...register("email")} 
                      className={`h-11 ${errors.email ? "border-destructive" : ""}`} 
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      WhatsApp / Téléphone <span className="text-destructive">*</span>
                    </Label>
                    <PhoneInput
                      value={phoneValue}
                      onChange={(value) => {
                        setPhoneValue(value);
                        setValue("phone", value);
                      }}
                      onCountryChange={setSelectedCountryId}
                      selectedCountryId={selectedCountryId}
                      error={!!errors.phone}
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-muted-foreground font-normal">(optionnel)</span>
                    </Label>
                    <Textarea 
                      id="message" 
                      placeholder="Précisez votre appareil, questions ou demandes spéciales..." 
                      {...register("message")} 
                      className="min-h-[80px] resize-none"
                      maxLength={500}
                    />
                    <p className={`text-xs text-right ${messageValue.length > 450 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {messageValue.length}/500
                    </p>
                  </div>

                  {/* Customer Note */}
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Note:</strong> Vos codes d'accès seront envoyés par email dans les minutes qui suivent. Si vous ne recevez pas d'email, vérifiez votre dossier spam.</p>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 text-base font-semibold mt-2" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Obtenir Mon Essai Gratuit
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>Sécurisé</span>
                  </div>
                  <div className="w-px h-3 bg-border" />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>Sans engagement</span>
                  </div>
                  <div className="w-px h-3 bg-border" />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>Instantané</span>
                  </div>
                </div>

                {/* Promo Note */}
                <div className="mt-5 p-4 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground text-center">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1 text-primary" />
                    <strong className="text-foreground">Offre Spéciale:</strong> Achetez pendant votre essai et{" "}
                    <a href="/tarifs" className="text-primary hover:underline font-semibold">consultez nos forfaits</a> pour obtenir{" "}
                    <span className="text-destructive font-semibold">10% de réduction</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Comment ça marche?
            </h2>
            <p className="text-muted-foreground">
              3 étapes simples pour commencer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Remplissez le formulaire",
                description: "Entrez vos informations de contact"
              },
              {
                step: "2",
                title: "Recevez vos codes",
                description: "Via WhatsApp ou Email en quelques minutes"
              },
              {
                step: "3",
                title: "Profitez de l'essai",
                description: "24h d'accès complet gratuit"
              }
            ].map((item, i) => (
              <div key={i} className="relative text-center p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Contextual Links */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Des questions? Consultez notre{" "}
              <a href="/faq" className="text-primary hover:underline font-medium">foire aux questions</a>{" "}
              ou découvrez{" "}
              <a href="/blog" className="text-primary hover:underline font-medium">nos articles sur l'IPTV</a>.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EssaiGratuit;
