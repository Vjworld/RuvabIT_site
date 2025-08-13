import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Book, 
  Code, 
  Play, 
  Copy, 
  Check, 
  Settings, 
  Key, 
  Globe, 
  Terminal,
  FileCode,
  Zap,
  Shield,
  Clock,
  Search
} from 'lucide-react';
import GoToTopButton from '@/components/GoToTopButton';

interface APIEndpoint {
  method: string;
  path: string;
  description: string;
  parameters: Array<{ name: string; type: string; required: boolean; description: string }>;
  response: string;
  example: string;
  authRequired: boolean;
}

export default function APIDocumentationPortal() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const apiEndpoints: APIEndpoint[] = [
    {
      method: 'GET',
      path: '/api/analytics/pageviews',
      description: 'Get website page view analytics',
      authRequired: true,
      parameters: [
        { name: 'period', type: 'string', required: false, description: 'Time period: 7d, 30d, 90d (default: 30d)' },
        { name: 'page', type: 'string', required: false, description: 'Specific page path to filter' }
      ],
      response: `{
  "success": true,
  "data": {
    "totalPageviews": 15420,
    "uniqueVisitors": 8240,
    "bounceRate": 32.5,
    "avgSessionDuration": "2m 34s"
  }
}`,
      example: `curl -X GET "https://ruvab.it.com/api/analytics/pageviews?period=30d" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      method: 'POST',
      path: '/api/ai/analyze-text',
      description: 'Analyze text using AI for sentiment, keywords, and insights',
      authRequired: true,
      parameters: [
        { name: 'text', type: 'string', required: true, description: 'Text content to analyze' },
        { name: 'language', type: 'string', required: false, description: 'Language code (default: en)' },
        { name: 'features', type: 'array', required: false, description: 'Analysis features: sentiment, keywords, entities' }
      ],
      response: `{
  "success": true,
  "data": {
    "sentiment": {
      "label": "positive",
      "score": 0.85
    },
    "keywords": ["technology", "innovation", "AI"],
    "entities": [
      {"text": "Ruvab IT", "type": "ORGANIZATION", "confidence": 0.95}
    ]
  }
}`,
      example: `curl -X POST "https://ruvab.it.com/api/ai/analyze-text" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Ruvab IT provides excellent AI solutions", "features": ["sentiment", "keywords"]}'`
    },
    {
      method: 'GET',
      path: '/api/blog/posts',
      description: 'Retrieve blog posts with pagination and filtering',
      authRequired: false,
      parameters: [
        { name: 'page', type: 'number', required: false, description: 'Page number (default: 1)' },
        { name: 'limit', type: 'number', required: false, description: 'Posts per page (default: 10)' },
        { name: 'category', type: 'string', required: false, description: 'Filter by category' },
        { name: 'published', type: 'boolean', required: false, description: 'Filter published posts (default: true)' }
      ],
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Future of AI in Business",
      "slug": "future-ai-business",
      "excerpt": "Exploring how AI is transforming industries...",
      "category": "AI & Machine Learning",
      "publishedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "current": 1,
    "total": 5,
    "hasNext": true
  }
}`,
      example: `curl -X GET "https://ruvab.it.com/api/blog/posts?category=AI&limit=5"`
    },
    {
      method: 'POST',
      path: '/api/qr/generate',
      description: 'Generate QR codes with customization options',
      authRequired: true,
      parameters: [
        { name: 'data', type: 'string', required: true, description: 'Data to encode in QR code' },
        { name: 'size', type: 'number', required: false, description: 'QR code size in pixels (default: 200)' },
        { name: 'format', type: 'string', required: false, description: 'Output format: png, svg (default: png)' },
        { name: 'errorCorrection', type: 'string', required: false, description: 'Error correction: L, M, Q, H (default: M)' }
      ],
      response: `{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "format": "png",
    "size": 200,
    "downloadUrl": "https://ruvab.it.com/api/qr/download/abc123"
  }
}`,
      example: `curl -X POST "https://ruvab.it.com/api/qr/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"data": "https://ruvab.it.com", "size": 300, "format": "png"}'`
    },
    {
      method: 'POST',
      path: '/api/contact/submit',
      description: 'Submit contact form inquiries',
      authRequired: false,
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Full name' },
        { name: 'email', type: 'string', required: true, description: 'Email address' },
        { name: 'company', type: 'string', required: false, description: 'Company name' },
        { name: 'subject', type: 'string', required: false, description: 'Message subject' },
        { name: 'message', type: 'string', required: true, description: 'Inquiry message' }
      ],
      response: `{
  "success": true,
  "message": "Thank you for your message. We'll get back to you within 24 hours."
}`,
      example: `curl -X POST "https://ruvab.it.com/api/contact/submit" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com", "message": "Interested in AI services"}'`
    },
    {
      method: 'GET',
      path: '/api/services/pricing',
      description: 'Get current service pricing information',
      authRequired: false,
      parameters: [
        { name: 'service', type: 'string', required: false, description: 'Filter by service type' },
        { name: 'currency', type: 'string', required: false, description: 'Currency code (default: INR)' }
      ],
      response: `{
  "success": true,
  "data": [
    {
      "service": "AI Implementation",
      "startingPrice": 50000,
      "currency": "INR",
      "features": ["Custom AI models", "Data analysis", "Integration support"],
      "timeline": "2-4 weeks"
    }
  ]
}`,
      example: `curl -X GET "https://ruvab.it.com/api/services/pricing?service=ai"`
    }
  ];

  const filteredEndpoints = apiEndpoints.filter(endpoint =>
    endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const testEndpoint = async (endpoint: APIEndpoint) => {
    setTestResponse('Loading...');
    
    // Simulate API call
    setTimeout(() => {
      setTestResponse(endpoint.response);
    }, 1500);
  };

  const getMethodBadgeColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'get': return 'bg-green-100 text-green-800';
      case 'post': return 'bg-blue-100 text-blue-800';
      case 'put': return 'bg-yellow-100 text-yellow-800';
      case 'delete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>API Documentation Portal | Developer Resources | Ruvab IT</title>
        <meta name="description" content="Complete API documentation for Ruvab IT services. Interactive testing, code examples, and comprehensive guides for developers." />
        <meta name="keywords" content="API documentation, developer portal, REST API, SDK, code examples, integration guide" />
        <link rel="canonical" href="https://ruvab.it.com/api-documentation" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            API Documentation Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete developer resources for integrating with Ruvab IT's services. 
            Test endpoints, view examples, and get your applications running quickly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Key className="h-4 w-4 mr-2" />
              Get API Key
            </Button>
            <Button size="lg" variant="outline">
              <FileCode className="h-4 w-4 mr-2" />
              View SDKs
            </Button>
          </div>

          {/* API Key Input */}
          <div className="max-w-md mx-auto">
            <Label htmlFor="apikey" className="text-sm font-medium">Test with your API Key</Label>
            <div className="flex mt-2">
              <Input
                id="apikey"
                type="password"
                placeholder="Enter your API key for testing"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="rounded-r-none"
              />
              <Button variant="outline" className="rounded-l-none">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">6</div>
              <p className="text-sm text-muted-foreground">API Endpoints</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime SLA</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">&lt;200ms</div>
              <p className="text-sm text-muted-foreground">Avg Response</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">OAuth 2.0</div>
              <p className="text-sm text-muted-foreground">Secure Auth</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* API Endpoints List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  API Endpoints
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search endpoints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredEndpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedEndpoint === endpoint ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedEndpoint(endpoint)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`text-xs ${getMethodBadgeColor(endpoint.method)}`}>
                          {endpoint.method}
                        </Badge>
                        {endpoint.authRequired && (
                          <Badge variant="outline" className="text-xs">
                            <Key className="h-3 w-3 mr-1" />
                            Auth
                          </Badge>
                        )}
                      </div>
                      <div className="font-mono text-sm font-medium mb-1">
                        {endpoint.path}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {endpoint.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Endpoint Details */}
          <div className="lg:col-span-2">
            {selectedEndpoint ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Badge className={`mr-3 ${getMethodBadgeColor(selectedEndpoint.method)}`}>
                          {selectedEndpoint.method}
                        </Badge>
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                          {selectedEndpoint.path}
                        </code>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {selectedEndpoint.description}
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => testEndpoint(selectedEndpoint)}
                      disabled={selectedEndpoint.authRequired && !apiKey}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="parameters" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="parameters">Parameters</TabsTrigger>
                      <TabsTrigger value="response">Response</TabsTrigger>
                      <TabsTrigger value="example">Example</TabsTrigger>
                    </TabsList>

                    <TabsContent value="parameters" className="space-y-4">
                      {selectedEndpoint.parameters.length > 0 ? (
                        <div className="space-y-3">
                          {selectedEndpoint.parameters.map((param, index) => (
                            <div key={index} className="border rounded p-4">
                              <div className="flex items-center justify-between mb-2">
                                <code className="font-medium">{param.name}</code>
                                <div className="flex space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {param.type}
                                  </Badge>
                                  {param.required && (
                                    <Badge variant="destructive" className="text-xs">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {param.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No parameters required.</p>
                      )}
                    </TabsContent>

                    <TabsContent value="response">
                      <div className="relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 z-10"
                          onClick={() => copyToClipboard(selectedEndpoint.response, 'response')}
                        >
                          {copiedCode === 'response' ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
                          <code>{selectedEndpoint.response}</code>
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="example">
                      <div className="relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 z-10"
                          onClick={() => copyToClipboard(selectedEndpoint.example, 'example')}
                        >
                          {copiedCode === 'example' ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
                          <code>{selectedEndpoint.example}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Test Response */}
                  {testResponse && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Test Response:</h4>
                      <pre className="bg-green-50 border border-green-200 p-4 rounded text-sm overflow-x-auto">
                        <code>{testResponse}</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Terminal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select an API Endpoint</h3>
                  <p className="text-muted-foreground">
                    Choose an endpoint from the list to view its documentation
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Quick guide to using the Ruvab IT API</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">1. Get Your API Key</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign up for a free account and generate your API key from the developer dashboard.
                  </p>
                  
                  <h4 className="font-semibold mb-3">2. Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Include your API key in the Authorization header for all authenticated requests.
                  </p>
                  
                  <h4 className="font-semibold mb-3">3. Rate Limits</h4>
                  <p className="text-sm text-muted-foreground">
                    Free tier: 1,000 requests/day. Pro tier: 10,000 requests/day.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Base URL</h4>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    https://ruvab.it.com/api
                  </code>
                  
                  <h4 className="font-semibold mb-3 mt-4">Content Type</h4>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    application/json
                  </code>
                  
                  <h4 className="font-semibold mb-3 mt-4">SDKs Available</h4>
                  <div className="flex space-x-2">
                    <Badge variant="outline">JavaScript</Badge>
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">PHP</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <GoToTopButton />
    </div>
  );
}