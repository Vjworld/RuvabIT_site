import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Services from '@/components/Services';
import About from '@/components/About';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdSenseAd from '@/components/AdSenseAd';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
}
