import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface DemoStep {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
  duration: number; // in seconds
}

interface DemoTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoTour: React.FC<DemoTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const demoSteps: DemoStep[] = [
    {
      id: 1,
      title: "Welcome to Ruvab IT",
      description: "Your partner in digital transformation with cutting-edge AI solutions",
      content: (
        <div className="text-center">
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
              alt="AI Analytics Dashboard"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
          <p className="text-lg text-gray-600">
            Discover how our AI-powered solutions can transform your business operations and drive growth.
          </p>
        </div>
      ),
      duration: 8
    },
    {
      id: 2,
      title: "TrendSolver - AI Analytics Platform",
      description: "Advanced business intelligence and predictive analytics",
      content: (
        <div>
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
              alt="TrendSolver Analytics"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800">Real-time Analytics</h4>
              <p className="text-blue-600">Monitor trends as they happen</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-800">Predictive Insights</h4>
              <p className="text-green-600">Forecast future outcomes</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-semibold text-purple-800">Custom Dashboards</h4>
              <p className="text-purple-600">Tailored to your business</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="font-semibold text-orange-800">AI Recommendations</h4>
              <p className="text-orange-600">Actionable business insights</p>
            </div>
          </div>
        </div>
      ),
      duration: 12
    },
    {
      id: 3,
      title: "LangScribe - Content Creation AI",
      description: "Intelligent content generation and multi-language support",
      content: (
        <div>
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
              alt="LangScribe Content Creation"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-medium">AI-Powered Writing</span>
              <span className="text-green-600 font-semibold">✓</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-medium">50+ Language Support</span>
              <span className="text-green-600 font-semibold">✓</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-medium">SEO Optimization</span>
              <span className="text-green-600 font-semibold">✓</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-medium">Team Collaboration</span>
              <span className="text-green-600 font-semibold">✓</span>
            </div>
          </div>
        </div>
      ),
      duration: 10
    },
    {
      id: 4,
      title: "Our Core Services",
      description: "Comprehensive technology solutions for your business",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">AI Implementation</h4>
            <p className="text-blue-600 text-sm">Custom AI solutions for automation</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">BI</span>
            </div>
            <h4 className="font-semibold text-purple-800 mb-2">Business Intelligence</h4>
            <p className="text-purple-600 text-sm">Data-driven insights</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">☁</span>
            </div>
            <h4 className="font-semibold text-green-800 mb-2">Cloud Solutions</h4>
            <p className="text-green-600 text-sm">Scalable infrastructure</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-orange-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">🛡</span>
            </div>
            <h4 className="font-semibold text-orange-800 mb-2">Cybersecurity</h4>
            <p className="text-orange-600 text-sm">Protect your assets</p>
          </div>
        </div>
      ),
      duration: 10
    },
    {
      id: 5,
      title: "Why Choose Ruvab IT?",
      description: "Trusted by businesses worldwide for digital transformation",
      content: (
        <div className="text-center">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Successful Projects</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Expert Support</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Ready to transform your business with our AI-powered solutions?
          </p>
        </div>
      ),
      duration: 8
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      // Auto advance to next step
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setTimeLeft(demoSteps[currentStep + 1].duration);
      } else {
        setIsPlaying(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeLeft, currentStep, demoSteps]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setTimeLeft(demoSteps[0].duration);
      setIsPlaying(false);
      trackEvent('demo_tour_started', 'engagement', 'demo_tour');
    }
  }, [isOpen]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && timeLeft === 0) {
      setTimeLeft(demoSteps[currentStep].duration);
    }
    trackEvent(isPlaying ? 'demo_tour_paused' : 'demo_tour_played', 'engagement', 'demo_tour');
  };

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(demoSteps[currentStep + 1].duration);
      setIsPlaying(false);
      trackEvent('demo_tour_next', 'engagement', 'demo_tour');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTimeLeft(demoSteps[currentStep - 1].duration);
      setIsPlaying(false);
      trackEvent('demo_tour_previous', 'engagement', 'demo_tour');
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
    trackEvent('demo_tour_closed', 'engagement', 'demo_tour');
    onClose();
  };

  const currentStepData = demoSteps[currentStep];
  const progress = ((currentStep + 1) / demoSteps.length) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">Interactive Demo Tour</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Step {currentStep + 1} of {demoSteps.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {currentStepData.description}
            </p>
          </div>

          <div className="mb-6">
            {currentStepData.content}
          </div>

          {/* Timer */}
          {isPlaying && (
            <div className="mb-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-blue-800 font-medium">
                  Auto-advancing in {timeLeft}s
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            <Button onClick={handlePlay} variant="outline">
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>

            {currentStep === demoSteps.length - 1 ? (
              <Button onClick={() => window.location.href = '/contact'}>
                Get Started
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTour;