import { Button } from "@/components/ui/button";
import { Star, Play, Tv, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { BunnyBackground } from "@/components/ui/bunny-background";
import heroBackground from "@/assets/hero-background.jpg";

// Live viewer count with fluctuation - memoized for performance
const useLiveViewerCount = (min: number, max: number) => {
  const baseCount = useRef(Math.floor(Math.random() * (max - min + 1)) + min).current;
  const [count, setCount] = useState(baseCount);
  useEffect(() => {
    const fluctuate = () => {
      const fluctuation = Math.floor(Math.random() * 100) - 50;
      setCount(prev => Math.max(min, Math.min(max, prev + fluctuation)));
    };
    const interval = setInterval(fluctuate, Math.random() * 5000 + 3000);
    return () => clearInterval(interval);
  }, [min, max]);
  return count;
};

// Memoized background elements for performance
const BackgroundElements = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Glowing orbs */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-glow-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
    
    {/* Floating icons - hidden on mobile for performance */}
    <div className="absolute top-32 left-[10%] text-primary/30 animate-float-slow hidden lg:block" style={{ animationDelay: '0s' }}>
      <Tv className="w-12 h-12" aria-hidden="true" />
    </div>
    <div className="absolute top-48 right-[15%] text-primary/20 animate-float-slow hidden lg:block" style={{ animationDelay: '1s' }}>
      <Play className="w-10 h-10" aria-hidden="true" />
    </div>
    <div className="absolute bottom-32 left-[20%] text-primary/25 animate-float-slow hidden lg:block" style={{ animationDelay: '2s' }}>
      <Zap className="w-8 h-8" aria-hidden="true" />
    </div>
    <div className="absolute bottom-48 right-[10%] text-primary/15 animate-float-slow hidden lg:block" style={{ animationDelay: '0.5s' }}>
      <Star className="w-10 h-10" aria-hidden="true" />
    </div>
    
    {/* Animated particles/dots - reduced for performance */}
    <div className="absolute top-1/3 left-[5%] w-2 h-2 bg-primary/40 rounded-full animate-ping-slow hidden md:block" />
    <div className="absolute top-2/3 right-[8%] w-2 h-2 bg-primary/30 rounded-full animate-ping-slow hidden md:block" style={{ animationDelay: '0.5s' }} />
  </div>
));

BackgroundElements.displayName = 'BackgroundElements';

const HeroSection = () => {
  const viewerCount = useLiveViewerCount(1000, 8000);

  return (
    <BunnyBackground
      src={heroBackground}
      overlay="linear-gradient(rgba(22, 22, 29, 0.85), rgba(22, 22, 29, 0.95))"
      overlayOpacity={1}
      className="pt-40 sm:pt-44 md:pt-48 lg:pt-52 xl:pt-56 pb-6 sm:pb-8 md:pb-10 lg:pb-12"
      priority
      quality={90}
      responsiveWidths={[1024, 1536, 1920]}
      ariaLabel="Hero background image"
    >
      <BackgroundElements />
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 flex flex-col items-center">
          {/* Badge */}
          <div className="opacity-0 animate-fade-in-down inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-primary font-medium">#1 Service IPTV au Québec</span>
          </div>
          
          {/* Main heading with gradient text */}
          <h1 id="hero-heading" className="opacity-0 animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center w-full">
            <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">IPTV QUEBEC</span>
          </h1>
          
          {/* Stats row */}
          <div className="opacity-0 animate-fade-in-up-delay-1 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 py-2 sm:py-3">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">15K+</span>
              <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Chaînes en Direct</span>
            </div>
            <div className="w-px h-10 sm:h-12 bg-border hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">40K+</span>
              <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Films & Séries VOD</span>
            </div>
            <div className="w-px h-10 sm:h-12 bg-border hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">4K</span>
              <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Ultra HD Qualité</span>
            </div>
          </div>
          
          {/* Description */}
          <p className="opacity-0 animate-fade-in-up-delay-2 text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed px-2 sm:px-4 text-center">
            Profitez du <strong className="text-foreground">meilleur abonnement IPTV</strong> avec une expérience de divertissement exceptionnelle.
            Compatible avec toutes les plateformes pour un streaming fluide et une activation instantanée.
          </p>
          
          
          {/* Feature pills */}
          <div className="opacity-0 animate-fade-in-up-delay-2 flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3">
            {['Activation Instantanée', 'Support 24/7', 'Qualité 4K', 'Multi-Écrans'].map((feature) => (
              <div key={feature} className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary/50 border border-border/50 rounded-full text-[10px] sm:text-xs md:text-sm text-muted-foreground backdrop-blur-sm">
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" aria-hidden="true" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="opacity-0 animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center pt-2 sm:pt-3 md:pt-4 w-full">
            <Button 
              variant="renewal" 
              size="lg" 
              className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] group relative overflow-hidden shadow-glow hover:shadow-[0_0_40px_hsl(16,100%,60%,0.5)] transition-all duration-300" 
              onClick={() => {
                const element = document.getElementById('renewal');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-4 h-4" aria-hidden="true" />
                S'abonner Maintenant
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
            </Button>
            <Button variant="outline-hero" size="lg" className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] group" asChild>
              <Link to="/essai-gratuit" className="flex items-center gap-2">
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Essai Gratuit 24H
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="opacity-0 animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 pt-2 sm:pt-3 md:pt-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-0.5 sm:gap-1" role="img" aria-label="Note de 4.9 sur 5 étoiles">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                <span className="text-foreground font-medium">4.9/5</span> basé sur 2000+ avis
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" aria-hidden="true" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-muted-foreground">
                <span className="font-bold text-amber-400 tabular-nums">{viewerCount.toLocaleString('fr-CA')}</span> personnes regardent en ce moment
              </span>
            </div>
          </div>
        </div>
      </div>
    
    </BunnyBackground>
  );
};

export default HeroSection;