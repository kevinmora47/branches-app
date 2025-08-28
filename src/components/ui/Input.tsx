import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * A reusable input component with label, error, and helper text support
 * Uses global CSS classes defined in globals.css for consistent styling
 * @param label - The input label
 * @param error - Error message to display
 * @param helperText - Helper text to display below the input
 * @param props - Additional input props
 */
export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);
  
  const inputClasses = [
    'form-input',
    hasError ? 'error' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className="form-group">
      {label && (
        <label 
          htmlFor={inputId} 
          className="form-label"
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <span id={`${inputId}-error`} className="form-error">
          {error}
        </span>
      )}
      
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="form-helper">
          {helperText}
        </span>
      )}
    </div>
  );
}