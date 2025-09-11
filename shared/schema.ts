import { pgTable, text, serial, integer, boolean, timestamp, varchar, index, jsonb, uniqueIndex, decimal } from "drizzle-orm/pg-core";
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

// News cache table for 12-hour interval caching
export const newsCache = pgTable("news_cache", {
  id: serial("id").primaryKey(),
  cacheKey: varchar("cache_key", { length: 255 }).notNull().unique(), // e.g. 'technology_news'
  articles: jsonb("articles").notNull(), // Store the fetched articles array
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  sourceInfo: jsonb("source_info"), // Store info about which sources were used
  articleCount: integer("article_count").default(0),
});

// News Archive table - Comprehensive backup system for admin contingency
export const newsArchive = pgTable("news_archive", {
  id: serial("id").primaryKey(),
  articleId: varchar("article_id", { length: 500 }).notNull(), // Original article ID from API
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"), // Full article content if available
  url: text("url").notNull(),
  urlToImage: text("url_to_image"),
  publishedAt: timestamp("published_at"),
  sourceName: varchar("source_name", { length: 255 }).notNull(),
  sourceUrl: text("source_url"),
  sourceId: varchar("source_id", { length: 255 }),
  
  // Categorization and tagging
  category: varchar("category", { length: 100 }).default("technology").notNull(),
  tags: text("tags").array().default([]).notNull(), // Keywords and tags
  language: varchar("language", { length: 10 }).default("en").notNull(),
  country: varchar("country", { length: 10 }),
  
  // API and source metadata
  apiProvider: varchar("api_provider", { length: 50 }).notNull(), // 'newsapi_ai', 'newsnow'
  apiResponseId: varchar("api_response_id", { length: 255 }), // API-specific response ID
  fetchMethod: varchar("fetch_method", { length: 50 }).default("api").notNull(), // 'api', 'rss', 'scrape'
  
  // Content analysis and metadata
  summary: text("summary"), // Generated summary/excerpt
  keyPoints: text("key_points").array().default([]), // Key bullet points
  sentiment: varchar("sentiment", { length: 20 }), // 'positive', 'negative', 'neutral'
  wordCount: integer("word_count").default(0),
  readingTime: integer("reading_time").default(0), // Estimated reading time in minutes
  
  // SEO and social metadata
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  twitterCard: varchar("twitter_card", { length: 50 }),
  
  // Technical metadata
  contentHash: varchar("content_hash", { length: 64 }), // SHA-256 hash for duplicate detection
  imageAnalysis: jsonb("image_analysis"), // Image metadata and analysis
  rawApiResponse: jsonb("raw_api_response"), // Full original API response for debugging
  
  // Admin and quality control
  isVerified: boolean("is_verified").default(false).notNull(), // Admin verified for quality
  isActive: boolean("is_active").default(true).notNull(), // Active for internal use
  qualityScore: integer("quality_score").default(0), // 0-100 quality rating
  adminNotes: text("admin_notes"), // Admin comments and notes
  verifiedBy: integer("verified_by").references(() => users.id), // Admin who verified
  verifiedAt: timestamp("verified_at"),
  
  // Timestamps
  archivedAt: timestamp("archived_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("news_archive_article_id_idx").on(table.articleId),
  index("news_archive_source_idx").on(table.sourceName),
  index("news_archive_published_idx").on(table.publishedAt),
  index("news_archive_api_provider_idx").on(table.apiProvider),
  index("news_archive_category_idx").on(table.category),
  index("news_archive_archived_idx").on(table.archivedAt),
  index("news_archive_content_hash_idx").on(table.contentHash),
  uniqueIndex("news_archive_unique_content").on(table.contentHash),
]);

// News Source Statistics - Track API performance and source reliability
export const newsSourceStats = pgTable("news_source_stats", {
  id: serial("id").primaryKey(),
  sourceName: varchar("source_name", { length: 255 }).notNull(),
  apiProvider: varchar("api_provider", { length: 50 }).notNull(),
  
  // Statistics
  totalArticles: integer("total_articles").default(0).notNull(),
  successfulFetches: integer("successful_fetches").default(0).notNull(),
  failedFetches: integer("failed_fetches").default(0).notNull(),
  averageQualityScore: integer("average_quality_score").default(0),
  lastFetchAt: timestamp("last_fetch_at"),
  lastSuccessAt: timestamp("last_success_at"),
  lastFailureAt: timestamp("last_failure_at"),
  
  // Reliability metrics
  uptimePercentage: integer("uptime_percentage").default(100), // 0-100
  averageResponseTime: integer("average_response_time").default(0), // milliseconds
  reliabilityScore: integer("reliability_score").default(100), // 0-100
  
  // Admin tracking
  isActive: boolean("is_active").default(true).notNull(),
  adminNotes: text("admin_notes"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("news_source_stats_provider_idx").on(table.apiProvider),
  index("news_source_stats_source_idx").on(table.sourceName),
]);

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

export const insertNewsCacheSchema = createInsertSchema(newsCache).omit({
  id: true,
  fetchedAt: true,
});

export const insertNewsArchiveSchema = createInsertSchema(newsArchive).omit({
  id: true,
  archivedAt: true,
  updatedAt: true,
});

export const insertNewsSourceStatsSchema = createInsertSchema(newsSourceStats).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Subscription Plans table
export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // Starter, Professional, Bronze, Silver, Gold
  planType: varchar("plan_type", { length: 50 }).notNull(), // monthly, tiered, per_post
  priceMin: integer("price_min").notNull(), // Price in INR paise, minimum for ranges
  priceMax: integer("price_max"), // Maximum for ranges in INR paise, null for fixed pricing
  currency: varchar("currency", { length: 3 }).default("INR"),
  billingInterval: varchar("billing_interval", { length: 20 }).default("monthly"), // monthly, one_time
  description: text("description").notNull(),
  features: jsonb("features").notNull(), // Array of feature strings
  
  // Razorpay plan tracking
  razorpayPlanId: varchar("razorpay_plan_id", { length: 255 }),
  
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  // Unique constraints for Razorpay integration
  uniqueIndex("subscription_plans_razorpay_plan_id_unique").on(table.razorpayPlanId),
  // Validation constraints
  // priceMin must be > 0
  // priceMax must be >= priceMin when not null
]);

// User Subscriptions table
export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  planId: integer("plan_id").notNull().references(() => subscriptionPlans.id),
  status: varchar("status", { length: 50 }).default("pending"), // active, cancelled, expired, pending
  agreedPrice: integer("agreed_price").notNull(), // Final agreed price in INR paise
  currency: varchar("currency", { length: 3 }).default("INR"),
  billingInterval: varchar("billing_interval", { length: 20 }).default("monthly"),
  
  // Billing dates
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"), // For fixed-term subscriptions
  nextBillingDate: timestamp("next_billing_date"),
  lastBillingDate: timestamp("last_billing_date"),
  
  // Razorpay subscription tracking
  razorpaySubscriptionId: varchar("razorpay_subscription_id", { length: 255 }),
  
  // Metadata
  metadata: jsonb("metadata"), // Additional subscription details
  cancelReason: text("cancel_reason"),
  cancelledAt: timestamp("cancelled_at"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("user_subscriptions_user_idx").on(table.userId),
  index("user_subscriptions_plan_idx").on(table.planId),
  index("user_subscriptions_status_idx").on(table.status),
  // Unique constraints for Razorpay integration
  uniqueIndex("user_subscriptions_razorpay_subscription_id_unique").on(table.razorpaySubscriptionId),
]);

// Subscription Payments table - Track recurring payments
export const subscriptionPayments = pgTable("subscription_payments", {
  id: serial("id").primaryKey(),
  subscriptionId: integer("subscription_id").notNull().references(() => userSubscriptions.id),
  orderId: integer("order_id").references(() => orders.id), // Link to main orders table
  amount: integer("amount").notNull(), // Amount in INR paise
  currency: varchar("currency", { length: 3 }).default("INR"),
  status: varchar("status", { length: 50 }).notNull(), // success, failed, pending, refunded
  
  // Razorpay payment details
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  razorpayOrderId: varchar("razorpay_order_id", { length: 255 }),
  
  // Payment method details
  paymentMethod: varchar("payment_method", { length: 50 }), // card, netbanking, wallet, upi
  paymentDetails: jsonb("payment_details"), // Additional payment method info
  
  // Billing period info
  billingPeriodStart: timestamp("billing_period_start"),
  billingPeriodEnd: timestamp("billing_period_end"),
  
  // Failure handling
  failureReason: text("failure_reason"),
  retryCount: integer("retry_count").default(0),
  nextRetryAt: timestamp("next_retry_at"),
  
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("subscription_payments_subscription_idx").on(table.subscriptionId),
  index("subscription_payments_status_idx").on(table.status),
  index("subscription_payments_paid_at_idx").on(table.paidAt),
]);

// Subscription plan relations
export const subscriptionPlansRelations = relations(subscriptionPlans, ({ many }) => ({
  userSubscriptions: many(userSubscriptions),
}));

export const userSubscriptionsRelations = relations(userSubscriptions, ({ one, many }) => ({
  user: one(users, {
    fields: [userSubscriptions.userId],
    references: [users.id],
  }),
  plan: one(subscriptionPlans, {
    fields: [userSubscriptions.planId],
    references: [subscriptionPlans.id],
  }),
  payments: many(subscriptionPayments),
}));

export const subscriptionPaymentsRelations = relations(subscriptionPayments, ({ one }) => ({
  subscription: one(userSubscriptions, {
    fields: [subscriptionPayments.subscriptionId],
    references: [userSubscriptions.id],
  }),
  order: one(orders, {
    fields: [subscriptionPayments.orderId],
    references: [orders.id],
  }),
}));

// Subscription schemas
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSubscriptionPaymentSchema = createInsertSchema(subscriptionPayments).omit({
  id: true,
  createdAt: true,
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
export type NewsCache = typeof newsCache.$inferSelect;
export type InsertNewsCache = z.infer<typeof insertNewsCacheSchema>;
export type NewsArchive = typeof newsArchive.$inferSelect;
export type InsertNewsArchive = z.infer<typeof insertNewsArchiveSchema>;
export type NewsSourceStats = typeof newsSourceStats.$inferSelect;
export type InsertNewsSourceStats = z.infer<typeof insertNewsSourceStatsSchema>;

// Subscription type exports
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type InsertUserSubscription = z.infer<typeof insertUserSubscriptionSchema>;
export type SubscriptionPayment = typeof subscriptionPayments.$inferSelect;
export type InsertSubscriptionPayment = z.infer<typeof insertSubscriptionPaymentSchema>;