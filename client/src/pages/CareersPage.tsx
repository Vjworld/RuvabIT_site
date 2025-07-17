import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, Heart, Briefcase, Star } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Careers at Ruvab IT | Join Our Technology Team | Job Opportunities</title>
        <meta name="description" content="Join Ruvab IT's innovative technology team. Explore exciting career opportunities in AI, software development, cybersecurity, and more." />
        <meta name="keywords" content="careers, jobs, technology careers, software developer jobs, AI engineer, cybersecurity jobs, remote work" />
        <link rel="canonical" href="https://ruvab.it.com/careers" />
        <meta property="og:title" content="Careers at Ruvab IT | Join Our Technology Team" />
        <meta property="og:description" content="Join Ruvab IT's innovative technology team. Explore exciting career opportunities." />
        <meta property="og:url" content="https://ruvab.it.com/careers" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join Our Innovation Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Build the future of technology with us. We're looking for passionate individuals who want to make a 
            meaningful impact in AI, automation, and digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Open Positions
            </Button>
            <Button size="lg" variant="outline">
              Learn About Culture
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Why Work With Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Ruvab IT?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Heart className="w-10 h-10 text-red-600 mb-4" />
                <CardTitle>Innovation Culture</CardTitle>
                <CardDescription>
                  Work with cutting-edge technologies and contribute to groundbreaking solutions that shape the future.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• AI and machine learning projects</li>
                  <li>• Research and development opportunities</li>
                  <li>• Tech conference attendance</li>
                  <li>• Innovation time (20% projects)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Collaborative Environment</CardTitle>
                <CardDescription>
                  Join a diverse team of experts who support each other's growth and celebrate collective achievements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Cross-functional collaboration</li>
                  <li>• Mentorship programs</li>
                  <li>• Team building activities</li>
                  <li>• Open communication culture</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>Career Growth</CardTitle>
                <CardDescription>
                  Accelerate your career with comprehensive learning opportunities and clear advancement pathways.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Professional development budget</li>
                  <li>• Certification programs</li>
                  <li>• Leadership training</li>
                  <li>• Internal mobility</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Current Job Openings</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Senior AI Engineer
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Remote / San Francisco
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Lead the development of advanced AI systems and machine learning solutions for our enterprise clients.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">TensorFlow</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                  <Badge variant="outline">MLOps</Badge>
                  <Badge variant="outline">AWS</Badge>
                </div>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-green-600" />
                      Full Stack Developer
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Remote / New York
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Hot</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Build scalable web applications and contribute to our core platform development.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Docker</Badge>
                </div>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      Cybersecurity Analyst
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Remote / Austin
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Protect our clients' digital assets and ensure the security of our technology solutions.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">CISSP</Badge>
                  <Badge variant="outline">Penetration Testing</Badge>
                  <Badge variant="outline">SIEM</Badge>
                  <Badge variant="outline">Risk Assessment</Badge>
                  <Badge variant="outline">Compliance</Badge>
                </div>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-orange-600" />
                      DevOps Engineer
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Remote / Seattle
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Streamline our development and deployment processes with modern DevOps practices.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Kubernetes</Badge>
                  <Badge variant="outline">Jenkins</Badge>
                  <Badge variant="outline">Terraform</Badge>
                  <Badge variant="outline">AWS/Azure</Badge>
                  <Badge variant="outline">CI/CD</Badge>
                </div>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Employee Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Health Insurance Coverage</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">$5,000</div>
                <p className="text-sm text-muted-foreground">Annual Learning Budget</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">25</div>
                <p className="text-sm text-muted-foreground">Vacation Days</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">401k</div>
                <p className="text-sm text-muted-foreground">Retirement Matching</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Application Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">1</div>
                <CardTitle>Apply Online</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Submit your application through our career portal with your resume and cover letter.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">2</div>
                <CardTitle>Initial Screen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our HR team will review your application and conduct an initial screening call.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">3</div>
                <CardTitle>Technical Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technical interview with our engineering team to assess your skills and experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mb-4">4</div>
                <CardTitle>Final Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Final interview with team leads and managers to discuss fit and expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Take the next step in your career and help us build the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Browse All Jobs
            </Button>
            <Button size="lg" variant="outline">
              Contact HR Team
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}