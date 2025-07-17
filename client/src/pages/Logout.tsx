import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    // Redirect to home page after logout
    window.location.href = '/';
  }, [logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Logging out...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we log you out.</p>
      </div>
    </div>
  );
}