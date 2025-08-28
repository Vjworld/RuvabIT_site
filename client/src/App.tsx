import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { initGA, initGTM } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { initAdSense } from "./lib/adsense";


import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";
import CookieBanner from "@/components/CookieBanner";
import AIAnalytics from "@/pages/AIAnalytics";
import ProcessAutomation from "@/pages/ProcessAutomation";
import AIImplementation from "@/pages/AIImplementation";
import BusinessIntelligence from "@/pages/BusinessIntelligence";
import CloudSolutions from "@/pages/CloudSolutions";
import Cybersecurity from "@/pages/Cybersecurity";
import Consulting from "@/pages/Consulting";
import CookiePolicy from "@/pages/CookiePolicy";
import BlogPage from "@/pages/BlogPage";
import BlogPostDetail from "@/pages/BlogPostDetail";
import SearchPage from "@/pages/SearchPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

import CaseStudies from "@/pages/CaseStudies";
import HelpCenter from "@/pages/HelpCenter";
import Documentation from "@/pages/Documentation";
import DataSecurityPolicy from "@/pages/DataSecurityPolicy";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ServicesPage from "@/pages/ServicesPage";
import TrendSolver from "@/pages/TrendSolver";
import LangScribe from "@/pages/LangScribe";
import Fyppal from "@/pages/Fyppal";
import QRGenTool from "./pages/QRGenTool";
import TechnologyNewsPage from "./pages/TechnologyNewsPage";
import PartnersPage from "./pages/PartnersPage";
import PaymentPage from "./pages/PaymentPage";
import LiveChat from "./pages/LiveChat";
import AdvancedAnalytics from "./pages/AdvancedAnalytics";
import APIDocumentationPortal from "./pages/APIDocumentationPortal";
import AdvancedFeaturesHub from "./pages/AdvancedFeaturesHub";
import ChatWidget from "./components/ChatWidget";
import { AuthProvider } from "./contexts/AuthContext";


import HelpDocumentation from "@/pages/HelpDocumentation";

import Disclaimer from "@/pages/Disclaimer";
import CancellationRefundPolicy from "@/pages/CancellationRefundPolicy";
import ShippingDeliveryPolicy from "@/pages/ShippingDeliveryPolicy";
import MonetagVerification from "@/pages/MonetagVerification";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  // Scroll to top on route changes
  useScrollToTop();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />

      {/* Service Pages */}
      <Route path="/ai-analytics" component={AIAnalytics} />
      <Route path="/process-automation" component={ProcessAutomation} />
      <Route path="/ai-implementation" component={AIImplementation} />
      <Route path="/business-intelligence" component={BusinessIntelligence} />
      <Route path="/cloud-solutions" component={CloudSolutions} />
      <Route path="/cybersecurity" component={Cybersecurity} />
      <Route path="/consulting" component={Consulting} />

      {/* Content Pages */}
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostDetail} />
      <Route path="/search" component={SearchPage} />
      <Route path="/technology-news" component={TechnologyNewsPage} />
      <Route path="/partners" component={PartnersPage} />

      {/* Admin Pages */}
      <Route path="/vsadmin/login" component={AdminLogin} />
      <Route path="/vsadmin/dashboard" component={AdminDashboard} />

      {/* Additional Content Pages */}
      <Route path="/case-studies" component={CaseStudies} />

      {/* Support Pages */}
      <Route path="/help" component={HelpCenter} />
      <Route path="/documentation" component={Documentation} />

      {/* Company Pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/services" component={ServicesPage} />

      {/* Product Pages */}
      <Route path="/trend-solver" component={TrendSolver} />
      <Route path="/langscribe" component={LangScribe} />
      <Route path="/fyppal" component={Fyppal} />
      <Route path="/qr-gen-tool" component={QRGenTool} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/live-chat" component={LiveChat} />
      <Route path="/advanced-analytics" component={AdvancedAnalytics} />
      <Route path="/api-documentation" component={APIDocumentationPortal} />
      <Route path="/advanced-features" component={AdvancedFeaturesHub} />


      {/* Policy Pages */}
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/data-security" component={DataSecurityPolicy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/cancellation-refund" component={CancellationRefundPolicy} />
      <Route path="/shipping-delivery" component={ShippingDeliveryPolicy} />

      {/* Additional Pages */}
      <Route path="/help-documentation" component={HelpDocumentation} />
      
      {/* Temporary Verification Pages */}
      <Route path="/monetag-verification" component={MonetagVerification} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize services on app load
  useEffect(() => {
    // Google Analytics is now loaded directly in HTML head
    // GTM is also loaded directly in HTML head
    // Only need to verify AdSense environment variable
    if (!import.meta.env.VITE_ADSENSE_CLIENT_ID) {
      console.warn('Missing required AdSense key: VITE_ADSENSE_CLIENT_ID');
    }
    
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ';
    console.log(`Analytics tracking is active with measurement ID: ${measurementId}`);
    
    // Comprehensive error suppression for development issues
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason?.toString() || '';
      if (
        reason.includes('eruda') ||
        reason.includes('WebSocket') ||
        reason.includes('localhost:undefined') ||
        reason.includes('DOMException') ||
        reason.includes('Failed to construct') ||
        reason.includes('SyntaxError: Failed to construct') ||
        reason.includes('invalid')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
    });

    // Handle all error events comprehensively  
    window.addEventListener('error', (event) => {
      const message = event.message || '';
      const filename = event.filename || '';
      const error = event.error?.toString() || '';
      
      if (
        message.includes('WebSocket') ||
        message.includes('localhost:undefined') ||
        message.includes('Failed to construct') ||
        message.includes('DOMException') ||
        message.includes('SyntaxError') ||
        error.includes('WebSocket') ||
        error.includes('DOMException') ||
        filename.includes('eruda') ||
        filename.includes('__replco')
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    }, true); // Use capture phase
    
    // Also catch any errors from Vite's client
    if (import.meta.env.DEV) {
      // Suppress Vite client connection errors
      const viteErrors = ['[vite] connecting...', '[vite] connected.', '[vite] failed to connect'];
      const originalLog = console.log;
      console.log = (...args) => {
        const logString = args.join(' ');
        if (viteErrors.some(error => logString.includes(error))) {
          return;
        }
        originalLog.apply(console, args);
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AuthProvider>
            <Router />
            <ChatWidget />
            <Toaster />
            <CookieBanner />
          </AuthProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;