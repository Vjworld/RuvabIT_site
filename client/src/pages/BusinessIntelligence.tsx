import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, PieChart, LineChart, Database, Eye } from "lucide-react";
import GoToTopButton from '@/components/GoToTopButton';

export default function BusinessIntelligence() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Business Intelligence Solutions | Data Analytics & Reporting | Ruvab IT</title>
        <meta name="description" content="Transform your data into strategic insights with our comprehensive business intelligence solutions. Advanced analytics, reporting, and visualization tools." />
        <meta name="keywords" content="business intelligence, data analytics, reporting, data visualization, dashboard, KPI tracking, business metrics" />
        <link rel="canonical" href="https://ruvab.it.com/business-intelligence" />
        <meta property="og:title" content="Business Intelligence Solutions | Data Analytics & Reporting" />
        <meta property="og:description" content="Transform your data into strategic insights with comprehensive business intelligence solutions." />
        <meta property="og:url" content="https://ruvab.it.com/business-intelligence" />
        
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Business Intelligence Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your raw data into actionable business insights. Our comprehensive BI solutions provide 
            real-time analytics, interactive dashboards, and strategic reporting to drive informed decision-making.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Explore Solutions
            </Button>
            <Button size="lg" variant="outline">
              Request Demo
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Core Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive BI Platform</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Powerful analytics engine with statistical analysis, forecasting, and predictive modeling capabilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Statistical analysis and modeling</li>
                  <li>• Predictive analytics and forecasting</li>
                  <li>• Correlation and trend analysis</li>
                  <li>• What-if scenario modeling</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>Interactive Dashboards</CardTitle>
                <CardDescription>
                  Create stunning, interactive dashboards with drag-and-drop functionality and real-time data updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Drag-and-drop dashboard builder</li>
                  <li>• Real-time data visualization</li>
                  <li>• Mobile-responsive design</li>
                  <li>• Customizable KPI widgets</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="w-10 h-10 text-purple-600 mb-4" />
                <CardTitle>Data Integration</CardTitle>
                <CardDescription>
                  Connect to multiple data sources and create a unified view of your business information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Multi-source data integration</li>
                  <li>• Real-time data synchronization</li>
                  <li>• Data cleansing and transformation</li>
                  <li>• Cloud and on-premise support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* BI Solutions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Specialized BI Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Sales Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Comprehensive sales performance tracking and revenue optimization tools.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Revenue Tracking</Badge>
                  <Badge variant="secondary">Pipeline Analysis</Badge>
                  <Badge variant="secondary">Customer Lifetime Value</Badge>
                  <Badge variant="secondary">Territory Management</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Sales performance dashboards</li>
                  <li>• Lead conversion analysis</li>
                  <li>• Quota tracking and forecasting</li>
                  <li>• Commission calculations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-green-600" />
                  Financial Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Deep financial insights with profitability analysis and budget monitoring.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">P&L Analysis</Badge>
                  <Badge variant="secondary">Cash Flow</Badge>
                  <Badge variant="secondary">Budget Tracking</Badge>
                  <Badge variant="secondary">Cost Analysis</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Real-time financial reporting</li>
                  <li>• Variance analysis</li>
                  <li>• Financial forecasting</li>
                  <li>• Regulatory compliance reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-6 h-6 text-purple-600" />
                  Operations Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Optimize operational efficiency with process analytics and performance metrics.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Process Efficiency</Badge>
                  <Badge variant="secondary">Resource Utilization</Badge>
                  <Badge variant="secondary">Quality Metrics</Badge>
                  <Badge variant="secondary">Capacity Planning</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Production monitoring</li>
                  <li>• Supply chain analytics</li>
                  <li>• Equipment performance</li>
                  <li>• Workforce analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-orange-600" />
                  Customer Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Understand customer behavior and improve satisfaction with detailed analytics.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Customer Segmentation</Badge>
                  <Badge variant="secondary">Churn Analysis</Badge>
                  <Badge variant="secondary">Satisfaction Metrics</Badge>
                  <Badge variant="secondary">Journey Mapping</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Customer lifetime value</li>
                  <li>• Behavioral analysis</li>
                  <li>• Retention strategies</li>
                  <li>• Loyalty program analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Connect Your Data Sources</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Databases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">MySQL</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">SQL Server</Badge>
                  <Badge variant="outline">Oracle</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloud Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">AWS RDS</Badge>
                  <Badge variant="outline">Azure SQL</Badge>
                  <Badge variant="outline">Google Cloud</Badge>
                  <Badge variant="outline">Snowflake</Badge>
                  <Badge variant="outline">Redshift</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">Salesforce</Badge>
                  <Badge variant="outline">HubSpot</Badge>
                  <Badge variant="outline">QuickBooks</Badge>
                  <Badge variant="outline">Shopify</Badge>
                  <Badge variant="outline">SAP</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>File Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">CSV/Excel</Badge>
                  <Badge variant="outline">JSON/XML</Badge>
                  <Badge variant="outline">Google Sheets</Badge>
                  <Badge variant="outline">SharePoint</Badge>
                  <Badge variant="outline">FTP/SFTP</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Implementation Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">BI Implementation Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">1</div>
                <CardTitle>Requirements Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Understand your business objectives and data requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">2</div>
                <CardTitle>Data Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect and integrate your data sources into a unified platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">3</div>
                <CardTitle>Dashboard Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build custom dashboards and reports tailored to your needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mb-4">4</div>
                <CardTitle>Training & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Provide comprehensive training and ongoing support.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Business Impact</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">70%</div>
                <p className="text-sm text-muted-foreground">Faster Decision Making</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">45%</div>
                <p className="text-sm text-muted-foreground">Improved Productivity</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">60%</div>
                <p className="text-sm text-muted-foreground">Better Data Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">30%</div>
                <p className="text-sm text-muted-foreground">Cost Reduction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Data?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Unlock the power of your data with our comprehensive business intelligence solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}