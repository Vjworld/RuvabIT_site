import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  QrCode, 
  Star, 
  Palette, 
  Download, 
  BarChart3, 
  Zap,
  Shield,
  Smartphone,
  Share2,
  Eye,
  Settings,
  Globe,
  Camera,
  CheckCircle
} from 'lucide-react';
import DemoTour from '@/components/DemoTour';

const QRGenTool = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>QR Gen Tool - Professional QR Code Generator | Ruvab IT</title>
        <meta name="description" content="Professional QR code generator with advanced customization, bulk generation, analytics tracking. Create custom QR codes for marketing campaigns and business applications." />
        <meta name="keywords" content="QR code generator, custom QR codes, bulk QR generation, QR analytics, marketing QR codes, business QR codes" />
        <link rel="canonical" href="https://ruvab.it.com/qr-gen-tool/" />
        
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
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <QrCode className="h-12 w-12 text-green-300 mr-4" />
                <h1 className="text-5xl font-bold">QR Gen Tool</h1>
              </div>
              <p className="text-2xl text-green-100 mb-8 leading-relaxed">
                Professional QR code generator with advanced customization, bulk generation, and analytics tracking for marketing campaigns and business applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => window.open('https://qr-gen.ruvab.it.com', '_blank')}
                  className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
                >
                  Launch QR Gen Tool
                </button>
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-900 transition-colors"
                >
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-green-100">4.9/5 rating</span>
                </div>
                <div className="text-green-100">100% Free to use</div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional QR code with smartphone scanning"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful QR Code Generation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create professional QR codes with advanced customization options, perfect for marketing campaigns, business cards, and digital engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Palette className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Custom Design</CardTitle>
                <CardDescription>
                  Full customization with colors, logos, patterns, and styling options to match your brand identity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Download className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Bulk Generation</CardTitle>
                <CardDescription>
                  Generate multiple QR codes at once and download them in various formats including PNG, SVG, and PDF.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Analytics Tracking</CardTitle>
                <CardDescription>
                  Track scan statistics, location data, and engagement metrics for your QR code campaigns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Instant Generation</CardTitle>
                <CardDescription>
                  Create QR codes instantly with real-time preview and immediate download capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Enterprise-grade security with encrypted data processing and reliable code generation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Mobile Optimized</CardTitle>
                <CardDescription>
                  Fully responsive design that works perfectly on all devices and screen sizes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect for Every Use Case</h2>
            <p className="text-xl text-gray-600">
              From marketing campaigns to business operations, QR Gen Tool adapts to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Share2 className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing & Advertising</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Social media campaigns and promotions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Print advertisements and billboards
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Event marketing and registration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Product packaging and labels
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Settings className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Operations</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Digital business cards and contacts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Restaurant menus and ordering
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Wi-Fi sharing and network access
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Inventory and asset management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Seamless Integration</h2>
            <p className="text-xl text-gray-600">
              Works with all major platforms and devices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Web Browsers</h3>
              <p className="text-sm text-gray-600">Chrome, Firefox, Safari, Edge</p>
            </div>
            <div className="text-center">
              <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Mobile Devices</h3>
              <p className="text-sm text-gray-600">iOS and Android compatible</p>
            </div>
            <div className="text-center">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">QR Scanners</h3>
              <p className="text-sm text-gray-600">All major QR code readers</p>
            </div>
            <div className="text-center">
              <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Analytics Tools</h3>
              <p className="text-sm text-gray-600">Google Analytics integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Creating Professional QR Codes Today
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of businesses using QR Gen Tool for their marketing and operational needs.
          </p>
          <button
            onClick={() => window.open('https://qr-gen.ruvab.it.com', '_blank')}
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
          >
            Launch QR Gen Tool
          </button>
        </div>
      </section>
      <Footer />

      <DemoTour isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default QRGenTool;