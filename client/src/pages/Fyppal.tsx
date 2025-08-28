import React from 'react';
import { Shield, Users, Zap, Globe, CheckCircle, Star, Target, Layers } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProductDemoWidget from "@/components/ProductDemoWidget";
import GoToTopButton from "@/components/GoToTopButton";

const Fyppal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FYPPAL - Find Your Passion, Find Your Pal | Freelance Career Platform | Ruvab IT</title>
        <meta name="description" content="Transform your IT experience into freelance opportunities. Get personalized micro-niche gig plans, resume reviews, and discover freelance work that matches your expertise." />
        <meta name="keywords" content="freelance platform, IT freelancing, micro-niche gigs, career transition, freelance opportunities, resume review, gig economy" />
        <link rel="canonical" href="https://ruvab.it.com/fyppal" />
        
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ'}`}></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ'}');
          `}
        </script>
      </Helmet>
      
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-12 w-12 text-cyan-300 mr-4" />
                <h1 className="text-5xl font-bold">FYPPAL</h1>
              </div>
              <h2 className="text-3xl font-semibold text-cyan-100 mb-4">Find Your Passion, Find Your Pal</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Your supportive companion for transforming IT experience into freelance opportunity. Get personalized micro-niche gig plans and discover freelance opportunities that match your expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => window.open('https://fyppal.ruvab.it.com', '_blank')}
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
                >
                  Start Your Escape Plan (Free)
                </button>
                <button 
                  onClick={() => window.location.href = '/about'}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Learn More
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-cyan-100">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>2,847+ Plans Generated</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-1" />
                  <span>$127K+ Avg Annual Income</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Freelance Career Success Dashboard" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                🏆 Contest Live!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How FYPPAL Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three simple steps to transform your IT experience into a thriving freelance career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-blue-600">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Quick Skills Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Answer 5-7 questions about your IT background, experience level, and preferences to get started.
              </p>
              <div className="text-sm text-cyan-600 font-semibold">3.2 mins average completion</div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-cyan-600">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. AI-Powered Matching</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our algorithm identifies the best micro-niches and freelance opportunities perfectly suited for your skillset.
              </p>
              <div className="text-sm text-cyan-600 font-semibold">Personalized recommendations</div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-purple-600">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Actionable Plan</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get your personalized gig plan with templates, pricing guides, and direct platform links to start earning.
              </p>
              <div className="text-sm text-cyan-600 font-semibold">Ready-to-use resources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Resume Review Service
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stand out from the competition with expert resume optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { title: "Resume Analysis", description: "Detailed feedback on structure, content, and formatting to maximize impact" },
                { title: "ATS Optimization", description: "Ensure your resume passes applicant tracking systems used by employers" },
                { title: "Platform Bios", description: "Optimized profiles for freelance platforms like Upwork, Fiverr, and LinkedIn" },
                { title: "24-48 Hour Turnaround", description: "Get expert feedback from career coaches quickly to accelerate your job search" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Get Professional Review for ₹99</h3>
              <p className="text-blue-100 mb-6">
                Stand out from the competition with a resume that attracts clients and opportunities.
              </p>
              <button 
                onClick={() => window.open('https://fyppal.ruvab.it.com/resume-review', '_blank')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Resume Review
              </button>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>24/7 customer support</span>
                </div>
              </div>
              <button 
                onClick={() => window.open('https://xmenrise.ruvab.it.com', '_blank')}
                className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors mt-6"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Teams Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">40%</div>
              <div className="text-gray-600 dark:text-gray-300">Productivity Boost</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Ready to start your freelance journey? Join thousands of IT professionals who've successfully transitioned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://fyppal.ruvab.it.com', '_blank')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Launch FYPPAL
              </button>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default Fyppal;