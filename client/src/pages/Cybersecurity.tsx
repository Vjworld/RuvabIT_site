import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, AlertTriangle, Users, FileCheck } from "lucide-react";
import GoToTopButton from '@/components/GoToTopButton';

export default function Cybersecurity() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cybersecurity Services | Enterprise Security Solutions | Ruvab IT</title>
        <meta name="description" content="Comprehensive cybersecurity services to protect your business. Threat detection, security audits, compliance, and incident response solutions." />
        <meta name="keywords" content="cybersecurity, information security, threat detection, security audit, compliance, penetration testing, incident response" />
        <link rel="canonical" href="https://ruvab.it.com/cybersecurity" />
        <meta property="og:title" content="Cybersecurity Services | Enterprise Security Solutions" />
        <meta property="og:description" content="Comprehensive cybersecurity services to protect your business from threats." />
        <meta property="og:url" content="https://ruvab.it.com/cybersecurity" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Cybersecurity Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Protect your business from cyber threats with our comprehensive security solutions. 
            From threat detection to incident response, we provide enterprise-grade cybersecurity services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Security Assessment
            </Button>
            <Button size="lg" variant="outline">
              Contact Security Team
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Core Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Security Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-red-600 mb-4" />
                <CardTitle>Threat Detection & Prevention</CardTitle>
                <CardDescription>
                  Advanced threat detection systems to identify and prevent cyber attacks before they impact your business.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• 24/7 security monitoring</li>
                  <li>• AI-powered threat detection</li>
                  <li>• Intrusion prevention systems</li>
                  <li>• Malware and ransomware protection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Security Audits & Assessments</CardTitle>
                <CardDescription>
                  Comprehensive security audits to identify vulnerabilities and ensure compliance with industry standards.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Vulnerability assessments</li>
                  <li>• Penetration testing</li>
                  <li>• Compliance audits</li>
                  <li>• Security risk analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="w-10 h-10 text-orange-600 mb-4" />
                <CardTitle>Incident Response</CardTitle>
                <CardDescription>
                  Rapid incident response services to minimize damage and restore normal operations quickly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• 24/7 incident response team</li>
                  <li>• Forensic investigation</li>
                  <li>• Damage assessment</li>
                  <li>• Recovery planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Security Solutions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Specialized Security Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-600" />
                  Security Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Continuous monitoring of your IT infrastructure to detect and respond to threats.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">SIEM Integration</Badge>
                  <Badge variant="secondary">Log Analysis</Badge>
                  <Badge variant="secondary">Behavioral Analytics</Badge>
                  <Badge variant="secondary">Real-time Alerts</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Network traffic monitoring</li>
                  <li>• Endpoint detection and response</li>
                  <li>• Database activity monitoring</li>
                  <li>• Cloud security monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-600" />
                  Identity & Access Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Secure user authentication and authorization systems to protect sensitive data.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Multi-Factor Authentication</Badge>
                  <Badge variant="secondary">Single Sign-On</Badge>
                  <Badge variant="secondary">Privileged Access</Badge>
                  <Badge variant="secondary">Role-Based Access</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Identity federation</li>
                  <li>• Access governance</li>
                  <li>• Password management</li>
                  <li>• User provisioning</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-purple-600" />
                  Compliance & Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Ensure your organization meets regulatory requirements and industry standards.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">GDPR</Badge>
                  <Badge variant="secondary">HIPAA</Badge>
                  <Badge variant="secondary">SOX</Badge>
                  <Badge variant="secondary">ISO 27001</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Policy development</li>
                  <li>• Compliance assessment</li>
                  <li>• Documentation management</li>
                  <li>• Training programs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-orange-600" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Comprehensive data protection strategies to safeguard your critical information.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">Data Encryption</Badge>
                  <Badge variant="secondary">Backup Solutions</Badge>
                  <Badge variant="secondary">DLP</Badge>
                  <Badge variant="secondary">Data Classification</Badge>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Encryption at rest and in transit</li>
                  <li>• Data loss prevention</li>
                  <li>• Backup and recovery</li>
                  <li>• Data retention policies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Industry-Specific Security</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Healthcare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">HIPAA-compliant security solutions for healthcare organizations.</p>
                <div className="space-y-2">
                  <Badge variant="outline">HIPAA Compliance</Badge>
                  <Badge variant="outline">PHI Protection</Badge>
                  <Badge variant="outline">Medical Device Security</Badge>
                  <Badge variant="outline">Audit Logging</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Robust security measures for banks and financial institutions.</p>
                <div className="space-y-2">
                  <Badge variant="outline">PCI DSS</Badge>
                  <Badge variant="outline">Fraud Prevention</Badge>
                  <Badge variant="outline">Transaction Security</Badge>
                  <Badge variant="outline">Risk Management</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Government</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Security solutions meeting government standards and regulations.</p>
                <div className="space-y-2">
                  <Badge variant="outline">FISMA</Badge>
                  <Badge variant="outline">FedRAMP</Badge>
                  <Badge variant="outline">NIST Framework</Badge>
                  <Badge variant="outline">Security Clearance</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Security Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Security Implementation Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center mb-4">1</div>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Identify and evaluate security risks specific to your environment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">2</div>
                <CardTitle>Security Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Develop comprehensive security strategy and policies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">3</div>
                <CardTitle>Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deploy security solutions and controls across your infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mb-4">4</div>
                <CardTitle>Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Continuous monitoring and improvement of security posture.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Security Performance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">99.9%</div>
                <p className="text-sm text-muted-foreground">Threat Detection Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Security Monitoring</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15 min</div>
                <p className="text-sm text-muted-foreground">Average Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Compliance Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Secure Your Business Today</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Don't wait for a security breach. Protect your business with our comprehensive cybersecurity solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Free Security Assessment
            </Button>
            <Button size="lg" variant="outline">
              Talk to Security Expert
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}