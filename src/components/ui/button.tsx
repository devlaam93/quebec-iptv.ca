import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 focus-visible:border-focus",
        destructive: "bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90 focus-visible:border-focus",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:border-focus",
        secondary: "bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/80 focus-visible:border-focus",
        ghost: "border-2 border-transparent hover:bg-accent hover:text-accent-foreground focus-visible:border-focus",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline",
        hero: "bg-gradient-orange text-primary-foreground shadow-button hover:shadow-glow hover:scale-105 font-semibold border-2 border-orange-400 focus-visible:border-focus",
        renewal: "bg-gradient-orange text-primary-foreground font-semibold border-2 border-orange-400 focus-visible:border-focus",
        "ghost-white": "text-foreground hover:bg-secondary/20 border-2 border-border/50 backdrop-blur-sm focus-visible:border-focus",
        "outline-hero": "bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/60 font-semibold backdrop-blur-sm focus-visible:border-focus",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
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
