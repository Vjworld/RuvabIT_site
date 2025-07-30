import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="hero"]',
    title: 'Welcome to Ruvab IT',
    content: 'This is our main hero section where you can launch our flagship applications - TrendSolver and LangScribe.',
    placement: 'bottom'
  },
  {
    target: '[data-tour="services"]',
    title: 'Our Services',
    content: 'Explore our comprehensive technology solutions including AI implementation, business intelligence, and more.',
    placement: 'top'
  },
  {
    target: '[data-tour="blog"]',
    title: 'Latest Insights',
    content: 'Stay updated with the latest trends in technology, AI, and digital transformation.',
    placement: 'top'
  },
  {
    target: '[data-tour="contact"]',
    title: 'Get in Touch',
    content: 'Ready to transform your business? Contact us to discuss your project requirements.',
    placement: 'top'
  }
];

export default function TourButton() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightElement, setHighlightElement] = useState<HTMLElement | null>(null);

  const startTour = () => {
    trackEvent('tour_started', 'engagement', 'tour_button');
    setIsActive(true);
    setCurrentStep(0);
    showStep(0);
  };

  const showStep = (stepIndex: number) => {
    const step = tourSteps[stepIndex];
    const element = document.querySelector(step.target) as HTMLElement;
    
    if (element) {
      setHighlightElement(element);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add highlight effect
      element.style.position = 'relative';
      element.style.zIndex = '1000';
      element.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2)';
      element.style.borderRadius = '8px';
      element.style.transition = 'all 0.3s ease';
    }
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      removeHighlight();
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      showStep(nextStepIndex);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      removeHighlight();
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      showStep(prevStepIndex);
    }
  };

  const removeHighlight = () => {
    if (highlightElement) {
      highlightElement.style.boxShadow = '';
      highlightElement.style.zIndex = '';
      highlightElement.style.position = '';
      highlightElement.style.borderRadius = '';
    }
  };

  const endTour = () => {
    trackEvent('tour_completed', 'engagement', 'tour_navigation');
    removeHighlight();
    setIsActive(false);
    setCurrentStep(0);
    setHighlightElement(null);
  };

  const skipTour = () => {
    trackEvent('tour_skipped', 'engagement', 'tour_navigation');
    endTour();
  };

  if (!isActive) {
    return (
      <Button
        onClick={startTour}
        variant="outline"
        className="border-2 border-blue-500 text-blue-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-lg hover:shadow-xl"
      >
        <Play className="h-4 w-4 mr-2" />
        Take Tour
      </Button>
    );
  }

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Tour Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 z-50">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentTourStep.title}
          </h3>
          <Button
            onClick={skipTour}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {currentTourStep.content}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentStep + 1} of {tourSteps.length}
          </span>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                onClick={prevStep}
                variant="outline"
                size="sm"
                className="text-sm"
              >
                Previous
              </Button>
            )}
            
            <Button
              onClick={nextStep}
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}

export { TourButton };