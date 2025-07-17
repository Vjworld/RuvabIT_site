import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  trackCTAClick,
  trackTrialSignup,
  trackDemoRequest,
} from "../utils/analytics";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  action?: "trial" | "contact" | "demo" | "products" | "custom";
  to?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  external?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  action,
  to,
  onClick,
  className = "",
  disabled = false,
  external = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;

    // Track CTA button click
    const location = window.location.pathname;
    trackCTAClick(children?.toString() || "CTA Button", location);

    if (onClick) {
      onClick();
      return;
    }

    // Handle predefined actions
    switch (action) {
      case "trial":
        trackTrialSignup("General", "Free Trial");
        // Check current page to determine which product trial to start
        const currentPath = window.location.pathname;
        if (currentPath.includes("trend-solver")) {
          window.open("https://trendsolver.ruvab.it.com", "_blank");
        } else if (currentPath.includes("langscribe")) {
          window.open("https://langscribe.ruvab.it.com", "_blank");
        } else {
          // Default behavior for general trial buttons
          navigate("/products/trend-solver");
        }
        break;
      case "contact":
        trackCTAClick("Contact", location);
        navigate("/contact");
        break;
      case "demo":
        trackDemoRequest("General");
        navigate("/contact");
        break;
      case "products":
        navigate("/products/trend-solver");
        break;
      case "custom":
        if (to) {
          if (external) {
            window.open(to, "_blank");
          } else {
            navigate(to);
          }
        }
        break;
      default:
        if (to) {
          if (external) {
            window.open(to, "_blank");
          } else {
            navigate(to);
          }
        }
    }
  };

  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-500 border border-blue-600",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-blue-600 focus:ring-white",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
      {external ? (
        <ExternalLink className="ml-2 h-4 w-4" />
      ) : (
        <ArrowRight className="ml-2 h-4 w-4" />
      )}
    </button>
  );
};

export default CTAButton;
