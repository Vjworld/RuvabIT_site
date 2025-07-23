import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertBlogPostSchema, 
  updateBlogPostSchema,
  insertPageContentSchema,
  updatePageContentSchema,
  insertNavigationItemSchema,
  updateNavigationItemSchema,
  insertComponentSettingSchema,
  updateComponentSettingSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json({ user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

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

  // Admin routes
  app.get("/api/admin/posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/posts", async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(postData);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/posts/:id", async (req, res) => {
    try {
      const postData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(parseInt(req.params.id), postData);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/posts/:id", async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // CMS Page Content Routes
  app.get("/api/admin/pages", async (req, res) => {
    try {
      const pages = await storage.getPageContents();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/pages/:pageKey", async (req, res) => {
    try {
      const page = await storage.getPageContent(req.params.pageKey);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/pages/:pageKey", async (req, res) => {
    try {
      const pageData = updatePageContentSchema.parse(req.body);
      const page = await storage.updatePageContent(req.params.pageKey, pageData);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/pages", async (req, res) => {
    try {
      const pageData = insertPageContentSchema.parse(req.body);
      const page = await storage.createPageContent(pageData);
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // CMS Navigation Routes
  app.get("/api/admin/navigation", async (req, res) => {
    try {
      const navItems = await storage.getNavigationItems();
      res.json(navItems);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/navigation", async (req, res) => {
    try {
      const navData = insertNavigationItemSchema.parse(req.body);
      const navItem = await storage.createNavigationItem(navData);
      res.json(navItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/navigation/:id", async (req, res) => {
    try {
      const navData = updateNavigationItemSchema.parse(req.body);
      const navItem = await storage.updateNavigationItem(parseInt(req.params.id), navData);
      if (!navItem) {
        return res.status(404).json({ error: "Navigation item not found" });
      }
      res.json(navItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/navigation/:id", async (req, res) => {
    try {
      const success = await storage.deleteNavigationItem(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: "Navigation item not found" });
      }
      res.json({ message: "Navigation item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // CMS Component Settings Routes
  app.get("/api/admin/components", async (req, res) => {
    try {
      const components = await storage.getComponentSettings();
      res.json(components);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/components/:componentKey", async (req, res) => {
    try {
      const component = await storage.getComponentSetting(req.params.componentKey);
      if (!component) {
        return res.status(404).json({ error: "Component not found" });
      }
      res.json(component);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/components/:componentKey", async (req, res) => {
    try {
      const componentData = updateComponentSettingSchema.parse(req.body);
      const component = await storage.updateComponentSetting(req.params.componentKey, componentData);
      if (!component) {
        return res.status(404).json({ error: "Component not found" });
      }
      res.json(component);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/components", async (req, res) => {
    try {
      const componentData = insertComponentSettingSchema.parse(req.body);
      const component = await storage.createComponentSetting(componentData);
      res.json(component);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Public API routes for dynamic content
  app.get("/api/pages/:pageKey", async (req, res) => {
    try {
      const page = await storage.getPageContent(req.params.pageKey);
      if (!page || !page.isActive) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/navigation", async (req, res) => {
    try {
      const navItems = await storage.getNavigationItems();
      const visibleItems = navItems.filter(item => item.isVisible);
      res.json(visibleItems);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/components/:componentKey", async (req, res) => {
    try {
      const component = await storage.getComponentSetting(req.params.componentKey);
      if (!component || !component.isActive) {
        return res.status(404).json({ error: "Component not found" });
      }
      res.json(component);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
