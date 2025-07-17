import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Home,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

const ComingSoon = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Clock className="h-12 w-12 text-white" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Coming Soon!
        </h1>

        {/* Prominent Text */}
        <p className="text-2xl md:text-3xl text-gray-700 mb-4 leading-relaxed">
          We are building the{" "}
          <span className="text-blue-600 font-semibold">
            "Best User Experience"
          </span>{" "}
          for YOU,
        </p>

        {/* Bold Thank You */}
        <p className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
          Thank you for your patience!
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          This page is currently under development. We're working hard to bring
          you an amazing experience.
        </p>

        {/* Countdown */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 inline-block">
          <p className="text-gray-600 mb-2">Redirecting to homepage in:</p>
          <div className="text-4xl font-bold text-blue-600">{countdown}</div>
          <p className="text-sm text-gray-500">seconds</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage Now
          </button>
          <Link
            to="/contact"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="mt-12">
          <p className="text-gray-600 mb-4">Follow us for updates:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com/ruvabit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/ruvabit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/company/ruvabit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com/@ruvabit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Want to be notified when this page is ready?{" "}
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
