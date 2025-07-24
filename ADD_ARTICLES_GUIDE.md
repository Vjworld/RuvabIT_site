# How to Add Your 15 Blog Articles

## Step 1: Prepare Your Articles

1. Open the file `server/add-articles.js`
2. Replace the example article with your 15 articles in this format:

```javascript
{
  title: "Your Article Title",
  slug: "your-article-slug", // URL-friendly (lowercase-with-hyphens)
  excerpt: "Brief 2-3 sentence summary of your article",
  featuredImage: "https://images.unsplash.com/photo-1234567890?w=1200&h=600&fit=crop&q=80", // Background image URL (optional)
  content: `# Your Article Title
  
Your full article content here using Markdown formatting:

## Subheading
- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

Multiple paragraphs work perfectly.`,
  category: "Your Category", // e.g., "AI & Technology", "Business Strategy"
  tags: ["tag1", "tag2", "tag3"], // Relevant keywords
},
```

## Step 2: Generate the Code

1. Run the script: `node server/add-articles.js`
2. The script will validate your articles and generate code
3. Copy the generated code

## Step 3: Add to Storage

1. Open `server/storage.ts`
2. Find the `createDefaultBlogPosts` method
3. Paste the generated code after the existing articles
4. Save the file

## Step 4: Restart and Verify

1. The server will automatically restart
2. Visit `/blog` to see all your articles
3. Click on any article to view the full content

## Article Formatting Tips

- **Title**: Clear and descriptive
- **Slug**: Lowercase with hyphens (auto-generated if not provided)
- **Excerpt**: 2-3 sentences that summarize the article
- **Featured Image**: URL to a background image (optional) - recommended size 1200x600px
- **Content**: Use Markdown formatting for best results
- **Category**: Group related articles (e.g., "AI & ML", "Business", "Technology")
- **Tags**: Help with organization and SEO

## Featured Image Options

You can use images from:
1. **Unsplash** (free): `https://images.unsplash.com/photo-ID?w=1200&h=600&fit=crop&q=80`
2. **Your own images**: Upload to a cloud service and use the URL
3. **Stock photo sites**: Any direct image URL works
4. **Leave blank**: A default gradient will be used

**Recommended image dimensions**: 1200x600 pixels for best results

## Content Formatting Examples

```markdown
# Main Heading
## Subheading
### Smaller heading

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Another item

[Link text](https://example.com)

> Quote blocks look great

Code snippets: `inline code`
```

## Need Help?

If you encounter any issues:
1. Check the console for validation errors
2. Ensure all required fields are filled
3. Make sure slugs are unique
4. Verify Markdown formatting is correct