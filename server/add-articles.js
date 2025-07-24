// Simple script to add multiple blog articles
// Run this with: node server/add-articles.js

const articles = [
  // PASTE YOUR ARTICLES HERE IN THIS FORMAT:
  /*
  {
    title: "Your Article Title",
    slug: "your-article-slug", // URL-friendly version (lowercase, hyphens)
    excerpt: "Brief summary of your article (2-3 sentences)",
    featuredImage: "https://images.unsplash.com/photo-1234567890?w=1200&h=600&fit=crop&q=80", // Background image URL (optional)
    content: `# Your Article Title
    
Your full article content here. You can use:
- **Bold text**
- *Italic text*
- ## Subheadings
- Lists like this one
- Links: [link text](https://example.com)

Multiple paragraphs work fine.

## Another Section

More content here.`,
    category: "Your Category", // e.g., "AI & ML", "Business", "Technology"
    tags: ["tag1", "tag2", "tag3"], // Array of relevant tags
  },
  */
  
  // Example article (you can replace this):
  {
    title: "Getting Started with Your New Blog",
    slug: "getting-started-blog",
    excerpt: "Learn how to add and manage your blog articles on the Ruvab IT website with this simple guide.",
    featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop&q=80",
    content: `# Getting Started with Your New Blog

Welcome to your blog management system! This guide will help you understand how to add new articles.

## Article Structure

Each article should include:
- **Title**: Clear and descriptive
- **Slug**: URL-friendly version (lowercase-with-hyphens)
- **Excerpt**: Brief 2-3 sentence summary
- **Content**: Full article in Markdown format
- **Category**: Topic category
- **Tags**: Relevant keywords

## Content Formatting

You can use Markdown formatting:
- Use \`#\` for main headings
- Use \`##\` for subheadings
- Use \`**bold**\` for emphasis
- Use \`-\` for bullet lists
- Use links: [Ruvab IT](https://ruvab.it.com)

## Publishing

All articles are automatically published when added to the system.`,
    category: "Guide",
    tags: ["blogging", "guide", "getting-started"],
  }
];

// You don't need to modify anything below this line
const fs = require('fs');
const path = require('path');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function validateArticle(article, index) {
  const errors = [];
  
  if (!article.title) errors.push(`Article ${index + 1}: Missing title`);
  if (!article.content) errors.push(`Article ${index + 1}: Missing content`);
  if (!article.category) errors.push(`Article ${index + 1}: Missing category`);
  if (!article.excerpt) errors.push(`Article ${index + 1}: Missing excerpt`);
  
  // Auto-generate slug if missing
  if (!article.slug && article.title) {
    article.slug = generateSlug(article.title);
  }
  
  // Default tags if missing
  if (!article.tags) {
    article.tags = [];
  }
  
  return errors;
}

function generateStorageUpdate() {
  let allErrors = [];
  
  // Validate all articles
  articles.forEach((article, index) => {
    const errors = validateArticle(article, index);
    allErrors = allErrors.concat(errors);
  });
  
  if (allErrors.length > 0) {
    console.error('❌ Validation errors:');
    allErrors.forEach(error => console.error('  ', error));
    return;
  }
  
  if (articles.length === 0) {
    console.log('ℹ️  No articles found. Please add your articles to the articles array at the top of this file.');
    return;
  }
  
  // Generate the code to add to storage.ts
  const articlesCode = articles.map(article => `      {
        title: ${JSON.stringify(article.title)},
        slug: ${JSON.stringify(article.slug)},
        excerpt: ${JSON.stringify(article.excerpt)},
        content: \`${article.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
        category: ${JSON.stringify(article.category)},
        tags: ${JSON.stringify(article.tags)},
        authorId: 1,
        isPublished: true,
      }`).join(',\n');

  const fullCode = `    const newArticles = [
${articlesCode}
    ];

    for (const articleData of newArticles) {
      await this.createBlogPost(articleData);
    }`;

  console.log('✅ Articles validated successfully!');
  console.log(`📝 Found ${articles.length} articles to add.`);
  console.log('\n📋 Copy this code and paste it into the createDefaultBlogPosts method in server/storage.ts:');
  console.log('\n' + '='.repeat(60));
  console.log(fullCode);
  console.log('='.repeat(60));
  console.log('\n💡 Instructions:');
  console.log('1. Open server/storage.ts');
  console.log('2. Find the createDefaultBlogPosts method');
  console.log('3. Add the code above after the existing samplePosts');
  console.log('4. Save the file and restart the server');
}

generateStorageUpdate();