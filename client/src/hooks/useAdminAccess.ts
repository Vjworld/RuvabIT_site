import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useAdminAccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    let keySequence = '';
    let sequenceTimeout: NodeJS.Timeout;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Handle Ctrl+Shift+A shortcut
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setLocation('/admin-dashboard');
        return;
      }

      // Handle "admin" sequence
      if (event.key.length === 1) {
        // Clear any existing timeout
        if (sequenceTimeout) {
          clearTimeout(sequenceTimeout);
        }

        // Add the key to the sequence
        keySequence += event.key.toLowerCase();

        // Check for admin access sequence: "admin" + Enter
        if (keySequence === 'admin' && event.key === 'Enter') {
          event.preventDefault();
          setLocation('/admin-dashboard');
          keySequence = '';
          return;
        }

        // Keep only the last 5 characters to match "admin"
        if (keySequence.length > 5) {
          keySequence = keySequence.slice(-5);
        }

        // Reset sequence after 2 seconds of inactivity
        sequenceTimeout = setTimeout(() => {
          keySequence = '';
        }, 2000);
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (sequenceTimeout) {
        clearTimeout(sequenceTimeout);
      }
    };
  }, [setLocation]);
}