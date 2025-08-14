import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      hosting: 'bg-blue-500',
      payment: 'bg-green-500',
      email: 'bg-purple-500',
      database: 'bg-orange-500',
      news: 'bg-red-500',
      default: 'bg-gray-500'
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
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Trusted Partners
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                We collaborate with industry-leading companies to provide you with the best technology solutions. 
                Enjoy exclusive offers and benefits through our partnerships.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Exclusive Offers
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  Trusted Partnerships
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Zap className="h-4 w-4 mr-2" />
                  Premium Support
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
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
              <div className="space-y-16">
                {Object.entries(groupedPartners).map(([category, categoryPartners]) => (
                  <div key={category} className="space-y-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${getCategoryColor(category)} text-white`}>
                          {categoryIcons[category as keyof typeof categoryIcons] || categoryIcons.default}
                        </div>
                        <h2 className="text-3xl font-bold capitalize">
                          {category} Partners
                        </h2>
                      </div>
                      <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryPartners.map((partner) => (
                        <Card key={partner.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-2 hover:border-primary/50">
                          <CardHeader className="pb-4">
                            <div className="flex items-start gap-4">
                              {partner.logoUrl && (
                                <div className="flex-shrink-0">
                                  <img
                                    src={partner.logoUrl}
                                    alt={`${partner.name} logo`}
                                    className="w-16 h-16 object-contain rounded-lg border bg-white p-2"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                  {partner.name}
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {partner.category}
                                  </Badge>
                                  {partner.commissionRate && (
                                    <Badge variant="secondary" className="text-xs">
                                      {partner.commissionRate}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <CardDescription className="text-sm leading-relaxed">
                              {partner.description}
                            </CardDescription>
                            
                            <div className="flex gap-2">
                              <Button
                                variant="default"
                                size="sm"
                                asChild
                                className="flex-1 group/btn"
                              >
                                <a
                                  href={partner.referralUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-2"
                                >
                                  Get Started
                                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <a
                                  href={partner.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  Visit
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Partner with Ruvab IT
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Are you interested in partnering with us? We're always looking to collaborate 
                with innovative technology companies that share our vision.
              </p>
              <Button size="lg" asChild>
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