import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Tarifs from "./pages/Tarifs";
import ListeChaines from "./pages/ListeChaines";
import Blog from "./pages/Blog";
import Revendeur from "./pages/Revendeur";
import Tutorial from "./pages/Tutorial";
import NotFound from "./pages/NotFound";
import WordPressPost from "./pages/blog/WordPressPost";
import EssaiGratuit from "./pages/EssaiGratuit";
import AnnulationCommande from "./pages/AnnulationCommande";
import PolitiqueRemboursement from "./pages/PolitiqueRemboursement";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import Contact from "./pages/Contact";
import DmcaPolicy from "./pages/DmcaPolicy";
import AvisNonResponsabilite from "./pages/AvisNonResponsabilite";
import ConditionsPaiement from "./pages/ConditionsPaiement";
import Accessibilite from "./pages/Accessibilite";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import RouteAnnouncer from "./components/RouteAnnouncer";
import useDocumentLang from "./hooks/useDocumentLang";
import FAQPage from "./pages/FAQPage";

const queryClient = new QueryClient();

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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<WordPressPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
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
