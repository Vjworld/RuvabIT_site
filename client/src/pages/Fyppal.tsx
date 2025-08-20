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
        <title>FYPPAL - Next-Gen Team Management & Productivity | Ruvab IT</title>
        <meta name="description" content="Supercharge your team's productivity with FYPPAL's advanced management tools, real-time collaboration, and intelligent workflow optimization." />
        <meta name="keywords" content="team management, productivity tools, collaboration software, workflow optimization, project management, team analytics" />
        <link rel="canonical" href="https://ruvab.it.com/fyppal" />
      </Helmet>
      
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-12 w-12 text-cyan-300 mr-4" />
                <h1 className="text-5xl font-bold">FYPPAL</h1>
              </div>
              <p className="text-2xl text-blue-100 mb-8 leading-relaxed">
                Supercharge your team's productivity with advanced management tools, real-time collaboration, and intelligent workflow optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => window.open('https://fyppal.ruvab.it.com', '_blank')}
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
                >
                  Launch FYPPAL
                </button>
                <button 
                  onClick={() => window.location.href = '/about'}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Learn More
                </button>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-blue-100">4.9/5 rating</span>
                </div>
                <div className="text-blue-100">Real-time collaboration</div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Team Management Dashboard" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Team Management Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage teams, optimize workflows, and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Smart Team Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get deep insights into team performance, productivity patterns, and collaboration metrics with AI-powered analytics.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Target className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Goal Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set, track, and achieve team goals with automated progress monitoring and milestone celebrations.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Layers className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Workflow Automation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Streamline repetitive tasks with intelligent workflow automation and custom process builders.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Globe className="h-12 w-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Remote Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enable seamless remote work with virtual workspaces, real-time collaboration, and team communication tools.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Zap className="h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimize team performance with AI-driven recommendations, workload balancing, and productivity insights.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security & Compliance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enterprise-grade security with role-based access control, data encryption, and compliance management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose XMENRISE?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your team management with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { title: "40% Increase in Team Productivity", description: "Streamlined workflows and intelligent task allocation boost overall team efficiency" },
                { title: "Real-time Collaboration", description: "Seamless communication tools keep your team connected and aligned on goals" },
                { title: "AI-Powered Insights", description: "Data-driven recommendations help optimize team performance and identify bottlenecks" },
                { title: "Scalable Architecture", description: "Grows with your team from startup to enterprise with flexible pricing tiers" }
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
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Team?</h3>
              <p className="text-blue-100 mb-6">
                Join thousands of teams already using XMENRISE to boost productivity and achieve their goals faster.
              </p>
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
              Experience the power of next-gen team management with FYPPAL
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