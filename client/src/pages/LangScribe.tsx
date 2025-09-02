import React from 'react';
import { FileText, Globe, Zap, Users, CheckCircle, Star, Languages } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProductDemoWidget from "@/components/ProductDemoWidget";
import GoToTopButton from "@/components/GoToTopButton";

const LangScribe = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>LangScribe - AI Content Creation & Translation | Ruvab IT</title>
        <meta name="description" content="Transform your content creation with LangScribe's advanced language processing, translation, and AI-powered writing assistance. 50+ languages supported." />
        <meta name="keywords" content="content creation, AI writing, translation, language processing, multilingual content, automated writing" />
        <link rel="canonical" href="https://ruvab.it.com/langscribe" />
        
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
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-12 w-12 text-green-300 mr-4" />
                <h1 className="text-5xl font-bold">LangScribe</h1>
              </div>
              <p className="text-2xl text-green-100 mb-8 leading-relaxed">
                Transform your content creation with advanced language processing, translation, and AI-powered writing assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => window.open('https://langscribe.ruvab.it.com', '_blank')}
                  className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
                >
                  Launch LangScribe
                </button>
                <button 
                  onClick={() => window.location.href = '/about'}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-900 transition-colors"
                >
                  Learn More
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-green-100">4.8/5 rating</span>
                  </div>
                  <div className="text-green-100">50+ languages supported</div>
                </div>
                {/* Product Hunt Badges */}
                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4 flex-wrap">
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
              Everything you need to create, translate, and optimize content across multiple languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-500">
              <Languages className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Language Support</h3>
              <p className="text-gray-600">
                Create and translate content in 50+ languages with advanced AI that understands context and cultural nuances.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Writing</h3>
              <p className="text-gray-600">
                Generate high-quality content with our advanced AI writing assistant that adapts to your brand voice and style.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-purple-500">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Collaboration</h3>
              <p className="text-gray-600">
                Work together seamlessly with team members, translators, and editors in a shared collaborative environment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
              <Globe className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Localization</h3>
              <p className="text-gray-600">
                Adapt content for different markets with cultural context, local expressions, and regional preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
              <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Built-in grammar checking, style consistency, and quality scoring to ensure professional-grade content.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-indigo-500">
              <FileText className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Templates</h3>
              <p className="text-gray-600">
                Choose from hundreds of pre-built templates for blogs, emails, social media, and marketing materials.
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
                    <h4 className="font-semibold text-gray-900 mb-1">Marketing Teams</h4>
                    <p className="text-gray-600">Create compelling campaigns in multiple languages and maintain brand consistency across all markets.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Content Creators</h4>
                    <p className="text-gray-600">Generate blog posts, social media content, and articles with AI assistance that matches your unique voice.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">E-commerce</h4>
                    <p className="text-gray-600">Translate product descriptions and create localized content for global marketplaces.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Educational Institutions</h4>
                    <p className="text-gray-600">Create course materials and communicate with international students in their native languages.</p>
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

      {/* Interactive Demo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Try LangScribe Live Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our AI-powered language processing in action. Test content creation and analysis with real examples.
            </p>
          </div>
          
          <ProductDemoWidget 
            productName="LangScribe" 
            productUrl="https://langscribe.ruvab.it.com"
          />
        </div>
      </section>

      {/* Get Started */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started with LangScribe
            </h2>
            <p className="text-xl text-gray-600">
              Ready to transform your content creation process with AI-powered language tools?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Try LangScribe Live
              </h3>
              <p className="text-gray-600 mb-6">
                Experience our AI-powered content creation and translation platform with advanced language processing.
              </p>
              <button 
                onClick={() => window.open('https://langscribe.ruvab.it.com', '_blank')}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Launch LangScribe
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enterprise Solutions
              </h3>
              <p className="text-gray-600 mb-6">
                Need custom language processing solutions? Our team will create tailored content systems for your business.
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of content creators using LangScribe to produce high-quality content faster.
          </p>
          <button 
            onClick={() => window.open('https://langscribe.ruvab.it.com', '_blank')}
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
          >
            Launch LangScribe
          </button>
        </div>
      </section>
      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default LangScribe;