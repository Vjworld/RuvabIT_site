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

// Referral partners table
export const referralPartners = pgTable("referral_partners", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url").notNull(),
  referralUrl: text("referral_url").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // hosting, payment, email, database, etc.
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  commissionRate: varchar("commission_rate", { length: 50 }), // e.g., "10%", "$50 per signup"
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: varchar("order_id", { length: 255 }).notNull().unique(),
  amount: integer("amount").notNull(), // Amount in paise
  currency: varchar("currency", { length: 3 }).default("INR"),
  status: varchar("status", { length: 50 }).default("created"), // created, paid, failed, cancelled
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 20 }),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  description: text("description"),
  razorpayOrderId: varchar("razorpay_order_id", { length: 255 }),
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  razorpaySignature: varchar("razorpay_signature", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Payments table
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }).notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("INR"),
  status: varchar("status", { length: 50 }).notNull(), // success, failed, pending
  method: varchar("method", { length: 50 }), // card, netbanking, wallet, upi
  bank: varchar("bank", { length: 100 }),
  walletType: varchar("wallet_type", { length: 100 }),
  vpa: varchar("vpa", { length: 255 }),
  fee: integer("fee"), // Razorpay fee in paise
  tax: integer("tax"), // Tax on fee in paise
  errorCode: varchar("error_code", { length: 50 }),
  errorDescription: text("error_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Order relations
export const ordersRelations = relations(orders, ({ many }) => ({
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

export const referralPartnersRelations = relations(referralPartners, ({ one }) => ({
  createdByUser: one(users, {
    fields: [referralPartners.createdBy],
    references: [users.id],
  }),
}));

export type NewsletterLead = typeof newsletterLeads.$inferSelect;
export type InsertNewsletterLead = typeof newsletterLeads.$inferInsert;

export const insertNewsletterLeadSchema = createInsertSchema(newsletterLeads).omit({
  id: true,
  subscriptionDate: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export const insertReferralPartnerSchema = createInsertSchema(referralPartners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertNewsletterLeadData = z.infer<typeof insertNewsletterLeadSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type ReferralPartner = typeof referralPartners.$inferSelect;
export type InsertReferralPartner = z.infer<typeof insertReferralPartnerSchema>;

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type PageContent = typeof pageContents.$inferSelect;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type SearchQuery = z.infer<typeof searchSchema>;
export type SearchIndex = typeof searchIndex.$inferSelect;