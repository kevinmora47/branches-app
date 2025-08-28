import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * A reusable button component with multiple variants and sizes
 * Uses global CSS classes defined in globals.css for consistent styling
 * @param variant - The button style variant
 * @param size - The button size
 * @param loading - Whether the button is in loading state
 * @param children - Button content
 * @param props - Additional button props
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ');
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}