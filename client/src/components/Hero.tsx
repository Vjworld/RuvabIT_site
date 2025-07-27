import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import DemoTour from './DemoTour';

export default function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleStartTrial = () => {
    trackEvent('start_trial', 'engagement', 'hero_button');
    window.location.href = '/trend-solver';
  };

  const handleWatchDemo = () => {
    trackEvent('watch_demo', 'engagement', 'hero_button');
    setIsDemoOpen(true);
  };

  return (
    <div>
      <section id="home" className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="hero-title font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Transform Your Business with{' '}
                <span className="text-primary">Advanced Technology Solutions</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Harness the power of AI, machine learning, and automation to solve complex business problems and drive growth with our innovative technology solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => window.open('/trendsolver/', '_blank')}
                  className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  Launch TrendSolver
                </Button>
                <Button
                  onClick={() => window.open('/langscribe/', '_blank')}
                  variant="outline"
                  className="border-primary text-primary px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold hover:bg-blue-50 transition-colors w-full sm:w-auto"
                >
                  Launch LangScribe
                </Button>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Modern technology workspace with analytics dashboards"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoTour isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}
