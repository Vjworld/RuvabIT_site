import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Zap,
  Users,
  CheckCircle,
  Star,
  Globe,
  Languages,
  FileText,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import DemoTour from "@/components/DemoTour";
import ProductDemoWidget from "@/components/ProductDemoWidget";
import GoToTopButton from "@/components/GoToTopButton";

const TrendSolver = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>TrendSolver - AI Analytics & Business Intelligence | Ruvab IT</title>
        <meta name="description" content="Advanced AI-powered analytics and business intelligence platform. Get actionable insights from your data with TrendSolver's cutting-edge algorithms." />
        <meta name="keywords" content="AI analytics, business intelligence, data analysis, predictive analytics, trend analysis, dashboard" />
        <link rel="canonical" href="https://ruvab.it.com/trendsolver" />
        
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

        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4204204667108655" crossOrigin="anonymous"></script>
        
        {/* In-page Ad Script */}
        <script async src="https://js.mbidadm.com/static/scripts.js" data-admpid="367193"></script>
      </Helmet>
      
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="h-12 w-12 text-purple-300 mr-4" />
                <h1 className="text-5xl font-bold">TrendSolver</h1>
              </div>
              <p className="text-2xl text-purple-100 mb-8 leading-relaxed">
                Advanced AI-powered analytics and business intelligence platform. Get actionable insights from your data with cutting-edge algorithms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => window.open('https://trendsolver.ruvab.it.com', '_blank')}
                  className="bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors"
                >
                  Launch TrendSolver
                </button>
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-900 transition-colors"
                >
                  Watch Demo
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-purple-100">4.9/5 rating</span>
                  </div>
                  <div className="text-purple-100">Real-time analytics</div>
                </div>
                {/* Product Hunt Badges */}
                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4 flex-wrap">
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
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Content Creation Interface"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Language Processing Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, translate, and optimize content
              across multiple languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-500">
              <Languages className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Multi-Language Support
              </h3>
              <p className="text-gray-600">
                Create and translate content in 50+ languages with advanced AI
                that understands context and cultural nuances.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI-Powered Writing
              </h3>
              <p className="text-gray-600">
                Generate high-quality content with our advanced AI writing
                assistant that adapts to your brand voice and style.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-purple-500">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-Time Collaboration
              </h3>
              <p className="text-gray-600">
                Work together seamlessly with team members, translators, and
                editors in a shared collaborative environment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
              <Globe className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Content Localization
              </h3>
              <p className="text-gray-600">
                Adapt content for different markets with cultural context, local
                expressions, and regional preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
              <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                Built-in grammar checking, style consistency, and quality
                scoring to ensure professional-grade content.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-indigo-500">
              <FileText className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Content Templates
              </h3>
              <p className="text-gray-600">
                Choose from hundreds of pre-built templates for blogs, emails,
                social media, and marketing materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect LangScribe with your favorite tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">WP</span>
              </div>
              <h3 className="font-semibold text-gray-900">WordPress</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-orange-600 font-bold text-lg">HB</span>
              </div>
              <h3 className="font-semibold text-gray-900">HubSpot</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">SL</span>
              </div>
              <h3 className="font-semibold text-gray-900">Slack</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">GD</span>
              </div>
              <h3 className="font-semibold text-gray-900">Google Docs</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Content Need
            </h2>
            <p className="text-xl text-gray-600">
              See how LangScribe transforms content creation across industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Marketing Teams
                    </h4>
                    <p className="text-gray-600">
                      Create compelling campaigns in multiple languages and
                      maintain brand consistency across all markets.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Content Creators
                    </h4>
                    <p className="text-gray-600">
                      Generate blog posts, social media content, and articles
                      with AI assistance that matches your unique voice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      E-commerce
                    </h4>
                    <p className="text-gray-600">
                      Translate product descriptions and create localized
                      content for global marketplaces.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Educational Institutions
                    </h4>
                    <p className="text-gray-600">
                      Create course materials and communicate with international
                      students in their native languages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Content Creation Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started with TrendSolver
            </h2>
            <p className="text-xl text-gray-600">
              Ready to unlock the power of AI-driven analytics for your business?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Try TrendSolver Live
              </h3>
              <p className="text-gray-600 mb-6">
                Experience our AI-powered analytics platform with real-time data processing and insights.
              </p>
              <button
                onClick={() => window.open("https://trendsolver.ruvab.it.com", "_blank")}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Launch TrendSolver
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Custom Solutions
              </h3>
              <p className="text-gray-600 mb-6">
                Need a tailored analytics solution? Our team will work with you to create the perfect system.
              </p>
              <button 
                onClick={() => window.location.href = 'mailto:support@ruvabit.com'}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Try TrendSolver Live Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our AI-powered analytics in action. Test our trend analysis capabilities with real data.
            </p>
          </div>
          
          <ProductDemoWidget 
            productName="TrendSolver" 
            productUrl="https://trendsolver.ruvab.it.com"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Analytics?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses using TrendSolver to make data-driven decisions and accelerate growth.
          </p>
          <button
            onClick={() =>
              window.open("https://trendsolver.ruvab.it.com", "_blank")
            }
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors"
          >
            Launch TrendSolver
          </button>
        </div>
      </section>
      <Footer />
      <GoToTopButton />
      
      <DemoTour isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default TrendSolver;
