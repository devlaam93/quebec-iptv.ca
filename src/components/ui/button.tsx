import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/80",
        ghost: "border-2 border-transparent hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:decoration-2",
        hero: "bg-gradient-orange text-primary-foreground shadow-button hover:shadow-glow hover:scale-105 font-semibold border-2 border-orange-400",
        renewal: "bg-gradient-orange text-primary-foreground font-semibold border-2 border-orange-400",
        "ghost-white": "text-foreground hover:bg-secondary/20 border-2 border-border/50 backdrop-blur-sm",
        "outline-hero": "bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/60 font-semibold backdrop-blur-sm",
      },
      size: {
        default: "h-12 px-4 py-2 min-w-[48px]",
        sm: "h-10 rounded-md px-3 min-w-[48px]",
        lg: "h-12 rounded-md px-8 min-w-[48px]",
        xl: "h-14 rounded-lg px-10 text-lg min-w-[48px]",
        icon: "h-12 w-12 min-w-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
