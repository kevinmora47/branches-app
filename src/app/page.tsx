'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { FullScreenLoader } from '../components/ui/LoadingSpinner';
import { LoginFormState } from '../types/auth';
import { validateLoginForm, hasFormErrors } from '../utils/validation';

export default function LoginPage() {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    loading: false,
    errors: {}
  });
  const { signIn, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateLoginForm(formState.email, formState.password);
    
    if (hasFormErrors(validationErrors)) {
      setFormState(prev => ({ ...prev, errors: validationErrors }));
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, errors: {} }));

    try {
      const { error } = await signIn({ email: formState.email, password: formState.password });
      
      if (error) {
        setFormState(prev => ({
          ...prev,
          errors: { general: error }
        }));
      }
      // Navigation will be handled by the useEffect when user state changes
    } catch {
      setFormState(prev => ({
        ...prev,
        errors: { general: 'An unexpected error occurred' }
      }));
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return <FullScreenLoader />;
  }

  // Don't show login form if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm">
        {/* Login Card */}
        <div className="login-card p-8">
          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">Welcome back! Please sign in to continue.</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {formState.errors.general && (
              <div className="mb-4">
                <ErrorMessage message={formState.errors.general} />
              </div>
            )}
            
            <Input
              type="email"
              label="Email"
              value={formState.email}
              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
              disabled={formState.loading}
              error={formState.errors.email}
            />
            
            <Input
              type="password"
              label="Password"
              value={formState.password}
              onChange={(e) => setFormState(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
              required
              disabled={formState.loading}
              error={formState.errors.password}
            />
            
            <div className="login-button-wrapper">
              <Button
                type="submit"
                loading={formState.loading}
                className="w-full"
                size="lg"
              >
                {formState.loading ? 'Signing in...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="login-footer">
          <p className="login-footer-text">
            Secure authentication powered by Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
