import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

/**
 * A reusable error message component
 * Uses global CSS classes defined in globals.css for consistent styling
 * @param message - The error message to display
 * @param className - Additional CSS classes
 */
export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`alert alert-error ${className}`}>
      {message}
    </div>
  );
}

interface FullScreenErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

/**
 * A full-screen error component for critical errors
 * Uses global CSS classes defined in globals.css for consistent styling
 * @param title - The error title
 * @param message - The error message
 * @param onRetry - Optional retry function
 */
export function FullScreenError({ 
  title = 'Something went wrong', 
  message, 
  onRetry 
}: FullScreenErrorProps) {
  return (
    <div className="full-screen-error">
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h1 className="error-title">{title}</h1>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-primary"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}