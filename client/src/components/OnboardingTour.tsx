import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="hero"]',
    title: 'Welcome to Ruvab IT',
    content: 'Discover our AI-powered solutions that transform businesses. Launch our applications directly from here.',
    position: 'bottom',
  },
  {
    target: '[data-tour="products"]',
    title: 'Our Products',
    content: 'Explore TrendSolver for analytics and LangScribe for content creation. Each card shows detailed features.',
    position: 'top',
  },
  {
    target: '[data-tour="services"]',
    title: 'Our Services',
    content: 'Learn about our comprehensive AI implementation, business intelligence, and automation services.',
    position: 'top',
  },
  {
    target: '[data-tour="blog"]',
    title: 'Latest Insights',
    content: 'Stay updated with our latest articles on AI trends, technology insights, and industry best practices.',
    position: 'top',
  },
  {
    target: '[data-tour="contact"]',
    title: 'Get in Touch',
    content: 'Ready to transform your business? Contact us for a consultation or demo of our solutions.',
    position: 'top',
  },
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightElement, setHighlightElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && currentStep < tourSteps.length) {
      const targetElement = document.querySelector(tourSteps[currentStep].target) as HTMLElement;
      if (targetElement) {
        setHighlightElement(targetElement);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setHighlightElement(null);
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTooltipPosition = () => {
    if (!highlightElement) return { top: '50%', left: '50%' };

    const rect = highlightElement.getBoundingClientRect();
    const position = tourSteps[currentStep].position;

    switch (position) {
      case 'top':
        return {
          top: `${rect.top - 10}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)',
        };
      case 'bottom':
        return {
          top: `${rect.bottom + 10}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, 0)',
        };
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - 10}px`,
          transform: 'translate(-100%, -50%)',
        };
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 10}px`,
          transform: 'translate(0, -50%)',
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
    }
  };

  if (!isOpen || currentStep >= tourSteps.length) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Highlight */}
      {highlightElement && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            top: highlightElement.offsetTop,
            left: highlightElement.offsetLeft,
            width: highlightElement.offsetWidth,
            height: highlightElement.offsetHeight,
            border: '3px solid #3b82f6',
            borderRadius: '8px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          }}
        />
      )}

      {/* Tooltip */}
      <Card
        className="fixed z-50 w-80 bg-white dark:bg-gray-800 shadow-lg"
        style={getTooltipPosition()}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg">{currentTourStep.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {currentTourStep.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={nextStep}>
                {currentStep === tourSteps.length - 1 ? (
                  'Finish'
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            Step {currentStep + 1} of {tourSteps.length}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export const TourLauncher: React.FC = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    // Show tour for first-time visitors
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setTimeout(() => setIsTourOpen(true), 2000);
    }
  }, []);

  const handleCloseTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('hasSeenTour', 'true');
  };

  const handleStartTour = () => {
    setIsTourOpen(true);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleStartTour}
        className="fixed bottom-4 right-4 z-30 shadow-lg"
      >
        <Play className="h-4 w-4 mr-2" />
        Take Tour
      </Button>
      
      <OnboardingTour isOpen={isTourOpen} onClose={handleCloseTour} />
    </>
  );
};

export default OnboardingTour;