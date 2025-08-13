import { db } from '../server/db.ts';
import { blogPosts } from '../shared/schema.ts';

// INSTRUCTIONS:
// 1. Modify the newPost object below with your blog content
// 2. Run: cd scripts && npx tsx add-single-blog.js

const newPost = {
  title: "Your Blog Title Here",
  slug: "your-blog-title-here", // URL-friendly version (lowercase, hyphens instead of spaces)
  excerpt: "Brief summary of your blog post that will appear in listings and search results. Keep it under 200 characters for best SEO results.",
  category: "Technology", // Options: Technology, AI & Machine Learning, Business Intelligence, Automation, Data Analytics, Digital Transformation, Cybersecurity, Cloud Computing, Software Development, Industry News
  tags: ["tag1", "tag2", "tag3"], // Relevant keywords/topics
  content: `# Your Blog Title Here

## Introduction

Your introduction paragraph that hooks the reader and explains what they'll learn.

## Main Section 1

Your content here. Use proper Markdown formatting:

- Bullet points for lists
- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- \`code snippets\` for technical terms

### Subsection

More detailed content with examples and explanations.

## Main Section 2

Continue with your main points. Include:

1. Numbered lists when order matters
2. Clear explanations
3. Actionable advice

## Best Practices

- Keep paragraphs short and scannable
- Use headings to break up content
- Include practical examples
- End with clear takeaways

## Conclusion

Summarize the key points and provide a clear call-to-action or next steps.

**Takeaway**: Brief summary or key point that readers will remember.`,
  isPublished: true, // Set to false for draft
  authorId: 1
};

async function addBlogPost() {
  try {
    console.log('Adding new blog post...');
    
    const [insertedPost] = await db
      .insert(blogPosts)
      .values({
        ...newPost,
        publishedAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    console.log(`✅ Blog post added successfully!`);
    console.log(`📝 Title: ${insertedPost.title}`);
    console.log(`🔗 URL: https://ruvab.it.com/blog/${insertedPost.slug}`);
    console.log(`📂 Category: ${insertedPost.category}`);
    console.log(`🏷️ Tags: ${insertedPost.tags?.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error adding blog post:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      console.error('💡 Tip: The slug already exists. Try a different slug value.');
    }
  }
  
  process.exit(0);
}

addBlogPost();