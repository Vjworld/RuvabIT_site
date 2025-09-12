// Location-based tax calculation system
// Based on IP-API for automatic location detection

export interface LocationData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  timezone: string;
}

export interface TaxInfo {
  rate: number;
  name: string;
  description: string;
}

export interface PricingWithLocation {
  baseRupees: number;
  taxRupees: number;
  totalRupees: number;
  basePaise: number;
  taxPaise: number;
  totalPaise: number;
  taxRate: number;
  taxName: string;
  countryCode: string;
}

// Comprehensive tax rates for 30+ countries
const TAX_RATES: Record<string, TaxInfo> = {
  // India
  IN: { rate: 0.18, name: 'GST', description: 'Goods and Services Tax' },
  
  // European Union - VAT Rates
  AT: { rate: 0.20, name: 'VAT', description: 'Value Added Tax' }, // Austria
  BE: { rate: 0.21, name: 'VAT', description: 'Value Added Tax' }, // Belgium
  BG: { rate: 0.20, name: 'VAT', description: 'Value Added Tax' }, // Bulgaria
  HR: { rate: 0.25, name: 'VAT', description: 'Value Added Tax' }, // Croatia
  CY: { rate: 0.19, name: 'VAT', description: 'Value Added Tax' }, // Cyprus
  CZ: { rate: 0.21, name: 'VAT', description: 'Value Added Tax' }, // Czech Republic
  DK: { rate: 0.25, name: 'VAT', description: 'Value Added Tax' }, // Denmark
  EE: { rate: 0.22, name: 'VAT', description: 'Value Added Tax' }, // Estonia
  FI: { rate: 0.24, name: 'VAT', description: 'Value Added Tax' }, // Finland
  FR: { rate: 0.20, name: 'VAT', description: 'Value Added Tax' }, // France
  DE: { rate: 0.19, name: 'VAT', description: 'Value Added Tax' }, // Germany
  GR: { rate: 0.24, name: 'VAT', description: 'Value Added Tax' }, // Greece
  HU: { rate: 0.27, name: 'VAT', description: 'Value Added Tax' }, // Hungary
  IE: { rate: 0.23, name: 'VAT', description: 'Value Added Tax' }, // Ireland
  IT: { rate: 0.22, name: 'VAT', description: 'Value Added Tax' }, // Italy
  LV: { rate: 0.21, name: 'VAT', description: 'Value Added Tax' }, // Latvia
  LT: { rate: 0.21, name: 'VAT', description: 'Value Added Tax' }, // Lithuania
  LU: { rate: 0.17, name: 'VAT', description: 'Value Added Tax' }, // Luxembourg
  MT: { rate: 0.18, name: 'VAT', description: 'Value Added Tax' }, // Malta
  NL: { rate: 0.21, name: 'VAT', description: 'Value Added Tax' }, // Netherlands
  PL: { rate: 0.23, name: 'VAT', description: 'Value Added Tax' }, // Poland
  PT: { rate: 0.23, name: 'VAT', description: 'Value Added Tax' }, // Portugal
  RO: { rate: 0.19, name: 'VAT', description: 'Value Added Tax' }, // Romania
  SK: { rate: 0.20, name: 'VAT', description: 'Value Added Tax' }, // Slovakia
  SI: { rate: 0.22, name: 'VAT', description: 'Value Added Tax' }, // Slovenia
  ES: { rate: 0.21, name: 'VAT', description: 'Value Added Tax' }, // Spain
  SE: { rate: 0.25, name: 'VAT', description: 'Value Added Tax' }, // Sweden
  
  // UK (Post-Brexit)
  GB: { rate: 0.20, name: 'VAT', description: 'Value Added Tax' },
  
  // North America
  US: { rate: 0.00, name: 'Tax', description: 'No federal digital services tax' },
  CA: { rate: 0.13, name: 'HST', description: 'Harmonized Sales Tax' },
  
  // Asia Pacific
  AU: { rate: 0.10, name: 'GST', description: 'Goods and Services Tax' },
  NZ: { rate: 0.15, name: 'GST', description: 'Goods and Services Tax' },
  SG: { rate: 0.07, name: 'GST', description: 'Goods and Services Tax' },
  JP: { rate: 0.10, name: 'VAT', description: 'Consumption Tax' },
  KR: { rate: 0.10, name: 'VAT', description: 'Value Added Tax' },
  
  // Other regions
  CH: { rate: 0.077, name: 'VAT', description: 'Value Added Tax' }, // Switzerland
  NO: { rate: 0.25, name: 'VAT', description: 'Value Added Tax' }, // Norway
  IS: { rate: 0.24, name: 'VAT', description: 'Value Added Tax' }, // Iceland
  
  // Middle East & Africa
  AE: { rate: 0.05, name: 'VAT', description: 'Value Added Tax' }, // UAE
  SA: { rate: 0.15, name: 'VAT', description: 'Value Added Tax' }, // Saudi Arabia
  ZA: { rate: 0.15, name: 'VAT', description: 'Value Added Tax' }, // South Africa
  
  // Latin America
  BR: { rate: 0.17, name: 'ICMS', description: 'State Tax on Services' }, // Brazil
  MX: { rate: 0.16, name: 'IVA', description: 'Value Added Tax' }, // Mexico
  AR: { rate: 0.21, name: 'IVA', description: 'Value Added Tax' }, // Argentina
  
  // Default fallback
  DEFAULT: { rate: 0.00, name: 'Tax', description: 'No additional tax applicable' }
};

// Base pricing plans (in Rupees)
const BASE_PRICING = {
  starter: 2999,      // ₹2,999
  professional: 5999, // ₹5,999
  bronze: 1999,       // ₹1,999
  silver: 3999,       // ₹3,999
  gold: 7999,         // ₹7,999
  'per-post': 299     // ₹299
};

/**
 * Detect user location using IP-API (free service, no API key required)
 * Fallback to India if detection fails
 */
export async function detectUserLocation(): Promise<LocationData> {
  try {
    const response = await fetch('http://ip-api.com/json/?fields=country,countryCode,region,city,timezone', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Location detection failed');
    }

    const data = await response.json();
    
    return {
      country: data.country || 'India',
      countryCode: data.countryCode || 'IN',
      region: data.region || '',
      city: data.city || '',
      timezone: data.timezone || 'Asia/Kolkata'
    };
  } catch (error) {
    console.warn('Location detection failed, falling back to India:', error);
    // Fallback to India
    return {
      country: 'India',
      countryCode: 'IN',
      region: '',
      city: '',
      timezone: 'Asia/Kolkata'
    };
  }
}

/**
 * Get tax information for a specific country
 */
export function getTaxInfo(countryCode: string): TaxInfo {
  const normalizedCode = countryCode.toUpperCase();
  return TAX_RATES[normalizedCode] || TAX_RATES.DEFAULT;
}

/**
 * Calculate pricing with location-based tax
 */
export function calculatePricingWithLocation(planType: string, countryCode: string): PricingWithLocation {
  const normalizedPlan = planType.toLowerCase();
  const baseRupees = BASE_PRICING[normalizedPlan as keyof typeof BASE_PRICING] || 0;
  
  if (baseRupees === 0) {
    throw new Error(`Invalid plan type: ${planType}`);
  }

  const taxInfo = getTaxInfo(countryCode);
  const taxRupees = Math.round(baseRupees * taxInfo.rate);
  const totalRupees = baseRupees + taxRupees;

  return {
    baseRupees,
    taxRupees,
    totalRupees,
    basePaise: baseRupees * 100,
    taxPaise: taxRupees * 100,
    totalPaise: totalRupees * 100,
    taxRate: taxInfo.rate,
    taxName: taxInfo.name,
    countryCode: countryCode.toUpperCase()
  };
}

/**
 * Get user-friendly tax message for display
 */
export function getTaxMessage(countryCode: string): string {
  const taxInfo = getTaxInfo(countryCode);
  const normalizedCode = countryCode.toUpperCase();
  
  if (taxInfo.rate === 0) {
    return "No additional tax applies to your subscription.";
  }
  
  const percentage = Math.round(taxInfo.rate * 100);
  
  switch (normalizedCode) {
    case 'IN':
      return `${taxInfo.name} (${percentage}%) applies to your subscription as per India tax regulations for digital services.`;
    case 'US':
      return "No federal digital services tax applies to your subscription.";
    case 'CA':
      return `${taxInfo.name} (${percentage}%) applies to your subscription as per Canadian tax regulations.`;
    default:
      if (isEUCountry(normalizedCode)) {
        return `${taxInfo.name} (${percentage}%) applies to your subscription as per EU tax regulations for digital services.`;
      }
      return `${taxInfo.name} (${percentage}%) applies to your subscription as per local tax regulations.`;
  }
}

/**
 * Check if country is in EU
 */
function isEUCountry(countryCode: string): boolean {
  const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
  ];
  return euCountries.includes(countryCode.toUpperCase());
}

/**
 * Format currency amount in Rupees
 */
export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Format tax rate as percentage
 */
export function formatTaxRate(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

/**
 * Legacy function for backward compatibility with existing GST system
 */
export function calculateGSTBreakdown(amount: number) {
  const gstRate = 0.18;
  const baseAmount = Math.round(amount / (1 + gstRate));
  const gstAmount = amount - baseAmount;
  
  return {
    baseAmount,
    gstAmount,
    totalAmount: amount,
    gstRate
  };
}

/**
 * Format currency in Indian Rupees (for backward compatibility)
 */
export function formatIndianCurrency(amountInPaise: number): string {
  const rupees = amountInPaise / 100;
  return `₹${rupees.toLocaleString('en-IN')}`;
}