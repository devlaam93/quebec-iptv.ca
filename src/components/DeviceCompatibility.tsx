import { useState } from "react";
import { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import xboxLogo from "@/assets/devices/xbox-logo.png";
import vizioLogo from "@/assets/devices/vizio-logo.png";
import samsungLogo from "@/assets/devices/samsung-logo.png";
import rokuLogo from "@/assets/devices/roku-logo.png";
import playstationLogo from "@/assets/devices/playstation-logo.png";
import lgLogo from "@/assets/devices/lg-logo.png";
import chromecastLogo from "@/assets/devices/chromecast-logo.png";
import fireTVLogo from "@/assets/devices/amazon-fire-tv-logo.png";
const DeviceCompatibility = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({
    delay: 3000,
    stopOnInteraction: true
  }));
  const devices = [{
    name: "Xbox",
    logo: xboxLogo
  }, {
    name: "Vizio",
    logo: vizioLogo
  }, {
    name: "Samsung",
    logo: samsungLogo
  }, {
    name: "Roku",
    logo: rokuLogo
  }, {
    name: "PlayStation",
    logo: playstationLogo
  }, {
    name: "LG",
    logo: lgLogo
  }, {
    name: "Chromecast",
    logo: chromecastLogo
  }, {
    name: "Fire TV",
    logo: fireTVLogo
  }];
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">Compatibilité Universelle</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4">
            Compatible avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">tous vos appareils</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4">
            Profitez de votre contenu préféré sur n'importe quel appareil, à tout moment et en tout lieu
          </p>
        </div>

        {/* Device Icons Carousel */}
        <Carousel setApi={setApi} plugins={[plugin.current]} className="w-full max-w-5xl mx-auto" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
          <CarouselContent className="flex justify-center items-center">
            {devices.map((device, index) => <CarouselItem key={device.name} className="pl-3 md:pl-4 basis-auto">
                <div className="group cursor-pointer animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  {/* Device Icon Container - Circular like channel logos */}
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow">
                    <div className="w-full h-full rounded-full bg-background/50 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center p-2 group-hover:bg-primary/10 group-hover:border-primary/60 transition-all duration-300">
                      <img src={device.logo} alt={`Logo ${device.name} - application IPTV compatible`} width={40} height={40} loading="lazy" decoding="async" className="w-8 h-8 md:w-10 md:h-10 object-contain filter drop-shadow-lg grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          
          {/* Navigation Buttons */}
          
          
        </Carousel>

        {/* Interactive Pagination Dots */}
        <div className="flex justify-center items-center mt-12 gap-3">
          {Array.from({
          length: count
        }).map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`transition-all duration-300 rounded-full ${index === current ? 'w-10 h-2.5 bg-gradient-to-r from-primary to-orange-400 shadow-lg shadow-primary/50' : 'w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125'}`} aria-label={`Aller à la diapositive ${index + 1}`} />)}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-14 md:mt-16 max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 text-center hover:border-primary/30 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl sm:text-2xl">📱</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 sm:mb-2">Multi-Appareils</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">Accès simultané sur plusieurs appareils</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 text-center hover:border-primary/30 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl sm:text-2xl">⚡</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 sm:mb-2">Plug & Play</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">Installation facile en quelques minutes</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 text-center hover:border-primary/30 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl sm:text-2xl">🔄</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 sm:mb-2">Synchronisation</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">Reprenez où vous vous êtes arrêté</p>
          </div>
        </div>
      </div>
    </section>;
};
export default DeviceCompatibility;