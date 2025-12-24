const Testimonials = () => {
  const testimonials = [
    {
      customer: "Customer #793",
      time: "16:17",
      message: "Comment allez-vous\n\nNous voulons connaître votre avis après votre expérience avec nous\n\n👋🏻\n\nQuelle différence par rapport au satellite que vous utilisez actuellement seulement ça et le jour et la nuit de qualité IPTV. Vous méritez le nom de leader IPTV à mon avis\n\nnous sommes heureux de ce nouveau pseudo que vous nous avez donné, merci... 😊 😊 😊",
      type: "received"
    },
    {
      customer: "Customer #903",
      time: "Today",
      message: "Bonjour\n\nComment vous allez ?\n\nSalutations à votre équipe\n\nSuper, j'achète mon abonnement IPTV chez vous depuis qu'un excellent service client ! Je le recommande fortement\n\nMerci pour votre avis",
      type: "received"
    },
    {
      customer: "Customer #445",
      time: "19:45",
      message: "Et sur le mot de passe\n\nPeut-on le changer ?\n\nOui\n\nBonjour, ça y est\n\nÇa marche\n\nEnfin...\n\nMerci beaucoup de m'avoir accompagné",
      type: "mixed"
    },
    {
      customer: "Customer #221",
      time: "18:14",
      message: "J'envoie le procès le TVH sur mon horaire\n\nMaintenant, il est 19h15\n\nDonc c'est une autre histoire\n\nOk\n\nvous avez reçu votre commande\n\nJe vais renouveler l'essai pour un abonnement de 12 mois dès maintenant",
      type: "mixed"
    },
    {
      customer: "Customer #667",
      time: "17:43",
      message: "URL d'utilisateur reçu\n\nMerci\n\nLes détails fonctionnent parfaitement\n\nExcellent service client\n\naucun problème\n\nTrès satisfait du service",
      type: "mixed"
    },
    {
      customer: "Customer #889",
      time: "21:22",
      message: "Merci d'accord Passe une bonne soirée\n\nVous devez\n\nSalut, je suis très content du service\n\nbeaucoup et merci beaucoup\n\nEt merci pour un excellent service 👍\n\nMerci beaucoup 🙏🙏🙏🙏",
      type: "mixed"
    },
    {
      customer: "Customer #334",
      time: "14:30",
      message: "Parfait service\n\nTrès stable\n\nQualité HD excellente\n\nJe recommande à 100%\n\nMerci pour votre professionnalisme",
      type: "received"
    },
    {
      customer: "Customer #556",
      time: "10:15",
      message: "Installation rapide\n\nInterface facile\n\nTous les canaux fonctionnent\n\nSupport technique réactif\n\nParfait !",
      type: "mixed"
    }
  ];

  const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => (
    <div className="bg-gradient-to-b from-card to-card/80 rounded-2xl p-1 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/30">
      <div className="bg-gradient-to-b from-background/95 to-background/90 rounded-xl p-4 h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {testimonial.customer.includes('#') ? '😊' : '👤'}
              </span>
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">
                {testimonial.customer}
              </div>
              <div className="text-xs text-muted-foreground">
                {testimonial.time}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
            <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="space-y-3">
          {testimonial.message.split('\n\n').slice(0, 3).map((paragraph: string, pIndex: number) => (
            <div
              key={pIndex}
              className={`p-3 rounded-lg text-sm leading-relaxed ${
                paragraph.includes('merci') || paragraph.includes('excellent') || paragraph.includes('Super') || paragraph.includes('Parfait')
                  ? 'bg-primary/10 text-foreground border-l-2 border-primary/30'
                  : 'bg-secondary/30 text-foreground'
              }`}
            >
              {paragraph.trim() || '...'}
            </div>
          ))}
        </div>

        {/* Quebec IPTV Watermark */}
        <div className="flex justify-center mt-4 pt-3 border-t border-border/20">
          <div className="text-primary font-bold text-lg tracking-wider opacity-60">
            QUEBEC IPTV
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-4">
            <span>Voir les avis de milliers de clients satisfaits !</span>
            <span className="text-2xl sm:text-3xl">👇</span>
          </h2>
        </div>

        {/* Testimonials Horizontal Slider */}
        <div className="max-w-full mx-auto overflow-hidden relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="animate-scroll-horizontal hover:pause-animation flex gap-6">
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 w-80">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
            
            {/* Second set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 w-80">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Rejoignez des milliers de clients satisfaits qui font confiance à Quebec IPTV
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30">
              <span className="text-trustpilot text-xl">⭐</span>
              <span className="text-sm font-medium text-foreground">4.9/5</span>
              <span className="text-xs text-muted-foreground">+10,000 avis</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30">
              <span className="text-primary text-xl">👥</span>
              <span className="text-sm font-medium text-foreground">50,000+</span>
              <span className="text-xs text-muted-foreground">clients actifs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;