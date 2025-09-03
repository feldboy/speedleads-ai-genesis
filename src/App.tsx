import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import AccessibilityStatement from "./pages/legal/AccessibilityStatement";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import LeadManagement from "./pages/admin/LeadManagement";
import ChatbotSettings from "./pages/admin/ChatbotSettings";
import LeadDetails from "./pages/admin/LeadDetails";

const queryClient = new QueryClient();

// Simple auth check - in a real app, you would use a more robust auth system
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    // Initialize AOS immediately - no delay needed
    AOS.init({
      duration: 600,        // Shorter animation duration for faster feel
      once: false,         // Allow animations to repeat on scroll
      mirror: true,        // Enable reverse animations when scrolling up
      offset: 120,         // Trigger animations earlier
      easing: 'ease-out-cubic',  // Smoother easing
      throttleDelay: 99,   // Throttle scroll events for better performance
      debounceDelay: 50,   // Debounce resize events
      anchorPlacement: 'top-bottom'  // When element top hits bottom of viewport
    });

    // Fix viewport sync issue: Aggressive refresh strategy
    // Hero animation changes body position which breaks AOS calculations
    let refreshCount = 0;
    const maxRefreshes = 10;
    
    const aggressiveRefresh = setInterval(() => {
      // Check if body position is normal (not fixed)
      const bodyPosition = window.getComputedStyle(document.body).position;
      
      if (bodyPosition !== 'fixed' && refreshCount < maxRefreshes) {
        AOS.refresh();
        refreshCount++;
        console.log(`AOS refresh attempt ${refreshCount} - body position: ${bodyPosition}`);
      }
      
      if (refreshCount >= maxRefreshes) {
        clearInterval(aggressiveRefresh);
      }
    }, 1000); // Refresh every second for first 10 seconds

    // Cleanup
    return () => clearInterval(aggressiveRefresh);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main public routes */}
          <Route path="/" element={<Index />} />
          
          {/* Legal pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<LeadManagement />} />
            <Route path="leads/:id" element={<LeadDetails />} />
            <Route path="chatbot" element={<ChatbotSettings />} />
          </Route>
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
