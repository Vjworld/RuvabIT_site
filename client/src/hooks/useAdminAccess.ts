import { useEffect } from 'react';

export function useAdminAccess() {
  useEffect(() => {
    let keySequence = '';
    let timeoutId: NodeJS.Timeout;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Clear the sequence after 2 seconds of inactivity
      clearTimeout(timeoutId);
      
      // Add the key to the sequence
      keySequence += event.key.toLowerCase();
      
      // Check for admin access sequence: "admin" + Enter
      if (keySequence.includes('admin') && event.key === 'Enter') {
        event.preventDefault();
        window.location.href = '/login';
        keySequence = '';
        return;
      }

      // Alternative: Ctrl + Shift + A for admin access
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        window.location.href = '/login';
        return;
      }

      // Reset sequence after 2 seconds
      timeoutId = setTimeout(() => {
        keySequence = '';
      }, 2000);

      // Keep sequence short to avoid memory issues
      if (keySequence.length > 10) {
        keySequence = keySequence.slice(-5);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearTimeout(timeoutId);
    };
  }, []);
}