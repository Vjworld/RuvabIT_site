import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function About() {
  const handleLearnMore = () => {
    trackEvent('learn_more', 'about', 'about_button');
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Ruvab IT</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded with a vision to bridge the gap between cutting-edge technology and practical business solutions, Ruvab IT has been at the forefront of digital transformation for over a decade.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our team of expert engineers, data scientists, and consultants work collaboratively to deliver innovative solutions that drive measurable business results. We specialize in AI implementation, data analytics, and process automation.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Expert Team</div>
              </div>
            </div>
            <Button
              onClick={handleLearnMore}
              className="bg-primary text-white hover:bg-blue-700 transition-colors"
            >
              Learn More About Us
            </Button>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Professional team collaborating in a modern office environment"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
