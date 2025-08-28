import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Server, Shield, Zap, Database, Globe } from "lucide-react";
import GoToTopButton from "@/components/GoToTopButton";

export default function CloudSolutions() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cloud Solutions & Services | AWS, Azure, GCP Migration | Ruvab IT</title>
        <meta name="description" content="Comprehensive cloud solutions for businesses. Migration, infrastructure, security, and optimization services for AWS, Azure, and Google Cloud Platform." />
        <meta name="keywords" content="cloud solutions, AWS migration, Azure services, Google Cloud, cloud infrastructure, cloud security, DevOps" />
        <link rel="canonical" href="https://ruvab.it.com/cloud-solutions" />
        <meta property="og:title" content="Cloud Solutions & Services | AWS, Azure, GCP Migration" />
        <meta property="og:description" content="Comprehensive cloud solutions for businesses. Migration, infrastructure, and security services." />
        <meta property="og:url" content="https://ruvab.it.com/cloud-solutions" />
        
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Cloud Solutions & Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Accelerate your digital transformation with our comprehensive cloud solutions. From migration to optimization, 
            we help businesses leverage the full potential of cloud computing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Cloud Assessment
            </Button>
            <Button size="lg" variant="outline">
              View Services
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Cloud Platforms */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Multi-Cloud Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle>Amazon Web Services</CardTitle>
                <CardDescription>
                  Complete AWS solutions including EC2, S3, Lambda, RDS, and more for scalable cloud infrastructure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">EC2 & Auto Scaling</Badge>
                  <Badge variant="secondary">Lambda Functions</Badge>
                  <Badge variant="secondary">RDS & DynamoDB</Badge>
                  <Badge variant="secondary">CloudWatch</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Server className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Microsoft Azure</CardTitle>
                <CardDescription>
                  Azure cloud services including virtual machines, App Service, SQL Database, and AI/ML capabilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">Virtual Machines</Badge>
                  <Badge variant="secondary">App Service</Badge>
                  <Badge variant="secondary">Azure SQL</Badge>
                  <Badge variant="secondary">Azure AI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Google Cloud Platform</CardTitle>
                <CardDescription>
                  GCP services including Compute Engine, Cloud Storage, BigQuery, and advanced AI/ML tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">Compute Engine</Badge>
                  <Badge variant="secondary">Cloud Storage</Badge>
                  <Badge variant="secondary">BigQuery</Badge>
                  <Badge variant="secondary">AI Platform</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Core Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Cloud Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Cloud Migration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Seamlessly migrate your applications and data to the cloud with minimal downtime.</p>
                <ul className="space-y-1 text-sm">
                  <li>• Infrastructure assessment and planning</li>
                  <li>• Application refactoring and modernization</li>
                  <li>• Data migration and validation</li>
                  <li>• Testing and rollback strategies</li>
                  <li>• Post-migration optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Cloud Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Implement robust security measures to protect your cloud infrastructure and data.</p>
                <ul className="space-y-1 text-sm">
                  <li>• Identity and access management (IAM)</li>
                  <li>• Network security and firewalls</li>
                  <li>• Data encryption and compliance</li>
                  <li>• Security monitoring and auditing</li>
                  <li>• Incident response planning</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-purple-600" />
                  Infrastructure Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Manage and optimize your cloud infrastructure for performance and cost efficiency.</p>
                <ul className="space-y-1 text-sm">
                  <li>• Resource provisioning and scaling</li>
                  <li>• Performance monitoring and optimization</li>
                  <li>• Cost management and budgeting</li>
                  <li>• Backup and disaster recovery</li>
                  <li>• Compliance and governance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-6 h-6 text-orange-600" />
                  DevOps & Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Streamline development and deployment processes with DevOps best practices.</p>
                <ul className="space-y-1 text-sm">
                  <li>• CI/CD pipeline implementation</li>
                  <li>• Infrastructure as Code (IaC)</li>
                  <li>• Container orchestration</li>
                  <li>• Automated testing and deployment</li>
                  <li>• Configuration management</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Industry-Specific Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Healthcare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">HIPAA-compliant cloud solutions for healthcare organizations.</p>
                <div className="space-y-2">
                  <Badge variant="outline">HIPAA Compliance</Badge>
                  <Badge variant="outline">EHR Systems</Badge>
                  <Badge variant="outline">Medical Imaging</Badge>
                  <Badge variant="outline">Telemedicine</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Secure and compliant cloud infrastructure for financial institutions.</p>
                <div className="space-y-2">
                  <Badge variant="outline">PCI DSS</Badge>
                  <Badge variant="outline">SOX Compliance</Badge>
                  <Badge variant="outline">Risk Management</Badge>
                  <Badge variant="outline">Fraud Detection</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>E-commerce</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Scalable cloud platforms for online retail and e-commerce businesses.</p>
                <div className="space-y-2">
                  <Badge variant="outline">Auto Scaling</Badge>
                  <Badge variant="outline">CDN Integration</Badge>
                  <Badge variant="outline">Payment Processing</Badge>
                  <Badge variant="outline">Inventory Management</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Migration Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Cloud Migration Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">1</div>
                <CardTitle>Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Evaluate current infrastructure and identify migration opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">2</div>
                <CardTitle>Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Develop comprehensive migration strategy and timeline.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">3</div>
                <CardTitle>Migration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Execute migration with minimal business disruption.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mb-4">4</div>
                <CardTitle>Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Validate functionality and performance in new environment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center mb-4">5</div>
                <CardTitle>Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Optimize performance and costs for maximum efficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Cloud Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
                <p className="text-sm text-muted-foreground">Cost Savings</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                <p className="text-sm text-muted-foreground">Uptime SLA</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
                <p className="text-sm text-muted-foreground">Faster Deployment</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Move to the Cloud?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your business with our comprehensive cloud solutions. Get started with a free assessment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Free Cloud Assessment
            </Button>
            <Button size="lg" variant="outline">
              Contact Our Experts
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}