import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
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
import CareersPage from "@/pages/CareersPage";
import CookiePolicy from "@/pages/CookiePolicy";
import BlogPage from "@/pages/BlogPage";
import BlogPost from "@/pages/BlogPost";
import CaseStudies from "@/pages/CaseStudies";
import HelpCenter from "@/pages/HelpCenter";
import Documentation from "@/pages/Documentation";
import APIDocumentation from "@/pages/APIDocumentation";
import DataSecurityPolicy from "@/pages/DataSecurityPolicy";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
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
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/careers" component={CareersPage} />
      
      {/* Support Pages */}
      <Route path="/help" component={HelpCenter} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/api-documentation" component={APIDocumentation} />
      
      {/* Policy Pages */}
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/data-security" component={DataSecurityPolicy} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics and AdSense when app loads
  useEffect(() => {
    // Verify required environment variables are present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }

    if (!import.meta.env.VITE_ADSENSE_CLIENT_ID) {
      console.warn('Missing required AdSense key: VITE_ADSENSE_CLIENT_ID');
    } else {
      // Only initialize AdSense in production or when explicitly needed
      if (import.meta.env.NODE_ENV === 'production' || import.meta.env.VITE_ADSENSE_CLIENT_ID !== 'ca-pub-4204204667108655') {
        initAdSense();
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
        <CookieBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
