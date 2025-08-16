import crypto from "crypto";
import { storage } from "./storage";
import { type InsertNewsArchive } from "@shared/schema";

/**
 * Archive helper for technology news articles
 * Provides comprehensive backup and contingency data for admin use
 */

export interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt?: string;
  source: {
    id?: string;
    name: string;
    url?: string;
  };
  keyPoints?: string[];
  summary?: string;
}

/**
 * Generate SHA-256 hash for content deduplication
 */
function generateContentHash(title: string, url: string, publishedAt?: string): string {
  const content = `${title}|${url}|${publishedAt || ''}`;
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

/**
 * Extract keywords and tags from article content
 */
function extractTags(title: string, description?: string): string[] {
  const text = `${title} ${description || ''}`.toLowerCase();
  const techKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural network',
    'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'nft', 'web3', 'defi',
    'cloud computing', 'aws', 'azure', 'google cloud', 'kubernetes', 'docker',
    'javascript', 'python', 'react', 'node.js', 'typescript', 'rust', 'go', 'java',
    'api', 'rest', 'graphql', 'microservices', 'serverless', 'devops', 'ci/cd',
    'cybersecurity', 'privacy', 'data breach', 'encryption', 'vulnerability',
    'startup', 'funding', 'ipo', 'acquisition', 'venture capital', 'tech company',
    'mobile', 'ios', 'android', 'app', 'software', 'hardware', 'chip', 'processor',
    'quantum computing', 'iot', 'internet of things', 'automation', 'robotics',
    'vr', 'virtual reality', 'ar', 'augmented reality', 'metaverse',
    '5g', 'network', 'connectivity', 'broadband', 'fiber optic',
    'electric vehicle', 'ev', 'tesla', 'autonomous', 'self-driving',
    'social media', 'facebook', 'twitter', 'linkedin', 'instagram', 'tiktok',
    'gaming', 'esports', 'console', 'pc gaming', 'mobile gaming'
  ];
  
  return techKeywords.filter(keyword => text.includes(keyword));
}

/**
 * Calculate estimated reading time in minutes
 */
function calculateReadingTime(content?: string, description?: string): number {
  const text = `${content || ''} ${description || ''}`;
  const wordCount = text.split(/\s+/).length;
  const wordsPerMinute = 200; // Average reading speed
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Analyze sentiment (basic implementation)
 */
function analyzeSentiment(title: string, description?: string): string {
  const text = `${title} ${description || ''}`.toLowerCase();
  
  const positiveWords = ['breakthrough', 'innovation', 'success', 'growth', 'improvement', 'advance', 'launch', 'release', 'winner', 'leader', 'best', 'top', 'excellent', 'amazing', 'revolutionary', 'cutting-edge'];
  const negativeWords = ['failure', 'problem', 'issue', 'bug', 'vulnerability', 'breach', 'hack', 'attack', 'decline', 'loss', 'worst', 'terrible', 'bad', 'critical', 'emergency', 'crisis'];
  
  const positiveCount = positiveWords.filter(word => text.includes(word)).length;
  const negativeCount = negativeWords.filter(word => text.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

/**
 * Archive a single news article with comprehensive metadata
 */
export async function archiveNewsArticle(
  article: NewsArticle, 
  apiProvider: string,
  rawApiResponse?: any
): Promise<void> {
  try {
    const contentHash = generateContentHash(article.title, article.url, article.publishedAt);
    
    // Check if article already exists to avoid duplicates
    const existing = await storage.getArchivedArticleByHash(contentHash);
    if (existing) {
      console.log(`📚 Article already archived: ${article.title.substring(0, 50)}...`);
      return;
    }

    const tags = extractTags(article.title, article.description);
    const readingTime = calculateReadingTime(article.content, article.description);
    const sentiment = analyzeSentiment(article.title, article.description);
    const wordCount = (article.content || article.description || '').split(/\s+/).length;

    const archiveData: InsertNewsArchive = {
      articleId: article.id,
      title: article.title,
      description: article.description || null,
      content: article.content || null,
      url: article.url,
      urlToImage: article.urlToImage || null,
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
      sourceName: article.source.name,
      sourceUrl: article.source.url || null,
      sourceId: article.source.id || null,
      
      // Categorization and tagging
      category: 'technology',
      tags: tags,
      language: 'en',
      country: null,
      
      // API and source metadata
      apiProvider: apiProvider,
      apiResponseId: `${apiProvider}_${Date.now()}`,
      fetchMethod: 'api',
      
      // Content analysis and metadata
      summary: article.summary || article.description?.substring(0, 300) || null,
      keyPoints: article.keyPoints || [],
      sentiment: sentiment,
      wordCount: wordCount,
      readingTime: readingTime,
      
      // SEO and social metadata
      metaTitle: article.title.length > 60 ? article.title.substring(0, 57) + '...' : article.title,
      metaDescription: article.description?.substring(0, 160) || null,
      ogImage: article.urlToImage || null,
      twitterCard: article.urlToImage ? 'summary_large_image' : 'summary',
      
      // Technical metadata
      contentHash: contentHash,
      imageAnalysis: article.urlToImage ? { hasImage: true, imageUrl: article.urlToImage } : null,
      rawApiResponse: rawApiResponse ? JSON.stringify(rawApiResponse) : null,
      
      // Admin and quality control
      isVerified: false,
      isActive: true,
      qualityScore: calculateQualityScore(article),
      adminNotes: null,
      verifiedBy: null,
      verifiedAt: null,
    };

    await storage.archiveNewsArticle(archiveData);
    console.log(`✅ Archived article: ${article.title.substring(0, 50)}... [${apiProvider}]`);
    
    // Update source statistics
    await storage.updateSourceStats(article.source.name, apiProvider, true);
    
  } catch (error) {
    console.error(`❌ Error archiving article "${article.title}":`, error);
    // Update source statistics for failure
    await storage.updateSourceStats(article.source?.name || 'unknown', apiProvider, false);
  }
}

/**
 * Archive multiple news articles in batch
 */
export async function archiveNewsArticles(
  articles: NewsArticle[], 
  apiProvider: string,
  rawApiResponse?: any
): Promise<{ archived: number; skipped: number; errors: number }> {
  let archived = 0;
  let skipped = 0;
  let errors = 0;

  console.log(`📚 Starting batch archive of ${articles.length} articles from ${apiProvider}`);

  for (const article of articles) {
    try {
      const contentHash = generateContentHash(article.title, article.url, article.publishedAt);
      const existing = await storage.getArchivedArticleByHash(contentHash);
      
      if (existing) {
        skipped++;
        continue;
      }

      await archiveNewsArticle(article, apiProvider, rawApiResponse);
      archived++;
      
    } catch (error) {
      console.error(`❌ Error in batch archive for article "${article.title}":`, error);
      errors++;
    }
  }

  console.log(`📊 Archive batch complete: ${archived} archived, ${skipped} skipped, ${errors} errors`);
  return { archived, skipped, errors };
}

/**
 * Calculate quality score for an article (0-100)
 */
function calculateQualityScore(article: NewsArticle): number {
  let score = 0;
  
  // Title quality (25 points)
  if (article.title && article.title.length > 10) score += 15;
  if (article.title && article.title.length > 30 && article.title.length < 100) score += 10;
  
  // Description quality (25 points)
  if (article.description && article.description.length > 50) score += 15;
  if (article.description && article.description.length > 100) score += 10;
  
  // Content quality (20 points)
  if (article.content && article.content.length > 200) score += 10;
  if (article.content && article.content.length > 500) score += 10;
  
  // Image availability (10 points)
  if (article.urlToImage && article.urlToImage.startsWith('http')) score += 10;
  
  // Source credibility (10 points)
  if (article.source?.name) score += 5;
  if (article.source?.url) score += 5;
  
  // Publication date (10 points)
  if (article.publishedAt) {
    const pubDate = new Date(article.publishedAt);
    const now = new Date();
    const daysDiff = (now.getTime() - pubDate.getTime()) / (1000 * 3600 * 24);
    if (daysDiff <= 7) score += 10; // Recent articles get full points
    else if (daysDiff <= 30) score += 5; // Month-old articles get half points
  }
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Get archive statistics for admin dashboard
 */
export async function getArchiveOverview(): Promise<{
  totalArticles: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
  byProvider: Record<string, number>;
  byCategory: Record<string, number>;
  averageQuality: number;
}> {
  try {
    const stats = await storage.getArchiveStatistics();
    const recentArticles = await storage.getArchivedArticles({ limit: 1000 });
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    const monthAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const todayCount = recentArticles.filter(a => a.archivedAt >= today).length;
    const weekCount = recentArticles.filter(a => a.archivedAt >= weekAgo).length;
    const monthCount = recentArticles.filter(a => a.archivedAt >= monthAgo).length;
    
    const totalQuality = recentArticles.reduce((sum, article) => sum + (article.qualityScore || 0), 0);
    const averageQuality = recentArticles.length > 0 ? Math.round(totalQuality / recentArticles.length) : 0;
    
    return {
      totalArticles: stats.totalArticles,
      todayCount,
      weekCount,
      monthCount,
      byProvider: stats.byProvider,
      byCategory: stats.byCategory,
      averageQuality,
    };
  } catch (error) {
    console.error("Error getting archive overview:", error);
    return {
      totalArticles: 0,
      todayCount: 0,
      weekCount: 0,
      monthCount: 0,
      byProvider: {},
      byCategory: {},
      averageQuality: 0,
    };
  }
}