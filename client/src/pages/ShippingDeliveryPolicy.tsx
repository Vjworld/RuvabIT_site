import React from "react";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ShippingDeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shipping & Delivery Policy - Ruvab IT Digital Services</title>
        <meta name="description" content="Learn about Ruvab IT's digital service delivery, software deployment timelines, and support delivery policies. Instant access to digital products and services." />
        <meta name="keywords" content="shipping policy, delivery policy, digital services, software delivery, deployment timeline, Ruvab IT delivery" />
        <link rel="canonical" href="https://ruvab.it.com/shipping-delivery-policy" />
      </Helmet>

      <Header />

      {/* Header */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shipping & Delivery Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Digital Service Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ruvab IT specializes in digital technology solutions and
                software services. As a digital-first company, we deliver our
                products and services electronically through secure online
                platforms. This policy outlines our delivery methods, timelines,
                and procedures for all our digital offerings.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Since our products are digital in nature, traditional shipping
                does not apply. Instead, we focus on immediate access, secure
                delivery, and comprehensive onboarding support.
              </p>
            </div>

            {/* Digital Product Delivery */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Digital Product Access
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Immediate Access Products
              </h3>
              <p className="text-gray-600 mb-4">
                The following products provide instant access upon successful
                payment:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Trend Solver:</strong> Access granted within 5 minutes
                  of payment confirmation
                </li>
                <li>
                  <strong>LangScribe:</strong> Account activation within 5
                  minutes of subscription
                </li>
                <li>
                  <strong>API Access:</strong> Keys generated immediately upon
                  plan activation
                </li>
                <li>
                  <strong>Documentation & Guides:</strong> Instant download
                  access
                </li>
                <li>
                  <strong>Training Materials:</strong> Immediate access to
                  learning portal
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Setup and Configuration Services
              </h3>
              <p className="text-gray-600 mb-4">
                For services requiring setup or configuration, delivery
                timelines are:
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Standard Setup
                    </h4>
                    <p className="text-blue-700 text-sm">1-3 business days</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Custom Integration
                    </h4>
                    <p className="text-blue-700 text-sm">5-10 business days</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Enterprise Deployment
                    </h4>
                    <p className="text-blue-700 text-sm">2-4 weeks</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Custom Development
                    </h4>
                    <p className="text-blue-700 text-sm">4-12 weeks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Methods */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Methods
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Electronic Delivery
              </h3>
              <p className="text-gray-600 mb-4">
                All our services are delivered electronically through:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Secure Web Portal:</strong> Access through your
                  account dashboard
                </li>
                <li>
                  <strong>Email Delivery:</strong> Login credentials and access
                  instructions
                </li>
                <li>
                  <strong>API Endpoints:</strong> Direct integration access for
                  developers
                </li>
                <li>
                  <strong>Cloud Deployment:</strong> Services deployed to your
                  preferred cloud platform
                </li>
                <li>
                  <strong>Download Links:</strong> Secure, time-limited download
                  access
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Delivery Confirmation
              </h3>
              <p className="text-gray-600 mb-4">
                You will receive confirmation of delivery through:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Email notification with access details</li>
                <li>SMS confirmation for critical services (optional)</li>
                <li>In-app notifications within your dashboard</li>
                <li>Welcome call for enterprise customers</li>
              </ul>
            </div>

            {/* Service Timelines */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Service Delivery Timelines
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Subscription Services
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Delivery Time:</strong> Immediate (within 5 minutes)
                  </p>
                  <p className="text-gray-600 text-sm">
                    Includes Trend Solver, LangScribe, and all
                    subscription-based products.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Consulting Services
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Initial Consultation:</strong> Within 24 hours of
                    booking
                  </p>
                  <p className="text-gray-600 text-sm">
                    Follow-up deliverables provided according to agreed
                    timeline.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Custom Development
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Project Kickoff:</strong> Within 3-5 business days
                  </p>
                  <p className="text-gray-600 text-sm">
                    Delivery timeline established during project planning phase.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Training & Support
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Onboarding Session:</strong> Scheduled within 48
                    hours
                  </p>
                  <p className="text-gray-600 text-sm">
                    Ongoing support available 24/7 for enterprise customers.
                  </p>
                </div>
              </div>
            </div>

            {/* Geographic Coverage */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Service Availability
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Global Digital Delivery
              </h3>
              <p className="text-gray-600 mb-4">
                Our digital services are available worldwide with the following
                considerations:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Americas:</strong> Full service availability with
                  local support hours
                </li>
                <li>
                  <strong>Europe:</strong> Complete service portfolio with GDPR
                  compliance
                </li>
                <li>
                  <strong>Asia-Pacific:</strong> All services available with
                  regional data centers
                </li>
                <li>
                  <strong>Other Regions:</strong> Services available with
                  standard support hours
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Data Center Locations
              </h3>
              <p className="text-gray-600 mb-4">
                For optimal performance, we maintain data centers in:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">
                    Primary Regions
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• United States (East & West Coast)</li>
                    <li>• European Union (Frankfurt, Ireland)</li>
                    <li>• Asia-Pacific (Singapore, Tokyo)</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-1">
                    Backup Regions
                  </h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Canada (Central)</li>
                    <li>• United Kingdom (London)</li>
                    <li>• Australia (Sydney)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Delivery Issues */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Issues & Resolution
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Common Issues
              </h3>
              <p className="text-gray-600 mb-4">
                If you experience delivery issues, common causes include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Email delivery delays or spam filtering</li>
                <li>Payment processing delays</li>
                <li>Account verification requirements</li>
                <li>Technical issues with our systems</li>
                <li>Incorrect contact information provided</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Resolution Process
              </h3>
              <p className="text-gray-600 mb-4">
                If you don't receive access within the expected timeframe:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  Check your email spam/junk folder for delivery notifications
                </li>
                <li>Verify your account information and payment status</li>
                <li>Contact our support team through our contact form</li>
                <li>Provide your order number and account details</li>
                <li>
                  Our team will resolve the issue within 2 hours during business
                  hours
                </li>
              </ol>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">
                  Emergency Support
                </h4>
                <p className="text-orange-700 text-sm">
                  For critical business services, priority support is available
                  for Enterprise customers. Use our contact form for immediate assistance.
                </p>
              </div>
            </div>

            {/* Service Level Agreements */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Service Level Agreements (SLA)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Service Type
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Delivery Time
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Uptime SLA
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Support Response
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Subscription Products
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        5 minutes
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        99.9%
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        4 hours
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        Enterprise Services
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        24 hours
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        99.95%
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        1 hour
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Custom Development
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Per Agreement
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        99.9%
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        2 hours
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        API Services
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Immediate
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        99.95%
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        30 minutes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Delivery Support Contact
              </h2>
              <p className="text-gray-600 mb-4">
                For questions about service delivery or access issues, contact
                us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-600">
                    For questions about service delivery or access issues, please use our contact form.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Updates */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Policy Updates
              </h2>
              <p className="text-gray-600 mb-4">
                We may update this Shipping & Delivery Policy to reflect changes
                in our services or legal requirements. Updates will be posted on
                this page with a revised "Last updated" date.
              </p>
              <p className="text-gray-600">
                Significant changes will be communicated via email to all active
                customers at least 30 days before implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Experience instant access to our digital solutions. Start your free
            trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ShippingDeliveryPolicy;
