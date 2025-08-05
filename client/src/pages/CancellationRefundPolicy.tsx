import React from "react";
import {
  RefreshCw,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cancellation & Refund Policy - Ruvab IT</title>
        <meta name="description" content="Learn about Ruvab IT's cancellation and refund policies for digital services, subscription plans, and custom development projects. Fair and transparent refund terms." />
        <meta name="keywords" content="cancellation policy, refund policy, subscription cancellation, money back guarantee, Ruvab IT refunds" />
        <link rel="canonical" href="https://ruvab.it.com/cancellation-refund-policy" />
      </Helmet>

      <Header />

      {/* Header */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Cancellation & Refund Policy
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
                Our Commitment to Fair Policies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Ruvab IT, we believe in transparent and fair business
                practices. This Cancellation & Refund Policy outlines the terms
                and conditions for canceling services and requesting refunds for
                our digital products and services.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                We strive to ensure customer satisfaction while maintaining
                sustainable business operations. Our policies are designed to be
                fair to both our customers and our business.
              </p>
            </div>

            {/* Subscription Services */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Subscription Service Cancellations
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Monthly Subscriptions
              </h3>
              <p className="text-gray-600 mb-4">
                For monthly subscription plans (Trend Solver, LangScribe, and
                other recurring services):
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Cancellation:</strong> Can be canceled at any time
                  from your account dashboard
                </li>
                <li>
                  <strong>Effective Date:</strong> Cancellation takes effect at
                  the end of your current billing cycle
                </li>
                <li>
                  <strong>Access:</strong> You retain full access until the end
                  of your paid period
                </li>
                <li>
                  <strong>No Partial Refunds:</strong> Monthly fees are not
                  prorated for partial months
                </li>
                <li>
                  <strong>Reactivation:</strong> You can reactivate your
                  subscription at any time
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Annual Subscriptions
              </h3>
              <p className="text-gray-600 mb-4">
                For annual subscription plans with discounted pricing:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>30-Day Money-Back Guarantee:</strong> Full refund if
                  canceled within 30 days
                </li>
                <li>
                  <strong>After 30 Days:</strong> Prorated refund for unused
                  months (minus 15% processing fee)
                </li>
                <li>
                  <strong>Minimum Usage:</strong> Refunds not available if usage
                  exceeds 80% of plan limits
                </li>
                <li>
                  <strong>Cancellation Process:</strong> Contact support for
                  annual plan cancellations
                </li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  How to Cancel Subscriptions
                </h4>
                <ol className="text-blue-700 text-sm space-y-1">
                  <li>1. Log into your account dashboard</li>
                  <li>2. Navigate to "Billing & Subscriptions"</li>
                  <li>3. Select the subscription you want to cancel</li>
                  <li>4. Click "Cancel Subscription" and follow prompts</li>
                  <li>5. You'll receive email confirmation of cancellation</li>
                </ol>
              </div>
            </div>

            {/* Refund Eligibility */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <DollarSign className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Refund Eligibility & Conditions
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Eligible for Full Refund
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Service Unavailability
                  </h4>
                  <p className="text-green-700 text-sm">
                    If our services are unavailable for more than 24 consecutive
                    hours due to technical issues on our end.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Billing Errors
                  </h4>
                  <p className="text-green-700 text-sm">
                    Incorrect charges, duplicate billing, or unauthorized
                    transactions will be fully refunded.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    30-Day Guarantee
                  </h4>
                  <p className="text-green-700 text-sm">
                    New customers can request a full refund within 30 days if
                    not satisfied with our services.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Service Discontinuation
                  </h4>
                  <p className="text-green-700 text-sm">
                    If we discontinue a service, unused portions will be
                    refunded or credited to alternative services.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Not Eligible for Refund
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    Policy Violations
                  </h4>
                  <p className="text-red-700 text-sm">
                    Accounts terminated for violating our Terms of Service or
                    Acceptable Use Policy.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    Excessive Usage
                  </h4>
                  <p className="text-red-700 text-sm">
                    Accounts that have used more than 80% of their plan limits
                    before requesting cancellation.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    Third-Party Services
                  </h4>
                  <p className="text-red-700 text-sm">
                    Costs for third-party integrations, APIs, or services
                    purchased through our platform.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    Custom Development
                  </h4>
                  <p className="text-red-700 text-sm">
                    Work completed on custom development projects (separate
                    refund terms apply).
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Development Projects */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Custom Development & Consulting Services
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Project-Based Services
              </h3>
              <p className="text-gray-600 mb-4">
                For custom development, consulting, and project-based services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Milestone-Based Billing:</strong> Payments are tied to
                  project milestones
                </li>
                <li>
                  <strong>Work Completed:</strong> No refunds for completed
                  milestones or delivered work
                </li>
                <li>
                  <strong>Project Cancellation:</strong> Clients can cancel
                  projects with 14 days written notice
                </li>
                <li>
                  <strong>Refund Calculation:</strong> Refunds based on work not
                  yet started or completed
                </li>
                <li>
                  <strong>Intellectual Property:</strong> Completed work remains
                  with the client
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Consulting & Training Services
              </h3>
              <p className="text-gray-600 mb-4">
                For consulting sessions and training services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Cancellation Notice:</strong> 48 hours advance notice
                  required
                </li>
                <li>
                  <strong>Rescheduling:</strong> Sessions can be rescheduled
                  without penalty
                </li>
                <li>
                  <strong>No-Show Policy:</strong> No refunds for missed
                  sessions without notice
                </li>
                <li>
                  <strong>Satisfaction Guarantee:</strong> Replacement session
                  if not satisfied
                </li>
              </ul>
            </div>

            {/* Refund Process */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Refund Request Process
                </h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How to Request a Refund
              </h3>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Contact Support:</strong> Use our contact form 
                  with your request
                </li>
                <li>
                  <strong>Provide Information:</strong> Include account details,
                  order number, and reason
                </li>
                <li>
                  <strong>Review Process:</strong> We'll review your request
                  within 2 business days
                </li>
                <li>
                  <strong>Decision Notification:</strong> You'll receive email
                  confirmation of our decision
                </li>
                <li>
                  <strong>Processing:</strong> Approved refunds processed within
                  5-10 business days
                </li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Required Information
              </h3>
              <p className="text-gray-600 mb-4">
                To process your refund request efficiently, please provide:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Account email address and customer ID</li>
                <li>Order number or transaction ID</li>
                <li>Detailed reason for refund request</li>
                <li>Date of purchase and service period</li>
                <li>Any relevant screenshots or documentation</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Processing Timeline
                </h4>
                <div className="text-yellow-700 text-sm space-y-1">
                  <p>
                    <strong>Review:</strong> 1-2 business days
                  </p>
                  <p>
                    <strong>Approval Decision:</strong> 2-3 business days
                  </p>
                  <p>
                    <strong>Refund Processing:</strong> 5-10 business days
                  </p>
                  <p>
                    <strong>Bank Processing:</strong> 3-5 additional business
                    days
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method Refunds */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Refund Methods
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Original Payment Method
              </h3>
              <p className="text-gray-600 mb-4">
                Refunds are processed to the original payment method used for
                the purchase:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Credit Cards:</strong> 5-10 business days to appear on
                  statement
                </li>
                <li>
                  <strong>PayPal:</strong> 3-5 business days to PayPal account
                </li>
                <li>
                  <strong>Bank Transfer:</strong> 7-14 business days depending
                  on bank
                </li>
                <li>
                  <strong>Digital Wallets:</strong> 3-7 business days to wallet
                  account
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Alternative Refund Options
              </h3>
              <p className="text-gray-600 mb-4">
                In certain circumstances, we may offer alternative refund
                methods:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Account Credit:</strong> Credit applied to your
                  account for future purchases
                </li>
                <li>
                  <strong>Service Upgrade:</strong> Upgrade to higher-tier
                  service at no additional cost
                </li>
                <li>
                  <strong>Extended Trial:</strong> Additional trial period for
                  evaluation
                </li>
                <li>
                  <strong>Alternative Service:</strong> Switch to different
                  service of equal value
                </li>
              </ul>
            </div>

            {/* Special Circumstances */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Special Circumstances
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Force Majeure Events
              </h3>
              <p className="text-gray-600 mb-4">
                In case of events beyond our control (natural disasters,
                government actions, etc.):
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Service credits will be provided for affected periods</li>
                <li>
                  Extended service periods may be offered instead of refunds
                </li>
                <li>Alternative solutions will be provided when possible</li>
                <li>Communication will be maintained throughout the event</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Data Protection & Privacy
              </h3>
              <p className="text-gray-600 mb-4">
                Upon cancellation and refund:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Data Retention:</strong> Your data is retained for 30
                  days after cancellation
                </li>
                <li>
                  <strong>Data Export:</strong> You can export your data before
                  or after cancellation
                </li>
                <li>
                  <strong>Data Deletion:</strong> Data permanently deleted after
                  retention period
                </li>
                <li>
                  <strong>Privacy Compliance:</strong> All processes comply with
                  GDPR and privacy laws
                </li>
              </ul>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dispute Resolution
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Internal Resolution Process
              </h3>
              <p className="text-gray-600 mb-4">
                If you disagree with a refund decision:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  Contact our Customer Success Manager through our contact form
                </li>
                <li>Provide additional documentation or clarification</li>
                <li>Request a review by our senior management team</li>
                <li>Participate in a resolution call if needed</li>
                <li>Receive final decision within 5 business days</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                External Dispute Resolution
              </h3>
              <p className="text-gray-600 mb-4">
                For unresolved disputes, you may:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>File a complaint with your credit card company or bank</li>
                <li>Contact relevant consumer protection agencies</li>
                <li>
                  Seek mediation through approved dispute resolution services
                </li>
                <li>
                  Pursue legal action in accordance with our Terms of Service
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                For cancellations, refunds, or questions about this policy:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-600">
                    For cancellations, refunds, or questions about this policy, please use our contact form.
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
                We may update this Cancellation & Refund Policy to reflect
                changes in our services, legal requirements, or business
                practices.
              </p>
              <p className="text-gray-600">
                Material changes will be communicated via email to all customers
                at least 30 days before taking effect. Continued use of our
                services after policy updates constitutes acceptance of the new
                terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Our customer success team is here to help you understand our
            policies and assist with any concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
            >
              Contact Support
            </button>
            <button 
              onClick={() => window.location.href = '/trend-solver'}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CancellationRefundPolicy;
