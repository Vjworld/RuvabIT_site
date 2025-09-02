import React from "react";
import {
  Code,
  Database,
  Cloud,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AdSenseAd from "@/components/AdSenseAd";
import GoToTopButton from "@/components/GoToTopButton";
import Breadcrumb from "@/components/Breadcrumb";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Solutions & Partnerships | Collaborate with Innovative Founders | Ruvab IT</title>
        <meta name="description" content="Partnering with founders building innovative solutions in AI Implementation, Process Automation, Business Intelligence, Cloud Solutions, and Cybersecurity. Submit your solution for collaboration opportunities." />
        <meta name="keywords" content="technology partnerships, founder collaboration, AI startups, automation solutions, business intelligence partnerships, cloud partnerships, cybersecurity solutions, startup consulting" />
        <link rel="canonical" href="https://ruvab.it.com/services" />
        
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
      <Breadcrumb />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Solutions & Partnerships
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-4xl mx-auto mb-8">
              Promoting innovative solutions and fostering collaborations with founders 
              in AI, automation, business intelligence, cloud solutions, and cybersecurity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors"
              >
                Partner With Us
              </button>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-900 transition-colors"
              >
                Submit Your Solution
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partnership Domains & Solution Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We promote and collaborate with founders building innovative solutions in these key technology domains. 
              If you have a product in any of these areas, let's discuss collaboration opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {/* AI Implementation Consulting */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  AI Implementation Consulting
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Partnering with founders building AI solutions - from machine learning platforms 
                to intelligent automation tools. We provide consultation and promote innovative AI products.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    AI solution evaluation & consulting
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Partnership opportunities for AI startups
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Product promotion & visibility</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Technical consultation for founders
                  </span>
                </li>
              </ul>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.location.href = '/ai-implementation'}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center"
                >
                  View Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Collaborate
                </button>
              </div>
            </div>

            {/* Process Automation Solutions */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Code className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Process Automation Consulting
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Collaborating with founders creating innovative automation solutions - from workflow 
                optimization tools to robotic process automation platforms.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Automation solution partnerships
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">RPA startup collaboration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Workflow optimization consulting
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Integration strategy guidance
                  </span>
                </li>
              </ul>
              <div className="flex gap-2">
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors flex items-center">
                  View Partners <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Collaborate
                </button>
              </div>
            </div>

            {/* Business Intelligence Solutions */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-purple-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Business Intelligence Partnerships
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Promoting cutting-edge business intelligence solutions from innovative founders - 
                from analytics platforms to data visualization tools.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">BI platform partnerships</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Data visualization startup support
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Analytics tool consultation
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Reporting solution collaboration
                  </span>
                </li>
              </ul>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.location.href = '/business-intelligence'}
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center"
                >
                  View Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Partner Up
                </button>
              </div>
            </div>

            {/* Cloud Solutions Partnerships */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Cloud className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Cloud Solutions Consulting
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Supporting innovative cloud technology founders - from infrastructure tools 
                to serverless platforms and cloud management solutions.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Cloud startup partnerships
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Infrastructure tool promotion
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    DevOps solution collaboration
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Migration strategy consulting</span>
                </li>
              </ul>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.location.href = '/cloud-solutions'}
                  className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center"
                >
                  Explore Partners <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Join Us
                </button>
              </div>
            </div>

            {/* Cybersecurity Solutions */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Cybersecurity Consulting
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Partnering with cybersecurity innovators - from threat detection platforms 
                to security automation tools and compliance solutions.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Security startup partnerships
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Threat detection tool promotion
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Compliance solution consulting
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Security strategy guidance</span>
                </li>
              </ul>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.location.href = '/cybersecurity'}
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center"
                >
                  Security Partners <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Secure Partnership
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Ad - After Main Services */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">Advertisement</div>
            <AdSenseAd 
              adSlot="7834958243" 
              adFormat="horizontal" 
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Partnership Call-to-Action */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Partner with Ruvab IT?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              If you're a founder building innovative solutions in our focus domains, 
              we'd love to explore collaboration opportunities that can accelerate your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Submit Your Solution
              </h3>
              <p className="text-gray-600 mb-6">
                Have an innovative product in AI, automation, BI, cloud, or cybersecurity? 
                Tell us about your solution and let's explore partnership opportunities.
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
              >
                Submit Solution
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partnership Benefits
              </h3>
              <p className="text-gray-600 mb-6">
                Get visibility, technical consultation, promotional support, and access to our network 
                of businesses looking for innovative solutions.
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Product promotion</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Technical guidance</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Business network access</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Started
              </h3>
              <p className="text-gray-600 mb-6">
                Ready to discuss how we can work together? Contact us to schedule a consultation 
                and explore collaboration opportunities tailored to your needs.
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors w-full"
              >
                Schedule Consultation
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

export default ServicesPage;
