import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, TrendingUp, Settings, CheckCircle } from "lucide-react";
import GoToTopButton from '@/components/GoToTopButton';

export default function Consulting() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Technology Consulting Services | Digital Transformation | Ruvab IT</title>
        <meta name="description" content="Expert technology consulting services for digital transformation. Strategic IT planning, architecture design, and implementation guidance." />
        <meta name="keywords" content="technology consulting, digital transformation, IT strategy, enterprise architecture, technology advisory, business consulting" />
        <link rel="canonical" href="https://ruvab.it.com/consulting" />
        <meta property="og:title" content="Technology Consulting Services | Digital Transformation" />
        <meta property="og:description" content="Expert technology consulting services for digital transformation and IT strategy." />
        <meta property="og:url" content="https://ruvab.it.com/consulting" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Technology Consulting Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Navigate your digital transformation journey with our expert technology consulting services. 
            We provide strategic guidance, architecture design, and implementation support to drive business success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline">
              View Case Studies
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Core Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Consulting Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Target className="w-10 h-10 text-indigo-600 mb-4" />
                <CardTitle>Strategic IT Planning</CardTitle>
                <CardDescription>
                  Develop comprehensive IT strategies aligned with your business objectives and market opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Technology roadmap development</li>
                  <li>• Digital transformation strategy</li>
                  <li>• IT governance and compliance</li>
                  <li>• Budget planning and optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="w-10 h-10 text-purple-600 mb-4" />
                <CardTitle>Enterprise Architecture</CardTitle>
                <CardDescription>
                  Design scalable, secure, and efficient enterprise architectures that support your business goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• System architecture design</li>
                  <li>• Integration strategy</li>
                  <li>• Performance optimization</li>
                  <li>• Security architecture</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Innovation Advisory</CardTitle>
                <CardDescription>
                  Identify emerging technologies and innovation opportunities to gain competitive advantage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Technology trend analysis</li>
                  <li>• Innovation workshops</li>
                  <li>• Proof of concept development</li>
                  <li>• Technology evaluation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Specialized Consulting */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Specialized Consulting Areas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Digital Transformation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Guide your organization through comprehensive digital transformation initiatives.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Change Management</Badge>
                  <Badge variant="secondary">Process Optimization</Badge>
                  <Badge variant="secondary">Technology Modernization</Badge>
                  <Badge variant="secondary">Cultural Transformation</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Business process reengineering</li>
                  <li>• Legacy system modernization</li>
                  <li>• Digital culture development</li>
                  <li>• ROI measurement and tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-600" />
                  Organizational Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Build technology-enabled organizations that drive innovation and growth.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Team Structure</Badge>
                  <Badge variant="secondary">Skills Development</Badge>
                  <Badge variant="secondary">Performance Management</Badge>
                  <Badge variant="secondary">Technology Training</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Agile transformation</li>
                  <li>• DevOps implementation</li>
                  <li>• Leadership development</li>
                  <li>• Technology competency building</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-600" />
                  Technology Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Comprehensive evaluation of your current technology landscape and future needs.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Infrastructure Audit</Badge>
                  <Badge variant="secondary">Security Assessment</Badge>
                  <Badge variant="secondary">Performance Analysis</Badge>
                  <Badge variant="secondary">Cost Optimization</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Technology gap analysis</li>
                  <li>• Vendor evaluation</li>
                  <li>• Risk assessment</li>
                  <li>• Recommendation development</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                  Innovation Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Develop innovation strategies that leverage technology for competitive advantage.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Innovation Framework</Badge>
                  <Badge variant="secondary">R&D Strategy</Badge>
                  <Badge variant="secondary">Technology Scouting</Badge>
                  <Badge variant="secondary">Partnership Strategy</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Innovation lab setup</li>
                  <li>• Startup partnerships</li>
                  <li>• Technology incubation</li>
                  <li>• IP strategy development</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Industry Expertise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Industry Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Financial Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Specialized consulting for banks, insurance, and fintech companies.</p>
                <div className="space-y-2">
                  <Badge variant="outline">Digital Banking</Badge>
                  <Badge variant="outline">Risk Management</Badge>
                  <Badge variant="outline">Regulatory Compliance</Badge>
                  <Badge variant="outline">Blockchain</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Healthcare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Technology consulting for healthcare providers and medical organizations.</p>
                <div className="space-y-2">
                  <Badge variant="outline">EHR Systems</Badge>
                  <Badge variant="outline">Telemedicine</Badge>
                  <Badge variant="outline">AI Diagnostics</Badge>
                  <Badge variant="outline">HIPAA Compliance</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manufacturing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Smart manufacturing and Industry 4.0 transformation consulting.</p>
                <div className="space-y-2">
                  <Badge variant="outline">IoT Integration</Badge>
                  <Badge variant="outline">Predictive Maintenance</Badge>
                  <Badge variant="outline">Supply Chain</Badge>
                  <Badge variant="outline">Quality Control</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Consulting Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Consulting Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4">1</div>
                <CardTitle>Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Understand your business objectives and current technology landscape.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">2</div>
                <CardTitle>Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyze gaps, opportunities, and develop strategic recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">3</div>
                <CardTitle>Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create comprehensive strategy and roadmap for implementation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">4</div>
                <CardTitle>Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Guide implementation with hands-on support and expertise.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mb-4">5</div>
                <CardTitle>Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Continuously optimize and improve based on results.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Client Success Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">80%</div>
                <p className="text-sm text-muted-foreground">Project Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">65%</div>
                <p className="text-sm text-muted-foreground">Average ROI Improvement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <p className="text-sm text-muted-foreground">Months Average Implementation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Consulting Services?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">Experienced consultants with deep industry knowledge</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Proven Methodology</h3>
                  <p className="text-sm text-muted-foreground">Time-tested approaches that deliver results</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Technology Leadership</h3>
                  <p className="text-sm text-muted-foreground">Stay ahead with cutting-edge technology insights</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Tailored Solutions</h3>
                  <p className="text-sm text-muted-foreground">Customized strategies for your unique challenges</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Implementation Support</h3>
                  <p className="text-sm text-muted-foreground">Hands-on guidance throughout the journey</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Long-term Partnership</h3>
                  <p className="text-sm text-muted-foreground">Ongoing support for continuous improvement</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Partner with our expert consultants to navigate your digital transformation journey successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline">
              Download Our Brochure
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}