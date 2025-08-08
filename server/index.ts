import express, { type Request, Response, NextFunction } from "express";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// QR Gen Tool custom proxy handler
app.get('/qr-gen-tool*', async (req, res) => {
  const targetPath = req.path.replace('/qr-gen-tool', '') || '/';
  const targetUrl = `https://qr-gentool-vjvaibhu.replit.app${targetPath}`;
  
  console.log(`Proxying ${req.method} ${req.path} to ${targetUrl}`);
  
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': req.headers.accept || 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': req.headers['accept-language'] || 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    
    if (!response.ok) {
      console.error(`Proxy error: ${response.status} ${response.statusText}`);
      return res.status(response.status).send(`Proxy error: ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type') || '';
    let content = await response.text();
    
    // For HTML responses, fix relative paths
    if (contentType.includes('text/html')) {
      content = content
        .replace(/href="\/([^"]*?)"/g, 'href="/qr-gen-tool/$1"')
        .replace(/src="\/([^"]*?)"/g, 'src="/qr-gen-tool/$1"')
        .replace(/<head>/i, '<head><base href="/qr-gen-tool/">')
        // Fix specific manifest and asset paths
        .replace('href="/qr-gen-tool/manifest.json"', 'href="/qr-gen-tool/manifest.json"')
        .replace(/href="\/qr-gen-tool\/qr-gen-tool\//g, 'href="/qr-gen-tool/');
    }
    
    // Set response headers
    res.set({
      'Content-Type': contentType,
      'Cache-Control': response.headers.get('cache-control') || 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    
    res.send(content);
  } catch (error) {
    console.error('Proxy request failed:', error);
    res.status(500).send('Proxy request failed: ' + (error as Error).message);
  }
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
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
