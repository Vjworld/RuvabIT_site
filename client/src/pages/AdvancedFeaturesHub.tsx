import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  BarChart3, 
  Code, 
  CreditCard, 
  Mail, 
  Play, 
  Zap, 
  Settings,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Globe
} from 'lucide-react';
import GoToTopButton from '@/components/GoToTopButton';

const AdvancedFeaturesHub = () => {
  const features = [
    {
      id: 'live-chat',
      title: 'Live Chat Support',
      description: 'Real-time customer support with WebSocket technology and intelligent routing system.',
      icon: MessageCircle,
      status: 'Live',
      color: 'bg-blue-600',
      href: '/live-chat',
      features: ['WebSocket Real-time', 'Smart Routing', 'Chat History', 'Multi-agent Support']
    },
    {
      id: 'analytics-dashboard',
      title: 'Advanced Analytics',
      description: 'Comprehensive analytics dashboard with real-time metrics, visitor insights, and performance tracking.',
      icon: BarChart3,
      status: 'Active',
      color: 'bg-purple-600',
      href: '/advanced-analytics',
      features: ['Real-time Metrics', 'Visitor Insights', 'Conversion Tracking', 'Geographic Data']
    },
    {
      id: 'api-documentation',
      title: 'API Documentation Portal',
      description: 'Interactive API documentation with endpoint testing, code examples, and comprehensive guides.',
      icon: Code,
      status: 'Ready',
      color: 'bg-green-600',
      href: '/api-documentation',
      features: ['Interactive Testing', 'Code Examples', 'Authentication Guide', 'SDK Support']
    },
    {
      id: 'payment-integration',
      title: 'Razorpay Payment System',
      description: 'Complete payment processing with Razorpay integration, order management, and webhooks.',
      icon: CreditCard,
      status: 'Configured',
      color: 'bg-orange-600',
      href: '/payment',
      features: ['Secure Processing', 'Order Management', 'Webhook Integration', 'Multiple Currencies']
    },
    {
      id: 'email-system',
      title: 'SendGrid Email System',
      description: 'Reliable email delivery with SendGrid integration, templates, and delivery tracking.',
      icon: Mail,
      status: 'Active',
      color: 'bg-red-600',
      href: '#email-configured',
      features: ['Template Support', 'Delivery Tracking', 'Bounce Management', 'GDPR Compliant']
    },
    {
      id: 'product-demos',
      title: 'Interactive Product Demos',
      description: 'Live product demonstrations with AI-powered simulations for all major tools.',
      icon: Play,
      status: 'Live',
      color: 'bg-indigo-600',
      href: '/trend-solver#demo',
      features: ['AI Simulations', 'Real-time Results', 'Multiple Products', 'Export Capability']
    },
    {
      id: 'adsense-monetization',
      title: 'AdSense Monetization',
      description: 'GDPR-compliant advertising system with consent management and revenue optimization.',
      icon: Zap,
      status: 'Compliant',
      color: 'bg-yellow-600',
      href: '#adsense-live',
      features: ['GDPR Compliant', 'Consent Management', 'Revenue Optimization', 'Policy Adherence']
    },
    {
      id: 'cms-system',
      title: 'Advanced CMS',
      description: 'Complete content management system with blog publishing, page editing, and media management.',
      icon: Settings,
      status: 'Operational',
      color: 'bg-cyan-600',
      href: '#cms-ready',
      features: ['Blog Management', 'Page Editor', 'Media Library', 'SEO Tools']
    },
    {
      id: 'seo-optimization',
      title: 'SEO & Performance',
      description: 'Advanced SEO optimization with structured data, performance monitoring, and analytics integration.',
      icon: Globe,
      status: 'Optimized',
      color: 'bg-emerald-600',
      href: '#seo-active',
      features: ['Structured Data', 'Performance Monitoring', 'Analytics Integration', 'Mobile Optimization']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live': return 'bg-green-500 text-white';
      case 'active': return 'bg-blue-500 text-white';
      case 'ready': return 'bg-purple-500 text-white';
      case 'configured': return 'bg-orange-500 text-white';
      case 'compliant': return 'bg-yellow-500 text-black';
      case 'operational': return 'bg-cyan-500 text-white';
      case 'optimized': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Advanced Features Hub | Complete Platform Overview | Ruvab IT</title>
        <meta name="description" content="Comprehensive overview of all advanced features including live chat, analytics, payments, API documentation, and enterprise-grade tools." />
        <meta name="keywords" content="advanced features, live chat, analytics dashboard, payment integration, API documentation, enterprise tools" />
        <link rel="canonical" href="https://ruvab.it.com/advanced-features" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Advanced Features Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Explore our comprehensive suite of enterprise-grade features designed to power your business operations. 
            From real-time analytics to secure payment processing, we've built everything you need for success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Take Platform Tour
            </Button>
            <Button size="lg" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">9</div>
                <p className="text-sm text-muted-foreground">Features Live</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <p className="text-sm text-muted-foreground">Uptime SLA</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <p className="text-sm text-muted-foreground">Support</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">GDPR</div>
                <p className="text-sm text-muted-foreground">Compliant</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            
            return (
              <Card key={feature.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={getStatusColor(feature.status)}>
                      {feature.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2 mb-6">
                    {feature.features.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => {
                      if (feature.href.startsWith('/')) {
                        window.location.href = feature.href;
                      } else {
                        // Handle anchor links or external features
                        if (feature.id === 'email-system') {
                          alert('SendGrid email system is configured and operational. Check contact forms to see it in action.');
                        } else if (feature.id === 'adsense-monetization') {
                          alert('AdSense monetization is live with GDPR-compliant consent management.');
                        } else if (feature.id === 'cms-system') {
                          alert('CMS system is operational. Blog management and content editing are available.');
                        } else if (feature.id === 'seo-optimization') {
                          alert('SEO optimization is active across all pages with structured data and performance monitoring.');
                        }
                      }
                    }}
                    variant="outline"
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                  >
                    {feature.href.startsWith('/') ? 'Explore Feature' : 'View Status'}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Seamless Integration Architecture</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Real-time Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    WebSocket Live Chat
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time Analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Live Product Demos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Instant Payment Processing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-600" />
                  Backend Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    PostgreSQL Database
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Razorpay Integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SendGrid Email Service
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    RESTful API System
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Compliance & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    GDPR Compliance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cookie Consent Management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Secure Payment Processing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Data Privacy Protection
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-6">
            Start with any of these popular features or take a guided tour through the entire platform.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => window.location.href = '/live-chat'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Live Chat
            </Button>
            <Button 
              onClick={() => window.location.href = '/advanced-analytics'}
              className="bg-purple-600 hover:bg-purple-700"
            >
              View Analytics
            </Button>
            <Button 
              onClick={() => window.location.href = '/api-documentation'}
              className="bg-green-600 hover:bg-green-700"
            >
              Explore APIs
            </Button>
            <Button 
              onClick={() => window.location.href = '/payment'}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Test Payments
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default AdvancedFeaturesHub;