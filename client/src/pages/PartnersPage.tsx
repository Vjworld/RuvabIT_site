import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSenseAd from '@/components/AdSenseAd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Star, Users, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { ReferralPartner } from '@shared/schema';

const PartnersPage = () => {
  const { data: partners, isLoading, error } = useQuery<ReferralPartner[]>({
    queryKey: ['/api/referral-partners'],
  });

  const groupedPartners = partners ? partners.reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as Record<string, ReferralPartner[]>) : {};

  const categoryIcons = {
    hosting: <Zap className="h-5 w-5" />,
    payment: <Star className="h-5 w-5" />,
    email: <Users className="h-5 w-5" />,
    database: <ExternalLink className="h-5 w-5" />,
    news: <ArrowRight className="h-5 w-5" />,
    default: <Star className="h-5 w-5" />
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      development: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      hosting: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      payment: 'bg-gradient-to-r from-emerald-500 to-green-600',
      email: 'bg-gradient-to-r from-purple-500 to-pink-600',
      database: 'bg-gradient-to-r from-orange-500 to-red-600',
      news: 'bg-gradient-to-r from-rose-500 to-pink-600',
      other: 'bg-gradient-to-r from-violet-500 to-purple-600',
      default: 'bg-gradient-to-r from-slate-500 to-gray-600'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const LoadingSkeleton = () => (
    <div className="space-y-8">
      {[1, 2, 3].map((section) => (
        <div key={section}>
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((card) => (
              <Card key={card} className="h-80">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Our Partners - Ruvab IT | Trusted Technology Partners</title>
        <meta 
          name="description" 
          content="Discover our trusted technology partners including Replit, Namecheap, Razorpay, SendGrid, Zoho, and NewsNow. Get exclusive offers through our partnerships." 
        />
        <meta property="og:title" content="Our Partners - Ruvab IT" />
        <meta property="og:description" content="Trusted technology partners for hosting, payments, email services, and more. Exclusive offers available." />
        <meta property="og:type" content="website" />
        
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ'}`}></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ'}');
          `}
        </script>

        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4204204667108655" crossOrigin="anonymous"></script>
        
        {/* In-page Ad Script */}
        <script async src="https://js.mbidadm.com/static/scripts.js" data-admpid="367193"></script>
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Trusted Partners
              </h1>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                We collaborate with industry-leading companies to provide you with the best technology solutions. 
                Enjoy exclusive offers and benefits through our partnerships.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm">
                  <Star className="h-4 w-4 mr-2" />
                  Exclusive Offers
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Trusted Partnerships
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Premium Support
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense Ad - After Hero */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">Advertisement</div>
              <AdSenseAd 
                adSlot="7834958238" 
                adFormat="rectangle" 
                className="max-w-lg mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Partners Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            {isLoading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-2xl mx-auto">
                  <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-4">
                    Unable to Load Partners
                  </h2>
                  <p className="text-red-600 dark:text-red-400">
                    We're having trouble loading our partner information. Please try again later.
                  </p>
                </div>
              </div>
            ) : !partners || partners.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 max-w-2xl mx-auto">
                  <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
                    Coming Soon
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400">
                    We're building partnerships with leading technology companies. Check back soon for exclusive offers!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedPartners).map(([category, categoryPartners], index) => (
                  <div key={category}>
                    <div className="space-y-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl ${getCategoryColor(category)} text-white shadow-lg`}>
                          {categoryIcons[category as keyof typeof categoryIcons] || categoryIcons.default}
                        </div>
                        <h2 className="text-3xl font-bold capitalize bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                          {category} Partners
                        </h2>
                      </div>
                      <div className={`w-20 h-1 mx-auto rounded-full ${getCategoryColor(category)}`}></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryPartners.map((partner) => (
                        <Card key={partner.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 hover:border-transparent hover:ring-2 hover:ring-indigo-200 hover:bg-gradient-to-br hover:from-white hover:to-indigo-50 h-full flex flex-col">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              {partner.logoUrl && (
                                <div className="flex-shrink-0">
                                  <img
                                    src={partner.logoUrl}
                                    alt={`${partner.name} logo`}
                                    className="w-12 h-12 object-contain rounded-lg border bg-white p-1.5 shadow-sm"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">
                                  {partner.name}
                                </CardTitle>
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  <Badge className={`text-xs capitalize text-white border-0 ${getCategoryColor(partner.category)}`}>
                                    {partner.category}
                                  </Badge>
                                  {partner.commissionRate && (
                                    <Badge variant="secondary" className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                                      {partner.commissionRate}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="flex-1 flex flex-col gap-3 pt-0">
                            <CardDescription className="text-sm leading-relaxed line-clamp-3 flex-1">
                              {partner.description}
                            </CardDescription>
                            
                            <div className="mt-auto">
                              <Button
                                variant="default"
                                size="sm"
                                asChild
                                className="w-full group/btn bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                              >
                                <a
                                  href={partner.referralUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-1.5"
                                >
                                  Get Started
                                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    </div>
                    
                    {/* Ad placement between categories (after every 2nd category) */}
                    {index === 1 && (
                      <div className="py-8 flex justify-center">
                        <div className="text-center max-w-lg">
                          <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                          <AdSenseAd 
                            adSlot="7834958239" 
                            adFormat="rectangle" 
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Partner - Monetag */}
        <section className="py-12 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
                  <Star className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
                  Featured Partner
                </h2>
              </div>
              <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-amber-500"></div>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 hover:border-transparent hover:ring-2 hover:ring-orange-200 hover:bg-gradient-to-br hover:from-white hover:to-orange-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        M
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        Monetag
                      </CardTitle>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <Badge className="text-xs capitalize text-white border-0 bg-gradient-to-r from-orange-500 to-amber-500">
                          Advertising
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                          Revenue Share
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col gap-3 pt-0">
                  <CardDescription className="text-sm leading-relaxed">
                    Monetize your website traffic with high-performing ad formats. Monetag offers competitive rates, global coverage, and advanced optimization tools for maximum revenue.
                  </CardDescription>
                  
                  <div className="mt-4">
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                      className="w-full group/btn bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                    >
                      <a
                        href="https://monetag.com/?ref_id=zF3E"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5"
                      >
                        Get Started with Monetag
                        <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Partner with Ruvab IT
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Are you interested in partnering with us? We're always looking to collaborate 
                with innovative technology companies that share our vision.
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <a href="/contact" className="inline-flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PartnersPage;