import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DataSecurityPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Data Security Policy | Ruvab IT</title>
        <meta name="description" content="Learn about Ruvab IT's data security measures and how we protect your information." />
        <link rel="canonical" href="https://ruvab.it.com/data-security" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Data Security Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 17, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Data Security</h2>
            <p>
              At Ruvab IT, we take data security seriously. This policy outlines the measures we implement 
              to protect your data and maintain the highest standards of security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Protection Measures</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>End-to-end encryption for data transmission</li>
              <li>Secure data storage with industry-standard encryption</li>
              <li>Regular security audits and penetration testing</li>
              <li>Multi-factor authentication for system access</li>
              <li>Employee training on data security best practices</li>
              <li>Incident response procedures for security breaches</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Compliance Standards</h2>
            <p>We comply with industry standards and regulations including:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>GDPR (General Data Protection Regulation)</li>
              <li>HIPAA (Health Insurance Portability and Accountability Act)</li>
              <li>SOC 2 Type II certification</li>
              <li>ISO 27001 information security management</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Access and Control</h2>
            <p>
              We implement strict access controls to ensure that only authorized personnel can access sensitive data. 
              Access is granted on a need-to-know basis and is regularly reviewed and updated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Incident Response</h2>
            <p>
              In the event of a security incident, we have established procedures to:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Immediately contain and assess the incident</li>
              <li>Notify affected parties within 72 hours</li>
              <li>Implement corrective measures</li>
              <li>Conduct post-incident analysis and improvements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              For any questions about our data security practices or to report a security concern:
            </p>
            <p className="mt-4">
              Email us at <a href="mailto:support@ruvabit.com" className="text-blue-600 hover:underline font-medium">support@ruvabit.com</a> to report security concerns, provide feedback, or get support.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}