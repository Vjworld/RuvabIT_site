# Blog Management Scripts

This directory contains scripts for adding and managing blog posts across the Ruvab IT ecosystem.

## Quick Start

### Add a Single Blog Post
1. Edit `add-single-blog.js` with your content
2. Run: `cd scripts && npx tsx add-single-blog.js`

### Add Multiple Blog Posts
1. Edit `add-bulk-blogs.js` with your posts array
2. Run: `cd scripts && npx tsx add-bulk-blogs.js`

## Available Categories

- Technology
- AI & Machine Learning  
- Business Intelligence
- Automation
- Data Analytics
- Digital Transformation
- Cybersecurity
- Cloud Computing
- Software Development
- Industry News

## Blog Post Structure

```javascript
{
  title: "Your Blog Title",
  slug: "url-friendly-slug",
  excerpt: "Brief summary for listings and SEO",
  category: "Technology",
  tags: ["tag1", "tag2", "tag3"],
  content: "Full Markdown content...",
  isPublished: true,
  authorId: 1
}
```

## Content Guidelines

- **Length**: 700-1200 words for optimal SEO
- **Format**: Use Markdown for content
- **Structure**: Include clear headings and takeaways
- **SEO**: Include relevant keywords naturally
- **Value**: Provide actionable insights

## URL Structure

Blog posts will be available at:
- `https://ruvab.it.com/blog/{slug}`

## Need Help?

See the complete guide in `BLOG_MANAGEMENT_GUIDE.md` for detailed instructions and best practices.