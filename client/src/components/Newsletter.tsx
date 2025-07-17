import React, { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { trackNewsletterSignup, trackFormSubmission } from "../utils/analytics";

interface NewsletterProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  className = "",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real implementation, you would call your newsletter API here
      // const response = await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });

      // Track successful newsletter signup
      trackNewsletterSignup(window.location.pathname);
      trackFormSubmission("newsletter", true);

      setStatus("success");
      setMessage(
        "Thank you for subscribing! Check your email for confirmation.",
      );
      setEmail("");

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (error) {
      // Track failed newsletter signup
      trackFormSubmission("newsletter", false);

      setStatus("error");
      setMessage("Something went wrong. Please try again later.");

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
        <div className="flex-1 relative">
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border transition-colors ${
              status === "error" ? "border-red-500" : "border-gray-300"
            }`}
            disabled={status === "loading"}
          />
          {status === "success" && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
          {status === "error" && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`px-6 py-3 rounded-r-lg font-medium transition-all duration-200 ${
            status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
          } text-white`}
        >
          {status === "loading" ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              <span className="hidden sm:inline">Subscribing...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            buttonText
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-3 text-center text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          <div className="flex items-center justify-center">
            {status === "success" ? (
              <CheckCircle className="h-4 w-4 mr-1" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-1" />
            )}
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
