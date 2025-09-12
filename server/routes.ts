import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from 'ws';
import { storage } from "./storage";
import { fetchTechnologyNews } from "./news-api-helper";
import { fetchNewsAPIaiData } from "./newsapi-ai-helper";
import { archiveNewsArticles } from "./news-archive-helper";
import { insertReferralPartnerSchema } from "@shared/schema";
import { insertUserSchema, insertBlogPostSchema, insertPageContentSchema, searchSchema, insertOrderSchema, insertUserSubscriptionSchema, insertSubscriptionPaymentSchema } from "@shared/schema";
import { calculatePricingWithLocation, getTaxInfo, getTaxMessage, formatRupees } from "@shared/pricing";
import bcrypt from "bcrypt";
import { z } from "zod";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import sgMail from '@sendgrid/mail';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { securityHeaders, rateLimiter, sanitizeInput, maskPII, validateEnvironment } from './security';
import path from 'path';

// Extend Express Request type for user session
declare module 'express-session' {
  interface SessionData {
    userId?: number;
    isAdmin?: boolean;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Legacy GST calculation helper function (kept for backward compatibility)
function calculateGST(baseAmount: number, gstRate: number = 18): { baseAmount: number, gstAmount: number, totalAmount: number } {
  const gstAmount = Math.round(baseAmount * (gstRate / 100));
  const totalAmount = baseAmount + gstAmount;
  
  return {
    baseAmount,
    gstAmount,
    totalAmount
  };
}

// Convert pricing amounts from rupees to paise for Razorpay
function convertToPaise(rupees: number): number {
  return rupees * 100;
}

// Session middleware
const PgSession = connectPgSimple(session);

// Initialize Razorpay (conditionally)
let razorpay: Razorpay | null = null;

const initializeRazorpay = () => {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
      razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      console.log('✅ Razorpay payment gateway initialized successfully');
      console.log(`🔑 Using Key ID: ${process.env.RAZORPAY_KEY_ID.slice(0, 15)}...`);
      return true;
    } catch (error) {
      console.error('❌ Error initializing Razorpay:', error);
      return false;
    }
  } else {
    console.log('⚠️  Razorpay credentials not found - payment functionality will be disabled');
    console.log('📋 Missing variables:');
    if (!process.env.RAZORPAY_KEY_ID) console.log('   - RAZORPAY_KEY_ID');
    if (!process.env.RAZORPAY_KEY_SECRET) console.log('   - RAZORPAY_KEY_SECRET');
    return false;
  }
};

// Initialize Razorpay
const razorpayInitialized = initializeRazorpay();

// Authentication middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = await storage.getUser(req.session.userId);
  if (!user?.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }

  req.user = user;
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate environment variables on startup
  validateEnvironment();

  // Apply security headers to all routes
  app.use(securityHeaders);

  // Create HTTP server
  const httpServer = createServer(app);

  // Setup WebSocket server for live chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store active chat sessions
  const chatSessions = new Map<string, { ws: WebSocket; sessionId: string; userId?: number }>();

  wss.on('connection', (ws: WebSocket, req) => {
    console.log('New WebSocket connection established');

    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    chatSessions.set(sessionId, { ws, sessionId });

    // Send connection confirmation
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'connection',
        sessionId: sessionId,
        message: 'Connected to support chat'
      }));
    }

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());

        if (message.type === 'message') {
          // Broadcast to support team (in production, this would route to actual agents)
          // For now, simulate intelligent auto-responses
          setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
              const response = generateSmartResponse(message.text);
              ws.send(JSON.stringify({
                type: 'message',
                id: Math.random().toString(36).substr(2, 9),
                text: response,
                sender: 'support',
                timestamp: new Date().toISOString()
              }));
            }
          }, 1500 + Math.random() * 2000); // Realistic response delay

          // Show typing indicator
          setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'typing',
                isTyping: true
              }));
            }
          }, 500);

          setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'typing',
                isTyping: false
              }));
            }
          }, 1400 + Math.random() * 2000);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      chatSessions.delete(sessionId);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      chatSessions.delete(sessionId);
    });
  });

  // Smart response generator for chat
  function generateSmartResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
      return "Great question about AI! 🚀 We specialize in AI implementation and machine learning solutions. Our services include predictive analytics, natural language processing, computer vision, and custom AI model development. We've helped businesses increase efficiency by up to 40% through intelligent automation. Would you like to know more about any specific AI solution?";
    } 

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') || lowerMessage.includes('budget')) {
      return "Thank you for your interest in our pricing! Our costs vary based on project scope, requirements, and customization needs. For accurate pricing and detailed quotes, I'd be happy to connect you with our sales and support team.\n\nPlease reach out to: support@ruvabit.com\n\nOur sales team will:\n• Understand your specific requirements\n• Provide detailed cost breakdown\n• Offer customized solutions within your budget\n• Schedule a free consultation\n\nWould you like me to help you with anything else about our services?";
    }

    if (lowerMessage.includes('software') || lowerMessage.includes('development') || lowerMessage.includes('app') || lowerMessage.includes('web')) {
      return "Excellent! 💻 We're experts in software development with 5+ years of experience. We build:\n\n• Web Applications (React, Node.js, Python)\n• Mobile Apps (React Native, Flutter)\n• Enterprise Solutions\n• E-commerce Platforms\n• Custom APIs and Integrations\n\nWe follow agile methodology and provide ongoing support. What type of software solution are you looking for?";
    }

    if (lowerMessage.includes('qr') || lowerMessage.includes('qr code')) {
      return "Our QR Code Generator is awesome! 📱 Visit https://qr-gen.ruvab.it.com - it's completely free and offers:\n\n• Custom QR codes for URLs, text, contacts\n• Bulk generation capabilities\n• High-resolution downloads\n• Professional design options\n\nIt's part of our suite of digital tools. Are you interested in our other business solutions too?";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('meeting') || lowerMessage.includes('consultation') || lowerMessage.includes('call')) {
      return "I'd love to arrange that! 📞 Here are your options:\n\n• Free 30-minute consultation call\n• Technical demo session\n• In-person meeting (if you're in our area)\n• Video conference at your convenience\n\nOur consultations are completely free with no obligations. What works best for your schedule? I can connect you with our senior consultant right away.";
    }

    if (lowerMessage.includes('team') || lowerMessage.includes('company') || lowerMessage.includes('about')) {
      return "Great question! 👥 Ruvab IT is a technology solutions company with a passionate team of developers, AI specialists, and business analysts. We've:\n\n• Completed 100+ successful projects\n• Served clients across 15+ industries\n• Maintained 98% client satisfaction rate\n• Specialized in cutting-edge technologies\n\nWe're based in India but serve clients globally. Our mission is to make advanced technology accessible to businesses of all sizes. What would you like to know about our expertise?";
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return "I'm here to help! 🤝 Let me know what specific challenge you're facing:\n\n• Technical questions about our services\n• Project scope and requirements discussion\n• Pricing and timeline information\n• Integration and implementation guidance\n\nOr if you prefer, I can connect you directly with one of our technical specialists. What area do you need assistance with?";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('appreciate')) {
      return "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know about our services? I'm here whenever you need assistance with AI solutions, software development, or any technology needs. Feel free to ask anything!";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Welcome to Ruvab IT support. I'm excited to help you explore our technology solutions! We specialize in AI implementation, custom software development, data analytics, and digital transformation. What brings you here today?";
    }

    // Default intelligent response
    return "Thank you for your message! 🤔 I want to make sure I give you the most helpful information. Could you tell me a bit more about what you're looking for? I can help with:\n\n• AI and Machine Learning solutions\n• Software Development projects\n• Data Analytics and Business Intelligence\n• Cloud Solutions and Digital Transformation\n\nWhat specific area interests you most?";
  }

  // Session configuration
  app.use(session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: false,
      tableName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // CSRF protection
    },
  }));

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      req.session.userId = user.id;
      req.session.isAdmin = user.isAdmin;

      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User registration route with security hardening
  app.post("/api/auth/register", rateLimiter(5, 300000), async (req, res) => {
    try {
      // Sanitize input data
      if (req.body.username) req.body.username = sanitizeInput(req.body.username);
      if (req.body.email) req.body.email = sanitizeInput(req.body.email);
      if (req.body.firstName) req.body.firstName = sanitizeInput(req.body.firstName);
      if (req.body.lastName) req.body.lastName = sanitizeInput(req.body.lastName);

      // Validate using Zod schema
      const result = insertUserSchema.safeParse({
        ...req.body,
        isAdmin: false, // Ensure non-admin registration
      });
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid registration data", 
          errors: result.error.errors.map(e => ({ 
            field: e.path.join('.'), 
            message: e.message 
          }))
        });
      }

      const user = await storage.createUser(result.data);

      // Auto-login after successful registration
      req.session.userId = user.id;
      req.session.isAdmin = user.isAdmin;

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error("Registration error:", maskPII(error));
      if (error instanceof Error && error.message === "Username or email already exists") {
        return res.status(409).json({ message: "Username or email already exists" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ success: true });
    });
  });

  // Service Worker route for monetization (fix MIME type issue)
  app.get('/sw.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Service-Worker-Allowed', '/');
    res.sendFile(path.resolve(process.cwd(), 'sw.js'));
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/change-password", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
      }

      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await storage.updateUserPassword(user.id, hashedNewPassword);

      res.json({ 
        success: true, 
        message: "Password updated successfully" 
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User management routes (admin only)
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      // Note: This would require a method to get all users
      res.json({ message: "Users endpoint - to be implemented" });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid user data", errors: result.error.errors });
      }

      const user = await storage.createUser(result.data);
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Blog routes (public)
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Blog management routes (admin only)
  app.get("/api/admin/blog/posts", requireAdmin, async (req, res) => {
    try {
      // Get all posts including unpublished ones
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Get admin blog posts error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/blog/posts", requireAdmin, async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse({
        ...req.body,
        authorId: req.session.userId,
      });

      if (!result.success) {
        return res.status(400).json({ message: "Invalid blog post data", errors: result.error.errors });
      }

      const post = await storage.createBlogPost(result.data);
      res.json(post);
    } catch (error) {
      console.error("Create blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/admin/blog/posts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await storage.updateBlogPost(id, req.body);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Update blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/admin/blog/posts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Delete blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // CMS/Page content routes (admin only)
  app.get("/api/admin/pages", requireAdmin, async (req, res) => {
    try {
      const pages = await storage.getAllPageContents();
      res.json(pages);
    } catch (error) {
      console.error("Get pages error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/pages/:pageKey", async (req, res) => {
    try {
      const page = await storage.getPageContent(req.params.pageKey);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      console.error("Get page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/pages", requireAdmin, async (req, res) => {
    try {
      const result = insertPageContentSchema.safeParse({
        ...req.body,
        updatedBy: req.session.userId,
      });

      if (!result.success) {
        return res.status(400).json({ message: "Invalid page data", errors: result.error.errors });
      }

      const page = await storage.createPageContent(result.data);
      res.json(page);
    } catch (error) {
      console.error("Create page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/admin/pages/:pageKey", requireAdmin, async (req, res) => {
    try {
      const page = await storage.updatePageContent(req.params.pageKey, {
        ...req.body,
        updatedBy: req.session.userId,
      });

      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      res.json(page);
    } catch (error) {
      console.error("Update page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Search routes
  app.get("/api/search", async (req, res) => {
    try {
      // Parse query parameters manually to handle number conversion
      const searchParams = {
        query: req.query.query as string,
        type: (req.query.type as string) || "all",
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        offset: req.query.offset ? parseInt(req.query.offset as string, 10) : 0,
      };

      const result = searchSchema.safeParse(searchParams);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid search parameters", errors: result.error.errors });
      }

      const results = await storage.searchContent(result.data);
      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Newsletter subscription routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Get user agent and IP for tracking
      const userAgent = req.get('User-Agent') || 'Unknown';
      const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';

      const lead = await storage.createNewsletterLead({
        email: email.toLowerCase().trim(),
        source: "website",
        userAgent,
        ipAddress,
        isActive: true,
      });

      res.json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        lead: {
          id: lead.id,
          email: lead.email,
          subscriptionDate: lead.subscriptionDate
        }
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Admin route to view newsletter leads
  app.get("/api/admin/newsletter/leads", requireAuth, async (req, res) => {
    try {
      const leads = await storage.getNewsletterLeads();
      res.json(leads);
    } catch (error) {
      console.error("Get newsletter leads error:", error);
      res.status(500).json({ message: "Failed to fetch newsletter leads" });
    }
  });

  // Payment routes
  app.post("/api/payment/create-order", async (req, res) => {
    try {
      // Check if Razorpay is properly configured
      if (!razorpay || !razorpayInitialized) {
        return res.status(503).json({ 
          error: "Payment service not available",
          message: "Razorpay is not configured. Please contact support.",
          debug: {
            razorpayExists: !!razorpay,
            initialized: razorpayInitialized,
            hasKeyId: !!process.env.RAZORPAY_KEY_ID,
            hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET
          }
        });
      }

      const { amount, serviceType, customerName, customerEmail, customerPhone, description } = req.body;

      if (!amount || !serviceType || !customerEmail) {
        return res.status(400).json({ error: "Amount, service type, and customer email are required" });
      }

      // Generate unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: orderId,
      });

      // Create order in database
      const order = await storage.createOrder({
        orderId,
        amount: amount * 100,
        currency: 'INR',
        status: 'created',
        customerName,
        customerEmail,
        customerPhone,
        serviceType,
        description,
        razorpayOrderId: razorpayOrder.id,
      });

      res.json({
        success: true,
        orderId: order.orderId,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
      });

    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/payment/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
        return res.status(400).json({ error: "Missing payment verification data" });
      }

      // Verify signature
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return res.status(500).json({ error: "Payment verification not configured" });
      }
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ error: "Invalid payment signature" });
      }

      // Check if Razorpay is available
      if (!razorpay) {
        return res.status(500).json({ error: "Payment gateway not configured" });
      }

      // Get payment details from Razorpay
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      // Update order status
      await storage.updateOrder(orderId, {
        status: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });

      // Create payment record
      const order = await storage.getOrder(orderId);
      if (order) {
        await storage.createPayment({
          orderId: order.id,
          razorpayPaymentId: razorpay_payment_id,
          amount: typeof payment.amount === 'string' ? parseInt(payment.amount) : payment.amount,
          currency: payment.currency,
          status: payment.status,
          method: payment.method,
          bank: payment.bank || null,
          walletType: payment.wallet || null,
          vpa: payment.vpa || null,
          fee: typeof payment.fee === 'string' ? parseInt(payment.fee) : (payment.fee || 0),
          tax: typeof payment.tax === 'string' ? parseInt(payment.tax) : (payment.tax || 0),
        });
      }

      res.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      });

    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  app.get("/api/payment/order/:orderId", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const payments = await storage.getPaymentsByOrderId(order.id);

      res.json({
        success: true,
        order: {
          ...order,
          payments,
        },
      });

    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Admin routes for orders
  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Get orders error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/orders/:orderId", requireAdmin, async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const payments = await storage.getPaymentsByOrderId(order.id);

      res.json({
        ...order,
        payments,
      });
    } catch (error) {
      console.error("Get order error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Razorpay webhook endpoint
  app.post("/api/payment/webhook", async (req, res) => {
    try {
      const webhookSignature = req.get('X-Razorpay-Signature');
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

      if (webhookSecret && webhookSignature) {
        const expectedSignature = crypto
          .createHmac('sha256', webhookSecret)
          .update(JSON.stringify(req.body))
          .digest('hex');

        if (expectedSignature !== webhookSignature) {
          return res.status(400).json({ error: "Invalid webhook signature" });
        }
      }

      const event = req.body.event;
      const paymentEntity = req.body.payload.payment.entity;

      if (event === 'payment.captured') {
        // Update order status if not already updated
        const payment = await storage.getPaymentByRazorpayId(paymentEntity.id);
        if (payment) {
          const order = await storage.getOrderById(payment.orderId);
          if (order && order.status !== 'paid') {
            await storage.updateOrder(order.orderId, { status: 'paid' });
          }
        }
      } else if (event === 'payment.failed') {
        // Handle failed payment
        const payment = await storage.getPaymentByRazorpayId(paymentEntity.id);
        if (payment) {
          const order = await storage.getOrderById(payment.orderId);
          if (order) {
            await storage.updateOrder(order.orderId, { status: 'failed' });
          }
        }
      }

      res.json({ success: true });

    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, subject, message } = req.body;

      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Please provide a valid email address" });
      }

      // Check if SendGrid is configured
      if (!process.env.SENDGRID_API_KEY) {
        console.log("Contact form submission:", { name, email, company, subject, message });
        console.warn("SendGrid API key not configured. Contact form data logged only.");
        return res.json({ 
          success: true, 
          message: "Thank you for your message. We'll get back to you within 24 hours." 
        });
      }

      // Configure SendGrid
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      // Email content
      const emailContent = `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not specified'}</p>
        <p><strong>Subject:</strong> ${subject || 'Contact Form Submission'}</p>

        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>

        <p><em>Submitted at: ${new Date().toISOString()}</em></p>
      `;

      // Send email
      const msg = {
        to: process.env.EMAIL_TO || 'admin@ruvab.it.com',
        from: process.env.EMAIL_FROM || 'noreply@ruvab.it.com',
        subject: `Contact Form: ${subject || 'New Inquiry'}`,
        html: emailContent,
        replyTo: email,
      };

      await sgMail.send(msg);

      res.json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you within 24 hours." 
      });

    } catch (error) {
      console.error('SendGrid error:', error);

      // Log the contact data even if email fails
      console.log("Contact form submission (email failed):", req.body);

      res.json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you within 24 hours." 
      });
    }
  });

  // Technology News API endpoint (Multi-source: NewsNow + NewsAPI.ai)
  app.get("/api/technology-news", async (req: Request, res: Response) => {
    try {
      const CACHE_KEY = 'technology_news';
      const CACHE_HOURS = 12;

      // Set response timeout
      req.setTimeout(8000, () => {
        res.status(408).json({ error: 'Request timeout', message: 'The request to fetch technology news timed out. Please try again later.' });
      });

      // First, check if we have valid cached data
      const isValid = await storage.isNewsCacheValid(CACHE_KEY);

      if (isValid) {
        console.log("✅ Serving cached technology news (fresh within 12 hours)");
        const cachedData = await storage.getNewsCache(CACHE_KEY);
        if (cachedData) {
          return res.json({
            articles: cachedData.articles,
            cached: true,
            fetchedAt: cachedData.fetchedAt,
            expiresAt: cachedData.expiresAt,
            sourceInfo: cachedData.sourceInfo,
            message: "Serving cached articles to optimize API usage"
          });
        }
      }

      console.log("🔄 Cache expired or not found, fetching fresh technology news...");

      // Check and perform monthly cleanup if needed
      try {
        await storage.checkAndPerformCleanup();
      } catch (cleanupError) {
        console.error("Cleanup check failed:", cleanupError);
      }

      const rapidApiKey = process.env.RAPIDAPI_KEY;
      const rapidApiHost = process.env.RAPIDAPI_HOST;
      const newsApiAiKey = process.env.NEWSAPI_AI_KEY;

      console.log("RapidAPI key present:", !!rapidApiKey);
      console.log("RapidAPI host:", rapidApiHost);
      console.log("NewsAPI.ai key present:", !!newsApiAiKey);

      let allArticles: any[] = [];
      let sources: string[] = [];

      // Fetch from NewsNow (RapidAPI) if available
      if (rapidApiKey && rapidApiHost) {
        try {
          const result = await fetchTechnologyNews(rapidApiKey, rapidApiHost);

          if (result.success) {
            // Process NewsNow data
            const data = result.data;
            console.log("Processing NewsNow data...");

            // Handle NewsNow API specific format (indexed object with strings)
            const dataKeys = Object.keys(data);
            const isNewsNowFormat = dataKeys.length > 0 && dataKeys.every(key => !isNaN(parseInt(key)));

            if (isNewsNowFormat) {
              let processedData = data;
              if (typeof data === 'string') {
                try {
                  processedData = JSON.parse(data);
                } catch (e) {
                  const textParts = data.split(/[,\n\r]+/).filter(part => part.trim().length > 0);
                  processedData = textParts.reduce((acc, part, index) => {
                    acc[index] = part.trim();
                    return acc;
                  }, {} as Record<string, string>);
                }
              }

              const rawTexts = Object.values(processedData) as string[];
              const articles = rawTexts
                .filter(text => typeof text === 'string' && text.trim().length > 3)
                .slice(0, 10) // Limit NewsNow to 10 articles
          .map((text, index) => {
            // Clean and process the text
            const cleanText = text.replace(/[^\w\s\-\.]/g, ' ').replace(/\s+/g, ' ').trim();
            const words = cleanText.split(' ').filter(word => word.length > 1);

            // Generate meaningful title and description
            const titleWords = words.slice(0, 6);
            const descWords = words.slice(6, 18);

            const title = titleWords.length > 0 ? 
              titleWords.join(' ').replace(/\b\w/g, l => l.toUpperCase()) : 
              `Technology Update ${index + 1}`;

            const description = descWords.length > 0 ? 
              descWords.join(' ') + '...' : 
              'Latest technology news and updates from the industry.';

            // Generate meaningful summary points based on keywords
            const generateSummary = (text: string, title: string) => {
              const keyWords = words.filter(word => word.length > 3);
              const summaryPoints = [];

              if (keyWords.includes('yahoo') || keyWords.includes('finance')) {
                summaryPoints.push('Yahoo Finance reports on latest market developments');
              }
              if (keyWords.includes('job') || keyWords.includes('jobs')) {
                summaryPoints.push('New employment opportunities in technology sector');
              }
              if (keyWords.includes('tech') || keyWords.includes('technology')) {
                summaryPoints.push('Technology industry continues rapid innovation');
              }
              if (keyWords.includes('news') || keyWords.includes('update')) {
                summaryPoints.push('Breaking news affecting technology markets');
              }

              // Add generic tech points if we have fewer than 4
              const genericPoints = [
                'Industry analysts predict continued growth',
                'Market trends show positive technology adoption',
                'Enterprise solutions driving digital transformation',
                'Investment opportunities emerging in tech sector'
              ];

              while (summaryPoints.length < 4 && genericPoints.length > 0) {
                summaryPoints.push(genericPoints.shift()!);
              }

              return summaryPoints.slice(0, 5);
            };

            // Generate a relevant image URL based on content
            const getImageUrl = (keywords: string[]) => {
              if (keywords.includes('finance') || keywords.includes('yahoo')) {
                return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop&q=80';
              }
              if (keywords.includes('job') || keywords.includes('jobs')) {
                return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&q=80';
              }
              // Default tech image
              return 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&q=80';
            };

            return {
              id: `newsNow_${index}`,
              title: title,
              description: description,
              content: cleanText,
              summary: generateSummary(cleanText, title),
              url: `https://www.newsnow.co.uk/h/Technology`, // Use main technology section
              urlToImage: getImageUrl(words),
              publishedAt: new Date(Date.now() - index * 3600000).toISOString(), // Stagger timestamps
              source: {
                id: 'newsnow',
                name: 'NewsNow'
              },
              author: 'NewsNow API'
            };
          });


              allArticles.push(...articles);
              sources.push('NewsNow');
              console.log(`Added ${articles.length} articles from NewsNow`);
            }
          } else {
            console.log("NewsNow fetch failed:", result.error);
          }
        } catch (error) {
          console.error("NewsNow error:", error);
        }
      }

      // Fetch from NewsAPI.ai if available
      if (newsApiAiKey) {
        try {
          const aiResult = await fetchNewsAPIaiData(newsApiAiKey);

          if (aiResult.success && aiResult.articles) {
            allArticles.push(...aiResult.articles.slice(0, 10)); // Limit to 10 articles
            sources.push('NewsAPI.ai');
            console.log(`Added ${aiResult.articles.length} articles from NewsAPI.ai`);
          } else {
            console.log("NewsAPI.ai fetch failed:", aiResult.error);
          }
        } catch (error) {
          console.error("NewsAPI.ai error:", error);
        }
      }

      // If no fresh articles available, try to serve from archive
      if (allArticles.length === 0) {
        console.log("⚠️ No fresh articles available, attempting to serve from archive...");
        try {
          const archiveArticles = await storage.getRecentArchiveArticles(20);
          if (archiveArticles && archiveArticles.length > 0) {
            console.log(`📚 Serving ${archiveArticles.length} articles from archive database`);
            return res.json({
              articles: archiveArticles,
              cached: false,
              fromArchive: true,
              message: "Serving recent articles from archive due to API unavailability",
              archiveInfo: {
                count: archiveArticles.length,
                source: "news_archive",
                note: "Recent archived content displayed during API downtime"
              }
            });
          }
        } catch (archiveError) {
          console.error("Failed to retrieve archive articles:", archiveError);
        }

        // If no archive articles available either, return informative error
        if (!rapidApiKey && !newsApiAiKey) {
          return res.status(503).json({
            error: "News service temporarily unavailable",
            details: "Both live news sources and archive are currently inaccessible",
            userMessage: "We're experiencing technical difficulties. Please try again in a few minutes.",
            technicalInfo: "No news sources configured and archive unavailable",
            setup: "Add RAPIDAPI_KEY + RAPIDAPI_HOST or NEWSAPI_AI_KEY to environment variables"
          });
        } else {
          return res.status(503).json({
            error: "News service temporarily unavailable", 
            details: "News APIs are currently rate-limited or experiencing issues",
            userMessage: "We're experiencing high traffic. Our news service will be back shortly.",
            retryAfter: "Please try again in 15-30 minutes",
            technicalInfo: "API rate limits exceeded, archive fallback attempted"
          });
        }
      }

      // STRICT technology filtering for 24/7/365 content accuracy
      const technologyKeywords = [
        // Core AI & Computing
        'artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning', 'neural network',
        'computer science', 'algorithm', 'data structure', 'programming', 'coding', 'software',
        'development', 'developer', 'tech', 'technology', 'digital transformation', 'innovation',

        // Cybersecurity (Priority Focus)
        'cybersecurity', 'cyber security', 'security', 'hacking', 'privacy', 'encryption',
        'malware', 'ransomware', 'firewall', 'vulnerability', 'data breach', 'phishing',

        // Blockchain & Web3
        'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'crypto', 'defi', 'nft',
        'smart contract', 'web3', 'metaverse', 'decentralized',

        // Cloud & DevOps
        'cloud computing', 'aws', 'azure', 'google cloud', 'saas', 'paas', 'iaas',
        'serverless', 'microservices', 'kubernetes', 'docker', 'devops', 'containerization',

        // Programming & Development
        'javascript', 'python', 'react', 'typescript', 'node.js', 'java', 'c++',
        'web development', 'frontend', 'backend', 'full stack', 'api', 'framework',
        'open source', 'github', 'git', 'version control',

        // Data & Analytics
        'data science', 'big data', 'analytics', 'database', 'sql', 'nosql',
        'business intelligence', 'data mining', 'predictive analytics', 'data visualization',

        // Emerging Tech
        'iot', 'internet of things', 'edge computing', 'robotics', 'automation',
        'virtual reality', 'vr', 'augmented reality', 'ar', 'mixed reality',
        '5g', '6g', 'quantum computing', 'quantum', 'semiconductor',

        // Hardware & Infrastructure
        'processor', 'gpu', 'cpu', 'chip', 'hardware', 'server', 'datacenter',
        'computer', 'mobile', 'smartphone', 'tablet', 'wearable', 'tech device',

        // Major Tech Companies (Context Indicators)
        'microsoft', 'google', 'apple', 'meta', 'amazon', 'nvidia', 'intel', 'ibm',
        'openai', 'anthropic', 'tesla', 'spacex', 'uber', 'netflix'
      ];

      const filteredTechArticles = allArticles.filter(article => {
        const searchText = `${article.title} ${article.description || ''} ${article.content || ''}`.toLowerCase();

        // Check if article contains technology-related keywords
        const containsTechKeywords = technologyKeywords.some(keyword => 
          searchText.includes(keyword.toLowerCase())
        );

        // STRICT EXCLUSION - Non-technology content (24/7/365 enforcement)
        const excludeKeywords = [
          // Sports & Entertainment
          'sports', 'football', 'basketball', 'soccer', 'tennis', 'baseball', 'olympics',
          'entertainment', 'celebrity', 'music', 'movie', 'film', 'hollywood', 'actor', 'actress',
          'gaming tournament', 'esports final', 'sports event', 'concert', 'festival',

          // Politics & Government
          'politics', 'political', 'election', 'government', 'congress', 'senate', 'president',
          'policy', 'law', 'legislation', 'voting', 'campaign', 'democrat', 'republican',

          // Health & Medical
          'health', 'healthcare', 'medical', 'medicine', 'hospital', 'disease', 'virus',
          'pharmacy', 'drug', 'treatment', 'doctor', 'patient', 'clinical trial',

          // Lifestyle & Consumer
          'weather', 'climate news', 'restaurant', 'food', 'cooking', 'recipe', 'diet',
          'fashion', 'beauty', 'makeup', 'lifestyle', 'travel', 'tourism', 'hotel',
          'real estate', 'property', 'housing market', 'home buying',

          // Finance (Non-Tech)
          'stock market', 'wall street', 'trading', 'investment banking', 'mortgage',
          'insurance', 'pension', 'retirement', 'personal finance'
        ];

        const containsExcludedKeywords = excludeKeywords.some(keyword => 
          searchText.includes(keyword.toLowerCase())
        );

        return containsTechKeywords && !containsExcludedKeywords;
      });

      // Sort articles by date (newest first) and limit total
      filteredTechArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      const limitedArticles = filteredTechArticles.slice(0, 20);

      console.log(`🔍 STRICT Technology filtering applied: ${allArticles.length} → ${filteredTechArticles.length} tech articles`);
      console.log(`📰 Final TECHNOLOGY-ONLY articles from ${sources.join(', ')}: ${limitedArticles.length}`);

      // Cache the fresh data for 12 hours
      if (limitedArticles.length > 0) {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + (CACHE_HOURS * 60 * 60 * 1000)); // 12 hours from now

        const sourceInfo = {
          sources: sources,
          totalSources: sources.length,
          articlesCount: limitedArticles.length,
          fetchedSources: sources.join(', ')
        };

        try {
          await storage.setNewsCache({
            cacheKey: CACHE_KEY,
            articles: limitedArticles,
            expiresAt: expiresAt,
            sourceInfo: sourceInfo,
            articleCount: limitedArticles.length
          });
          console.log(`💾 Cached ${limitedArticles.length} articles, expires at ${expiresAt.toLocaleString()}`);
        } catch (cacheError) {
          console.error("Failed to cache articles:", cacheError);
        }

        // Archive all fetched articles for admin backup/contingency
        try {
          console.log("📚 Starting news archive process for admin backup...");
          const archivePromises = [];

          // Archive NewsNow articles
          const newsNowArticles = limitedArticles.filter(article => 
            article.id.startsWith('newsNow_') || article.source?.name === 'NewsNow'
          );
          if (newsNowArticles.length > 0) {
            archivePromises.push(
              archiveNewsArticles(newsNowArticles, 'newsnow', { sources: ['NewsNow'], timestamp: new Date() })
            );
          }

          // Archive NewsAPI.ai articles
          const newsApiArticles = limitedArticles.filter(article => 
            article.id.startsWith('eventregistry_') || article.source?.name?.includes('Event Registry')
          );
          if (newsApiArticles.length > 0) {
            archivePromises.push(
              archiveNewsArticles(newsApiArticles, 'newsapi_ai', { sources: ['NewsAPI.ai'], timestamp: new Date() })
            );
          }

          // Execute archive operations in parallel
          const archiveResults = await Promise.all(archivePromises);
          const totalArchived = archiveResults.reduce((sum, result) => sum + result.archived, 0);
          const totalSkipped = archiveResults.reduce((sum, result) => sum + result.skipped, 0);

          console.log(`📊 Archive complete: ${totalArchived} new articles archived, ${totalSkipped} duplicates skipped`);
        } catch (archiveError) {
          console.error("⚠️  Failed to archive articles (non-critical):", archiveError);
          // Archive failure is non-critical - don't break the main flow
        }

        // Clear any expired cache entries (cleanup)
        try {
          await storage.clearExpiredNewsCache();
        } catch (cleanupError) {
          console.error("Failed to cleanup expired cache:", cleanupError);
        }
      }

      res.json({ 
        articles: limitedArticles,
        sources: sources,
        totalSources: sources.length,
        cached: false,
        fetchedAt: new Date(),
        message: "Fresh articles fetched and cached for 12 hours"
      });
    } catch (error) {
      console.error("RapidAPI error:", error);
      res.status(500).json({ 
        error: "Failed to fetch technology news",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // News Archive API Routes (Admin Only)
  // Get archived articles with pagination and filtering
  app.get("/api/admin/news-archive", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { 
        page = 1, 
        limit = 50, 
        provider, 
        category, 
        dateFrom, 
        dateTo,
        search 
      } = req.query;

      const offset = (Number(page) - 1) * Number(limit);
      const options = {
        limit: Number(limit),
        offset: offset,
        apiProvider: provider as string,
      };

      const articles = await storage.getArchivedArticles(options);

      // Apply additional filters if needed
      let filteredArticles = articles;

      if (category) {
        filteredArticles = filteredArticles.filter(article => 
          article.category === category
        );
      }

      if (dateFrom || dateTo) {
        filteredArticles = filteredArticles.filter(article => {
          const articleDate = new Date(article.archivedAt);
          const fromDate = dateFrom ? new Date(dateFrom as string) : null;
          const toDate = dateTo ? new Date(dateTo as string) : null;

          if (fromDate && articleDate < fromDate) return false;
          if (toDate && articleDate > toDate) return false;
          return true;
        });
      }

      if (search) {
        const searchTerm = (search as string).toLowerCase();
        filteredArticles = filteredArticles.filter(article =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.description?.toLowerCase().includes(searchTerm) ||
          article.sourceName.toLowerCase().includes(searchTerm)
        );
      }

      res.json({
        articles: filteredArticles,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: filteredArticles.length,
          hasMore: filteredArticles.length === Number(limit)
        },
        filters: {
          provider,
          category,
          dateFrom,
          dateTo,
          search
        }
      });
    } catch (error) {
      console.error("Error fetching archived articles:", error);
      res.status(500).json({ error: "Failed to fetch archived articles" });
    }
  });

  // Get archive statistics and overview (Admin Only)
  app.get("/api/admin/news-archive/stats", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const stats = await storage.getArchiveStatistics();
      const sourceStats = await storage.getSourceStats();

      // Get recent archive activity
      const recentArticles = await storage.getArchivedArticles({ limit: 10 });

      res.json({
        overview: stats,
        sources: sourceStats,
        recentActivity: recentArticles.map(article => ({
          id: article.id,
          title: article.title,
          source: article.sourceName,
          provider: article.apiProvider,
          archivedAt: article.archivedAt,
          qualityScore: article.qualityScore
        }))
      });
    } catch (error) {
      console.error("Error fetching archive statistics:", error);
      res.status(500).json({ error: "Failed to fetch archive statistics" });
    }
  });

  // Export archived articles (Admin Only) - CSV format
  app.get("/api/admin/news-archive/export", requireAuth, requireAdmin, async (req: Request, res: Response) => {
    try {
      const { provider, dateFrom, dateTo } = req.query;

      const articles = await storage.getArchivedArticles({
        limit: 10000, // Large limit for export
        apiProvider: provider as string,
      });

      // Apply date filtering
      let filteredArticles = articles;
      if (dateFrom || dateTo) {
        filteredArticles = articles.filter(article => {
          const articleDate = new Date(article.archivedAt);
          const fromDate = dateFrom ? new Date(dateFrom as string) : null;
          const toDate = dateTo ? new Date(dateTo as string) : null;

          if (fromDate && articleDate < fromDate) return false;
          if (toDate && articleDate > toDate) return false;
          return true;
        });
      }

      // Create CSV content
      const csvHeader = 'ID,Title,Source,Provider,URL,Published Date,Archived Date,Quality Score,Category,Tags\n';
      const csvRows = filteredArticles.map(article => {
        const title = `"${article.title.replace(/"/g, '""')}"`;
        const source = `"${article.sourceName.replace(/"/g, '""')}"`;
        const url = `"${article.url}"`;
        const publishedDate = article.publishedAt ? article.publishedAt.toISOString() : '';
        const archivedDate = article.archivedAt.toISOString();
        const tags = `"${(article.tags || []).join(', ')}"`;

        return `${article.id},${title},${source},${article.apiProvider},${url},${publishedDate},${archivedDate},${article.qualityScore || 0},${article.category || ''},${tags}`;
      }).join('\n');

      const csvContent = csvHeader + csvRows;

      // Set CSV headers
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="news-archive-${new Date().toISOString().split('T')[0]}.csv"`);

      res.send(csvContent);
    } catch (error) {
      console.error("Error exporting archived articles:", error);
      res.status(500).json({ error: "Failed to export archived articles" });
    }
  });

  // Referral Partners API Routes
  // Get all active referral partners (public)
  app.get("/api/referral-partners", async (req: Request, res: Response) => {
    try {
      const partners = await storage.getReferralPartners();
      const activePartners = partners.filter(partner => partner.isActive);
      res.json(activePartners);
    } catch (error) {
      console.error("Error fetching referral partners:", error);
      res.status(500).json({ error: "Failed to fetch referral partners" });
    }
  });

  // Get single referral partner (public)
  app.get("/api/referral-partners/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const partner = await storage.getReferralPartner(id);

      if (!partner) {
        return res.status(404).json({ error: "Referral partner not found" });
      }

      res.json(partner);
    } catch (error) {
      console.error("Error fetching referral partner:", error);
      res.status(500).json({ error: "Failed to fetch referral partner" });
    }
  });

  // Admin routes for referral partners management
  // Get all referral partners (admin only)
  app.get("/api/admin/referral-partners", requireAuth, async (req: Request, res: Response) => {
    try {
      const partners = await storage.getReferralPartners();
      res.json(partners);
    } catch (error) {
      console.error("Error fetching referral partners:", error);
      res.status(500).json({ error: "Failed to fetch referral partners" });
    }
  });

  // Create new referral partner (admin only)
  app.post("/api/admin/referral-partners", requireAuth, async (req: Request, res: Response) => {
    try {
      const validationResult = insertReferralPartnerSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.issues 
        });
      }

      const partner = await storage.createReferralPartner(validationResult.data);
      res.status(201).json(partner);
    } catch (error) {
      console.error("Error creating referral partner:", error);
      res.status(500).json({ error: "Failed to create referral partner" });
    }
  });

  // Update referral partner (admin only)
  app.put("/api/admin/referral-partners/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validationResult = insertReferralPartnerSchema.partial().safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.issues 
        });
      }

      const partner = await storage.updateReferralPartner(id, validationResult.data);

      if (!partner) {
        return res.status(404).json({ error: "Referral partner not found" });
      }

      res.json(partner);
    } catch (error) {
      console.error("Error updating referral partner:", error);
      res.status(500).json({ error: "Failed to update referral partner" });
    }
  });

  // Delete referral partner (admin only)
  app.delete("/api/admin/referral-partners/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteReferralPartner(id);

      if (!success) {
        return res.status(404).json({ error: "Referral partner not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting referral partner:", error);
      res.status(500).json({ error: "Failed to delete referral partner" });
    }
  });

  // Subscription API routes
  
  // Validation schemas for subscription routes
  const createSubscriptionSchema = z.object({
    planId: z.number().int().positive("Plan ID must be a positive integer"),
    countryCode: z.string().length(2, "Country code must be exactly 2 characters").optional().default("IN")
  });

  const subscriptionPaymentCreateSchema = z.object({
    subscriptionId: z.number().int().positive("Subscription ID must be a positive integer")
  });

  const subscriptionPaymentVerifySchema = z.object({
    razorpay_order_id: z.string().min(1, "Razorpay order ID is required"),
    razorpay_payment_id: z.string().min(1, "Razorpay payment ID is required"),
    razorpay_signature: z.string().min(1, "Razorpay signature is required"),
    orderId: z.string().min(1, "Order ID is required"),
    subscriptionId: z.number().int().positive("Subscription ID must be a positive integer")
  });
  
  // Get all subscription plans
  app.get("/api/subscriptions/plans", async (req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ error: "Failed to fetch subscription plans" });
    }
  });

  // Get specific subscription plan
  app.get("/api/subscriptions/plans/:id", async (req, res) => {
    try {
      const planId = parseInt(req.params.id);
      const plan = await storage.getSubscriptionPlan(planId);
      
      if (!plan) {
        return res.status(404).json({ error: "Subscription plan not found" });
      }
      
      res.json(plan);
    } catch (error) {
      console.error("Error fetching subscription plan:", error);
      res.status(500).json({ error: "Failed to fetch subscription plan" });
    }
  });

  // Create subscription (requires authentication)
  app.post("/api/subscriptions/create", requireAuth, async (req, res) => {
    try {
      const userId = req.session!.userId!;

      // Validate request body using Zod schema
      const validation = createSubscriptionSchema.safeParse({
        planId: parseInt(req.body.planId),
        countryCode: req.body.countryCode || 'IN'
      });

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: validation.error.errors.map(err => err.message)
        });
      }

      const { planId: numericPlanId, countryCode } = validation.data;

      // Check if plan exists and get server-side pricing
      const plan = await storage.getSubscriptionPlan(numericPlanId);
      if (!plan || !plan.isActive) {
        return res.status(404).json({ error: "Subscription plan not found or inactive" });
      }

      // Map plan types to pricing calculation names
      const planTypeMapping: Record<string, string> = {
        'monthly': 'starter',
        'yearly': 'professional', 
        'enterprise': 'gold',
        'basic': 'bronze',
        'premium': 'silver',
        'per_post': 'per-post'
      };
      
      // Get the correct plan name for pricing calculation
      const planName = planTypeMapping[plan.planType] || 'starter';
      
      // SECURITY FIX: Server derives price from plan data with location-based tax calculation
      const locationPricing = calculatePricingWithLocation(planName, countryCode);
      const taxInfo = getTaxInfo(countryCode);
      
      // Convert rupees to paise for database storage (maintain existing format)
      const basePricePaise = locationPricing.basePaise;
      const taxPaise = locationPricing.taxPaise; 
      const totalPricePaise = locationPricing.totalPaise;

      // Check if user already has an active subscription
      const existingSubscription = await storage.getUserActiveSubscription(userId);
      if (existingSubscription) {
        return res.status(400).json({ error: "User already has an active subscription" });
      }

      // Calculate next billing date based on plan type
      const nextBillingDate = plan.billingInterval === 'monthly' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : null;

      // Create subscription with location-based tax data
      const subscription = await storage.createUserSubscription({
        userId,
        planId: numericPlanId,
        status: 'pending',
        agreedPrice: basePricePaise, // Base price before tax - prevents tampering
        totalPrice: totalPricePaise, // Total price including location-based tax
        gstAmount: taxPaise, // Tax amount (keeping field name for DB compatibility)
        currency: 'INR',
        billingInterval: plan.billingInterval,
        nextBillingDate,
        metadata: { 
          createdVia: 'web', 
          planName: plan.name,
          countryCode: countryCode,
          taxType: taxInfo.name,
          taxRate: taxInfo.rate,
          taxDescription: taxInfo.description
        }
      });

      res.status(201).json({
        success: true,
        subscription: {
          id: subscription.id,
          planId: subscription.planId,
          status: subscription.status,
          agreedPrice: subscription.agreedPrice,
          totalPrice: subscription.totalPrice,
          gstAmount: subscription.gstAmount,
          currency: subscription.currency,
          billingInterval: subscription.billingInterval,
          nextBillingDate: subscription.nextBillingDate
        },
        taxBreakdown: {
          baseAmount: basePricePaise,
          taxAmount: taxPaise,
          totalAmount: totalPricePaise,
          taxRate: taxInfo.rate,
          taxType: taxInfo.name,
          countryCode: countryCode,
          note: getTaxMessage(countryCode)
        },
        plan: {
          name: plan.name,
          description: plan.description,
          priceMin: plan.priceMin,
          priceMax: plan.priceMax
        },
        message: "Subscription created successfully"
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ error: "Failed to create subscription" });
    }
  });

  // Create subscription payment order
  app.post("/api/subscriptions/payment/create", requireAuth, async (req, res) => {
    try {
      if (!razorpay || !razorpayInitialized) {
        return res.status(503).json({ 
          error: "Payment service not available",
          message: "Razorpay is not configured. Please contact support."
        });
      }

      const userId = req.session!.userId!;

      // Validate request body using Zod schema
      const validation = subscriptionPaymentCreateSchema.safeParse({
        subscriptionId: parseInt(req.body.subscriptionId)
      });

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: validation.error.errors.map(err => err.message)
        });
      }

      const { subscriptionId } = validation.data;

      // Get subscription and verify ownership
      const subscription = await storage.getUserSubscription(subscriptionId);
      if (!subscription || subscription.userId !== userId) {
        return res.status(404).json({ error: "Subscription not found" });
      }

      // Get plan details
      const plan = await storage.getSubscriptionPlan(subscription.planId);
      if (!plan) {
        return res.status(404).json({ error: "Subscription plan not found" });
      }

      // Generate unique order ID
      const orderId = `SUB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create Razorpay order using total price including GST
      const razorpayOrder = await razorpay.orders.create({
        amount: subscription.totalPrice, // Total amount including GST in paise
        currency: 'INR',
        receipt: orderId,
        notes: {
          subscriptionId: subscription.id.toString(),
          userId: userId.toString(),
          planName: plan.name,
          baseAmount: subscription.agreedPrice.toString(),
          taxAmount: subscription.gstAmount.toString(), // Using gstAmount field for tax (database compatibility)
          totalAmount: subscription.totalPrice.toString(),
          countryCode: (subscription.metadata && typeof subscription.metadata === 'object' && 'countryCode' in subscription.metadata) ? String(subscription.metadata.countryCode) : 'IN',
          taxType: (subscription.metadata && typeof subscription.metadata === 'object' && 'taxType' in subscription.metadata) ? String(subscription.metadata.taxType) : 'Tax'
        }
      });

      // Create order in database with total amount including GST
      const order = await storage.createOrder({
        orderId,
        amount: subscription.totalPrice, // Store total amount including GST
        currency: 'INR',
        status: 'created',
        customerEmail: '', // Will be filled from user data
        serviceType: `subscription_${plan.planType}`,
        description: `Subscription to ${plan.name} plan (₹${subscription.agreedPrice/100} + ₹${subscription.gstAmount/100} ${(subscription.metadata && typeof subscription.metadata === 'object' && 'taxType' in subscription.metadata) ? String(subscription.metadata.taxType) : 'Tax'})`,
        razorpayOrderId: razorpayOrder.id,
      });

      res.json({
        success: true,
        orderId: order.orderId,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
        subscription: {
          id: subscription.id,
          planName: plan.name,
          amount: subscription.agreedPrice
        }
      });

    } catch (error) {
      console.error('Create subscription payment error:', error);
      res.status(500).json({ error: "Failed to create subscription payment" });
    }
  });

  // Verify subscription payment
  app.post("/api/subscriptions/payment/verify", requireAuth, async (req, res) => {
    try {
      const userId = req.session!.userId!;

      // Validate request body using Zod schema
      const validation = subscriptionPaymentVerifySchema.safeParse({
        razorpay_order_id: req.body.razorpay_order_id,
        razorpay_payment_id: req.body.razorpay_payment_id,
        razorpay_signature: req.body.razorpay_signature,
        orderId: req.body.orderId,
        subscriptionId: parseInt(req.body.subscriptionId)
      });

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid payment verification data",
          details: validation.error.errors.map(err => err.message)
        });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, subscriptionId } = validation.data;

      // Verify signature
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return res.status(500).json({ error: "Payment verification not configured" });
      }
      
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ error: "Invalid payment signature" });
      }

      if (!razorpay) {
        return res.status(500).json({ error: "Payment gateway not configured" });
      }

      // Get payment details from Razorpay
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      // Update order status
      await storage.updateOrder(orderId, {
        status: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });

      // Get subscription and update status to active
      const subscription = await storage.getUserSubscription(subscriptionId);
      if (subscription && subscription.userId === userId) {
        await storage.updateUserSubscription(subscriptionId, {
          status: 'active',
          startDate: new Date(),
          razorpaySubscriptionId: razorpay_payment_id // Use payment ID as reference
        });

        // Create subscription payment record with GST breakdown
        const paymentAmount = typeof payment.amount === 'string' ? parseInt(payment.amount) : payment.amount;
        
        await storage.createSubscriptionPayment({
          subscriptionId: subscriptionId,
          amount: paymentAmount, // Total amount including GST
          baseAmount: subscription.agreedPrice, // Base amount before tax
          gstAmount: subscription.gstAmount, // Tax amount (keeping field name for DB compatibility)
          currency: payment.currency,
          status: 'success',
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          paymentMethod: payment.method,
          billingPeriodStart: new Date(),
          billingPeriodEnd: subscription.nextBillingDate,
          paidAt: new Date()
        });
      }

      res.json({
        success: true,
        message: "Subscription payment verified successfully",
        paymentId: razorpay_payment_id,
      });

    } catch (error) {
      console.error('Subscription payment verification error:', error);
      res.status(500).json({ error: "Failed to verify subscription payment" });
    }
  });

  // Get user subscriptions (requires authentication)
  app.get("/api/subscriptions/my", requireAuth, async (req, res) => {
    try {
      const userId = req.session!.userId!;
      const subscriptions = await storage.getUserSubscriptions(userId);
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  });

  // Get user payment history (requires authentication)
  app.get("/api/subscriptions/payments", requireAuth, async (req, res) => {
    try {
      const userId = req.session!.userId!;
      const payments = await storage.getUserPaymentHistory(userId);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ error: "Failed to fetch payment history" });
    }
  });

  // Cancel subscription (requires authentication)
  app.post("/api/subscriptions/:id/cancel", requireAuth, async (req, res) => {
    try {
      const subscriptionId = parseInt(req.params.id);
      const userId = req.session!.userId!;
      const { cancelReason } = req.body;

      // Get subscription and verify ownership
      const subscription = await storage.getUserSubscription(subscriptionId);
      if (!subscription || subscription.userId !== userId) {
        return res.status(404).json({ error: "Subscription not found" });
      }

      if (subscription.status === 'cancelled') {
        return res.status(400).json({ error: "Subscription is already cancelled" });
      }

      // Update subscription status
      const updatedSubscription = await storage.updateUserSubscription(subscriptionId, {
        status: 'cancelled',
        cancelReason: cancelReason || 'User requested cancellation',
        cancelledAt: new Date()
      });

      res.json({
        success: true,
        subscription: updatedSubscription,
        message: "Subscription cancelled successfully"
      });
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      res.status(500).json({ error: "Failed to cancel subscription" });
    }
  });

  // Return the HTTP server with WebSocket support
  return httpServer;
}