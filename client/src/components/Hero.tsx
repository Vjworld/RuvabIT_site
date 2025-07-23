import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  const handleStartTrial = () => {
    trackEvent('start_trial', 'engagement', 'hero_button');
    window.location.href = '/trend-solver';
  };

  const handleWatchDemo = () => {
    trackEvent('watch_demo', 'engagement', 'hero_button');
    window.location.href = '/contact';
  };

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="hero-title font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Business with{' '}
              <span className="text-primary">Advanced Technology Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Harness the power of AI, machine learning, and automation to solve complex business problems and drive growth with our innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartTrial}
                className="bg-primary text-white px-8 py-3 text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </Button>
              <Button
                onClick={handleWatchDemo}
                variant="outline"
                className="border-primary text-primary px-8 py-3 text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div>
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
  );
}
