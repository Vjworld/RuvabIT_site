import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, Zap, Clock, Shield, Users, CheckCircle } from "lucide-react";
import GoToTopButton from "@/components/GoToTopButton";

export default function ProcessAutomation() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Process Automation Solutions | Workflow Optimization | Ruvab IT</title>
        <meta name="description" content="Streamline your business operations with intelligent process automation. Reduce manual tasks, improve efficiency, and scale your business with our RPA solutions." />
        <meta name="keywords" content="process automation, RPA, workflow automation, business process optimization, robotic process automation, digital transformation" />
        <link rel="canonical" href="https://ruvab.it.com/process-automation" />
        <meta property="og:title" content="Process Automation Solutions | Workflow Optimization" />
        <meta property="og:description" content="Streamline your business operations with intelligent process automation and RPA solutions." />
        <meta property="og:url" content="https://ruvab.it.com/process-automation" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Process Automation Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Eliminate repetitive tasks and streamline your workflows with intelligent automation. 
            Our RPA solutions help you reduce costs, improve accuracy, and focus on high-value activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Start Automating
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Core Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Automation Platform</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Cog className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>Intelligent Automation</CardTitle>
                <CardDescription>
                  Deploy smart bots that learn and adapt to your business processes for maximum efficiency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• AI-powered decision making</li>
                  <li>• Self-learning algorithms</li>
                  <li>• Exception handling</li>
                  <li>• Continuous optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Workflow Orchestration</CardTitle>
                <CardDescription>
                  Seamlessly integrate and orchestrate complex workflows across multiple systems and departments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Multi-system integration</li>
                  <li>• Event-driven automation</li>
                  <li>• Conditional logic flows</li>
                  <li>• Real-time monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="w-10 h-10 text-purple-600 mb-4" />
                <CardTitle>24/7 Operations</CardTitle>
                <CardDescription>
                  Ensure business continuity with round-the-clock automated processes and instant error recovery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Continuous operation</li>
                  <li>• Automatic error recovery</li>
                  <li>• Scheduled automation</li>
                  <li>• Performance monitoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Automation Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Automation Areas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Human Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Automate HR processes from recruitment to employee management.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Resume screening and candidate filtering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Employee onboarding workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Payroll processing and benefits management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Performance review automation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Finance & Accounting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Streamline financial operations with automated accounting processes.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Invoice processing and approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Expense report management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Financial reporting and reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Tax preparation and compliance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="w-6 h-6 text-purple-600" />
                  Customer Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Enhance customer experience with automated support systems.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Automated ticket routing and escalation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Chatbot integration and responses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Order processing and tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Customer feedback analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-orange-600" />
                  IT Operations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Automate IT infrastructure and system management tasks.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">System monitoring and alerting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Software deployment and updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Backup and disaster recovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">User access management</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ROI Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Proven ROI Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">75%</div>
                <p className="text-sm text-muted-foreground">Cost Reduction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                <p className="text-sm text-muted-foreground">Faster Processing</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Implementation Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Implementation Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">1</div>
                <CardTitle>Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyze your current processes and identify automation opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">2</div>
                <CardTitle>Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create custom automation workflows tailored to your business needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">3</div>
                <CardTitle>Deploy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Implement automation solutions with minimal disruption to operations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mb-4">4</div>
                <CardTitle>Optimize</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Continuously monitor and improve automation performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Automate Your Business?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your operations with intelligent automation. Start saving time and money today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Free Assessment
            </Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}