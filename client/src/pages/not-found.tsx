import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Search, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Page Not Found - 404 Error | Ruvab IT</title>
        <meta name="description" content="The page you're looking for doesn't exist. Find what you need through our site navigation or contact us for assistance." />
        <link rel="canonical" href="https://ruvab.it.com/404" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <AlertCircle className="h-24 w-24 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">What can you do?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Search className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Search our site</h3>
                    <p className="text-sm text-gray-600">Use our navigation menu to find what you're looking for</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Go to homepage</h3>
                    <p className="text-sm text-gray-600">Start over from our main page</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Contact support</h3>
                    <p className="text-sm text-gray-600">Get help from our team</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/services">
                <Button variant="ghost" className="w-full">Services</Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" className="w-full">Blog</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="w-full">About</Button>
              </Link>
              <Link href="/help">
                <Button variant="ghost" className="w-full">Help Center</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
