import { 
  type BlogPost, type InsertBlogPost, type User, type InsertUser,
  type PageContent, type InsertPageContent, type SearchQuery, type SearchIndex
} from "@shared/schema";
import { db } from "./db";
import { users, blogPosts, pageContents, searchIndex } from "@shared/schema";
import { eq, like, or, desc, and } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Page content operations
  getPageContent(pageKey: string): Promise<PageContent | undefined>;
  getAllPageContents(): Promise<PageContent[]>;
  createPageContent(insertPageContent: InsertPageContent): Promise<PageContent>;
  updatePageContent(pageKey: string, updates: Partial<InsertPageContent>): Promise<PageContent | undefined>;

  // Search operations
  searchContent(query: SearchQuery): Promise<SearchIndex[]>;
  updateSearchIndex(contentType: string, contentId: number, title: string, content: string): Promise<void>;

  // Initialize default data
  initializeDefaultData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        password: hashedPassword,
      })
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    
    // Update search index
    await this.updateSearchIndex('blog', post.id, post.title, post.content);
    
    return post;
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    
    if (post) {
      // Update search index
      await this.updateSearchIndex('blog', post.id, post.title, post.content);
    }
    
    return post;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    
    // Remove from search index
    await db.delete(searchIndex).where(
      and(
        eq(searchIndex.contentType, 'blog'),
        eq(searchIndex.contentId, id)
      )
    );
    
    return (result.rowCount ?? 0) > 0;
  }

  // Page content operations
  async getPageContent(pageKey: string): Promise<PageContent | undefined> {
    const [content] = await db
      .select()
      .from(pageContents)
      .where(and(eq(pageContents.pageKey, pageKey), eq(pageContents.isActive, true)));
    return content;
  }

  async getAllPageContents(): Promise<PageContent[]> {
    return await db
      .select()
      .from(pageContents)
      .where(eq(pageContents.isActive, true))
      .orderBy(desc(pageContents.updatedAt));
  }

  async createPageContent(insertPageContent: InsertPageContent): Promise<PageContent> {
    const [content] = await db
      .insert(pageContents)
      .values(insertPageContent)
      .returning();
    
    // Update search index
    await this.updateSearchIndex('page', content.id, content.title, JSON.stringify(content.content));
    
    return content;
  }

  async updatePageContent(pageKey: string, updates: Partial<InsertPageContent>): Promise<PageContent | undefined> {
    const [content] = await db
      .update(pageContents)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(pageContents.pageKey, pageKey))
      .returning();
    
    if (content) {
      // Update search index
      await this.updateSearchIndex('page', content.id, content.title, JSON.stringify(content.content));
    }
    
    return content;
  }

  // Search operations
  async searchContent(query: SearchQuery): Promise<SearchIndex[]> {
    const searchTerm = `%${query.query}%`;
    
    let whereCondition = or(
      like(searchIndex.title, searchTerm),
      like(searchIndex.content, searchTerm)
    );
    
    if (query.type !== 'all') {
      whereCondition = and(
        eq(searchIndex.contentType, query.type),
        whereCondition
      );
    }
    
    return await db
      .select()
      .from(searchIndex)
      .where(whereCondition)
      .orderBy(desc(searchIndex.updatedAt))
      .limit(query.limit || 10);
  }

  async updateSearchIndex(contentType: string, contentId: number, title: string, content: string): Promise<void> {
    // Remove existing entry
    await db.delete(searchIndex).where(
      and(
        eq(searchIndex.contentType, contentType),
        eq(searchIndex.contentId, contentId)
      )
    );
    
    // Create new entry
    await db.insert(searchIndex).values({
      contentType,
      contentId,
      title,
      content: content.substring(0, 5000), // Limit content length
      searchVector: `${title} ${content}`.toLowerCase(),
    });
  }

  // Initialize default data
  async initializeDefaultData(): Promise<void> {
    console.log("Storage: Starting database initialization...");
    
    // Create default admin user if none exists
    const existingAdmin = await db.select().from(users).where(eq(users.isAdmin, true)).limit(1);
    
    if (existingAdmin.length === 0) {
      await this.createUser({
        username: 'admin',
        email: 'admin@ruvab.it.com',
        password: 'admin123', // This will be hashed
        firstName: 'Admin',
        lastName: 'User',
        isAdmin: true,
      });
      console.log("Storage: Created default admin user");
    }
    
    // Create default blog posts if none exist
    const existingPosts = await db.select().from(blogPosts).limit(1);
    
    if (existingPosts.length === 0) {
      const adminUser = await db.select().from(users).where(eq(users.isAdmin, true)).limit(1);
      const adminId = adminUser[0]?.id || 1;
      
      await this.createDefaultBlogPosts(adminId);
      console.log("Storage: Created default blog posts");
    }
    
    console.log("Storage: Database initialization complete");
  }

  private async createDefaultBlogPosts(adminId: number) {
    const samplePosts = [
      {
        title: "The Future of AI in Business Automation",
        slug: "future-ai-business-automation",
        excerpt: "Explore how artificial intelligence is revolutionizing business processes and creating new opportunities for growth and efficiency across industries.",
        featuredImage: "/images/blog-featured-ai-automation.png",
        content: `# The Future of AI in Business Automation\n\nArtificial Intelligence is transforming the business landscape at an unprecedented pace. From streamlining operations to enhancing customer experiences, AI-powered automation is becoming the backbone of modern enterprises.`,
        category: "AI & Technology",
        tags: ["AI", "Automation", "Business"],
        authorId: adminId,
        isPublished: true,
      },
      {
        title: "Data Analytics: Turning Information into Insights",
        slug: "data-analytics-insights",
        excerpt: "Learn how modern data analytics tools and techniques can help your business make data-driven decisions and unlock hidden opportunities.",
        featuredImage: "/images/blog-featured-data-analytics.png",
        content: `# Data Analytics: Turning Information into Insights\n\nIn today's data-driven world, the ability to extract meaningful insights from vast amounts of information is crucial for business success.`,
        category: "Data Analytics",
        tags: ["Data", "Analytics", "Business Intelligence"],
        authorId: adminId,
        isPublished: true,
      }
    ];

    for (const post of samplePosts) {
      await this.createBlogPost(post);
    }
  }
}

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();