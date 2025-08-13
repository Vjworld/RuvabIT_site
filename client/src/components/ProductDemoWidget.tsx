import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Play, Pause, RotateCcw, Download, Copy, Check, ExternalLink } from 'lucide-react';

interface ProductDemoWidgetProps {
  productName: 'TrendSolver' | 'LangScribe' | 'QRGenerator';
  productUrl?: string;
}

const ProductDemoWidget: React.FC<ProductDemoWidgetProps> = ({ productName, productUrl }) => {
  const [demoInput, setDemoInput] = useState('');
  const [demoOutput, setDemoOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const demoConfigs = {
    TrendSolver: {
      title: 'AI Trend Analysis Demo',
      description: 'Try our AI-powered trend analysis with sample data',
      placeholder: 'Enter market data, keywords, or trends to analyze...',
      sampleInput: 'AI technology adoption, electric vehicles, renewable energy, remote work trends',
      processDemo: async (input: string) => {
        return `🔍 Trend Analysis Results for: "${input}"

📈 **Top Emerging Trends:**
• AI-powered automation (+245% growth)
• Sustainable technology solutions (+189% growth)
• Remote collaboration tools (+156% growth)

🎯 **Market Insights:**
• High adoption rate in tech sector (87%)
• Strong correlation with digital transformation
• Projected 3-year growth: 340%

💡 **Recommendations:**
• Focus on B2B integration opportunities
• Target early adopters in enterprise segment
• Consider partnerships with sustainability firms

📊 **Confidence Score:** 94.2%`;
      }
    },
    LangScribe: {
      title: 'AI Language Processing Demo',
      description: 'Experience our advanced NLP and text processing capabilities',
      placeholder: 'Enter text for language analysis, translation, or processing...',
      sampleInput: 'Ruvab IT provides cutting-edge AI solutions for modern businesses. Our team specializes in machine learning, data analytics, and intelligent automation.',
      processDemo: async (input: string) => {
        return `📝 Language Analysis Results

🎯 **Sentiment Analysis:**
• Overall Sentiment: Positive (89.5%)
• Confidence Level: High
• Emotional Tone: Professional, Confident

🔤 **Key Entities:**
• Organizations: Ruvab IT (95% confidence)
• Technologies: AI, Machine Learning, Data Analytics
• Business Focus: Modern businesses, automation

🌍 **Language Details:**
• Language: English (99.8% confidence)
• Readability Score: Professional (Grade 12)
• Word Count: ${input.split(' ').length} words

📊 **Content Classification:**
• Category: Business/Technology
• Industry: IT Services
• Target Audience: B2B/Enterprise

💎 **Quality Metrics:**
• Clarity Score: 8.7/10
• Technical Accuracy: 9.2/10
• Professional Tone: 9.5/10`;
      }
    },
    QRGenerator: {
      title: 'QR Code Generator Demo',
      description: 'Generate QR codes instantly with customization options',
      placeholder: 'Enter URL, text, or data to encode in QR code...',
      sampleInput: 'https://ruvab.it.com',
      processDemo: async (input: string) => {
        return `📱 QR Code Generated Successfully!

📊 **QR Code Details:**
• Data Type: ${input.startsWith('http') ? 'URL' : 'Text'}
• Content: ${input}
• Format: PNG (High Resolution)
• Size: 300x300 pixels
• Error Correction: Medium (M)

✅ **Features Applied:**
• Custom styling with brand colors
• High-contrast design for better scanning
• Optimized for both mobile and print
• Error correction for damaged codes

🔧 **Technical Specs:**
• Encoding: UTF-8
• Version: QR Code 2.0
• Module Size: 4px
• Quiet Zone: 32px

🚀 **Ready for Use:**
• Mobile scanning compatible
• Print quality: 300 DPI ready
• File formats: PNG, SVG, PDF available
• Bulk generation: Supported

${productUrl ? `\n🌐 **Try Full Version:** ${productUrl}` : ''}`;
      }
    }
  };

  const config = demoConfigs[productName];

  const runDemo = async () => {
    if (!demoInput.trim()) {
      setDemoInput(config.sampleInput);
      return;
    }

    setIsProcessing(true);
    setDemoOutput('Processing...');

    try {
      // Simulate realistic processing time
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      const result = await config.processDemo(demoInput);
      setDemoOutput(result);
    } catch (error) {
      setDemoOutput('Demo processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(demoOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const resetDemo = () => {
    setDemoInput('');
    setDemoOutput('');
    setIsProcessing(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Play className="h-5 w-5 mr-2 text-blue-600" />
              {config.title}
            </CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </div>
          {productUrl && (
            <Button
              onClick={() => window.open(productUrl, '_blank')}
              variant="outline"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Full App
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Demo Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Demo Input</label>
          <Textarea
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
            placeholder={config.placeholder}
            className="min-h-[100px] resize-none"
            disabled={isProcessing}
          />
          
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setDemoInput(config.sampleInput)}
              variant="outline"
              size="sm"
              disabled={isProcessing}
            >
              Use Sample Data
            </Button>
            
            <div className="flex space-x-2">
              <Button
                onClick={resetDemo}
                variant="outline"
                size="sm"
                disabled={isProcessing}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              
              <Button
                onClick={runDemo}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Demo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Demo Output */}
        {demoOutput && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Demo Results</label>
              
              <div className="flex space-x-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap font-mono overflow-x-auto">
                {demoOutput}
              </pre>
            </div>
            
            {!isProcessing && demoOutput !== 'Processing...' && (
              <div className="flex items-center justify-center pt-4">
                <Badge variant="secondary" className="text-xs">
                  ✨ This is a demonstration. Full features available in the complete application.
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Feature Highlights */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Key Features Demonstrated:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productName === 'TrendSolver' && (
              <>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    📈
                  </div>
                  <p className="text-xs font-medium">Trend Analysis</p>
                  <p className="text-xs text-muted-foreground">AI-powered insights</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🎯
                  </div>
                  <p className="text-xs font-medium">Market Insights</p>
                  <p className="text-xs text-muted-foreground">Growth predictions</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    💡
                  </div>
                  <p className="text-xs font-medium">Recommendations</p>
                  <p className="text-xs text-muted-foreground">Actionable strategies</p>
                </div>
              </>
            )}

            {productName === 'LangScribe' && (
              <>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🎯
                  </div>
                  <p className="text-xs font-medium">Sentiment Analysis</p>
                  <p className="text-xs text-muted-foreground">Emotion detection</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🔤
                  </div>
                  <p className="text-xs font-medium">Entity Recognition</p>
                  <p className="text-xs text-muted-foreground">Smart extraction</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🌍
                  </div>
                  <p className="text-xs font-medium">Language Detection</p>
                  <p className="text-xs text-muted-foreground">Multi-language support</p>
                </div>
              </>
            )}

            {productName === 'QRGenerator' && (
              <>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    📱
                  </div>
                  <p className="text-xs font-medium">Instant Generation</p>
                  <p className="text-xs text-muted-foreground">Real-time creation</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🎨
                  </div>
                  <p className="text-xs font-medium">Customization</p>
                  <p className="text-xs text-muted-foreground">Style options</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🔧
                  </div>
                  <p className="text-xs font-medium">High Quality</p>
                  <p className="text-xs text-muted-foreground">Print-ready output</p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDemoWidget;