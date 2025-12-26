import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, DollarSign, Tv, Users, BookOpen, Settings, Phone, Sun, Moon, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import HeaderLogo from "./HeaderLogo";
import NavLink from "@/components/NavLink";
import { menuItems } from "./navigationData";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuIcons: Record<string, React.ReactNode> = {
  "/": <Home className="w-5 h-5" />,
  "/tarifs": <DollarSign className="w-5 h-5" />,
  "/liste-chaines": <Tv className="w-5 h-5" />,
  "/tutorial": <Settings className="w-5 h-5" />,
  "/revendeur": <Users className="w-5 h-5" />,
  "/blog": <BookOpen className="w-5 h-5" />,
};

const MobileNav = ({ open, onOpenChange }: MobileNavProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden relative min-w-[48px] min-h-[48px]">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[320px] sm:w-[380px] p-0 bg-gradient-to-b from-background via-background to-background/95 border-l border-border/50 z-[100]"
      >
        <div className="flex flex-col h-full">
          {/* Header with gradient accent */}
          <div className="relative px-6 pt-6 pb-8">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="relative flex items-start justify-between">
              <div>
                <HeaderLogo variant="mobile" />
                <p className="mt-3 text-xs text-muted-foreground">
                  45 000+ chaînes • 100 000+ VOD
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full bg-muted/50 hover:bg-muted transition-colors min-w-[48px] min-h-[48px]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/"}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 px-4 py-4 min-h-[56px] rounded-xl text-base text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all group touch-manipulation"
                  activeClassName="text-primary bg-primary/10 font-medium"
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    {menuIcons[item.href]}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer CTA */}
          <div className="px-6 py-6 border-t border-border/50 space-y-3">
            <a
              href="https://wa.me/15149001234"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 min-h-[56px] px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-base font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-background touch-manipulation"
              aria-label="Contacter le support via WhatsApp"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Contacter WhatsApp
            </a>
            <a
              href="mailto:support@iptvquebec.ca"
              className="flex items-center justify-center gap-2 w-full py-4 min-h-[56px] px-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground text-base font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background touch-manipulation"
              aria-label="Envoyer un email au support"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              Envoyer un Email
            </a>
            <p className="text-center text-sm text-muted-foreground mt-3">
              Support 24/7 • Réponse rapide garantie
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
