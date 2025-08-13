import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBlogPostSchema, insertPageContentSchema, searchSchema, insertOrderSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import sgMail from '@sendgrid/mail';
import Razorpay from 'razorpay';
import crypto from 'crypto';

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

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('Razorpay payment gateway initialized successfully');
} else {
  console.log('Razorpay credentials not found - payment functionality will be disabled');
}

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
  // QR Gen Tool is accessible via reverse proxy
  console.log('[QR Setup] QR Gen Tool available at https://ruvab.it.com/qr-gen-tool/');


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
      if (!razorpay) {
        return res.status(500).json({ error: "Payment gateway not configured. Please contact support." });
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
  
  app.get('/qr-gen-tool/*', async (req, res) => {
    let targetPath = req.path.replace('/qr-gen-tool', '') || '/';
    // Ensure we don't create double slashes
    if (targetPath === '/') {
      targetPath = '';
    }
    const targetUrl = `https://qr-gentool-vjvaibhu.replit.app${targetPath}`;
    
    console.log(`[QR Proxy] ${req.method} ${req.path} -> ${targetUrl}`);
    
    try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': req.headers.accept || 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': req.headers['accept-language'] || 'en-US,en;q=0.9',
        }
      });

      console.log(`[QR Proxy] Response: ${response.status} ${response.statusText} (${response.headers.get('content-type')})`);

      if (!response.ok) {
        console.error(`[QR Proxy] Error: ${response.status} ${response.statusText}`);
        return res.status(response.status).send(`Proxy error: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      const buffer = await response.buffer();
      
      console.log(`[QR Proxy] Content length: ${buffer.length} bytes`);
      
      // Set proper headers for the response
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': response.headers.get('cache-control') || 'public, max-age=3600'
      });
      
      if (contentType.includes('text/html')) {
        // For HTML content, rewrite relative paths
        let content = buffer.toString('utf-8');
        
        // DON'T inject base href - it causes redirect loops
        // Instead, rewrite absolute paths to relative ones that work with proxy
        
        // Rewrite absolute asset paths to work with our proxy
        content = content.replace(/href="\/assets\//g, 'href="/qr-gen-tool/assets/');
        content = content.replace(/src="\/assets\//g, 'src="/qr-gen-tool/assets/');
        content = content.replace(/href="\/(?!qr-gen-tool|http|https|\/\/)/g, 'href="/qr-gen-tool/');
        content = content.replace(/src="\/(?!qr-gen-tool|http|https|\/\/)/g, 'src="/qr-gen-tool/');
        
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.send(content);
      } else {
        // For non-HTML content (CSS, JS, images), pass through with proper headers
        if (req.path.endsWith('.js')) {
          res.set('Content-Type', 'application/javascript; charset=utf-8');
        } else if (req.path.endsWith('.css')) {
          res.set('Content-Type', 'text/css; charset=utf-8');
        } else if (req.path.endsWith('.json')) {
          res.set('Content-Type', 'application/json; charset=utf-8');
        } else {
          res.set('Content-Type', contentType);
        }
        
        res.send(buffer);
      }
    } catch (error) {
      console.error('[QR Proxy] Error:', error);
      res.status(500).send('Proxy error: Internal server error');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}