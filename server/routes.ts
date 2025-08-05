import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import sgMail from '@sendgrid/mail';

export async function registerRoutes(app: Express): Promise<Server> {

  // Blog routes
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      const publishedPosts = posts.filter(post => post.isPublished);
      res.json(publishedPosts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
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

      const textContent = `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not specified'}
        Subject: ${subject || 'Contact Form Submission'}
        
        Message:
        ${message}
        
        Submitted at: ${new Date().toISOString()}
      `;

      // Send email via SendGrid
      try {
        await sgMail.send({
          to: process.env.EMAIL_TO || 'info@ruvab.it.com',
          from: process.env.EMAIL_FROM || 'noreply@ruvab.it.com',
          subject: `Contact Form: ${subject || 'New Message from ' + name}`,
          text: textContent,
          html: emailContent,
        });

        console.log("Contact form email sent successfully to:", process.env.EMAIL_TO);
        res.json({ 
          success: true, 
          message: "Thank you for your message. We'll get back to you within 24 hours." 
        });

      } catch (sendGridError: any) {
        console.error("SendGrid error details:", {
          code: sendGridError.code,
          message: sendGridError.message,
          response: sendGridError.response?.body
        });

        // Log form data since email failed
        console.log("Contact form submission (email failed):", { name, email, company, subject, message });

        // Return success to user even if email fails - we've logged the data
        res.json({ 
          success: true, 
          message: "Thank you for your message. We'll get back to you within 24 hours." 
        });
      }

    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  // Environment variables security check endpoint (development only)
  app.get("/api/env-check", (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ error: "Not found" });
    }

    const envStatus = {
      DATABASE_URL: process.env.DATABASE_URL ? "✅ Set (secured)" : "❌ Missing",
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? `✅ Set (${process.env.SENDGRID_API_KEY.substring(0, 6)}...)` : "❌ Missing",
      EMAIL_FROM: process.env.EMAIL_FROM ? `✅ Set (${process.env.EMAIL_FROM})` : "❌ Missing", 
      EMAIL_TO: process.env.EMAIL_TO ? `✅ Set (${process.env.EMAIL_TO})` : "❌ Missing",
      VITE_GA_MEASUREMENT_ID: process.env.VITE_GA_MEASUREMENT_ID ? `✅ Set (${process.env.VITE_GA_MEASUREMENT_ID})` : "❌ Missing",
      VITE_ADSENSE_CLIENT_ID: process.env.VITE_ADSENSE_CLIENT_ID ? `✅ Set (${process.env.VITE_ADSENSE_CLIENT_ID})` : "❌ Missing"
    };

    res.json({
      message: "Environment Variables Status (Development Only)",
      security_note: "DATABASE_URL is properly secured and not exposed to frontend. VITE_ prefixed variables are intentionally exposed to frontend for Google Analytics and AdSense.",
      variables: envStatus
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}