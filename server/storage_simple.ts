import { 
  type BlogPost, type InsertBlogPost
} from "@shared/schema";

export interface IStorage {
  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost>;

  // Initialize default data
  initializeDefaultData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private blogPosts: BlogPost[] = [];
  private nextBlogPostId = 1;

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return [...this.blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.find(post => post.id === id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find(post => post.slug === slug);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const blogPost: BlogPost = {
      id: this.nextBlogPostId++,
      title: insertBlogPost.title,
      slug: insertBlogPost.slug,
      excerpt: insertBlogPost.excerpt,
      content: insertBlogPost.content,
      category: insertBlogPost.category,
      tags: insertBlogPost.tags ?? [],
      authorId: insertBlogPost.authorId,
      isPublished: insertBlogPost.isPublished ?? false,
      publishedAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.push(blogPost);
    return blogPost;
  }

  // Initialize default data
  async initializeDefaultData(): Promise<void> {
    console.log("Storage: Starting initialization...");
    
    // Create default published blog posts (no admin user needed)
    await this.createDefaultBlogPosts();
    console.log("Storage: Created default blog posts, total posts:", this.blogPosts.length);
    
    console.log("Storage: Initialization complete");
  }

  private async createDefaultBlogPosts() {
    const samplePosts = [
      {
        title: "The Future of AI in Business Automation",
        slug: "future-ai-business-automation",
        excerpt: "Explore how artificial intelligence is revolutionizing business processes and creating new opportunities for growth and efficiency across industries.",
        content: `# The Future of AI in Business Automation

Artificial Intelligence is transforming the business landscape at an unprecedented pace. From streamlining operations to enhancing customer experiences, AI-powered automation is becoming the backbone of modern enterprises.

## Key Areas of AI Implementation

### Process Automation
AI is revolutionizing routine business processes by automating repetitive tasks, reducing human error, and increasing operational efficiency. Companies are leveraging AI to handle everything from data entry to complex decision-making processes.

### Customer Service Enhancement
Intelligent chatbots and virtual assistants are providing 24/7 customer support, handling multiple queries simultaneously while learning from each interaction to improve future responses.

### Predictive Analytics
Businesses are using AI to analyze vast amounts of data, predict market trends, and make informed decisions about inventory management, pricing strategies, and resource allocation.

## Benefits and Challenges

The implementation of AI in business automation offers numerous benefits including cost reduction, improved accuracy, and enhanced scalability. However, organizations must also address challenges such as data privacy, ethical considerations, and the need for skilled AI professionals.

## Looking Ahead

The future of AI in business automation promises even more sophisticated applications, including advanced machine learning algorithms, natural language processing improvements, and better integration with existing business systems.`,
        category: "AI & ML",
        tags: ["AI", "Automation", "Business Intelligence", "Machine Learning"],
        authorId: 1, // No actual user needed since CMS is removed
        isPublished: true,
      },
      {
        title: "Data-Driven Decision Making in 2025",
        slug: "data-driven-decision-making-2025",
        excerpt: "Learn how to leverage data analytics to make informed business decisions and drive strategic growth in the digital age.",
        content: `# Data-Driven Decision Making in 2025

In today's data-rich environment, organizations that harness the power of data analytics gain a significant competitive advantage. Data-driven decision making has evolved from a nice-to-have capability to a business imperative.

## The Data Revolution

Modern businesses generate enormous amounts of data from various sources including customer interactions, operational processes, and market activities. The challenge lies not in collecting data, but in transforming it into actionable insights.

## Key Components of Data-Driven Strategy

### Data Collection and Integration
Successful data-driven organizations invest in robust data collection systems that integrate information from multiple sources, creating a comprehensive view of business operations.

### Advanced Analytics Tools
Leveraging sophisticated analytics platforms, businesses can uncover patterns, trends, and correlations that were previously invisible, enabling more informed strategic decisions.

### Real-Time Insights
The ability to access and analyze data in real-time allows organizations to respond quickly to market changes and customer needs.

## Implementation Best Practices

Organizations should focus on building a data-driven culture, investing in the right technology infrastructure, and ensuring data quality and governance. Training teams to interpret and act on data insights is equally important.

## Future Outlook

As we move forward, artificial intelligence and machine learning will play increasingly important roles in automated data analysis and decision-making processes.`,
        category: "Data Analytics",
        tags: ["Data Analytics", "Business Intelligence", "Strategy", "Digital Transformation"],
        authorId: 1,
        isPublished: true,
      },
      {
        title: "Cloud Migration Best Practices",
        slug: "cloud-migration-best-practices",
        excerpt: "Discover essential strategies for successful cloud migration and how to maximize the benefits of cloud technologies.",
        content: `# Cloud Migration Best Practices

Cloud migration has become a strategic priority for organizations seeking to modernize their IT infrastructure, reduce costs, and improve scalability. However, successful migration requires careful planning and execution.

## Planning Your Migration Strategy

### Assessment and Inventory
Begin with a comprehensive assessment of your current infrastructure, applications, and data. Understand dependencies, performance requirements, and compliance needs.

### Migration Approach Selection
Choose the right migration strategy for each application: rehosting (lift and shift), replatforming, refactoring, or rebuilding. Each approach has different benefits and considerations.

## Key Success Factors

### Security and Compliance
Ensure that security measures are in place throughout the migration process. Understand compliance requirements for your industry and implement appropriate controls.

### Performance Optimization
Monitor application performance during and after migration. Optimize configurations and take advantage of cloud-native features to improve efficiency.

### Cost Management
Implement cost monitoring and optimization strategies to avoid unexpected expenses. Use cloud cost management tools to track and control spending.

## Best Practices

- Start with non-critical applications to gain experience
- Implement robust backup and disaster recovery procedures
- Train your team on cloud technologies and best practices
- Establish clear governance and operational procedures

## Conclusion

Successful cloud migration requires careful planning, execution, and ongoing optimization. Organizations that follow best practices can achieve significant benefits in terms of cost savings, scalability, and operational efficiency.`,
        category: "Cloud Computing",
        tags: ["Cloud Migration", "Infrastructure", "Digital Transformation", "Best Practices"],
        authorId: 1,
        isPublished: true,
      }
    ];

    for (const postData of samplePosts) {
      await this.createBlogPost(postData);
    }
  }
}

export const storage = new MemStorage();