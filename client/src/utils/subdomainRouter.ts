// Dynamic subdomain routing logic
export interface SubdomainConfig {
  subdomain: string;
  appUrl: string;
  name: string;
  description: string;
  status: 'active' | 'maintenance' | 'development';
}

const subdomainConfig: SubdomainConfig[] = [
  {
    subdomain: 'trendsolver',
    appUrl: 'https://trendsolver.ruvab.it.com',
    name: 'TrendSolver',
    description: 'AI-powered analytics and business intelligence platform',
    status: 'active',
  },
  {
    subdomain: 'langscribe',
    appUrl: 'https://langscribe.ruvab.it.com',
    name: 'LangScribe',
    description: 'Advanced language processing and content creation platform',
    status: 'active',
  },
];

export const getSubdomainConfig = (subdomain: string): SubdomainConfig | null => {
  return subdomainConfig.find(config => config.subdomain === subdomain) || null;
};

export const getCurrentSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // For development (localhost)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return null;
  }
  
  // For production (subdomain.ruvab.it.com)
  if (parts.length >= 3) {
    return parts[0];
  }
  
  return null;
};

export const redirectToSubdomain = (productKey: string): void => {
  const config = subdomainConfig.find(c => c.subdomain === productKey);
  if (!config) {
    console.error(`Subdomain config not found for: ${productKey}`);
    return;
  }
  
  if (config.status === 'maintenance') {
    alert(`${config.name} is currently under maintenance. Please try again later.`);
    return;
  }
  
  if (config.status === 'development') {
    const proceed = confirm(`${config.name} is in development mode. Continue anyway?`);
    if (!proceed) return;
  }
  
  window.open(config.appUrl, '_blank');
};

export const getSubdomainStatus = (subdomain: string): string => {
  const config = getSubdomainConfig(subdomain);
  return config?.status || 'unknown';
};

export const getAllSubdomains = (): SubdomainConfig[] => {
  return subdomainConfig;
};

// Health check for subdomains
export const checkSubdomainHealth = async (subdomain: string): Promise<boolean> => {
  const config = getSubdomainConfig(subdomain);
  if (!config) return false;
  
  try {
    const response = await fetch(config.appUrl, { 
      method: 'HEAD',
      mode: 'no-cors',
    });
    return true; // If no error thrown, subdomain is accessible
  } catch (error) {
    console.warn(`Health check failed for ${subdomain}:`, error);
    return false;
  }
};

// Analytics tracking for subdomain redirects
export const trackSubdomainRedirect = (subdomain: string, source: string = 'unknown') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'subdomain_redirect', {
      subdomain,
      source,
      timestamp: new Date().toISOString(),
    });
  }
};