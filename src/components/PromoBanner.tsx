import { useState } from "react";
import { X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
interface PromoBannerProps {
  onClose?: () => void;
}
const PromoBanner = ({
  onClose
}: PromoBannerProps) => {
  const [isVisible, setIsVisible] = useState(() => {
    return sessionStorage.getItem("promoBannerClosed") !== "true";
  });
  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("promoBannerClosed", "true");
    onClose?.();
  };
  if (!isVisible) return null;
  return <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-destructive via-destructive/90 to-destructive text-destructive-foreground py-2 px-4 z-[60]">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 animate-pulse" />
          <span className="font-bold text-sm sm:text-base">OFFRE LIMITÉE - 36% OFF</span>
        </div>
        
        <div className="hidden sm:block text-destructive-foreground/60">|</div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm">Expire dans:</span>
          <CountdownTimer variant="compact" />
        </div>
        
        
        
        <button 
          onClick={handleClose} 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-destructive" 
          aria-label="Fermer la bannière promotionnelle"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>;
};
export default PromoBanner;