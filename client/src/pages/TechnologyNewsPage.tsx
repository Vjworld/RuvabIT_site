import React from 'react';
import TechnologyNews from '../components/TechnologyNews';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoToTopButton from '@/components/GoToTopButton';
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
      
      <div className="min-h-screen bg-background">
        <Header />
        <TechnologyNews />
        
        {/* AdSense Ad - Bottom of Tech News */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Advertisement</div>
              <AdSenseAd 
                adSlot="7834958240" 
                adFormat="horizontal" 
                className="max-w-3xl mx-auto"
              />
            </div>
          </div>
        </section>
        
        <Footer />
        <GoToTopButton />
      </div>
    </>
  );
};

export default TechnologyNewsPage;