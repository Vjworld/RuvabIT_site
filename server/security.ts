import { Request, Response, NextFunction } from 'express';

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Control referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy (CSP)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://replit.com https://ep1.adtrafficquality.google",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: http:",
    "connect-src 'self' https://www.google-analytics.com https://api.razorpay.com https://ep1.adtrafficquality.google https://www.googletagmanager.com",
    "frame-src 'self' https://checkout.razorpay.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ');
  
  res.setHeader('Content-Security-Policy', csp);
  
  next();
};

// Rate limiting for sensitive endpoints
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (maxRequests: number = 5, windowMs: number = 60000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    const key = `${clientIp}-${req.path}`;
    const now = Date.now();
    
    // Clean up expired entries
    const cutoff = now - windowMs;
    const expiredKeys: string[] = [];
    rateLimitStore.forEach((v, k) => {
      if (v.resetTime < cutoff) {
        expiredKeys.push(k);
      }
    });
    expiredKeys.forEach(k => rateLimitStore.delete(k));
    
    const current = rateLimitStore.get(key);
    
    if (!current) {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      next();
    } else if (current.count >= maxRequests) {
      res.status(429).json({ 
        error: 'Too many requests',
        message: `Rate limit exceeded. Try again in ${Math.ceil((current.resetTime - now) / 1000)} seconds.`
      });
    } else {
      current.count++;
      next();
    }
  };
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: schemes
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password || password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

// PII data masking for logs
export const maskPII = (data: any): any => {
  if (!data || typeof data !== 'object') return data;
  
  const masked = { ...data };
  const piiFields = ['password', 'email', 'phone', 'ssn', 'credit_card', 'api_key', 'token'];
  
  for (const field of piiFields) {
    if (masked[field]) {
      if (field === 'email') {
        const email = masked[field];
        const [local, domain] = email.split('@');
        masked[field] = `${local.charAt(0)}***@${domain}`;
      } else if (field === 'phone') {
        const phone = masked[field];
        masked[field] = `***-***-${phone.slice(-4)}`;
      } else {
        masked[field] = '***MASKED***';
      }
    }
  }
  
  return masked;
};

// Environment variable validation
export const validateEnvironment = () => {
  const requiredVars = ['DATABASE_URL'];
  const optionalVars = [
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET', 
    'RAZORPAY_WEBHOOK_SECRET',
    'SENDGRID_API_KEY'
  ];
  
  const missing: string[] = [];
  const warnings: string[] = [];
  
  // Check required variables
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  // Check optional variables
  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      warnings.push(varName);
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  if (warnings.length > 0) {
    console.warn('⚠️  Optional environment variables not configured:');
    warnings.forEach(v => console.warn(`   - ${v}`));
  }
  
  console.log('✅ Environment validation completed');
};

// Database connection security
export const validateDatabaseUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'postgres:' || parsed.protocol === 'postgresql:';
  } catch {
    return false;
  }
};