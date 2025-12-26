import { useState, useEffect, useCallback } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

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
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-muted/30 z-[60]"
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
  );
};

export default ReadingProgress;
