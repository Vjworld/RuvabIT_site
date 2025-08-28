import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Services from '@/components/Services';
import About from '@/components/About';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdSenseAd from '@/components/AdSenseAd';
import GoToTopButton from '@/components/GoToTopButton';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HKV9TK37LR"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HKV9TK37LR');
          `}
        </script>
      </Helmet>
      <Header />
      <Hero />
      <Products />
      <Services />
      
      {/* Ad placement after substantial content */}
      <AdSenseAd adSlot="1234567891" adLayout="in-article" />
      
      <About />
      <Blog />
      <Contact />
      
      <Footer />
      <GoToTopButton />
    </div>
  );
}
