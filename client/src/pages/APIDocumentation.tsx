import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSenseAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Lock, Zap, Database, Settings, Check } from "lucide-react";

export default function APIDocumentation() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>API Documentation | Developer Resources | Ruvab IT Technology APIs</title>
        <meta name="description" content="Complete API documentation for Ruvab IT's technology platforms. REST APIs, authentication, endpoints, and integration examples." />
        <meta name="keywords" content="API documentation, REST API, developer guide, API reference, integration, endpoints, authentication" />
        <link rel="canonical" href="https://ruvab.it.com/api-documentation" />
        <meta property="og:title" content="API Documentation | Developer Resources | Ruvab IT" />
        <meta property="og:description" content="Complete API documentation for Ruvab IT's technology platforms and developer resources." />
        <meta property="og:url" content="https://ruvab.it.com/api-documentation" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive API documentation for developers. Build powerful applications with our RESTful APIs, 
            complete with authentication, endpoints, and real-world examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get API Key
            </Button>
            <Button size="lg" variant="outline">
              View Examples
            </Button>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* API Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">API Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Base URL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  https://api.ruvab.it.com/v1
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  All API endpoints are accessed via HTTPS and follow RESTful conventions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-6 h-6 text-green-600" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  API authentication uses Bearer tokens. Include your API key in the Authorization header.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Core API Endpoints</h2>
          
          {/* Trend Solver API */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                Trend Solver API
              </CardTitle>
              <CardDescription>
                Market trend analysis and problem-solving endpoints for business intelligence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                    <code className="text-sm">/trends</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Retrieve current market trends and analysis</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                    <code className="text-sm">/trends/analyze</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Submit data for custom trend analysis</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">GET</Badge>
                    <code className="text-sm">/solutions/{'{'}problemId{'}'}</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Get recommended solutions for identified problems</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LangScribe API */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-6 h-6 text-purple-600" />
                LangScribe API
              </CardTitle>
              <CardDescription>
                AI-powered content creation and language processing capabilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">POST</Badge>
                    <code className="text-sm">/content/generate</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Generate content using AI models</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                    <code className="text-sm">/content/translate</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Translate content between languages</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">GET</Badge>
                    <code className="text-sm">/content/analytics</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Retrieve content performance analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Request Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Request Examples</h2>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Trend Analysis Request</CardTitle>
              <CardDescription>Example of retrieving market trends for a specific industry</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-green-600 dark:text-green-400 mb-4"># cURL Example</div>
                <div>curl -X GET "https://api.ruvab.it.com/v1/trends?industry=technology&timeframe=30d" \</div>
                <div className="ml-2">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                <div className="ml-2">-H "Content-Type: application/json"</div>
                
                <div className="mt-6 text-blue-600 dark:text-blue-400 mb-4"># Response</div>
                <div>{'{'}</div>
                <div className="ml-2">"status": "success",</div>
                <div className="ml-2">"data": {'{'}</div>
                <div className="ml-4">"industry": "technology",</div>
                <div className="ml-4">"timeframe": "30d",</div>
                <div className="ml-4">"trends": [</div>
                <div className="ml-6">{'{'}</div>
                <div className="ml-8">"trend_id": "ai-automation",</div>
                <div className="ml-8">"title": "AI Automation Adoption",</div>
                <div className="ml-8">"growth_rate": 45.2,</div>
                <div className="ml-8">"confidence": 0.92</div>
                <div className="ml-6">{'}'}</div>
                <div className="ml-4">]</div>
                <div className="ml-2">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Content Generation Request</CardTitle>
              <CardDescription>Example of generating content using LangScribe API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-green-600 dark:text-green-400 mb-4"># JavaScript Example</div>
                <div>const response = await fetch('https://api.ruvab.it.com/v1/content/generate', {'{'}</div>
                <div className="ml-2">method: 'POST',</div>
                <div className="ml-2">headers: {'{'}</div>
                <div className="ml-4">'Authorization': 'Bearer YOUR_API_KEY',</div>
                <div className="ml-4">'Content-Type': 'application/json'</div>
                <div className="ml-2">{'},'},</div>
                <div className="ml-2">body: JSON.stringify({'{'}</div>
                <div className="ml-4">prompt: 'Write a blog post about AI trends',</div>
                <div className="ml-4">type: 'blog_post',</div>
                <div className="ml-4">length: 'medium',</div>
                <div className="ml-4">tone: 'professional'</div>
                <div className="ml-2">{'}'}</div>
                <div>{'}'}</div>
                
                <div className="mt-4">const data = await response.json();</div>
                <div>console.log(data.content);</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Response Formats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Response Formats</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-6 h-6 text-green-600" />
                  Success Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  <div>{'{'}</div>
                  <div className="ml-2">"status": "success",</div>
                  <div className="ml-2">"data": {'{'}</div>
                  <div className="ml-4">// Response data</div>
                  <div className="ml-2">{'},'},</div>
                  <div className="ml-2">"meta": {'{'}</div>
                  <div className="ml-4">"timestamp": "2024-01-15T10:30:00Z",</div>
                  <div className="ml-4">"rate_limit": {'{'}</div>
                  <div className="ml-6">"remaining": 95,</div>
                  <div className="ml-6">"reset_at": "2024-01-15T11:00:00Z"</div>
                  <div className="ml-4">{'}'}</div>
                  <div className="ml-2">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-red-600" />
                  Error Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  <div>{'{'}</div>
                  <div className="ml-2">"status": "error",</div>
                  <div className="ml-2">"error": {'{'}</div>
                  <div className="ml-4">"code": "INVALID_API_KEY",</div>
                  <div className="ml-4">"message": "Invalid API key provided",</div>
                  <div className="ml-4">"details": "Check your API key format"</div>
                  <div className="ml-2">{'},'},</div>
                  <div className="ml-2">"meta": {'{'}</div>
                  <div className="ml-4">"timestamp": "2024-01-15T10:30:00Z",</div>
                  <div className="ml-4">"request_id": "req_123456789"</div>
                  <div className="ml-2">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSenseAd className="mb-12" />

        {/* Rate Limits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Rate Limits & Quotas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Free Tier</CardTitle>
                <CardDescription>Perfect for testing and small projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Requests per hour</span>
                    <Badge variant="outline">100</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Daily quota</span>
                    <Badge variant="outline">1,000</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rate limit</span>
                    <Badge variant="outline">10/min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pro Tier</CardTitle>
                <CardDescription>For production applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Requests per hour</span>
                    <Badge variant="outline">10,000</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Daily quota</span>
                    <Badge variant="outline">100,000</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rate limit</span>
                    <Badge variant="outline">1,000/min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Custom limits for large-scale usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Requests per hour</span>
                    <Badge variant="outline">Unlimited</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Daily quota</span>
                    <Badge variant="outline">Custom</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rate limit</span>
                    <Badge variant="outline">Custom</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Error Codes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Common Error Codes</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Code</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono text-sm">INVALID_API_KEY</td>
                      <td className="p-2">401</td>
                      <td className="p-2">API key is invalid or missing</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono text-sm">RATE_LIMIT_EXCEEDED</td>
                      <td className="p-2">429</td>
                      <td className="p-2">API rate limit exceeded</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono text-sm">VALIDATION_ERROR</td>
                      <td className="p-2">400</td>
                      <td className="p-2">Request validation failed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono text-sm">RESOURCE_NOT_FOUND</td>
                      <td className="p-2">404</td>
                      <td className="p-2">Requested resource not found</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono text-sm">INTERNAL_ERROR</td>
                      <td className="p-2">500</td>
                      <td className="p-2">Internal server error</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Start Building with Our APIs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Get your API key today and start integrating our powerful technology solutions into your applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Free API Key
            </Button>
            <Button size="lg" variant="outline">
              Contact Developer Support
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}