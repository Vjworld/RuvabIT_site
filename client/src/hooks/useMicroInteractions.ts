import { useEffect, useRef } from 'react';

export const useMicroInteractions = <T extends HTMLElement = HTMLDivElement>() => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Ripple effect on click
    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
      `;

      element.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    // Magnetic effect on hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.1;
      const deltaY = (e.clientY - centerY) * 0.1;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0) scale(1)';
    };

    element.addEventListener('click', handleClick);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('click', handleClick);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return elementRef;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(threshold = 0.1) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [threshold]);

  return elementRef;
};

// Hook for parallax effect
export const useParallax = <T extends HTMLElement = HTMLDivElement>(speed = 0.5) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elementRef;
};

// CSS for animations (to be added to global styles)
export const microInteractionStyles = `
  @keyframes ripple {
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .micro-interaction {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .magnetic-hover {
    transition: transform 0.2s ease-out;
  }

  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .hover-glow:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }

  .pulse-on-hover:hover {
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;