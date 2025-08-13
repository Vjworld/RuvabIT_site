import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full 
        bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
        text-white shadow-2xl transition-all duration-300 hover:scale-110 group
        border-2 border-white/30 backdrop-blur-sm
        animate-bounce hover:animate-pulse
        flex items-center justify-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      style={{
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))'
      }}
      title="Go to top"
      aria-label="Go to top"
    >
      <ChevronUp className="h-6 w-6 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200" />
      
      {/* Glowing ring effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
    </button>
  );
};

export default GoToTopButton;