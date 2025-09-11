import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  onSuccess?: () => void;
  title?: string;
  description?: string;
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  defaultMode = 'login',
  onSuccess,
  title,
  description
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="sr-only">
          <span>Authentication</span>
        </DialogHeader>
        
        {mode === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onRegisterClick={switchToRegister}
            title={title}
            description={description}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onLoginClick={switchToLogin}
            title={title}
            description={description}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;