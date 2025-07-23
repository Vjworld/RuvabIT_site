import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().default([]).notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  authorId: integer("author_id").references(() => users.id).notNull(),
});

// Page content management
export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  pageKey: text("page_key").notNull().unique(), // e.g., 'hero', 'about', 'services'
  title: text("title").notNull(),
  content: json("content").notNull(), // JSON structure for flexible content
  isActive: boolean("is_active").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: integer("updated_by").references(() => users.id).notNull(),
});

// Navigation and link management
export const navigationItems = pgTable("navigation_items", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  type: text("type").notNull(), // 'link', 'dropdown', 'button'
  parentId: integer("parent_id"),
  position: integer("position").default(0).notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Component configuration
export const componentSettings = pgTable("component_settings", {
  id: serial("id").primaryKey(),
  componentKey: text("component_key").notNull().unique(), // e.g., 'hero-buttons', 'contact-form'
  settings: json("settings").notNull(), // JSON for component configuration
  isActive: boolean("is_active").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: integer("updated_by").references(() => users.id).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
  updatedAt: true,
});

export const updateBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
}).partial();

export const insertPageContentSchema = createInsertSchema(pageContents).omit({
  id: true,
  updatedAt: true,
});

export const updatePageContentSchema = createInsertSchema(pageContents).omit({
  id: true,
  updatedAt: true,
}).partial();

export const insertNavigationItemSchema = createInsertSchema(navigationItems).omit({
  id: true,
  updatedAt: true,
});

export const updateNavigationItemSchema = createInsertSchema(navigationItems).omit({
  id: true,
  updatedAt: true,
}).partial();

export const insertComponentSettingSchema = createInsertSchema(componentSettings).omit({
  id: true,
  updatedAt: true,
});

export const updateComponentSettingSchema = createInsertSchema(componentSettings).omit({
  id: true,
  updatedAt: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;

export type PageContent = typeof pageContents.$inferSelect;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type UpdatePageContent = z.infer<typeof updatePageContentSchema>;

export type NavigationItem = typeof navigationItems.$inferSelect;
export type InsertNavigationItem = z.infer<typeof insertNavigationItemSchema>;
export type UpdateNavigationItem = z.infer<typeof updateNavigationItemSchema>;

export type ComponentSetting = typeof componentSettings.$inferSelect;
export type InsertComponentSetting = z.infer<typeof insertComponentSettingSchema>;
export type UpdateComponentSetting = z.infer<typeof updateComponentSettingSchema>;
