import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function Products() {
  const handleLearnMore = (product: string) => {
    trackEvent('learn_more', 'product', product);
    if (product === 'trend_solver') {
      window.location.href = '/trend-solver';
    } else if (product === 'langscribe') {
      window.location.href = '/langscribe';
    }
  };

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Featured Products</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our cutting-edge solutions designed to solve real-world business challenges and accelerate your digital transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Trend Solver Product */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4 sm:mb-6">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                alt="AI-powered analytics dashboard showing trend analysis"
                className="rounded-xl w-full h-40 sm:h-48 object-cover"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Trend Solver</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Advanced AI-powered market analysis tool that identifies emerging trends, predicts market movements, and provides actionable insights for strategic decision-making.
            </p>
            <ul className="space-y-2 mb-4 sm:mb-6">
              <li className="flex items-center text-sm sm:text-base text-gray-700">
                <span className="text-accent mr-2">✓</span>
                Real-time market trend analysis
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-700">
                <span className="text-accent mr-2">✓</span>
                Predictive analytics and forecasting
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-700">
                <span className="text-accent mr-2">✓</span>
                Automated reporting and alerts
              </li>
            </ul>
            <Button
              onClick={() => handleLearnMore('trend_solver')}
              className="bg-primary text-white hover:bg-blue-700 transition-colors w-full text-sm sm:text-base"
            >
              Learn More
            </Button>
          </div>
          
          {/* LangScribe Product */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4 sm:mb-6">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                alt="Content creation workspace with AI-powered writing tools"
                className="rounded-xl w-full h-40 sm:h-48 object-cover"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">LangScribe</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Intelligent content creation platform that leverages natural language processing to generate high-quality, SEO-optimized content for various business needs.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-accent mr-2">✓</span>
                AI-powered content generation
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-accent mr-2">✓</span>
                SEO optimization and analysis
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-accent mr-2">✓</span>
                Multi-language support
              </li>
            </ul>
            <Button
              onClick={() => handleLearnMore('langscribe')}
              className="bg-purple-600 text-white hover:bg-purple-700 transition-colors w-full"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
