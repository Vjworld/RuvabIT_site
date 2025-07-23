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
          <div className="mb-4 sm:mb-6">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
              alt="AI Analytics Dashboard"
              className="rounded-lg shadow-lg mx-auto w-full max-w-md sm:max-w-lg"
            />
          </div>
          <p className="text-sm sm:text-lg text-gray-600">
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
          <div className="mb-4 sm:mb-6">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
              alt="TrendSolver Analytics"
              className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-1">Real-time Analytics</h4>
              <p className="text-blue-600">Monitor trends as they happen</p>
            </div>
            <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-1">Predictive Insights</h4>
              <p className="text-green-600">Forecast future outcomes</p>
            </div>
            <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-1">Custom Dashboards</h4>
              <p className="text-purple-600">Tailored to your business</p>
            </div>
            <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-1">AI Recommendations</h4>
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
          <div className="mb-4 sm:mb-6">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
              alt="LangScribe Content Creation"
              className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
            />
          </div>
          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
              <span className="font-medium text-xs sm:text-sm">AI-Powered Writing</span>
              <span className="text-green-600 font-semibold">✓</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
              <span className="font-medium text-xs sm:text-sm">50+ Language Support</span>
              <span className="text-green-600 font-semibold">✓</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
              <span className="font-medium text-xs sm:text-sm">SEO Optimization</span>
              <span className="text-green-600 font-semibold">✓</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
              <span className="font-medium text-xs sm:text-sm">Team Collaboration</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">AI</span>
            </div>
            <h4 className="font-semibold text-blue-800 mb-1 sm:mb-2 text-xs sm:text-sm">AI Implementation</h4>
            <p className="text-blue-600 text-xs">Custom AI solutions for automation</p>
          </div>
          <div className="bg-purple-50 p-3 sm:p-4 rounded-lg text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">BI</span>
            </div>
            <h4 className="font-semibold text-purple-800 mb-1 sm:mb-2 text-xs sm:text-sm">Business Intelligence</h4>
            <p className="text-purple-600 text-xs">Data-driven insights</p>
          </div>
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">☁</span>
            </div>
            <h4 className="font-semibold text-green-800 mb-1 sm:mb-2 text-xs sm:text-sm">Cloud Solutions</h4>
            <p className="text-green-600 text-xs">Scalable infrastructure</p>
          </div>
          <div className="bg-orange-50 p-3 sm:p-4 rounded-lg text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">🛡</span>
            </div>
            <h4 className="font-semibold text-orange-800 mb-1 sm:mb-2 text-xs sm:text-sm">Cybersecurity</h4>
            <p className="text-orange-600 text-xs">Protect your assets</p>
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
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">500+</div>
              <p className="text-gray-600 text-xs sm:text-sm">Successful Projects</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">98%</div>
              <p className="text-gray-600 text-xs sm:text-sm">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">24/7</div>
              <p className="text-gray-600 text-xs sm:text-sm">Expert Support</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">5+</div>
              <p className="text-gray-600 text-xs sm:text-sm">Years Experience</p>
            </div>
          </div>
          <p className="text-sm sm:text-lg text-gray-600">
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Interactive Demo Tour</h2>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
              Step {currentStep + 1} of {demoSteps.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 sm:px-6 py-2 flex-shrink-0">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {currentStepData.description}
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            {currentStepData.content}
          </div>

          {/* Timer */}
          {isPlaying && (
            <div className="mb-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-blue-800 font-medium">
                  Auto-advancing in {timeLeft}s
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-t bg-gray-50 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="text-xs sm:text-sm"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button onClick={handlePlay} variant="outline" size="sm" className="text-xs sm:text-sm">
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Play
                </>
              )}
            </Button>

            {currentStep === demoSteps.length - 1 ? (
              <Button onClick={() => window.location.href = '/contact'} size="sm" className="text-xs sm:text-sm">
                Get Started
              </Button>
            ) : (
              <Button onClick={handleNext} size="sm" className="text-xs sm:text-sm">
                Next
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTour;