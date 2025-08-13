import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Rocket, Code, Settings, Target, Shield } from "lucide-react";
import GoToTopButton from '@/components/GoToTopButton';

export default function AIImplementation() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Implementation Services | Custom AI Solutions | Ruvab IT</title>
        <meta name="description" content="Expert AI implementation services for businesses. Custom machine learning solutions, AI integration, and digital transformation with proven methodologies." />
        <meta name="keywords" content="AI implementation, machine learning integration, custom AI solutions, digital transformation, AI consulting, ML deployment" />
        <link rel="canonical" href="https://ruvab.it.com/ai-implementation" />
        <meta property="og:title" content="AI Implementation Services | Custom AI Solutions" />
        <meta property="og:description" content="Expert AI implementation services for businesses. Custom machine learning solutions and AI integration." />
        <meta property="og:url" content="https://ruvab.it.com/ai-implementation" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Implementation Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your business with custom AI solutions. Our expert team delivers end-to-end AI implementation 
            services that drive innovation, efficiency, and competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Start Your AI Journey
            </Button>
            <Button size="lg" variant="outline">
              Consult Our Experts
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Implementation Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive AI Implementation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Brain className="w-10 h-10 text-purple-600 mb-4" />
                <CardTitle>Custom AI Development</CardTitle>
                <CardDescription>
                  Build tailored AI solutions that address your specific business challenges and objectives.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Machine learning model development</li>
                  <li>• Natural language processing</li>
                  <li>• Computer vision solutions</li>
                  <li>• Deep learning implementations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>AI Integration</CardTitle>
                <CardDescription>
                  Seamlessly integrate AI capabilities into your existing systems and workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• API integration and development</li>
                  <li>• Legacy system modernization</li>
                  <li>• Cloud-based AI deployment</li>
                  <li>• Real-time processing systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>AI Strategy & Consulting</CardTitle>
                <CardDescription>
                  Develop comprehensive AI strategies aligned with your business goals and industry requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• AI readiness assessment</li>
                  <li>• Technology roadmap planning</li>
                  <li>• ROI analysis and projections</li>
                  <li>• Change management support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Industry Solutions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Industry-Specific AI Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Healthcare AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Revolutionary AI solutions for healthcare providers and medical institutions.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Medical Image Analysis</Badge>
                  <Badge variant="secondary">Diagnostic Support</Badge>
                  <Badge variant="secondary">Drug Discovery</Badge>
                  <Badge variant="secondary">Patient Monitoring</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• FDA-compliant AI models</li>
                  <li>• HIPAA-secure implementations</li>
                  <li>• Clinical decision support systems</li>
                  <li>• Predictive health analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Financial Services AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Advanced AI solutions for banks, insurance, and fintech companies.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Fraud Detection</Badge>
                  <Badge variant="secondary">Risk Assessment</Badge>
                  <Badge variant="secondary">Algorithmic Trading</Badge>
                  <Badge variant="secondary">Credit Scoring</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Regulatory compliance (SOX, Basel III)</li>
                  <li>• Real-time transaction monitoring</li>
                  <li>• Customer behavior analysis</li>
                  <li>• Anti-money laundering (AML)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-600" />
                  Manufacturing AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Smart manufacturing solutions with AI-powered optimization and automation.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Predictive Maintenance</Badge>
                  <Badge variant="secondary">Quality Control</Badge>
                  <Badge variant="secondary">Supply Chain</Badge>
                  <Badge variant="secondary">Production Planning</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Industrial IoT integration</li>
                  <li>• Computer vision inspection</li>
                  <li>• Energy optimization</li>
                  <li>• Demand forecasting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-orange-600" />
                  Retail & E-commerce AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Personalized shopping experiences and intelligent retail operations.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Recommendation Engine</Badge>
                  <Badge variant="secondary">Price Optimization</Badge>
                  <Badge variant="secondary">Inventory Management</Badge>
                  <Badge variant="secondary">Customer Segmentation</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Personalization algorithms</li>
                  <li>• Dynamic pricing strategies</li>
                  <li>• Chatbot and virtual assistants</li>
                  <li>• Visual search capabilities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Implementation Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">1</div>
                <CardTitle>Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Understand your business needs, challenges, and AI readiness.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">2</div>
                <CardTitle>Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Develop comprehensive AI strategy and implementation roadmap.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">3</div>
                <CardTitle>Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build and train custom AI models using your data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mb-4">4</div>
                <CardTitle>Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deploy and integrate AI solutions into your systems.
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
                  Monitor, optimize, and scale AI solutions for maximum impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Proven Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <p className="text-sm text-muted-foreground">Implementation Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                <p className="text-sm text-muted-foreground">Average Cost Savings</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">45%</div>
                <p className="text-sm text-muted-foreground">Productivity Increase</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
                <p className="text-sm text-muted-foreground">Months Average ROI</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology Stack</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">TensorFlow</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                  <Badge variant="outline">Scikit-learn</Badge>
                  <Badge variant="outline">Keras</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloud Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">AWS</Badge>
                  <Badge variant="outline">Google Cloud</Badge>
                  <Badge variant="outline">Azure</Badge>
                  <Badge variant="outline">IBM Watson</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Programming Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">R</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">Java</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">Apache Spark</Badge>
                  <Badge variant="outline">Kafka</Badge>
                  <Badge variant="outline">Hadoop</Badge>
                  <Badge variant="outline">Elasticsearch</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Implement AI in Your Business?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Partner with our AI experts to transform your business with cutting-edge artificial intelligence solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get AI Assessment
            </Button>
            <Button size="lg" variant="outline">
              Book Consultation
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}