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
      
      <AdSenseAd adSlot="1234567890" />
      
      <Products />
      <Services />
      
      <AdSenseAd adSlot="1234567891" adLayout="in-article" />
      
      <About />
      <Blog />
      <Contact />
      
      <AdSenseAd adSlot="1234567892" />
      
      <Footer />
    </div>
  );
}
