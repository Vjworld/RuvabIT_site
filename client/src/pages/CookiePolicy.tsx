import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cookie Policy | Ruvab IT</title>
        <meta name="description" content="Learn about how Ruvab IT uses cookies and similar technologies on our website." />
        <link rel="canonical" href="https://ruvab.it.com/cookie-policy" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 17, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p>We use cookies for several purposes:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>To remember your preferences and settings</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To provide personalized content and advertisements</li>
              <li>To improve website functionality and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly and cannot be disabled.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Analytics Cookies</h3>
            <p>We use Google Analytics to understand how visitors use our website and improve our services.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Advertising Cookies</h3>
            <p>We use Google AdSense to display relevant advertisements on our website.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>View what cookies are stored on your device</li>
              <li>Delete cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <p className="mt-4">
              Email: privacy@ruvab.it.com<br />
              Address: Ruvab IT, Technology Solutions Department
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}