import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Target, CheckCircle, ArrowRight } from "lucide-react";
import { trackEvent } from '@/lib/analytics';
import { useLocation } from 'wouter';
import GoToTopButton from '@/components/GoToTopButton';

export default function CaseStudies() {
  const [, setLocation] = useLocation();

  const handleStartProject = () => {
    trackEvent('start_project', 'engagement', 'case_studies_cta');
    setLocation('/contact');
  };

  const handleDiscussNeeds = () => {
    trackEvent('discuss_needs', 'engagement', 'case_studies_cta');
    setLocation('/contact');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Case Studies | Success Stories | Ruvab IT Technology Solutions</title>
        <meta name="description" content="Explore our successful technology implementations and digital transformation case studies. Real results from AI, automation, and cloud solutions." />
        <meta name="keywords" content="case studies, success stories, technology implementation, digital transformation, AI solutions, client results" />
        <link rel="canonical" href="https://ruvab.it.com/case-studies" />
        <meta property="og:title" content="Case Studies | Success Stories | Ruvab IT" />
        <meta property="og:description" content="Explore our successful technology implementations and digital transformation case studies." />
        <meta property="og:url" content="https://ruvab.it.com/case-studies" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Success Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how we've helped businesses transform their operations with cutting-edge technology solutions. 
            Real projects, real results, real impact.
          </p>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Case Study 1 */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl">Healthcare AI Implementation</CardTitle>
                  <CardDescription>Regional Medical Center - 500+ bed hospital</CardDescription>
                </div>
                <Badge variant="secondary">Healthcare</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Challenge</h3>
                  <p className="text-muted-foreground mb-6">
                    A leading regional medical center was struggling with inefficient patient diagnosis processes, 
                    leading to longer wait times and increased operational costs. They needed an AI-powered solution 
                    to improve diagnostic accuracy and speed.
                  </p>
                  
                  <h3 className="font-semibold mb-4">Solution</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Implemented AI-powered diagnostic imaging system</li>
                    <li>• Integrated with existing EHR systems</li>
                    <li>• Deployed natural language processing for medical records</li>
                    <li>• Established real-time patient monitoring dashboard</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Results</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">45% reduction in diagnostic time</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">92% diagnostic accuracy improvement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">$2.5M annual cost savings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">30% increase in patient satisfaction</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm italic">
                      "The AI diagnostic system has revolutionized our operations. We're now able to provide 
                      faster, more accurate diagnoses, which has significantly improved patient outcomes."
                    </p>
                    <p className="text-sm font-semibold mt-2">- Dr. Sarah Johnson, Chief Medical Officer</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Case Study 2 */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl">E-commerce Automation Platform</CardTitle>
                  <CardDescription>Global Retail Company - $500M+ annual revenue</CardDescription>
                </div>
                <Badge variant="secondary">E-commerce</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Challenge</h3>
                  <p className="text-muted-foreground mb-6">
                    A global e-commerce company faced challenges with manual inventory management, 
                    order processing delays, and inefficient customer service operations across multiple channels.
                  </p>
                  
                  <h3 className="font-semibold mb-4">Solution</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Deployed intelligent inventory management system</li>
                    <li>• Automated order processing and fulfillment</li>
                    <li>• Implemented AI-powered customer service chatbots</li>
                    <li>• Created unified dashboard for multi-channel operations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Results</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">80% reduction in order processing time</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">60% decrease in inventory costs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">95% customer query automation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">40% increase in customer satisfaction</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm italic">
                      "The automation platform has transformed our entire operation. We can now handle 3x more 
                      orders with the same team while providing better customer service."
                    </p>
                    <p className="text-sm font-semibold mt-2">- Michael Chen, Operations Director</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Case Study 3 */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl">Financial Services Cloud Migration</CardTitle>
                  <CardDescription>Investment Bank - Enterprise-level infrastructure</CardDescription>
                </div>
                <Badge variant="secondary">Financial Services</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Challenge</h3>
                  <p className="text-muted-foreground mb-6">
                    A major investment bank needed to modernize their legacy infrastructure while maintaining 
                    strict regulatory compliance and ensuring zero downtime during the migration process.
                  </p>
                  
                  <h3 className="font-semibold mb-4">Solution</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Designed hybrid cloud architecture</li>
                    <li>• Implemented phased migration strategy</li>
                    <li>• Established compliance monitoring systems</li>
                    <li>• Created disaster recovery protocols</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Results</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Zero downtime during migration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">55% reduction in infrastructure costs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">99.99% uptime achievement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">100% regulatory compliance maintained</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-sm italic">
                      "The cloud migration was flawless. We achieved significant cost savings while improving 
                      our operational efficiency and maintaining full regulatory compliance."
                    </p>
                    <p className="text-sm font-semibold mt-2">- David Rodriguez, CTO</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Case Study 4 */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl">Manufacturing IoT Analytics</CardTitle>
                  <CardDescription>Automotive Parts Manufacturer - 15 production facilities</CardDescription>
                </div>
                <Badge variant="secondary">Manufacturing</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Challenge</h3>
                  <p className="text-muted-foreground mb-6">
                    An automotive parts manufacturer experienced frequent equipment failures and quality issues 
                    across multiple facilities, resulting in costly downtime and production delays.
                  </p>
                  
                  <h3 className="font-semibold mb-4">Solution</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Deployed IoT sensors across all production lines</li>
                    <li>• Implemented predictive maintenance algorithms</li>
                    <li>• Created real-time quality monitoring system</li>
                    <li>• Established centralized analytics dashboard</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Results</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">70% reduction in unplanned downtime</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">85% improvement in quality metrics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">$4.2M annual savings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">25% increase in production efficiency</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <p className="text-sm italic">
                      "The IoT analytics platform has been a game-changer. We now predict equipment failures 
                      before they happen and maintain consistent quality across all our facilities."
                    </p>
                    <p className="text-sm font-semibold mt-2">- Lisa Thompson, Plant Manager</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Overall Impact</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Successful Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$50M+</div>
                <p className="text-sm text-muted-foreground">Client Cost Savings</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                <p className="text-sm text-muted-foreground">Project Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our growing list of satisfied clients who have transformed their businesses with our technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleStartProject}
            >
              Start Your Project
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleDiscussNeeds}
            >
              Discuss Your Needs
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}