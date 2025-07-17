import { users, blogPosts, type User, type InsertUser, type BlogPost, type InsertBlogPost, type UpdateBlogPost } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  currentUserId: number;
  currentBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    
    // Create default admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In production, this should be hashed
    }).then(user => {
      this.users.set(user.id, { ...user, isAdmin: true });
      
      // Create sample blog posts
      this.createSamplePosts(user.id);
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
      publishedAt: now,
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
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
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
}

export const storage = new MemStorage();
