import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Database, Brain, Target, Zap } from "lucide-react";
import GoToTopButton from '@/components/GoToTopButton';

export default function AIAnalytics() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Analytics Solutions | Advanced Data Intelligence | Ruvab IT</title>
        <meta name="description" content="Transform your business with advanced AI analytics solutions. Get real-time insights, predictive analytics, and automated reporting to drive data-driven decisions." />
        <meta name="keywords" content="AI analytics, data intelligence, predictive analytics, business intelligence, machine learning analytics, automated reporting, data visualization" />
        <link rel="canonical" href="https://ruvab.it.com/ai-analytics" />
        <meta property="og:title" content="AI Analytics Solutions | Advanced Data Intelligence" />
        <meta property="og:description" content="Transform your business with advanced AI analytics solutions. Get real-time insights and predictive analytics." />
        <meta property="og:url" content="https://ruvab.it.com/ai-analytics" />
        
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

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Analytics Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your raw data into actionable insights with our advanced AI analytics platform. 
            Leverage machine learning algorithms to predict trends, identify opportunities, and drive strategic decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI Analytics Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>
                  Forecast future trends and outcomes with 95% accuracy using advanced machine learning models.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Sales forecasting and demand planning</li>
                  <li>• Customer behavior prediction</li>
                  <li>• Risk assessment and mitigation</li>
                  <li>• Market trend analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>Real-Time Processing</CardTitle>
                <CardDescription>
                  Process and analyze massive datasets in real-time with our high-performance infrastructure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Live data streaming and processing</li>
                  <li>• Instant alerts and notifications</li>
                  <li>• Dynamic dashboard updates</li>
                  <li>• Scalable cloud infrastructure</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="w-10 h-10 text-purple-600 mb-4" />
                <CardTitle>Intelligent Insights</CardTitle>
                <CardDescription>
                  Discover hidden patterns and correlations in your data with AI-powered analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Automated pattern recognition</li>
                  <li>• Anomaly detection and alerts</li>
                  <li>• Natural language insights</li>
                  <li>• Recommendation engines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Industry Applications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Retail & E-commerce
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Optimize inventory, personalize customer experiences, and boost sales.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Customer Segmentation</Badge>
                  <Badge variant="secondary">Price Optimization</Badge>
                  <Badge variant="secondary">Inventory Management</Badge>
                  <Badge variant="secondary">Churn Prediction</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  Financial Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Enhance risk management, detect fraud, and improve customer service.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Fraud Detection</Badge>
                  <Badge variant="secondary">Risk Assessment</Badge>
                  <Badge variant="secondary">Algorithmic Trading</Badge>
                  <Badge variant="secondary">Credit Scoring</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                  Manufacturing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Improve operational efficiency and reduce downtime with predictive maintenance.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Predictive Maintenance</Badge>
                  <Badge variant="secondary">Quality Control</Badge>
                  <Badge variant="secondary">Supply Chain</Badge>
                  <Badge variant="secondary">Energy Optimization</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-orange-600" />
                  Healthcare
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Enhance patient care and optimize hospital operations with AI insights.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Patient Analytics</Badge>
                  <Badge variant="secondary">Drug Discovery</Badge>
                  <Badge variant="secondary">Resource Planning</Badge>
                  <Badge variant="secondary">Diagnostic Support</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Business Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
                <p className="text-sm text-muted-foreground">Faster Decision Making</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">60%</div>
                <p className="text-sm text-muted-foreground">Improved Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">35%</div>
                <p className="text-sm text-muted-foreground">Cost Reduction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">50%</div>
                <p className="text-sm text-muted-foreground">Revenue Growth</p>
              </div>
            </div>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Getting Started */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Data?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of businesses that trust our AI analytics platform to drive their success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/trend-solver'}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Sales
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}