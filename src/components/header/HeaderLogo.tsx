import animatedLogo from "@/assets/iptv-quebec-animated-logo.png";
// WebP version generated at build time
import animatedLogoWebp from "@/assets/iptv-quebec-animated-logo.png?format=webp";

interface HeaderLogoProps {
  variant?: "header" | "mobile";
}

const HeaderLogo = ({ variant = "header" }: HeaderLogoProps) => {
  const isHeader = variant === "header";
  
  return (
    <a href="/" className="group flex items-center gap-2 sm:gap-3 relative z-10 min-h-[48px] touch-manipulation" aria-label="IPTV Quebec - Retour à l'accueil">
      <div className="relative">
        {/* Gradient background with glow effect */}
        <div className="absolute inset-0 bg-gradient-orange rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Logo container with animation */}
        <div className={`relative bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 rounded-[50%] shadow-xl shadow-orange-500/30 group-hover:shadow-2xl group-hover:shadow-orange-500/50 transition-all duration-500 ${isHeader ? 'p-1.5 sm:p-2' : 'p-1.5 animate-pulse-slow'}`}>
          <div className={`bg-gradient-to-br from-background to-background/95 rounded-[50%] backdrop-blur-sm ${isHeader ? 'p-1 sm:p-1.5' : 'p-1'}`}>
            <picture>
              <source srcSet={animatedLogoWebp} type="image/webp" />
              <img 
                src={animatedLogo} 
                alt="IPTV Quebec Premium - Service de streaming TV au Canada" 
                width={24}
                height={24}
                fetchPriority="high"
                className={`object-contain drop-shadow-lg ${isHeader ? 'w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500' : 'w-5 h-5'}`} 
              />
            </picture>
          </div>
        </div>
      </div>
      
      {/* Brand text */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1">
          <span className={`font-black text-foreground tracking-tight group-hover:text-primary transition-colors ${isHeader ? 'text-base sm:text-lg lg:text-xl' : 'text-base'}`}>
            IPTV
          </span>
          <span className={`font-black bg-gradient-orange bg-clip-text text-transparent ${isHeader ? 'text-base sm:text-lg lg:text-xl' : 'text-base'}`}>
            Quebec
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Premium Streaming
        </span>
      </div>
    </a>
  );
};

export default HeaderLogo;
