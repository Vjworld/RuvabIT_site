import React, { useState } from "react";
import {
  Search,
  Book,
  Video,
  Download,
  FileText,
  MessageSquare,
  ChevronRight,
  Star,
  ExternalLink,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";

const HelpDocumentation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Remove useSEO call since we'll use Helmet directly

  const categories = [
    "All",
    "Getting Started",
    "Trend Solver",
    "LangScribe",
    "Account Management",
    "Billing",
    "API Documentation",
    "Troubleshooting",
  ];

  const documentationSections = [
    {
      title: "Quick Start Guides",
      description: "Get up and running quickly with our step-by-step guides",
      items: [
        { title: "Setting Up Your Account", type: "guide", readTime: "5 min" },
        {
          title: "First Steps with Trend Solver",
          type: "guide",
          readTime: "10 min",
        },
        { title: "LangScribe Basics", type: "guide", readTime: "8 min" },
        { title: "API Quick Start", type: "guide", readTime: "15 min" },
      ],
    },
    {
      title: "Video Tutorials",
      description: "Learn through comprehensive video walkthroughs",
      items: [
        {
          title: "Complete Trend Solver Tutorial",
          type: "video",
          duration: "25 min",
        },
        {
          title: "Advanced Analytics Features",
          type: "video",
          duration: "18 min",
        },
        {
          title: "LangScribe Content Creation",
          type: "video",
          duration: "22 min",
        },
        {
          title: "Integration Best Practices",
          type: "video",
          duration: "30 min",
        },
      ],
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      items: [
        { title: "REST API Reference", type: "api", pages: "45 pages" },
        { title: "Authentication Guide", type: "api", pages: "8 pages" },
        { title: "Webhooks Documentation", type: "api", pages: "12 pages" },
        { title: "SDK Libraries", type: "api", pages: "20 pages" },
      ],
    },
  ];

  const faqItems = [
    {
      category: "Getting Started",
      question: "How do I create my first account?",
      answer:
        'Creating an account is simple. Click the "Get Started" button, choose your plan, and follow the setup wizard. You\'ll receive a welcome email with next steps and access to our onboarding resources.',
      popularity: 5,
    },
    {
      category: "Trend Solver",
      question: "How accurate are the trend predictions?",
      answer:
        "Our AI-powered trend analysis has a success rate of 85-92% for short-term predictions (1-3 months) and 70-80% for longer-term forecasts (6-12 months), based on historical data validation.",
      popularity: 5,
    },
    {
      category: "LangScribe",
      question: "Which languages are supported?",
      answer:
        "LangScribe supports over 50 languages including English, Spanish, French, German, Chinese, Japanese, Arabic, Portuguese, Russian, and many more. We continuously add new languages based on user demand.",
      popularity: 4,
    },
    {
      category: "Billing",
      question: "Can I change my subscription plan?",
      answer:
        "Yes, you can upgrade or downgrade your plan anytime from your account dashboard. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades.",
      popularity: 4,
    },
    {
      category: "API Documentation",
      question: "What are the API rate limits?",
      answer:
        "Rate limits vary by plan: Starter (1,000 requests/hour), Professional (10,000 requests/hour), Enterprise (custom limits). All plans include burst capacity for occasional spikes.",
      popularity: 3,
    },
    {
      category: "Troubleshooting",
      question: "Why is my data not syncing?",
      answer:
        "Data sync issues are usually caused by connectivity problems or API key issues. Check your internet connection, verify your API key is valid, and ensure your account has sufficient credits.",
      popularity: 4,
    },
  ];

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Help & Documentation - Ruvab IT Support Center</title>
        <meta name="description" content="Comprehensive help documentation, tutorials, and support resources for Ruvab IT products. Find answers to common questions and learn how to maximize your technology solutions." />
        <meta name="keywords" content="help documentation, support, tutorials, FAQ, user guides, technical support, Ruvab IT help" />
        <link rel="canonical" href="https://ruvab.it.com/help-documentation" />
      </Helmet>
      
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Help & Documentation
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Everything you need to succeed with Ruvab IT solutions. Find
              guides, tutorials, and answers to your questions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation, guides, and FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center hover:bg-blue-100 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-700 transition-colors">
                <Book className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                User Guides
              </h3>
              <p className="text-gray-600 text-sm">
                Step-by-step instructions for all features
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center hover:bg-green-100 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-700 transition-colors">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Video Tutorials
              </h3>
              <p className="text-gray-600 text-sm">
                Visual learning with expert demonstrations
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-700 transition-colors">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                API Docs
              </h3>
              <p className="text-gray-600 text-sm">
                Technical documentation for developers
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg text-center hover:bg-orange-100 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-700 transition-colors">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Live Support
              </h3>
              <p className="text-gray-600 text-sm">
                Get help from our expert support team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Documentation Library
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive resources to help you master our platform
            </p>
          </div>

          <div className="space-y-12">
            {documentationSections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center">
                        {item.type === "video" && (
                          <Video className="h-5 w-5 text-green-600 mr-3" />
                        )}
                        {item.type === "guide" && (
                          <Book className="h-5 w-5 text-blue-600 mr-3" />
                        )}
                        {item.type === "api" && (
                          <FileText className="h-5 w-5 text-purple-600 mr-3" />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.readTime || item.duration || item.pages}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our platform
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredFAQs.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.question}
                      </h3>
                      <div className="flex ml-2">
                        {[...Array(item.popularity)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-blue-600 font-medium mb-3">
                      {item.category}
                    </div>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No FAQs found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Downloads & Resources
            </h2>
            <p className="text-xl text-gray-600">
              Downloadable guides, templates, and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Download className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Complete User Manual
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive 150-page manual covering all features and best
                practices.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center">
                Download PDF (12.5 MB) <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Download className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Quick Reference Cards
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Printable reference cards for keyboard shortcuts and common
                tasks.
              </p>
              <button className="text-green-600 hover:text-green-700 font-semibold flex items-center">
                Download PDF (2.1 MB) <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Download className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  API Postman Collection
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Ready-to-use Postman collection with all API endpoints and
                examples.
              </p>
              <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center">
                Download JSON (850 KB) <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our expert support team is available 24/7 to help you succeed with
            our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule Training
            </button>
          </div>
        </div>
      </section>

      {/* AdSense */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-500 text-sm mb-2">Advertisement</div>
            <div className="bg-white border-2 border-dashed border-gray-300 h-24 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">
                Google AdSense Banner (728x90)
              </span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default HelpDocumentation;
