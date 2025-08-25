
export interface AppConfig {
  razorpay: {
    keyId: string;
    keySecret: string;
    webhookSecret?: string;
  };
  database: {
    url: string;
  };
  session: {
    secret: string;
  };
  email?: {
    sendgridApiKey: string;
    fromEmail: string;
    toEmail: string;
  };
}

export function getConfig(): AppConfig {
  const requiredEnvVars = [
    'DATABASE_URL',
    'SESSION_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    console.error('Please add these variables to Replit Secrets');
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Only require Razorpay credentials if both are provided
  if (process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_SECRET is required when RAZORPAY_KEY_ID is provided');
  }
  if (process.env.RAZORPAY_KEY_SECRET && !process.env.RAZORPAY_KEY_ID) {
    throw new Error('RAZORPAY_KEY_ID is required when RAZORPAY_KEY_SECRET is provided');
  }

  return {
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || '',
      keySecret: process.env.RAZORPAY_KEY_SECRET || '',
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
    },
    database: {
      url: process.env.DATABASE_URL!,
    },
    session: {
      secret: process.env.SESSION_SECRET!,
    },
    email: process.env.SENDGRID_API_KEY ? {
      sendgridApiKey: process.env.SENDGRID_API_KEY,
      fromEmail: process.env.EMAIL_FROM || 'noreply@ruvab.it.com',
      toEmail: process.env.EMAIL_TO || 'admin@ruvab.it.com',
    } : undefined,
  };
}

export function isRazorpayConfigured(): boolean {
  return !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export function isTestMode(): boolean {
  return process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test_') || false;
}
