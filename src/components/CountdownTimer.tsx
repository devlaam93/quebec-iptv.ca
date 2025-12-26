import { useState, useEffect } from "react";

interface CountdownTimerProps {
  variant?: "default" | "compact";
  className?: string;
}

const CountdownTimer = ({ variant = "default", className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Get or set the countdown end time in localStorage
    const storedEndTime = localStorage.getItem("promoEndTime");
    let endTime: number;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime, 10);
    } else {
      // Set countdown to 24 hours from now
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("promoEndTime", endTime.toString());
    }

    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();

      if (difference <= 0) {
        // Reset the timer when it expires
        const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("promoEndTime", newEndTime.toString());
        return {
          hours: 23,
          minutes: 59,
          seconds: 59,
        };
      }

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  if (variant === "compact") {
    return (
      <div 
        className={`flex items-center gap-1 font-mono text-sm ${className}`}
        role="timer"
        aria-live="polite"
        aria-label={`Temps restant: ${formatNumber(timeLeft.hours)} heures, ${formatNumber(timeLeft.minutes)} minutes, ${formatNumber(timeLeft.seconds)} secondes`}
      >
        <span className="bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded font-bold" aria-hidden="true">
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-destructive font-bold" aria-hidden="true">:</span>
        <span className="bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded font-bold" aria-hidden="true">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-destructive font-bold" aria-hidden="true">:</span>
        <span className="bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded font-bold" aria-hidden="true">
          {formatNumber(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center gap-2 md:gap-4 ${className}`}
      role="timer"
      aria-live="polite"
      aria-label={`Temps restant: ${formatNumber(timeLeft.hours)} heures, ${formatNumber(timeLeft.minutes)} minutes, ${formatNumber(timeLeft.seconds)} secondes`}
    >
      <div className="flex flex-col items-center">
        <div className="bg-destructive text-destructive-foreground text-2xl md:text-3xl font-bold px-3 py-2 rounded-lg min-w-[60px] text-center" aria-hidden="true">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Heures</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-destructive" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-destructive text-destructive-foreground text-2xl md:text-3xl font-bold px-3 py-2 rounded-lg min-w-[60px] text-center" aria-hidden="true">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Minutes</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-destructive" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-destructive text-destructive-foreground text-2xl md:text-3xl font-bold px-3 py-2 rounded-lg min-w-[60px] text-center" aria-hidden="true">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Secondes</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
