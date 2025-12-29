import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/ScrollToTop";
import RouteAnnouncer from "./components/RouteAnnouncer";
import useDocumentLang from "./hooks/useDocumentLang";
import { LinkValidator } from "./components/dev/LinkValidator";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const ListeChaines = lazy(() => import("./pages/ListeChaines"));
const Blog = lazy(() => import("./pages/Blog"));
const Revendeur = lazy(() => import("./pages/Revendeur"));
const Tutorial = lazy(() => import("./pages/Tutorial"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Category = lazy(() => import("./pages/Category"));
const TagPage = lazy(() => import("./pages/Tag"));
const Tags = lazy(() => import("./pages/Tags"));
const WordPressPost = lazy(() => import("./pages/blog/WordPressPost"));
const EssaiGratuit = lazy(() => import("./pages/EssaiGratuit"));
const AnnulationCommande = lazy(() => import("./pages/AnnulationCommande"));
const PolitiqueRemboursement = lazy(() => import("./pages/PolitiqueRemboursement"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const ConditionsGenerales = lazy(() => import("./pages/ConditionsGenerales"));
const Contact = lazy(() => import("./pages/Contact"));
const DmcaPolicy = lazy(() => import("./pages/DmcaPolicy"));
const AvisNonResponsabilite = lazy(() => import("./pages/AvisNonResponsabilite"));
const ConditionsPaiement = lazy(() => import("./pages/ConditionsPaiement"));
const Accessibilite = lazy(() => import("./pages/Accessibilite"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));

const queryClient = new QueryClient();

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Component to use hooks inside BrowserRouter
const AppContent = () => {
  useDocumentLang();
  
  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>
      <ScrollToTop />
      <RouteAnnouncer />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/essai-gratuit" element={<EssaiGratuit />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accessibilite" element={<Accessibilite />} />
          <Route path="/annulation-commande" element={<AnnulationCommande />} />
          <Route path="/politique-remboursement" element={<PolitiqueRemboursement />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions-generales" element={<ConditionsGenerales />} />
          <Route path="/dmca-policy" element={<DmcaPolicy />} />
          <Route path="/avis-non-responsabilite" element={<AvisNonResponsabilite />} />
          <Route path="/conditions-paiement" element={<ConditionsPaiement />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/liste-chaines" element={<ListeChaines />} />
          <Route path="/revendeur" element={<Revendeur />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/tutorial/:slug" element={<WordPressPost basePath="tutorial" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<WordPressPost />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/tag/:slug" element={<TagPage />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <LinkValidator />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
