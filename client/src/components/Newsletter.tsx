import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface NewsletterProps {
  variant?: "default" | "compact" | "footer";
  className?: string;
}

export function Newsletter({ variant = "default", className = "" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscription = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to subscribe");
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      setStatus("success");
      setMessage("Thank you for subscribing! Welcome to our newsletter.");
      setEmail("");
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    },
    onError: (error: any) => {
      setStatus("error");
      setMessage(error.message || "Failed to subscribe. Please try again.");
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !subscription.isPending) {
      subscription.mutate(email);
    }
  };

  // Compact variant for embedding in other components
  if (variant === "compact") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <h4 className="font-medium">Stay Updated</h4>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
            disabled={subscription.isPending}
          />
          <Button
            type="submit"
            disabled={subscription.isPending || status === "success"}
            size="sm"
          >
            {subscription.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
        {message && (
          <div className={`flex items-center gap-2 text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}>
            {status === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message}
          </div>
        )}
      </div>
    );
  }

  // Footer variant for page footers
  if (variant === "footer") {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Stay in the Loop</h3>
          <p className="text-sm text-muted-foreground">
            Get the latest updates on our technology solutions and innovations
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
            disabled={subscription.isPending}
          />
          <Button
            type="submit"
            disabled={subscription.isPending || status === "success"}
            className="whitespace-nowrap"
          >
            {subscription.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Subscribing...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
        {message && (
          <div className={`flex items-center justify-center gap-2 text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}>
            {status === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message}
          </div>
        )}
      </div>
    );
  }

  // Default card variant
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Newsletter Subscription
        </CardTitle>
        <CardDescription>
          Stay updated with the latest technology solutions, product releases, and industry insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
              disabled={subscription.isPending}
            />
            <Button
              type="submit"
              disabled={subscription.isPending || status === "success"}
              className="whitespace-nowrap"
            >
              {subscription.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Subscribing...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </div>
          
          {message && (
            <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
              status === "success" 
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" 
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            }`}>
              {status === "success" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              {message}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy and will never share your email address.
            You can unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}