import React from 'react';

interface BaseIconProps {
  /** The SVG path or content */
  children: React.ReactNode;
  /** Icon size in pixels */
  size?: number;
  /** Icon color - uses CSS custom properties */
  color?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
  /** Icon title for tooltips */
  title?: string;
}

/**
 * Base icon component that provides consistent styling and accessibility
 * for all dashboard module icons
 */
export const BaseIcon: React.FC<BaseIconProps> = ({
  children,
  size = 48,
  color = 'var(--color-info)',
  ariaLabel,
  className = '',
  title
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`dashboard-icon ${className}`}
      role="img"
      aria-label={ariaLabel}
      style={{
        '--icon-color': color,
        '--icon-bg-color': `${color}1a`, // 10% opacity
      } as React.CSSProperties}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

/**
 * Memoized version of BaseIcon for performance optimization
 */
export const MemoizedBaseIcon = React.memo(BaseIcon);