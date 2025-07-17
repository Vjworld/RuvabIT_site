import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Data Protection & User Rights | Ruvab IT</title>
        <meta name="description" content="Learn how Ruvab IT protects your privacy and personal data. Our comprehensive privacy policy covers data collection, usage, and your rights." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, user rights, data collection, personal information" />
        <link rel="canonical" href="https://ruvab.it.com/privacy" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 17, 2025</p>
          </div>

        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Personal information like your name, email address, and company information</li>
                  <li>Account credentials and preferences</li>
                  <li>Communication data when you contact us</li>
                  <li>Usage data and analytics information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Communicate with you about our services</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share information in certain limited circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who help us operate our business</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Update or correct your information</li>
                  <li>Delete your account and data</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Analytics</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and serve personalized ads. You can manage your cookie preferences through our cookie banner or browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Google AdSense and Advertising</h2>
                <p className="text-gray-700 mb-4">
                  This website uses Google AdSense to display advertisements. Google may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting Google's Ads Settings or by visiting the Network Advertising Initiative opt-out page.
                </p>
                <p className="text-gray-700 mb-4">
                  Third-party vendors, including Google, may show your ads on sites across the Internet. We and third-party vendors use first-party cookies and third-party cookies together to inform, optimize, and serve ads based on your past visits to our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-2" />
                  <a href="mailto:privacy@ruvabit.com" className="text-primary hover:text-blue-700 underline">
                    privacy@ruvabit.com
                  </a>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
