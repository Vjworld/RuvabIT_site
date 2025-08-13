import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Play, Settings, Download, ExternalLink } from "lucide-react";
import GoToTopButton from '@/components/GoToTopButton';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Documentation Guide | API Docs | Technical Resources | Ruvab IT</title>
        <meta name="description" content="Comprehensive documentation and technical guides for Ruvab IT's technology solutions. API documentation, integration guides, and developer resources." />
        <meta name="keywords" content="documentation, API docs, technical guide, developer resources, integration guide, SDK documentation" />
        <link rel="canonical" href="https://ruvab.it.com/documentation" />
        <meta property="og:title" content="Documentation Guide | API Docs | Technical Resources" />
        <meta property="og:description" content="Comprehensive documentation and technical guides for Ruvab IT's technology solutions." />
        <meta property="og:url" content="https://ruvab.it.com/documentation" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Documentation Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive documentation, API references, and technical guides to help you integrate 
            and maximize the value of our technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/help-documentation'}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse Documentation
            </Button>
            <Button 
              onClick={() => window.location.href = '/contact'}
              size="lg" 
              variant="outline"
            >
              Contact for API Access
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Quick Start Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start Guides</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Play className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn the basics of our platform and set up your first integration in minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li>• Account setup and API key generation</li>
                  <li>• Basic authentication methods</li>
                  <li>• Your first API call</li>
                  <li>• Common integration patterns</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Start Guide <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Code className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>API Integration</CardTitle>
                <CardDescription>
                  Step-by-step guide to integrate our APIs into your applications seamlessly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li>• RESTful API endpoints</li>
                  <li>• Request/response formats</li>
                  <li>• Error handling best practices</li>
                  <li>• Rate limiting and quotas</li>
                </ul>
                <Button variant="outline" className="w-full">
                  View API Docs <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="w-10 h-10 text-purple-600 mb-4" />
                <CardTitle>Configuration</CardTitle>
                <CardDescription>
                  Configure and customize our solutions to meet your specific business requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li>• Environment setup</li>
                  <li>• Security configuration</li>
                  <li>• Custom workflows</li>
                  <li>• Performance optimization</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Configuration Guide <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Product Documentation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Product Documentation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-6 h-6 text-blue-600" />
                  Trend Solver API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Complete API documentation for our trend analysis and problem-solving platform.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">REST API</Badge>
                  <Badge variant="secondary">GraphQL</Badge>
                  <Badge variant="secondary">WebSocket</Badge>
                  <Badge variant="secondary">SDK</Badge>
                </div>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Market trend analysis endpoints</li>
                  <li>• Problem identification algorithms</li>
                  <li>• Solution recommendation engine</li>
                  <li>• Real-time data streaming</li>
                </ul>
                <Button variant="outline" className="w-full">
                  View Documentation <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-6 h-6 text-green-600" />
                  LangScribe API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Comprehensive documentation for our AI-powered content creation platform.</p>
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">NLP API</Badge>
                  <Badge variant="secondary">Content AI</Badge>
                  <Badge variant="secondary">Translation</Badge>
                  <Badge variant="secondary">Analytics</Badge>
                </div>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Content generation endpoints</li>
                  <li>• Language translation services</li>
                  <li>• Content optimization tools</li>
                  <li>• Usage analytics and reporting</li>
                </ul>
                <Button variant="outline" className="w-full">
                  View Documentation <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SDK & Libraries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">SDKs & Libraries</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>JavaScript SDK</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Full-featured JavaScript SDK for web and Node.js applications.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline">npm install</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">React/Vue</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Python SDK</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Python library for data science and machine learning integrations.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline">pip install</Badge>
                  <Badge variant="outline">NumPy</Badge>
                  <Badge variant="outline">Pandas</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Java SDK</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Enterprise-grade Java SDK for Spring Boot and Android applications.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline">Maven</Badge>
                  <Badge variant="outline">Gradle</Badge>
                  <Badge variant="outline">Spring Boot</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>C# SDK</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  .NET SDK for ASP.NET Core and Windows applications.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline">NuGet</Badge>
                  <Badge variant="outline">.NET Core</Badge>
                  <Badge variant="outline">Azure</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Code Examples</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic API Call</CardTitle>
                <CardDescription>Simple example of making your first API request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono">
                  <div className="text-green-600 dark:text-green-400"># Python Example</div>
                  <div className="mt-2">
                    <div>import requests</div>
                    <div className="mt-1"></div>
                    <div>headers = {'{'}
                      <div className="ml-4">'Authorization': 'Bearer YOUR_API_KEY',</div>
                      <div className="ml-4">'Content-Type': 'application/json'</div>
                    <div>{'}'}</div>
                    </div>
                    <div className="mt-2">
                      <div>response = requests.get(</div>
                      <div className="ml-4">'https://api.ruvab.it.com/v1/trends',</div>
                      <div className="ml-4">headers=headers</div>
                      <div>)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>How to authenticate with our API securely</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono">
                  <div className="text-blue-600 dark:text-blue-400">// JavaScript Example</div>
                  <div className="mt-2">
                    <div>const apiKey = process.env.RUVAB_API_KEY;</div>
                    <div className="mt-1"></div>
                    <div>const response = await fetch(</div>
                    <div className="ml-4">'https://api.ruvab.it.com/v1/auth',</div>
                    <div className="ml-4">{'{'}</div>
                    <div className="ml-8">method: 'POST',</div>
                    <div className="ml-8">headers: {'{'}</div>
                    <div className="ml-12">'Authorization': `Bearer ${'{'}apiKey{'}'}`,</div>
                    <div className="ml-12">'Content-Type': 'application/json'</div>
                    <div className="ml-8">{'}'}</div>
                    <div className="ml-4">{'}'}</div>
                    <div>);</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Support Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Community Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our developer community to ask questions and share knowledge.
                </p>
                <Button variant="outline" className="w-full">
                  Visit Forum <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GitHub Repository</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Access sample code, report issues, and contribute to our open-source projects.
                </p>
                <Button variant="outline" className="w-full">
                  View on GitHub <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get direct help from our technical support team for integration issues.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to integrate our solutions into your applications and workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get API Key
            </Button>
            <Button size="lg" variant="outline">
              Contact Developer Support
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}