import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface CountdownTimerProps {
  variant?: "default" | "compact";
  className?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const STORAGE_KEY = "promoEndTime";
const COUNTDOWN_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

const CountdownTimer = ({ variant = "default", className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [shouldAnnounce, setShouldAnnounce] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number>(0);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = endTimeRef.current - Date.now();

    if (difference <= 0) {
      // Reset the timer when it expires
      const newEndTime = Date.now() + COUNTDOWN_DURATION;
      endTimeRef.current = newEndTime;
      try {
        localStorage.setItem(STORAGE_KEY, newEndTime.toString());
      } catch {
        // localStorage might be unavailable
      }
      return { hours: 23, minutes: 59, seconds: 59 };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  useEffect(() => {
    // Initialize end time from storage or create new
    try {
      const storedEndTime = localStorage.getItem(STORAGE_KEY);
      if (storedEndTime) {
        endTimeRef.current = parseInt(storedEndTime, 10);
      } else {
        endTimeRef.current = Date.now() + COUNTDOWN_DURATION;
        localStorage.setItem(STORAGE_KEY, endTimeRef.current.toString());
      }
    } catch {
      // Fallback if localStorage unavailable
      endTimeRef.current = Date.now() + COUNTDOWN_DURATION;
    }

    setTimeLeft(calculateTimeLeft());

    let tickCount = 0;
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      tickCount++;
      // Announce to screen readers every 10 seconds to reduce noise
      if (tickCount % 10 === 0) {
        setShouldAnnounce(true);
        // Reset after a brief moment
        setTimeout(() => setShouldAnnounce(false), 100);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [calculateTimeLeft]);

  const formatNumber = useCallback((num: number) => num.toString().padStart(2, "0"), []);

  const formattedTime = useMemo(() => ({
    hours: formatNumber(timeLeft.hours),
    minutes: formatNumber(timeLeft.minutes),
    seconds: formatNumber(timeLeft.seconds),
  }), [timeLeft, formatNumber]);

  const ariaLabel = useMemo(() => 
    `Temps restant: ${formattedTime.hours} heures, ${formattedTime.minutes} minutes, ${formattedTime.seconds} secondes`,
    [formattedTime]
  );

  if (variant === "compact") {
    return (
      <div 
        className={`flex items-center gap-1 font-mono text-sm ${className}`}
        role="timer"
        aria-live={shouldAnnounce ? "polite" : "off"}
        aria-atomic="true"
        aria-label={ariaLabel}
      >
        <span className="bg-background text-foreground px-1.5 py-0.5 rounded font-bold" aria-hidden="true">
          {formattedTime.hours}
        </span>
        <span className="text-destructive-foreground font-bold" aria-hidden="true">:</span>
        <span className="bg-background text-foreground px-1.5 py-0.5 rounded font-bold" aria-hidden="true">
          {formattedTime.minutes}
        </span>
        <span className="text-destructive-foreground font-bold" aria-hidden="true">:</span>
        <span className="bg-background text-foreground px-1.5 py-0.5 rounded font-bold" aria-hidden="true">
          {formattedTime.seconds}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center gap-2 md:gap-4 ${className}`}
      role="timer"
      aria-live={shouldAnnounce ? "polite" : "off"}
      aria-atomic="true"
      aria-label={ariaLabel}
    >
      <div className="flex flex-col items-center">
        <div className="bg-destructive text-destructive-foreground text-2xl md:text-3xl font-bold px-3 py-2 rounded-lg min-w-[60px] text-center" aria-hidden="true">
          {formattedTime.hours}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Heures</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-destructive" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-destructive text-destructive-foreground text-2xl md:text-3xl font-bold px-3 py-2 rounded-lg min-w-[60px] text-center" aria-hidden="true">
          {formattedTime.minutes}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Minutes</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-destructive" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-destructive text-destructive-foreground text-2xl md:text-3xl font-bold px-3 py-2 rounded-lg min-w-[60px] text-center" aria-hidden="true">
          {formattedTime.seconds}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Secondes</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
