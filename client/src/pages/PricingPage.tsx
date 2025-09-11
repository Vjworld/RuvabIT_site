import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubscriptionHandler } from '@/components/SubscriptionHandler';
import { Check, Star, Zap, Target } from 'lucide-react';

const PricingPage = () => {
  const flatMonthlyPlans = [
    {
      name: "Starter",
      price: "$50-100",
      period: "per month",
      description: "Perfect for new websites with growing traffic",
      features: [
        "Link placement in Solutions section",
        "4 weekly blog posts (one per week)",
        "Basic SEO optimization",
        "Monthly performance report"
      ],
      icon: <Target className="h-6 w-6" />,
      popular: false
    },
    {
      name: "Professional",
      price: "$100-250",
      period: "per month",
      description: "Ideal for established sites with consistent organic traffic",
      features: [
        "Premium link placement in Solutions section",
        "4 weekly blog posts (one per week)",
        "Advanced SEO optimization",
        "Detailed monthly analytics report",
        "Priority customer support",
        "Social media mentions"
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: true
    }
  ];

  const tieredPlans = [
    {
      name: "Bronze",
      price: "$20-50",
      period: "per month",
      description: "Basic link placement for budget-conscious founders",
      features: [
        "Link placement in Solutions section",
        "Basic listing description",
        "Monthly status report"
      ],
      icon: <Target className="h-6 w-6" />,
      popular: false
    },
    {
      name: "Silver",
      price: "$50-150",
      period: "per month",
      description: "Enhanced visibility with content marketing",
      features: [
        "Link placement in Solutions section",
        "1 dedicated blog post per month",
        "SEO-optimized content",
        "Performance tracking",
        "Email updates"
      ],
      icon: <Star className="h-6 w-6" />,
      popular: false
    },
    {
      name: "Gold",
      price: "$150-400+",
      period: "per month",
      description: "Premium package with maximum exposure",
      features: [
        "Premium link placement in Solutions section",
        "4 weekly blog posts (one per week)",
        "Social media promotion",
        "Detailed analytics and reporting",
        "Priority support",
        "Custom content strategy",
        "Newsletter mentions"
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: true
    }
  ];

  const perPostPlan = {
    name: "Per-Post Service",
    priceRange: "$50-200+",
    description: "Pay per blog post with no monthly commitment",
    features: [
      "One comprehensive blog post highlighting your solution",
      "Permanent link placement on Solutions page",
      "SEO-optimized content (1,500+ words available)",
      "In-depth review option",
      "No monthly commitment required"
    ],
    pricing: [
      { range: "$50-100", description: "Standard blog post with link placement" },
      { range: "$100-200+", description: "Long-form content (1,500+ words) with in-depth review" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pricing Plans - Content Marketing & Link Placement Services</title>
        <meta name="description" content="Choose from our flexible pricing plans for blog content creation and link placement services. Monthly retainers, tiered packages, or pay-per-post options available." />
        <meta name="keywords" content="pricing, blog content, link placement, content marketing, SEO services, monthly retainer" />
        <link rel="canonical" href="https://ruvab.it.com/pricing" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your content marketing and link placement needs. All packages include high-quality blog content and strategic link placement.
          </p>
        </div>

        {/* Flat Monthly Fee Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Monthly Retainer Plans</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Consistent content creation with weekly blog posts and permanent link placement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {flatMonthlyPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <SubscriptionHandler 
                    planId={plan.name === 'Starter' ? 1 : 2} 
                    planName={plan.name}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tiered Pricing Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tiered Service Plans</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose the level of service that fits your budget and goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tieredPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Best Value
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <SubscriptionHandler 
                    planId={plan.name === 'Bronze' ? 3 : plan.name === 'Silver' ? 4 : 5} 
                    planName={plan.name}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Per-Post Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pay-Per-Post Option</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No monthly commitment - pay only for the content you need
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-purple-500 shadow-lg">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">{perPostPlan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{perPostPlan.priceRange}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">per post</span>
                </div>
                <CardDescription className="text-base mt-2">{perPostPlan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">What's Included:</h4>
                    <ul className="space-y-3">
                      {perPostPlan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Pricing Breakdown:</h4>
                    <div className="space-y-4">
                      {perPostPlan.pricing.map((option, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="font-semibold text-lg text-gray-900 dark:text-white">{option.range}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{option.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <SubscriptionHandler 
                    planId={6} 
                    planName="Per-Post Service"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing Factors</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your final pricing depends on several key factors
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Website Authority & Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Higher domain authority (DA) and consistent organic traffic command premium pricing due to increased SEO value and audience reach.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Target Audience Relevance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Highly targeted, niche audiences that align perfectly with your solution are more valuable for promotional purposes.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Scope & Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive packages including both link placement and regular blog content provide more value than single placements.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Positioning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Pricing is competitive with industry standards for blog sponsorships and backlink placements on similar authority sites.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16 bg-gray-50 dark:bg-gray-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your specific needs and get a customized quote based on your website's authority and target audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact-sales">
                Contact for Custom Quote
              </Button>
            </Link>
            <Link href="/trend-solver">
              <Button size="lg" variant="outline" data-testid="button-view-portfolio">
                View Sample Work
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;