import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";

interface ReadingProgressProps {
  readTime?: string;
}

const ReadingProgress = ({ readTime }: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);
  
  // Parse read time (e.g., "5 min" -> 5)
  const totalMinutes = readTime ? parseInt(readTime.match(/\d+/)?.[0] || "0") : 0;
  const remainingMinutes = Math.max(0, Math.ceil(totalMinutes * (1 - progress / 100)));
  const calculateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight <= 0) {
      setProgress(0);
      return;
    }
    
    const scrollProgress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    setProgress(scrollProgress);
  }, []);

  useEffect(() => {
    // Initial calculation
    calculateProgress();

    // Throttled scroll handler for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [calculateProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex items-center">
      <div 
        className="flex-1 h-1 bg-muted/30"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progression de lecture"
      >
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {totalMinutes > 0 && (
        <div 
          className="flex items-center gap-1 px-3 py-1 bg-background/95 backdrop-blur-sm border-b border-l border-border/50 text-xs text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          <Clock className="h-3 w-3" />
          <span>{remainingMinutes} min restantes</span>
        </div>
      )}
    </div>
  );
};

export default ReadingProgress;
