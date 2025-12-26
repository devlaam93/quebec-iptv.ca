import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

import WhatsAppButton from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  /** Use container wrapper with default padding */
  container?: boolean;
  /** Hero-style section with gradient background (hides breadcrumb) */
  heroSection?: boolean;
  /** Hide breadcrumb navigation */
  hideBreadcrumb?: boolean;
}

const PageLayout = ({ 
  children, 
  className,
  container = false,
  heroSection = false,
  hideBreadcrumb = false 
}: PageLayoutProps) => {
  // Show breadcrumb on container pages by default, hide on hero sections
  const showBreadcrumb = !hideBreadcrumb && !heroSection && container;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main 
        role="main"
        className={cn(
          "flex-1 pt-32 sm:pt-28",
          container && "container mx-auto px-4 sm:px-6 pb-12 sm:pb-20",
          heroSection && "pt-24 sm:pt-20",
          className
        )}
      >
        {showBreadcrumb && <AutoBreadcrumb />}
        {children}
      </main>

      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default PageLayout;
