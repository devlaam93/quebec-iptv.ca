import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

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

const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  >
    Aller au contenu principal
  </a>
);

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
      <SkipLink />
      <Header />
      
      <main 
        id="main-content"
        role="main"
        tabIndex={-1}
        className={cn(
          "flex-1 pt-32 sm:pt-28 focus:outline-none",
          container && "container mx-auto px-4 sm:px-6 pb-12 sm:pb-20",
          heroSection && "pt-24 sm:pt-20",
          className
        )}
      >
        {showBreadcrumb && <AutoBreadcrumb />}
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
