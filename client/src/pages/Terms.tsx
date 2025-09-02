import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import GoToTopButton from '@/components/GoToTopButton';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Terms of Service | Legal Terms & Conditions | Ruvab IT</title>
        <meta name="description" content="Read Ruvab IT's terms of service, legal conditions, and user agreements for our technology solutions and services." />
        <meta name="keywords" content="terms of service, legal terms, conditions, user agreement, policy" />
        <link rel="canonical" href="https://ruvab.it.com/terms" />
        
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 15, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Services</h2>
                <p className="text-gray-700 mb-4">
                  You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the services:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>In any way that violates applicable laws or regulations</li>
                  <li>To harm, abuse, or harass other users</li>
                  <li>To distribute malware or other malicious software</li>
                  <li>To attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  The services and their original content, features, and functionality are and will remain the exclusive property of Ruvab IT and its licensors. The services are protected by copyright, trademark, and other laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Content</h2>
                <p className="text-gray-700 mb-4">
                  You retain ownership of any content you submit to our services. However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content in connection with our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall Ruvab IT, its directors, employees, partners, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer</h2>
                <p className="text-gray-700 mb-4">
                  Our services are provided "as is" without any warranties, express or implied. We do not warrant that the services will be uninterrupted, error-free, or completely secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your account and bar access to the services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-2" />
                  <a href="mailto:support@ruvabit.com" className="text-primary hover:text-blue-700 underline">
                    support@ruvabit.com
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  For all inquiries including legal, support, feedback, suggestions, and issue reporting.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
      <GoToTopButton />
    </div>
  );
}
