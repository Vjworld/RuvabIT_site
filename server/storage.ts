import { 
  users, 
  blogPosts, 
  pageContents, 
  navigationItems, 
  componentSettings,
  type User, 
  type InsertUser, 
  type BlogPost, 
  type InsertBlogPost, 
  type UpdateBlogPost,
  type PageContent,
  type InsertPageContent,
  type UpdatePageContent,
  type NavigationItem,
  type InsertNavigationItem,
  type UpdateNavigationItem,
  type ComponentSetting,
  type InsertComponentSetting,
  type UpdateComponentSetting
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Page content methods
  getPageContents(): Promise<PageContent[]>;
  getPageContent(pageKey: string): Promise<PageContent | undefined>;
  createPageContent(content: InsertPageContent): Promise<PageContent>;
  updatePageContent(pageKey: string, content: UpdatePageContent): Promise<PageContent | undefined>;
  deletePageContent(pageKey: string): Promise<boolean>;
  
  // Navigation methods
  getNavigationItems(): Promise<NavigationItem[]>;
  getNavigationItem(id: number): Promise<NavigationItem | undefined>;
  createNavigationItem(item: InsertNavigationItem): Promise<NavigationItem>;
  updateNavigationItem(id: number, item: UpdateNavigationItem): Promise<NavigationItem | undefined>;
  deleteNavigationItem(id: number): Promise<boolean>;
  
  // Component settings methods
  getComponentSettings(): Promise<ComponentSetting[]>;
  getComponentSetting(componentKey: string): Promise<ComponentSetting | undefined>;
  createComponentSetting(setting: InsertComponentSetting): Promise<ComponentSetting>;
  updateComponentSetting(componentKey: string, setting: UpdateComponentSetting): Promise<ComponentSetting | undefined>;
  deleteComponentSetting(componentKey: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private pageContents: Map<string, PageContent>;
  private navigationItems: Map<number, NavigationItem>;
  private componentSettings: Map<string, ComponentSetting>;
  currentUserId: number;
  currentBlogPostId: number;
  currentNavigationId: number;
  currentPageContentId: number;
  currentComponentSettingId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.pageContents = new Map();
    this.navigationItems = new Map();
    this.componentSettings = new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    this.currentNavigationId = 1;
    this.currentPageContentId = 1;
    this.currentComponentSettingId = 1;
    
    // Create default admin user
    this.createUser({
      username: "vsadmin",
      password: "@dminruv_@b", // In production, this should be hashed
    }).then(user => {
      this.users.set(user.id, { ...user, isAdmin: true });
      
      // Create sample blog posts and CMS data
      this.createSamplePosts(user.id);
      this.createDefaultPageContents(user.id);
      this.createDefaultNavigation();
      this.createDefaultComponentSettings(user.id);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const post: BlogPost = {
      ...insertPost,
      id,
      publishedAt: insertPost.isPublished ? now : now, // Always set publishedAt for sorting
      updatedAt: now,
      tags: insertPost.tags || [],
      isPublished: insertPost.isPublished || false,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, updatePost: UpdateBlogPost): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...updatePost,
      updatedAt: new Date(),
      // Update publishedAt only if status changed to published
      publishedAt: updatePost.isPublished && !existingPost.isPublished 
        ? new Date() 
        : existingPost.publishedAt,
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Page content methods
  async getPageContents(): Promise<PageContent[]> {
    return Array.from(this.pageContents.values());
  }

  async getPageContent(pageKey: string): Promise<PageContent | undefined> {
    return this.pageContents.get(pageKey);
  }

  async createPageContent(insertContent: InsertPageContent): Promise<PageContent> {
    const id = this.currentPageContentId++;
    const now = new Date();
    const content: PageContent = {
      ...insertContent,
      id,
      updatedAt: now,
      isActive: insertContent.isActive ?? true,
    };
    this.pageContents.set(insertContent.pageKey, content);
    return content;
  }

  async updatePageContent(pageKey: string, updateContent: UpdatePageContent): Promise<PageContent | undefined> {
    const existingContent = this.pageContents.get(pageKey);
    if (!existingContent) return undefined;

    const updatedContent: PageContent = {
      ...existingContent,
      ...updateContent,
      updatedAt: new Date(),
    };
    this.pageContents.set(pageKey, updatedContent);
    return updatedContent;
  }

  async deletePageContent(pageKey: string): Promise<boolean> {
    return this.pageContents.delete(pageKey);
  }

  // Navigation methods
  async getNavigationItems(): Promise<NavigationItem[]> {
    return Array.from(this.navigationItems.values()).sort((a, b) => a.position - b.position);
  }

  async getNavigationItem(id: number): Promise<NavigationItem | undefined> {
    return this.navigationItems.get(id);
  }

  async createNavigationItem(insertItem: InsertNavigationItem): Promise<NavigationItem> {
    const id = this.currentNavigationId++;
    const now = new Date();
    const item: NavigationItem = {
      ...insertItem,
      id,
      updatedAt: now,
      parentId: insertItem.parentId ?? null,
      position: insertItem.position ?? 0,
      isVisible: insertItem.isVisible ?? true,
    };
    this.navigationItems.set(id, item);
    return item;
  }

  async updateNavigationItem(id: number, updateItem: UpdateNavigationItem): Promise<NavigationItem | undefined> {
    const existingItem = this.navigationItems.get(id);
    if (!existingItem) return undefined;

    const updatedItem: NavigationItem = {
      ...existingItem,
      ...updateItem,
      updatedAt: new Date(),
    };
    this.navigationItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteNavigationItem(id: number): Promise<boolean> {
    return this.navigationItems.delete(id);
  }

  // Component settings methods
  async getComponentSettings(): Promise<ComponentSetting[]> {
    return Array.from(this.componentSettings.values());
  }

  async getComponentSetting(componentKey: string): Promise<ComponentSetting | undefined> {
    return this.componentSettings.get(componentKey);
  }

  async createComponentSetting(insertSetting: InsertComponentSetting): Promise<ComponentSetting> {
    const id = this.currentComponentSettingId++;
    const now = new Date();
    const setting: ComponentSetting = {
      ...insertSetting,
      id,
      updatedAt: now,
      isActive: insertSetting.isActive ?? true,
    };
    this.componentSettings.set(insertSetting.componentKey, setting);
    return setting;
  }

  async updateComponentSetting(componentKey: string, updateSetting: UpdateComponentSetting): Promise<ComponentSetting | undefined> {
    const existingSetting = this.componentSettings.get(componentKey);
    if (!existingSetting) return undefined;

    const updatedSetting: ComponentSetting = {
      ...existingSetting,
      ...updateSetting,
      updatedAt: new Date(),
    };
    this.componentSettings.set(componentKey, updatedSetting);
    return updatedSetting;
  }

  async deleteComponentSetting(componentKey: string): Promise<boolean> {
    return this.componentSettings.delete(componentKey);
  }

  private async createSamplePosts(authorId: number) {
    const samplePosts = [
      {
        title: "The Future of AI in Business Analytics",
        slug: "future-ai-business-analytics",
        excerpt: "Explore how artificial intelligence is transforming business analytics, from predictive modeling to real-time insights that drive strategic decision-making.",
        content: `Artificial intelligence is revolutionizing the way businesses analyze data and make strategic decisions. In today's competitive landscape, companies that leverage AI-powered analytics gain significant advantages over their competitors.

Machine learning algorithms can now process vast amounts of data in real-time, identifying patterns and trends that would be impossible for humans to detect manually. This capability enables businesses to make data-driven decisions faster and more accurately than ever before.

One of the most significant impacts of AI in business analytics is predictive modeling. By analyzing historical data, AI systems can forecast future trends, customer behavior, and market conditions. This allows businesses to proactively address challenges and capitalize on opportunities before they become apparent through traditional analysis methods.

Real-time insights are another game-changer. Traditional analytics often rely on batch processing, which can delay decision-making. AI-powered systems can analyze data as it streams in, providing immediate insights that enable rapid response to changing conditions.

Furthermore, AI democratizes analytics by making complex data analysis accessible to non-technical users. Natural language processing allows business users to query data using plain English, while automated insights generation highlights key findings without requiring deep analytical expertise.

The integration of AI in business analytics also enhances accuracy by reducing human error and bias. Machine learning models can identify subtle correlations and patterns that human analysts might miss, leading to more comprehensive and reliable insights.

Looking ahead, we can expect AI to become even more sophisticated, with advanced capabilities such as automated hypothesis generation, causal inference, and prescriptive analytics that not only predict what will happen but also recommend optimal actions to take.`,
        category: "AI & Machine Learning",
        tags: ["AI", "Business Analytics", "Machine Learning", "Data Science"],
        authorId,
        isPublished: true,
      },
      {
        title: "Process Automation: Streamlining Operations for Maximum Efficiency",
        slug: "process-automation-streamlining-operations",
        excerpt: "Discover how process automation can transform your business operations, reduce costs, and improve efficiency through intelligent workflow optimization.",
        content: `Process automation has emerged as a critical strategy for businesses looking to improve efficiency, reduce costs, and enhance productivity. By automating repetitive tasks and streamlining workflows, organizations can focus their human resources on higher-value activities that drive innovation and growth.

The key to successful process automation lies in identifying the right processes to automate. Not all processes are suitable for automation, and businesses must carefully evaluate which tasks will benefit most from automated solutions. Generally, processes that are repetitive, rule-based, and high-volume are ideal candidates for automation.

Robotic Process Automation (RPA) has become increasingly popular for automating routine tasks such as data entry, invoice processing, and customer service inquiries. RPA bots can work 24/7 without breaks, significantly improving processing times and reducing human error.

Beyond basic task automation, intelligent process automation (IPA) combines RPA with artificial intelligence to handle more complex processes. IPA systems can make decisions, learn from patterns, and adapt to new situations, making them suitable for processes that require some level of cognitive processing.

The benefits of process automation extend beyond cost savings. Automation improves accuracy by eliminating human error, enhances compliance by ensuring consistent process execution, and provides better visibility into operations through detailed logging and reporting.

However, successful automation implementation requires careful planning and change management. Organizations must involve stakeholders early in the process, provide adequate training, and ensure that automated systems integrate seamlessly with existing workflows.

When implementing process automation, it's crucial to start small with pilot projects that demonstrate clear value. This approach allows organizations to learn from experience and gradually expand automation initiatives across the enterprise.

The future of process automation lies in hyperautomation, which combines multiple automation technologies to create end-to-end automated workflows. This approach promises even greater efficiency gains and enables organizations to achieve true digital transformation.`,
        category: "Automation",
        tags: ["Process Automation", "RPA", "Workflow Optimization", "Digital Transformation"],
        authorId,
        isPublished: true,
      },
      {
        title: "Cybersecurity in the Digital Age: Protecting Your Business",
        slug: "cybersecurity-digital-age-protecting-business",
        excerpt: "Learn about the evolving cybersecurity landscape and essential strategies to protect your business from modern threats in an increasingly connected world.",
        content: `In today's digital landscape, cybersecurity has become more critical than ever before. As businesses increasingly rely on digital technologies and remote work arrangements, the attack surface for cyber threats has expanded dramatically. Organizations must adopt comprehensive cybersecurity strategies to protect their valuable data, systems, and reputation.

The threat landscape continues to evolve rapidly, with cybercriminals employing increasingly sophisticated techniques. Ransomware attacks have become particularly prevalent, targeting businesses of all sizes and demanding substantial payments for data recovery. Phishing attacks have also become more sophisticated, often using social engineering techniques to trick employees into revealing sensitive information.

One of the most significant challenges in modern cybersecurity is the human factor. Despite advanced security technologies, human error remains one of the leading causes of security breaches. Employees may inadvertently click on malicious links, use weak passwords, or fall victim to social engineering attacks.

To address these challenges, businesses must implement a multi-layered security approach. This includes deploying advanced endpoint protection, implementing robust network security measures, and establishing comprehensive identity and access management systems. Regular security assessments and penetration testing can help identify vulnerabilities before they can be exploited by attackers.

Employee training and awareness programs are equally important. Regular cybersecurity training helps employees recognize potential threats and understand their role in maintaining organizational security. Simulated phishing exercises can help reinforce training and identify areas where additional education is needed.

The adoption of zero-trust security models is becoming increasingly important. This approach assumes that no user or device should be trusted by default, requiring verification for every access request. Zero-trust principles help limit the potential impact of security breaches by restricting access to only what is necessary for specific roles and functions.

Cloud security has also become a critical concern as more businesses migrate to cloud-based services. Organizations must ensure that their cloud configurations are secure and that they maintain visibility and control over their cloud environments.

Looking ahead, artificial intelligence and machine learning will play increasingly important roles in cybersecurity. These technologies can help detect and respond to threats in real-time, analyze vast amounts of security data, and predict potential attack patterns.`,
        category: "Cybersecurity",
        tags: ["Cybersecurity", "Digital Security", "Threat Protection", "Risk Management"],
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
      },
      {
        pageKey: 'about',
        title: 'About Section',
        content: {
          title: 'About Ruvab IT',
          description1: 'Founded with a vision to bridge the gap between cutting-edge technology and practical business solutions, Ruvab IT has been at the forefront of digital transformation for over a decade.',
          description2: 'Our team of expert engineers, data scientists, and consultants work collaboratively to deliver innovative solutions that drive measurable business results. We specialize in AI implementation, data analytics, and process automation.',
          stats: [
            { value: '500+', label: 'Projects Completed' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '10+', label: 'Years Experience' },
            { value: '50+', label: 'Expert Team' }
          ],
          button: { text: 'Learn More About Us', href: '/about' },
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
        },
        isActive: true,
        updatedBy: authorId,
      }
    ];

    for (const contentData of defaultContents) {
      await this.createPageContent(contentData);
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
