import React from "react";
import { AlertTriangle, Info, Scale, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Disclaimer - Ruvab IT Legal Information</title>
        <meta name="description" content="Important legal disclaimers and limitations of liability for Ruvab IT services, products, and website content. Read our terms and conditions." />
        <meta name="keywords" content="disclaimer, legal notice, liability limitations, terms conditions, Ruvab IT legal, warranty disclaimer" />
        <link rel="canonical" href="https://ruvab.it.com/disclaimer" />
        
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

      <Header />

      {/* Header */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Disclaimer
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Important Legal Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This disclaimer governs your use of Ruvab IT's website,
                products, and services. By accessing or using our services, you
                acknowledge that you have read, understood, and agree to be
                bound by the terms of this disclaimer.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                The information contained in this disclaimer is subject to
                change without notice and does not constitute a commitment by
                Ruvab IT. Please read this disclaimer carefully before using our
                services.
              </p>
            </div>

            {/* General Disclaimer */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Info className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  General Disclaimer
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Information Accuracy
              </h3>
              <p className="text-gray-600 mb-4">
                While we strive to provide accurate and up-to-date information
                on our website and in our services, Ruvab IT makes no
                representations or warranties of any kind, express or implied,
                about the completeness, accuracy, reliability, suitability, or
                availability of the information, products, services, or related
                graphics contained on our website or in our services.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  Information may be updated, modified, or removed without prior
                  notice
                </li>
                <li>
                  Technical specifications and features may change during
                  development
                </li>
                <li>Pricing information is subject to change without notice</li>
                <li>Service availability may vary by geographic location</li>
                <li>
                  Performance metrics are estimates based on typical usage
                  scenarios
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Use at Your Own Risk
              </h3>
              <p className="text-gray-600 mb-4">
                Any reliance you place on information from Ruvab IT is strictly
                at your own risk. We disclaim all liability and responsibility
                arising from any reliance placed on such information by you or
                any other visitor to our website, or by anyone who may be
                informed of any of its contents.
              </p>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">
                  Important Notice
                </h4>
                <p className="text-orange-700 text-sm">
                  Our services are provided "as is" and "as available" without
                  any warranties or guarantees. Users should conduct their own
                  due diligence before making business decisions based on our
                  services.
                </p>
              </div>
            </div>

            {/* Service Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Service-Specific Disclaimers
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Trend Solver Disclaimer
              </h3>
              <p className="text-gray-600 mb-4">
                Trend Solver provides analytical insights and predictions based
                on available data and algorithms. Important considerations:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Predictive Nature:</strong> All predictions and trend
                  analyses are estimates and may not reflect actual future
                  outcomes
                </li>
                <li>
                  <strong>Data Dependency:</strong> Results are only as accurate
                  as the input data and may be affected by data quality issues
                </li>
                <li>
                  <strong>Market Volatility:</strong> Market conditions can
                  change rapidly, affecting the accuracy of predictions
                </li>
                <li>
                  <strong>No Investment Advice:</strong> Our analysis does not
                  constitute financial or investment advice
                </li>
                <li>
                  <strong>Business Decisions:</strong> Users should not rely
                  solely on our analysis for critical business decisions
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                LangScribe Disclaimer
              </h3>
              <p className="text-gray-600 mb-4">
                LangScribe provides AI-powered content creation and translation
                services. Please note:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>AI-Generated Content:</strong> Content is generated by
                  artificial intelligence and may require human review
                </li>
                <li>
                  <strong>Translation Accuracy:</strong> Translations may not be
                  100% accurate and should be reviewed by native speakers
                </li>
                <li>
                  <strong>Cultural Context:</strong> AI may not fully understand
                  cultural nuances and context
                </li>
                <li>
                  <strong>Professional Review:</strong> Important documents
                  should be reviewed by professional translators
                </li>
                <li>
                  <strong>Content Responsibility:</strong> Users are responsible
                  for the final content they publish or use
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Development Services
              </h3>
              <p className="text-gray-600 mb-4">
                For custom development and consulting services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Project Scope:</strong> Deliverables are limited to
                  the agreed project scope
                </li>
                <li>
                  <strong>Timeline Estimates:</strong> Project timelines are
                  estimates and may vary based on complexity
                </li>
                <li>
                  <strong>Third-Party Dependencies:</strong> Delays may occur
                  due to third-party service dependencies
                </li>
                <li>
                  <strong>Technology Changes:</strong> Rapid technology changes
                  may affect project requirements
                </li>
                <li>
                  <strong>Maintenance:</strong> Ongoing maintenance and updates
                  may be required separately
                </li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Scale className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Limitation of Liability
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Exclusion of Damages
              </h3>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by applicable law, Ruvab IT
                shall not be liable for any direct, indirect, incidental,
                special, consequential, or punitive damages, including but not
                limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data, information, or business interruption</li>
                <li>Cost of substitute goods or services</li>
                <li>Damage to reputation or goodwill</li>
                <li>Personal injury or property damage</li>
                <li>Any other commercial damages or losses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Maximum Liability
              </h3>
              <p className="text-gray-600 mb-4">
                In no event shall Ruvab IT's total liability to you for all
                damages, losses, and causes of action exceed the amount paid by
                you to Ruvab IT in the twelve (12) months preceding the claim.
              </p>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Liability Limitations
                </h4>
                <p className="text-red-700 text-sm">
                  Some jurisdictions do not allow the exclusion or limitation of
                  incidental or consequential damages. In such jurisdictions,
                  our liability is limited to the maximum extent permitted by
                  law.
                </p>
              </div>
            </div>

            {/* Warranty Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Warranty Disclaimers
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No Warranties
              </h3>
              <p className="text-gray-600 mb-4">
                Ruvab IT expressly disclaims all warranties of any kind, whether
                express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Merchantability:</strong> No warranty that services
                  will meet your commercial requirements
                </li>
                <li>
                  <strong>Fitness for Purpose:</strong> No warranty that
                  services are suitable for your specific needs
                </li>
                <li>
                  <strong>Non-Infringement:</strong> No warranty that services
                  will not infringe third-party rights
                </li>
                <li>
                  <strong>Accuracy:</strong> No warranty regarding the accuracy
                  or completeness of information
                </li>
                <li>
                  <strong>Availability:</strong> No warranty of uninterrupted or
                  error-free service
                </li>
                <li>
                  <strong>Security:</strong> No warranty that services will be
                  free from viruses or other harmful components
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Performance Disclaimers
              </h3>
              <p className="text-gray-600 mb-4">
                While we strive to provide high-quality services, we cannot
                guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Specific performance levels or response times</li>
                <li>Compatibility with all systems and software</li>
                <li>Results that meet your expectations or requirements</li>
                <li>Error-free operation or bug-free software</li>
                <li>Continuous availability without maintenance downtime</li>
              </ul>
            </div>

            {/* Third-Party Content */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Third-Party Content & Links
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                External Links
              </h3>
              <p className="text-gray-600 mb-4">
                Our website may contain links to third-party websites or
                services. These links are provided for convenience only:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>No Endorsement:</strong> Links do not constitute
                  endorsement of third-party content or services
                </li>
                <li>
                  <strong>No Control:</strong> We have no control over
                  third-party websites or their content
                </li>
                <li>
                  <strong>No Responsibility:</strong> We are not responsible for
                  third-party content, privacy practices, or terms
                </li>
                <li>
                  <strong>User Risk:</strong> You access third-party sites at
                  your own risk
                </li>
                <li>
                  <strong>Review Required:</strong> Please review third-party
                  terms and privacy policies
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Third-Party Integrations
              </h3>
              <p className="text-gray-600 mb-4">
                Our services may integrate with third-party platforms and APIs:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  Third-party service availability may affect our service
                  functionality
                </li>
                <li>
                  Changes to third-party APIs may impact integration features
                </li>
                <li>
                  We are not responsible for third-party service outages or
                  changes
                </li>
                <li>
                  Additional terms may apply for third-party service usage
                </li>
              </ul>
            </div>

            {/* Professional Advice */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Professional Advice Disclaimer
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Not Professional Advice
              </h3>
              <p className="text-gray-600 mb-4">
                The information and services provided by Ruvab IT are for
                general informational purposes only and do not constitute:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Legal Advice:</strong> Consult qualified legal
                  professionals for legal matters
                </li>
                <li>
                  <strong>Financial Advice:</strong> Seek professional financial
                  advisors for investment decisions
                </li>
                <li>
                  <strong>Medical Advice:</strong> Consult healthcare
                  professionals for medical concerns
                </li>
                <li>
                  <strong>Tax Advice:</strong> Consult tax professionals for
                  tax-related matters
                </li>
                <li>
                  <strong>Business Consulting:</strong> Our analysis supplements
                  but does not replace professional consulting
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Due Diligence Required
              </h3>
              <p className="text-gray-600 mb-4">Users should:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Conduct independent research and analysis</li>
                <li>
                  Consult with qualified professionals before making important
                  decisions
                </li>
                <li>Verify information from multiple sources</li>
                <li>Consider their specific circumstances and requirements</li>
                <li>Understand the risks associated with their decisions</li>
              </ul>
            </div>

            {/* Jurisdictional Issues */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Jurisdictional Considerations
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Governing Law
              </h3>
              <p className="text-gray-600 mb-4">
                This disclaimer is governed by the laws of the State of
                California, United States, without regard to conflict of law
                principles. However, local laws may also apply:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  Some jurisdictions may not allow certain disclaimer provisions
                </li>
                <li>
                  Local consumer protection laws may provide additional rights
                </li>
                <li>
                  International users may be subject to additional regulations
                </li>
                <li>Data protection laws may impose additional obligations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Service Availability
              </h3>
              <p className="text-gray-600 mb-4">
                Our services may not be available in all jurisdictions:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Some features may be restricted in certain countries</li>
                <li>Local regulations may limit service availability</li>
                <li>Export control laws may apply to certain technologies</li>
                <li>Users are responsible for compliance with local laws</li>
              </ul>
            </div>

            {/* Updates and Changes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Updates and Changes
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Disclaimer Updates
              </h3>
              <p className="text-gray-600 mb-4">
                We reserve the right to update this disclaimer at any time:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  Changes will be posted on this page with an updated date
                </li>
                <li>
                  Material changes will be communicated via email or website
                  notice
                </li>
                <li>
                  Continued use of services constitutes acceptance of updated
                  terms
                </li>
                <li>Users should review this disclaimer periodically</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Service Changes
              </h3>
              <p className="text-gray-600 mb-4">
                We may modify, suspend, or discontinue services at any time:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  Features may be added, modified, or removed without notice
                </li>
                <li>Service availability may change based on business needs</li>
                <li>Pricing and terms may be updated periodically</li>
                <li>
                  Users will be notified of significant changes when possible
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this disclaimer or need
                clarification on any terms:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-600">
                    For questions about this disclaimer, please use our contact form.
                  </p>
                </div>
              </div>
            </div>

            {/* Final Notice */}
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Important Final Notice
              </h3>
              <p className="text-yellow-700 text-sm">
                By using Ruvab IT's services, you acknowledge that you have
                read, understood, and agree to be bound by this disclaimer. If
                you do not agree with any part of this disclaimer, please
                discontinue use of our services immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Our legal team is available to clarify any questions about our
            disclaimer or terms of service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors"
            >
              Contact Legal Team
            </button>
            <button 
              onClick={() => window.location.href = '/terms'}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              View All Policies
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Disclaimer;
