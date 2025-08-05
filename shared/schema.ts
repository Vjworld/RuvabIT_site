import { pgTable, text, serial, integer, boolean, timestamp, varchar, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

// Users table for authentication and admin functionality
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).unique(),
  password: text("password").notNull(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().default([]).notNull(),
  featuredImage: text("featured_image"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
});

// CMS page content management
export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  pageKey: varchar("page_key", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  content: jsonb("content").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: integer("updated_by").notNull().references(() => users.id),
});

// Search indexing table for advanced search functionality
export const searchIndex = pgTable("search_index", {
  id: serial("id").primaryKey(),
  contentType: varchar("content_type", { length: 50 }).notNull(), // 'blog', 'page', 'service'
  contentId: integer("content_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  searchVector: text("search_vector"), // For full-text search
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("search_content_idx").on(table.contentType, table.contentId),
]);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
  pageContents: many(pageContents),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const pageContentsRelations = relations(pageContents, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [pageContents.updatedBy],
    references: [users.id],
  }),
}));

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
  updatedAt: true,
});

export const insertPageContentSchema = createInsertSchema(pageContents).omit({
  id: true,
  updatedAt: true,
});

export const searchSchema = z.object({
  query: z.string().min(1).max(200),
  type: z.enum(['all', 'blog', 'page', 'service']).optional().default('all'),
  limit: z.number().min(1).max(50).optional().default(10),
  offset: z.number().min(0).optional().default(0),
});

// Newsletter leads table
export const newsletterLeads = pgTable("newsletter_leads", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  subscriptionDate: timestamp("subscription_date").defaultNow(),
  isActive: boolean("is_active").default(true),
  source: varchar("source", { length: 100 }).default("website"), // website, referral, etc.
  userAgent: varchar("user_agent", { length: 500 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export type NewsletterLead = typeof newsletterLeads.$inferSelect;
export type InsertNewsletterLead = typeof newsletterLeads.$inferInsert;

export const insertNewsletterLeadSchema = createInsertSchema(newsletterLeads).omit({
  id: true,
  subscriptionDate: true,
  createdAt: true,
});

export type InsertNewsletterLeadData = z.infer<typeof insertNewsletterLeadSchema>;

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type PageContent = typeof pageContents.$inferSelect;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type SearchQuery = z.infer<typeof searchSchema>;
export type SearchIndex = typeof searchIndex.$inferSelect;