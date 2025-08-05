import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import nodemailer from "nodemailer";

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

      // Check if email service is configured
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log("Contact form submission:", { name, email, company, subject, message });
        console.warn("Email service not configured. Contact form data logged only.");
        return res.json({ 
          success: true, 
          message: "Thank you for your message. We'll get back to you within 24 hours." 
        });
      }

      // Configure email transporter
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email content
      const emailContent = `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not specified'}
        Subject: ${subject || 'Contact Form Submission'}
        
        Message:
        ${message}
        
        Submitted at: ${new Date().toISOString()}
      `;

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: process.env.EMAIL_TO || process.env.SMTP_USER,
        subject: `Contact Form: ${subject || 'New Message'}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      });

      res.json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you within 24 hours." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}