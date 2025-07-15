import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function Blog() {
  const handleReadMore = (article: string) => {
    trackEvent('read_more', 'blog', article);
  };

  const handleViewAll = () => {
    trackEvent('view_all', 'blog', 'view_all_button');
  };

  const blogPosts = [
    {
      id: 'ai-business-automation',
      category: 'AI & Machine Learning',
      title: 'The Future of AI in Business Automation',
      excerpt: 'Explore how artificial intelligence is revolutionizing business processes and creating new opportunities for growth and efficiency.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      date: 'January 15, 2024',
      categoryColor: 'text-accent'
    },
    {
      id: 'data-driven-decisions',
      category: 'Data Analytics',
      title: 'Data-Driven Decision Making in 2024',
      excerpt: 'Learn how to leverage data analytics to make informed business decisions and drive strategic growth in the digital age.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      date: 'January 10, 2024',
      categoryColor: 'text-purple-600'
    },
    {
      id: 'cloud-migration',
      category: 'Cloud Computing',
      title: 'Cloud Migration Best Practices',
      excerpt: 'Discover essential strategies for successful cloud migration and how to maximize the benefits of cloud technologies.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
      date: 'January 5, 2024',
      categoryColor: 'text-orange-600'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in technology, AI, and digital transformation through our expert analysis and insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className={`text-sm font-semibold mb-2 ${post.categoryColor}`}>
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button
                    onClick={() => handleReadMore(post.id)}
                    className="text-primary font-semibold hover:text-blue-700 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={handleViewAll}
            className="bg-primary text-white hover:bg-blue-700 transition-colors"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
