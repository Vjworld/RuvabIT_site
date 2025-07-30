import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { useMicroInteractions, useScrollAnimation } from '@/hooks/useMicroInteractions';
import { TrendingUp, FileText, Sparkles, Zap, Star, CheckCircle } from 'lucide-react';

export default function Products() {
  const trendSolverRef = useMicroInteractions();
  const langScribeRef = useMicroInteractions();
  const sectionRef = useScrollAnimation();

  const handleLearnMore = (product: string) => {
    trackEvent('learn_more', 'product', product);
    if (product === 'trend_solver') {
      window.open('https://trendsolver.ruvab.it.com', '_blank');
    } else if (product === 'langscribe') {
      window.open('https://langscribe.ruvab.it.com', '_blank');
    }
  };

  return (
    <section id="products" data-tour="products" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Featured Products</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our cutting-edge solutions designed to solve real-world business challenges and accelerate your digital transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Trend Solver Product */}
          <div 
            ref={trendSolverRef}
            className="micro-interaction hover-lift hover-glow bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 group cursor-pointer"
            onClick={() => handleLearnMore('trend_solver')}
          >
            <div className="mb-4 sm:mb-6 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <TrendingUp className="absolute top-4 right-4 h-8 w-8 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                alt="AI-powered analytics dashboard showing trend analysis"
                className="rounded-xl w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Trend Solver</h3>
              <Sparkles className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Advanced AI-powered market analysis tool that identifies emerging trends, predicts market movements, and provides actionable insights for strategic decision-making.
            </p>
            <ul className="space-y-3 mb-4 sm:mb-6">
              <li className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Real-time market trend analysis
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Predictive analytics and forecasting
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Automated reporting and alerts
              </li>
            </ul>
            <Button
              onClick={() => window.open('https://trendsolver.ruvab.it.com', '_blank')}
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all w-full text-sm sm:text-base group-hover:shadow-lg transform group-hover:scale-105 border-0"
            >
              <Zap className="h-4 w-4 mr-2" />
              Launch TrendSolver
            </Button>
          </div>
          
          {/* LangScribe Product */}
          <div 
            ref={langScribeRef}
            className="micro-interaction hover-lift hover-glow bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-700 group cursor-pointer"
            onClick={() => handleLearnMore('langscribe')}
          >
            <div className="mb-4 sm:mb-6 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FileText className="absolute top-4 right-4 h-8 w-8 text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                alt="Content creation workspace with AI-powered writing tools"
                className="rounded-xl w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">LangScribe</h3>
              <Star className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Intelligent content creation platform that leverages natural language processing to generate high-quality, SEO-optimized content for various business needs.
            </p>
            <ul className="space-y-3 mb-4 sm:mb-6">
              <li className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                AI-powered content generation
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                SEO optimization and analysis
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Multi-language support
              </li>
            </ul>
            <Button
              onClick={() => window.open('https://langscribe.ruvab.it.com', '_blank')}
              className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-all w-full text-sm sm:text-base group-hover:shadow-lg transform group-hover:scale-105 border-0"
            >
              <Zap className="h-4 w-4 mr-2" />
              Launch LangScribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
