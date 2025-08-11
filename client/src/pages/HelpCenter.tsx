import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MessageCircle, FileText, Phone, Mail, Clock } from "lucide-react";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Help Center | Support & Resources | Ruvab IT</title>
        <meta name="description" content="Get help and support for Ruvab IT services. Find answers to common questions, contact support, and access resources." />
        <meta name="keywords" content="help center, support, FAQ, contact support, technical help, customer service" />
        <link rel="canonical" href="https://ruvab.it.com/help" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Get the support you need. Find answers to common questions or contact our team directly.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">How can we help you?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get instant help from our support team through live chat.
                </p>
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="w-full"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse our comprehensive documentation and guides.
                </p>
                <Button variant="outline" className="w-full">View Docs</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get help through our contact form for technical support.
                </p>
                <Button variant="outline" className="w-full">Contact Us</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How do I get started with Ruvab IT services?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Getting started is easy! Contact our team to discuss your needs, and we'll create a customized plan for your business.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What industries do you serve?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We serve businesses across all industries including healthcare, finance, manufacturing, retail, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do you offer 24/7 support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we provide 24/7 support for critical issues. Our team is available to help you whenever you need assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-8">
            Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.location.href = 'mailto:support@ruvabit.com'}>
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
            <Button size="lg" variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}