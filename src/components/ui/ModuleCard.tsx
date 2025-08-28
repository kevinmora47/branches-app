import React from 'react';

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

/**
 * A reusable module card component for the dashboard
 * Displays an icon and title with hover effects
 */
export function ModuleCard({ title, icon, onClick }: ModuleCardProps) {
  return (
    <div 
      className="module-card"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div className="module-card-icon">
        {icon}
      </div>
      <h3 className="module-card-title">
        {title}
      </h3>
    </div>
  );
}