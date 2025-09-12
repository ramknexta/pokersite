import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LoadingProvider } from "@/contexts/LoadingContext";
import ScrollToTop from "./components/ui/Scroll";
import Index from "./pages/Index";
import Clubs from "./pages/Clubs";
import ClubDetail from "./pages/ClubDetail";
import Admin from "./pages/Admin";
import AddClub from "./pages/AddClub";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/terms";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/club/:id" element={<ClubDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-club" element={<AddClub />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoadingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LoadingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
