import React from 'react';
import TechnologyNews from '../components/TechnologyNews';
import AdSenseAd from '@/components/AdSenseAd';
import { Helmet } from 'react-helmet-async';

const TechnologyNewsPage = () => {
  return (
    <>
      <Helmet>
        <title>Technology News - Latest Tech Updates | Ruvab IT</title>
        <meta 
          name="description" 
          content="Stay updated with the latest technology news, innovations, and trends. Get real-time updates on AI, machine learning, software development, and more from trusted sources." 
        />
        <meta name="keywords" content="technology news, tech updates, AI news, software development, innovation, tech trends, Ruvab IT" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Technology News - Latest Tech Updates | Ruvab IT" />
        <meta property="og:description" content="Stay updated with the latest technology news and innovations. Real-time updates on AI, software development, and tech trends." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ruvab.it.com/technology-news" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technology News - Latest Tech Updates | Ruvab IT" />
        <meta name="twitter:description" content="Stay updated with the latest technology news and innovations from trusted sources." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            "name": "Ruvab IT Technology News",
            "url": "https://ruvab.it.com/technology-news",
            "description": "Latest technology news and updates curated for tech professionals and enthusiasts",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://ruvab.it.com/technology-news"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <TechnologyNews />
        
        {/* AdSense Ad - Bottom of Tech News */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">Advertisement</div>
              <AdSenseAd 
                adSlot="7834958240" 
                adFormat="horizontal" 
                className="max-w-3xl mx-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TechnologyNewsPage;