import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * A reusable loading spinner component
 * Uses global CSS classes defined in globals.css for consistent styling
 * @param size - The size of the spinner
 * @param className - Additional CSS classes
 */
export function LoadingSpinner({ size = 'medium', className = '' }: LoadingSpinnerProps) {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={spinnerClasses} />
  );
}

interface FullScreenLoaderProps {
  message?: string;
}

/**
 * A full-screen loading component
 * Uses global CSS classes defined in globals.css for consistent styling
 * @param message - Optional loading message
 */
export function FullScreenLoader({ message = 'Loading...' }: FullScreenLoaderProps) {
  return (
    <div className="full-screen-loader">
      <div className="loader-container">
        <LoadingSpinner size="large" />
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
}