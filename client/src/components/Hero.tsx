import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import DemoTour from './DemoTour';

export default function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);



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
                Partner with{' '}
                <span className="text-primary">Innovative Technology Founders</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Connecting with founders building cutting-edge solutions in AI, automation, business intelligence, cloud technologies, and cybersecurity. Let's collaborate and accelerate innovation together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
                <Button
                  onClick={handleWatchDemo}
                  className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  Take Demo Tour
                </Button>
              </div>
              {/* Product Hunt Badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 flex-wrap">
                <a href="https://www.producthunt.com/products/langscribe?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-langscribe" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1008936&theme=light&t=1756136626337" 
                    alt="LangScribe - AI Powered writing assistant transforming content creation! | Product Hunt" 
                    style={{width: '250px', height: '54px'}} 
                    width="250" 
                    height="54"
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
                <a href="https://www.producthunt.com/products/trendsolver?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-trendsolver" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009331&theme=light&t=1756140091143" 
                    alt="TrendSolver - Trend Solver: Your data, your insights, your success. | Product Hunt" 
                    style={{width: '250px', height: '54px'}} 
                    width="250" 
                    height="54"
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
                <a href="https://www.producthunt.com/products/qr-generator-pro-by-ruvab-it?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-qr&#0045;generator&#0045;pro&#0045;by&#0045;ruvab&#0045;it" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009570&theme=light&t=1756551081084" 
                    alt="QR Generator Pro by Ruvab IT - Create & share qr codes instantly | Product Hunt" 
                    style={{width: '250px', height: '54px'}} 
                    width="250" 
                    height="54"
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
                <a href="https://www.producthunt.com/products/fyppal?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-fyppal" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009554&theme=light&t=1756551310587" 
                    alt="FYPPAL - Find Your Purpose Passion And Leap | Product Hunt" 
                    style={{width: '250px', height: '54px'}} 
                    width="250" 
                    height="54"
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
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
