import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from 'ws';
import { storage } from "./storage";
import { insertUserSchema, insertBlogPostSchema, insertPageContentSchema, searchSchema, insertOrderSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import sgMail from '@sendgrid/mail';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { securityHeaders, rateLimiter, sanitizeInput, maskPII, validateEnvironment } from './security';

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
      return "I'd be happy to discuss our pricing! 💰 Our services are competitively priced:\n\n• AI Implementation: ₹50,000 - ₹2,00,000\n• Custom Software: ₹75,000 - ₹3,00,000\n• Data Analytics: ₹40,000 - ₹1,50,000\n• Cloud Solutions: ₹35,000 - ₹1,00,000\n\nPrices vary based on complexity and scope. We offer free consultations to provide accurate quotes. Would you like to schedule one?";
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
    secret: process.env.SESSION_SECRET || 'dev-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
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

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ success: true });
    });
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

  // Return the HTTP server with WebSocket support
  return httpServer;
}