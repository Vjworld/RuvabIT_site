import express, { type Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

const app = express();

// Security-first middleware configuration
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: false, limit: '10mb' })); // Limit URL encoded payloads

// Security headers middleware
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Remove server signature
  res.removeHeader('X-Powered-By');
  
  // Strict Transport Security (HTTPS only in production)
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
});



app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Global error handlers to prevent application crashes
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    console.error('Stack:', error.stack);
    // Don't exit the process, just log the error
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit the process, just log the error
  });

  try {
    // Validate critical environment variables first
    const requiredEnvVars = ['DATABASE_URL', 'SESSION_SECRET'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      console.error("❌ Critical environment variables missing:", missingEnvVars.join(', '));
      console.error("Please set these in Replit Secrets or your .env file");
      process.exit(1);
    }

    // Validate SESSION_SECRET strength
    const sessionSecret = process.env.SESSION_SECRET;
    if (sessionSecret && sessionSecret.length < 32) {
      console.warn("⚠️  SESSION_SECRET should be at least 32 characters long for security");
    }
    
    // Check Razorpay configuration
    const isRazorpayConfigured = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;
    if (isRazorpayConfigured) {
      console.log("✅ Razorpay payment gateway initialized successfully");
    } else {
      console.warn("⚠️  Razorpay credentials not found - payment functionality will be disabled");
      const missingRazorpayVars = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'].filter(varName => !process.env[varName]);
      console.warn("📋 Missing variables:");
      missingRazorpayVars.forEach(varName => console.warn(`   - ${varName}`));
    }
    
    console.log("✅ Environment validation completed");

    // Initialize default data
    console.log("Initializing default data...");
    await storage.initializeDefaultData();
    console.log("Default data initialized successfully");
    
    // Register API routes first
    const server = await registerRoutes(app);

    // The QR Gen Tool proxy is already registered above, before Vite
    // This ensures it runs before Vite's catch-all route

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // Setup Vite AFTER all other routes so the catch-all route
    // doesn't interfere with our QR proxy or API routes
    if (app.get("env") === "development") {
      // Serve static files in development mode too (for ads.txt, robots.txt, etc.)
      const distPath = path.resolve(import.meta.dirname, "public");
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
      }
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Use PORT environment variable for Cloud Run compatibility with fallback to 5000
    // Cloud Run provides the PORT environment variable
    const port = parseInt(process.env.PORT || "5000", 10);
    const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "0.0.0.0";
    
    // Use the correct server.listen() format for Cloud Run deployment
    server.listen(port, host, (err?: Error) => {
      if (err) {
        console.error("❌ Server failed to start:", err.message);
        process.exit(1);
      }
      log(`✅ serving on ${host}:${port}`);
    });
  } catch (error) {
    console.error("❌ Server initialization failed:", error);
    process.exit(1);
  }
})();
