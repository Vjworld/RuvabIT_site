# News Archive System - Admin Backup & Contingency Documentation

## Overview
The News Archive System is a comprehensive backup solution designed for admin use, providing complete historical storage of all technology news articles fetched from multiple API providers. This system ensures data persistence, contingency planning, and detailed analytics for administrative oversight.

## Key Features

### 🏛️ Complete Historical Storage
- **All Articles Archived**: Every news article fetched from NewsNow (RapidAPI) and NewsAPI.ai is automatically stored
- **Comprehensive Metadata**: Full article content, source information, API response data, and quality metrics
- **Deduplication**: Content hash-based unique constraints prevent duplicate storage
- **Persistent Database**: PostgreSQL-backed storage with indexing for optimal performance

### 📊 Advanced Analytics & Categorization
- **Source Tracking**: Monitor performance and reliability of each news source
- **Quality Scoring**: Automated 0-100 quality assessment based on content completeness
- **Sentiment Analysis**: Basic positive/negative/neutral sentiment classification
- **Tag Extraction**: Automatic keyword and technology tag identification
- **Reading Time Calculation**: Estimated reading time based on content length

### 🔒 Admin-Only Access
- **Secure Endpoints**: All archive access requires admin authentication
- **Role-Based Permissions**: Only users with `isAdmin: true` can access archived data
- **Export Functionality**: CSV export for external analysis and backup

## Database Schema

### News Archive Table (`news_archive`)
```sql
CREATE TABLE news_archive (
  id SERIAL PRIMARY KEY,
  article_id VARCHAR NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  url TEXT NOT NULL,
  url_to_image TEXT,
  published_at TIMESTAMP,
  source_name VARCHAR NOT NULL,
  source_url TEXT,
  source_id VARCHAR,
  
  -- Categorization
  category VARCHAR DEFAULT 'technology',
  tags TEXT[] DEFAULT '{}',
  language VARCHAR DEFAULT 'en',
  country VARCHAR,
  
  -- API and source metadata
  api_provider VARCHAR NOT NULL,
  api_response_id VARCHAR,
  fetch_method VARCHAR DEFAULT 'api',
  
  -- Content analysis
  summary TEXT,
  key_points TEXT[] DEFAULT '{}',
  sentiment VARCHAR DEFAULT 'neutral',
  word_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 1,
  
  -- SEO and social metadata
  meta_title VARCHAR,
  meta_description TEXT,
  og_image TEXT,
  twitter_card VARCHAR,
  
  -- Technical metadata
  content_hash VARCHAR UNIQUE NOT NULL,
  image_analysis JSONB,
  raw_api_response JSONB,
  
  -- Admin and quality control
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  quality_score INTEGER DEFAULT 0,
  admin_notes TEXT,
  verified_by INTEGER,
  verified_at TIMESTAMP,
  
  -- Timestamps
  archived_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Source Statistics Table (`news_source_stats`)
- Tracks API provider performance and reliability
- Records fetch success/failure rates
- Monitors response times and uptime percentages

## API Endpoints (Admin Only)

### 1. Get Archived Articles
```
GET /api/admin/news-archive
Authorization: Required (Admin role)

Query Parameters:
- page: Page number (default: 1)
- limit: Articles per page (default: 50, max: 100)
- provider: Filter by API provider ('newsnow' | 'newsapi_ai')
- category: Filter by category
- dateFrom: Filter articles from date (ISO format)
- dateTo: Filter articles to date (ISO format)
- search: Search in title, description, and source name

Response:
{
  "articles": [NewsArchive[]],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "hasMore": true
  },
  "filters": { ... }
}
```

### 2. Get Archive Statistics
```
GET /api/admin/news-archive/stats
Authorization: Required (Admin role)

Response:
{
  "overview": {
    "totalArticles": 1250,
    "byProvider": { "newsnow": 750, "newsapi_ai": 500 },
    "byCategory": { "technology": 1200, "ai": 50 },
    "averageQuality": 85
  },
  "sources": [SourceStats[]],
  "recentActivity": [RecentArticle[]]
}
```

### 3. Export Articles (CSV)
```
GET /api/admin/news-archive/export
Authorization: Required (Admin role)

Query Parameters:
- provider: Filter by API provider
- dateFrom: Export articles from date
- dateTo: Export articles to date

Response: CSV file download
Content-Type: text/csv
Content-Disposition: attachment; filename="news-archive-YYYY-MM-DD.csv"
```

## Automatic Archiving Process

### When Articles Are Archived
1. **Fresh News Fetch**: Every time new articles are fetched from APIs (every 12 hours)
2. **Parallel Processing**: Archive operations run alongside caching for optimal performance
3. **Non-Blocking**: Archive failures don't affect the main news serving functionality
4. **Deduplication**: Content hash prevents storing duplicate articles

### Archive Workflow
```typescript
// During news API fetch in /api/technology-news
try {
  // ... fetch articles from NewsNow and NewsAPI.ai ...
  
  // Archive all fetched articles for admin backup
  const archivePromises = [];
  
  // Separate articles by provider
  const newsNowArticles = limitedArticles.filter(article => 
    article.source?.name === 'NewsNow'
  );
  const newsApiArticles = limitedArticles.filter(article => 
    article.source?.name?.includes('Event Registry')
  );
  
  // Archive in parallel
  if (newsNowArticles.length > 0) {
    archivePromises.push(
      archiveNewsArticles(newsNowArticles, 'newsnow', rawApiResponse)
    );
  }
  
  if (newsApiArticles.length > 0) {
    archivePromises.push(
      archiveNewsArticles(newsApiArticles, 'newsapi_ai', rawApiResponse)
    );
  }
  
  // Execute and track results
  const archiveResults = await Promise.all(archivePromises);
  console.log(`📊 Archive complete: ${totalArchived} new articles archived`);
  
} catch (archiveError) {
  // Archive failures are non-critical - don't break main flow
  console.error("⚠️  Archive failed (non-critical):", archiveError);
}
```

## Quality Scoring Algorithm

Each archived article receives a quality score (0-100) based on:

- **Title Quality (25 points)**: Length and completeness
- **Description Quality (25 points)**: Content depth and informativeness  
- **Content Quality (20 points)**: Full article text availability and length
- **Image Availability (10 points)**: Presence of valid featured images
- **Source Credibility (10 points)**: Known source name and URL
- **Publication Date (10 points)**: Recency bonus for fresh content

## Content Analysis Features

### Sentiment Analysis
- **Positive**: Innovation, breakthrough, success, growth keywords
- **Negative**: Failure, vulnerability, crisis, decline keywords  
- **Neutral**: Default classification for balanced content

### Keyword Extraction
Automatic detection of technology-related terms:
- AI/ML: artificial intelligence, machine learning, neural networks
- Blockchain: cryptocurrency, bitcoin, ethereum, web3, DeFi
- Cloud: AWS, Azure, Google Cloud, Kubernetes, serverless
- Programming: JavaScript, Python, React, APIs, microservices
- Security: cybersecurity, privacy, encryption, vulnerabilities
- Business: startup, funding, IPO, acquisition, venture capital
- Mobile: iOS, Android, mobile apps, 5G, connectivity
- Emerging Tech: quantum computing, IoT, VR/AR, autonomous vehicles

## Admin Use Cases

### 1. Historical Analysis
- Track technology trends over time
- Analyze source reliability and bias
- Monitor content quality improvements
- Export data for external research

### 2. Contingency Planning
- **API Failures**: Complete backup when external APIs are down
- **Data Recovery**: Restore missing articles from archive
- **Compliance**: Historical records for audit and legal requirements
- **Performance Analysis**: Track and optimize news fetching strategies

### 3. Content Management
- Verify article authenticity and sources
- Add admin notes and verification status
- Curate high-quality content for featured sections
- Identify and flag low-quality or duplicate content

## Performance Optimization

### Database Indexing
- Primary indexes on ID, archived_at, api_provider, category
- Unique index on content_hash for deduplication
- Composite indexes for common query patterns

### Storage Efficiency
- JSONB storage for structured metadata
- Text arrays for tags and key points
- Minimal redundancy with normalized source data

### Monitoring
- Real-time archive operation logging
- Success/failure rate tracking per provider
- Performance metrics and response time monitoring

## Security Considerations

### Access Control
- Admin-only endpoints with role-based authentication
- Session-based security with PostgreSQL session storage
- No public exposure of archived content

### Data Protection
- Content hashing for integrity verification
- Secure API key management for external services
- No personally identifiable information (PII) storage

## Maintenance

### Automated Cleanup
- Expired cache cleanup runs during each fetch cycle
- Configurable retention policies for archived content
- Orphaned data detection and removal

### Manual Maintenance
- Admin can verify and annotate articles
- Quality score recalculation capabilities
- Source reliability adjustments

---

## Implementation Status: ✅ COMPLETED

- ✅ Database schema implemented and deployed
- ✅ Archive helper functions created and tested
- ✅ Integration with technology news API endpoint
- ✅ Admin-only API endpoints for archive access
- ✅ Automatic archiving during news fetching
- ✅ Content deduplication with hash-based uniqueness
- ✅ Quality scoring and sentiment analysis
- ✅ Export functionality for CSV downloads
- ✅ Comprehensive logging and error handling

The News Archive System is fully operational and automatically backing up all technology news articles for admin use, providing a robust contingency solution and comprehensive historical data repository.