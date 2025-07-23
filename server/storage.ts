import { 
  users, blogPosts, pageContents, navigationItems, componentSettings,
  type User, type InsertUser, type BlogPost, type InsertBlogPost, 
  type PageContent, type InsertPageContent, type UpdatePageContent,
  type NavigationItem, type InsertNavigationItem, type ComponentSetting, 
  type InsertComponentSetting 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;

  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Page content operations
  getPageContents(): Promise<PageContent[]>;
  getPageContent(pageKey: string): Promise<PageContent | undefined>;
  createPageContent(content: InsertPageContent): Promise<PageContent>;
  updatePageContent(pageKey: string, content: UpdatePageContent): Promise<PageContent | undefined>;
  deletePageContent(pageKey: string): Promise<boolean>;

  // Navigation operations
  getNavigationItems(): Promise<NavigationItem[]>;
  createNavigationItem(item: InsertNavigationItem): Promise<NavigationItem>;
  updateNavigationItem(id: number, item: Partial<InsertNavigationItem>): Promise<NavigationItem | undefined>;
  deleteNavigationItem(id: number): Promise<boolean>;

  // Component settings operations
  getComponentSettings(): Promise<ComponentSetting[]>;
  getComponentSetting(componentKey: string): Promise<ComponentSetting | undefined>;
  createComponentSetting(setting: InsertComponentSetting): Promise<ComponentSetting>;
  updateComponentSetting(componentKey: string, setting: Partial<InsertComponentSetting>): Promise<ComponentSetting | undefined>;
  deleteComponentSetting(componentKey: string): Promise<boolean>;

  // Initialize default data
  initializeDefaultData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: User[] = [];
  private blogPosts: BlogPost[] = [];
  private pageContents: PageContent[] = [];
  private navigationItems: NavigationItem[] = [];
  private componentSettings: ComponentSetting[] = [];
  private nextUserId = 1;
  private nextBlogPostId = 1;
  private nextPageContentId = 1;
  private nextNavigationItemId = 1;
  private nextComponentSettingId = 1;

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      username: insertUser.username,
      password: insertUser.password,
      isAdmin: insertUser.isAdmin ?? false,
    };
    this.users.push(user);
    return user;
  }

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

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const index = this.blogPosts.findIndex(post => post.id === id);
    if (index === -1) return undefined;

    this.blogPosts[index] = {
      ...this.blogPosts[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.blogPosts[index];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const index = this.blogPosts.findIndex(post => post.id === id);
    if (index === -1) return false;
    
    this.blogPosts.splice(index, 1);
    return true;
  }

  // Page content operations
  async getPageContents(): Promise<PageContent[]> {
    return [...this.pageContents];
  }

  async getPageContent(pageKey: string): Promise<PageContent | undefined> {
    return this.pageContents.find(content => content.pageKey === pageKey);
  }

  async createPageContent(insertContent: InsertPageContent): Promise<PageContent> {
    const content: PageContent = {
      id: this.nextPageContentId++,
      pageKey: insertContent.pageKey,
      title: insertContent.title,
      content: insertContent.content,
      isActive: insertContent.isActive ?? true,
      updatedBy: insertContent.updatedBy,
      updatedAt: new Date(),
    };
    this.pageContents.push(content);
    return content;
  }

  async updatePageContent(pageKey: string, updateData: UpdatePageContent): Promise<PageContent | undefined> {
    const index = this.pageContents.findIndex(content => content.pageKey === pageKey);
    if (index === -1) return undefined;

    this.pageContents[index] = {
      ...this.pageContents[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.pageContents[index];
  }

  async deletePageContent(pageKey: string): Promise<boolean> {
    const index = this.pageContents.findIndex(content => content.pageKey === pageKey);
    if (index === -1) return false;
    
    this.pageContents.splice(index, 1);
    return true;
  }

  // Navigation operations
  async getNavigationItems(): Promise<NavigationItem[]> {
    return [...this.navigationItems].sort((a, b) => a.position - b.position);
  }

  async createNavigationItem(insertItem: InsertNavigationItem): Promise<NavigationItem> {
    const item: NavigationItem = {
      id: this.nextNavigationItemId++,
      label: insertItem.label,
      href: insertItem.href,
      type: insertItem.type,
      parentId: insertItem.parentId ?? null,
      position: insertItem.position ?? 0,
      isVisible: insertItem.isVisible ?? true,
      updatedAt: new Date(),
    };
    this.navigationItems.push(item);
    return item;
  }

  async updateNavigationItem(id: number, updateData: Partial<InsertNavigationItem>): Promise<NavigationItem | undefined> {
    const index = this.navigationItems.findIndex(item => item.id === id);
    if (index === -1) return undefined;

    this.navigationItems[index] = {
      ...this.navigationItems[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.navigationItems[index];
  }

  async deleteNavigationItem(id: number): Promise<boolean> {
    const index = this.navigationItems.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.navigationItems.splice(index, 1);
    return true;
  }

  // Component settings operations
  async getComponentSettings(): Promise<ComponentSetting[]> {
    return [...this.componentSettings];
  }

  async getComponentSetting(componentKey: string): Promise<ComponentSetting | undefined> {
    return this.componentSettings.find(setting => setting.componentKey === componentKey);
  }

  async createComponentSetting(insertSetting: InsertComponentSetting): Promise<ComponentSetting> {
    const setting: ComponentSetting = {
      id: this.nextComponentSettingId++,
      componentKey: insertSetting.componentKey,
      settings: insertSetting.settings,
      isActive: insertSetting.isActive ?? true,
      updatedBy: insertSetting.updatedBy,
      updatedAt: new Date(),
    };
    this.componentSettings.push(setting);
    return setting;
  }

  async updateComponentSetting(componentKey: string, updateData: Partial<InsertComponentSetting>): Promise<ComponentSetting | undefined> {
    const index = this.componentSettings.findIndex(setting => setting.componentKey === componentKey);
    if (index === -1) return undefined;

    this.componentSettings[index] = {
      ...this.componentSettings[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.componentSettings[index];
  }

  async deleteComponentSetting(componentKey: string): Promise<boolean> {
    const index = this.componentSettings.findIndex(setting => setting.componentKey === componentKey);
    if (index === -1) return false;
    
    this.componentSettings.splice(index, 1);
    return true;
  }

  // Initialize default data
  async initializeDefaultData(): Promise<void> {
    console.log("Storage: Starting initialization...");
    
    // Create default admin user
    const adminUser = await this.createUser({
      username: 'vsadmin',
      password: '@dminruv_@b', // In production, this should be hashed
      isAdmin: true,
    });
    console.log("Storage: Created admin user");

    // Create default blog posts
    await this.createDefaultBlogPosts(adminUser.id);
    console.log("Storage: Created default blog posts, total posts:", this.blogPosts.length);
    
    // Create default page contents
    await this.createDefaultPageContents(adminUser.id);
    
    // Create default navigation
    await this.createDefaultNavigation();
    
    // Create default component settings
    await this.createDefaultComponentSettings(adminUser.id);
    
    console.log("Storage: Initialization complete");
  }

  private async createDefaultBlogPosts(authorId: number) {
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
        authorId,
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
        authorId,
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
        authorId,
        isPublished: true,
      }
    ];

    for (const postData of samplePosts) {
      await this.createBlogPost(postData);
    }
  }

  private async createDefaultPageContents(authorId: number) {
    const defaultContents = [
      {
        pageKey: 'hero',
        title: 'Hero Section',
        content: {
          mainTitle: 'Transform Your Business with',
          highlightTitle: 'Advanced Technology Solutions',
          description: 'Harness the power of AI, machine learning, and automation to solve complex business problems and drive growth with our innovative technology solutions.',
          primaryButton: { text: 'Start Free Trial', href: '/trend-solver' },
          secondaryButton: { text: 'Watch Demo', action: 'demo' },
          backgroundImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
        },
        isActive: true,
        updatedBy: authorId,
      }
    ];

    for (const content of defaultContents) {
      await this.createPageContent(content);
    }
  }

  private async createDefaultNavigation() {
    const defaultNavItems = [
      { label: 'Home', href: '/', type: 'link', parentId: null, position: 1, isVisible: true },
      { label: 'Products', href: '/#products', type: 'dropdown', parentId: null, position: 2, isVisible: true },
      { label: 'Services', href: '/services', type: 'dropdown', parentId: null, position: 3, isVisible: true },
      { label: 'About', href: '/about', type: 'link', parentId: null, position: 4, isVisible: true },
      { label: 'Blog', href: '/blog', type: 'link', parentId: null, position: 5, isVisible: true },
      { label: 'Contact', href: '/contact', type: 'link', parentId: null, position: 6, isVisible: true },
    ];

    for (const navItem of defaultNavItems) {
      await this.createNavigationItem(navItem);
    }
  }

  private async createDefaultComponentSettings(authorId: number) {
    const defaultSettings = [
      {
        componentKey: 'hero-buttons',
        settings: {
          primaryButton: { enabled: true, text: 'Start Free Trial', href: '/trend-solver', style: 'primary' },
          secondaryButton: { enabled: true, text: 'Watch Demo', action: 'demo', style: 'outline' }
        },
        isActive: true,
        updatedBy: authorId,
      },
      {
        componentKey: 'contact-form',
        settings: {
          fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'company', label: 'Company', type: 'text', required: false },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ],
          submitButton: { text: 'Send Message', style: 'primary' }
        },
        isActive: true,
        updatedBy: authorId,
      }
    ];

    for (const settingData of defaultSettings) {
      await this.createComponentSetting(settingData);
    }
  }
}

export const storage = new MemStorage();