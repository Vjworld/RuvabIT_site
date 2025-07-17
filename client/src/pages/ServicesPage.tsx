import React from "react";
import {
  Code,
  Database,
  Cloud,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-4xl mx-auto mb-8">
              Comprehensive technology solutions designed to transform your
              business and drive sustainable growth.
            </p>
            <button className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Technology Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From custom software development to AI implementation, we provide
              end-to-end services that drive digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* AI & Machine Learning */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  AI & Machine Learning
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Harness the power of artificial intelligence to automate
                processes, gain insights, and create competitive advantages.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Custom AI model development
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Natural language processing
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Predictive analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Computer vision solutions
                  </span>
                </li>
              </ul>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Custom Software Development */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Code className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Custom Software Development
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Build scalable, secure, and user-friendly applications tailored
                to your specific business requirements.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Web application development
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Mobile app development</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    API development & integration
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Legacy system modernization
                  </span>
                </li>
              </ul>
              <button className="text-green-600 font-semibold hover:text-green-700 transition-colors flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Data Analytics & BI */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-purple-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Data Analytics & BI
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Transform your data into actionable insights with advanced
                analytics and business intelligence solutions.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Data warehouse design</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Real-time analytics dashboards
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Data pipeline automation
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Advanced reporting systems
                  </span>
                </li>
              </ul>
              <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Cloud Solutions */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Cloud className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Cloud Solutions
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Migrate, optimize, and scale your infrastructure with secure and
                cost-effective cloud solutions.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Cloud migration strategy
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Multi-cloud architecture
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    DevOps & CI/CD implementation
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Cost optimization</span>
                </li>
              </ul>
              <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Categories
            </h2>
            <p className="text-xl text-gray-600">
              Specialized expertise across different technology domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Cybersecurity
              </h3>
              <p className="text-gray-600 mb-4">
                Protect your digital assets with comprehensive security audits,
                implementation, and monitoring.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>Security assessments</li>
                <li>Penetration testing</li>
                <li>Compliance consulting</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Digital Transformation
              </h3>
              <p className="text-gray-600 mb-4">
                Guide your organization through complete digital transformation
                with strategic planning and execution.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>Process automation</li>
                <li>Change management</li>
                <li>Technology roadmaps</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Integration Services
              </h3>
              <p className="text-gray-600 mb-4">
                Connect disparate systems and streamline workflows with seamless
                integration solutions.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>API development</li>
                <li>System integration</li>
                <li>Data synchronization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Implementation Process
            </h2>
            <p className="text-xl text-gray-600">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Discovery & Analysis
              </h3>
              <p className="text-gray-600">
                We start by understanding your business goals, current
                challenges, and technical requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Strategy & Planning
              </h3>
              <p className="text-gray-600">
                Develop a comprehensive strategy with detailed project roadmap,
                timelines, and milestones.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Development & Testing
              </h3>
              <p className="text-gray-600">
                Execute the solution using agile methodologies with continuous
                testing and quality assurance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Deployment & Support
              </h3>
              <p className="text-gray-600">
                Deploy the solution with comprehensive training and ongoing
                support for long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Support Services
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our commitment to your success doesn't end at deployment. We
                provide ongoing support, maintenance, and optimization services
                to ensure your technology solutions continue to deliver value.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      24/7 Technical Support
                    </h4>
                    <p className="text-gray-600">
                      Round-the-clock assistance from our expert technical team
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Performance Monitoring
                    </h4>
                    <p className="text-gray-600">
                      Proactive monitoring and optimization of your systems
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Regular Updates
                    </h4>
                    <p className="text-gray-600">
                      Keep your solutions current with the latest features and
                      security patches
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Training & Documentation
                    </h4>
                    <p className="text-gray-600">
                      Comprehensive training programs and detailed documentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Support Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how our services can help you achieve your technology
            goals and drive sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors">
              Schedule Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors">
              View Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
