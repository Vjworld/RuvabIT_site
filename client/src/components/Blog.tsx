import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { BlogPost } from '@shared/schema';

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
  });

  const handleReadMore = (slug: string) => {
    trackEvent('read_more', 'blog', slug);
  };

  const handleViewAll = () => {
    trackEvent('view_all', 'blog', 'view_all_button');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI & ML': 'text-accent',
      'Data Analytics': 'text-purple-600',
      'Cloud Computing': 'text-orange-600',
      'Automation': 'text-green-600',
      'Business Intelligence': 'text-blue-600',
      'Digital Transformation': 'text-indigo-600',
      'Cybersecurity': 'text-red-600',
      'Software Development': 'text-teal-600',
      'Technology': 'text-gray-600',
      'Tech Industry News': 'text-pink-600'
    };
    return colors[category] || 'text-gray-600';
  };

  const getDefaultImage = (category: string) => {
    const images = {
      'AI & ML': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Data Analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Cloud Computing': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Automation': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Business Intelligence': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Digital Transformation': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Cybersecurity': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Software Development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      'Tech Industry News': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400'
    };
    return images[category] || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400';
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Show the first 3 published blog posts
  const displayPosts = blogPosts
    .filter(post => post.isPublished)
    .slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in technology, AI, and digital transformation through our expert analysis and insights.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-20"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="w-full h-48 bg-gradient-to-br from-blue-600/90 to-purple-600/90 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                  style={{
                    backgroundImage: post.featuredImage 
                      ? `linear-gradient(to bottom right, rgba(37, 99, 235, 0.9), rgba(126, 34, 206, 0.9)), url(${post.featuredImage})`
                      : undefined
                  }}
                >
                  {!post.featuredImage && (
                    <div className="text-white text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-75" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <p className="font-medium">{post.category}</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className={`text-sm font-semibold mb-2 ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      onClick={() => handleReadMore(post.slug)}
                      className="text-primary font-semibold hover:text-blue-700 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button
              onClick={handleViewAll}
              className="bg-primary text-white hover:bg-blue-700 transition-colors"
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
