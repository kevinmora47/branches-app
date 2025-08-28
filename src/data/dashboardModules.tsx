import React from 'react';
import { MemoizedBaseIcon as BaseIcon } from '../components/ui/BaseIcon';

// SVG Icons for dashboard modules - Now using BaseIcon with CSS variables
const DashboardIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Dashboard module icon"
    title="Dashboard"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="10" y="10" width="12" height="8" rx="2" fill="var(--icon-color)"/>
    <rect x="26" y="10" width="12" height="8" rx="2" fill="var(--icon-color)"/>
    <rect x="10" y="22" width="28" height="16" rx="2" fill="var(--icon-color)"/>
  </BaseIcon>
);

const PurchasingIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Purchasing module icon"
    title="Purchasing"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <path d="M14 18L24 12L34 18V32C34 33.1 33.1 34 32 34H16C14.9 34 14 33.1 14 32V18Z" fill="var(--icon-color)"/>
    <path d="M20 24H28" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 28H28" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round"/>
  </BaseIcon>
);

const InventoryIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Inventory module icon"
    title="Inventory"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="12" y="14" width="24" height="20" rx="2" fill="var(--icon-color)"/>
    <rect x="16" y="18" width="16" height="2" fill="var(--text-inverse)"/>
    <rect x="16" y="22" width="12" height="2" fill="var(--text-inverse)"/>
    <rect x="16" y="26" width="8" height="2" fill="var(--text-inverse)"/>
  </BaseIcon>
);

const CRMIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="CRM module icon"
    title="Customer Relationship Management"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="10" y="12" width="28" height="24" rx="4" fill="var(--icon-color)"/>
    <text x="24" y="28" textAnchor="middle" fill="var(--text-inverse)" fontSize="12" fontWeight="bold">CRM</text>
  </BaseIcon>
);

const SalesIcon = () => (
  <BaseIcon 
    color="var(--color-success)" 
    ariaLabel="Sales module icon"
    title="Sales"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <circle cx="24" cy="24" r="12" fill="var(--icon-color)"/>
    <path d="M18 24L22 28L30 20" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </BaseIcon>
);

const AddressBookIcon = () => (
  <BaseIcon 
    color="var(--color-secondary)" 
    ariaLabel="Address book module icon"
    title="Address Book"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="12" y="10" width="24" height="28" rx="2" fill="var(--icon-color)"/>
    <circle cx="24" cy="20" r="4" fill="var(--text-inverse)"/>
    <path d="M18 30C18 27 20.7 25 24 25S30 27 30 30" fill="var(--text-inverse)"/>
  </BaseIcon>
);

const FinanceIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Finance and banking module icon"
    title="Finance & Banking"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="10" y="14" width="28" height="20" rx="2" fill="var(--icon-color)"/>
    <rect x="14" y="18" width="6" height="12" fill="var(--text-inverse)"/>
    <rect x="21" y="18" width="6" height="12" fill="var(--text-inverse)"/>
    <rect x="28" y="18" width="6" height="12" fill="var(--text-inverse)"/>
  </BaseIcon>
);

const ProjectManagementIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Project management module icon"
    title="Project Management"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="12" y="12" width="24" height="24" rx="2" fill="var(--icon-color)"/>
    <rect x="16" y="16" width="4" height="16" fill="var(--text-inverse)"/>
    <rect x="22" y="20" width="4" height="12" fill="var(--text-inverse)"/>
    <rect x="28" y="18" width="4" height="14" fill="var(--text-inverse)"/>
  </BaseIcon>
);

const ActivityManagementIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Activity management module icon"
    title="Activity Management"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="10" y="12" width="28" height="24" rx="2" fill="var(--icon-color)"/>
    <path d="M16 20H32M16 24H28M16 28H24" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round"/>
  </BaseIcon>
);

const SupportManagementIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Support management module icon"
    title="Support Management"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <circle cx="24" cy="24" r="12" fill="var(--icon-color)"/>
    <path d="M18 28C18 28 20 26 24 26S30 28 30 28" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="22" r="1" fill="var(--text-inverse)"/>
    <circle cx="28" cy="22" r="1" fill="var(--text-inverse)"/>
  </BaseIcon>
);

const NotificationIcon = () => (
  <BaseIcon 
    color="var(--color-warning)" 
    ariaLabel="Notification module icon"
    title="Notifications"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <path d="M24 8C20 8 17 11 17 15V22L14 25H34L31 22V15C31 11 28 8 24 8Z" fill="var(--icon-color)"/>
    <path d="M21 32C21 33.1 22.3 34 24 34S27 33.1 27 32" fill="var(--icon-color)"/>
  </BaseIcon>
);

const HRMIcon = () => (
  <BaseIcon 
    color="var(--color-info)" 
    ariaLabel="Human resources management module icon"
    title="Human Resources Management"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <circle cx="24" cy="18" r="6" fill="var(--icon-color)"/>
    <path d="M12 34C12 28 17 24 24 24S36 28 36 34" fill="var(--icon-color)"/>
  </BaseIcon>
);

const PayrollIcon = () => (
  <BaseIcon 
    color="var(--color-success)" 
    ariaLabel="Payroll management module icon"
    title="Payroll Management"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <circle cx="24" cy="24" r="12" fill="var(--icon-color)"/>
    <text x="24" y="28" textAnchor="middle" fill="var(--text-inverse)" fontSize="14" fontWeight="bold">$</text>
  </BaseIcon>
);

const SetupIcon = () => (
  <BaseIcon 
    color="var(--color-secondary)" 
    ariaLabel="Setup and overview module icon"
    title="Setup & Overview"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <circle cx="24" cy="24" r="8" fill="var(--icon-color)"/>
    <path d="M24 16V32M16 24H32" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round"/>
  </BaseIcon>
);

const ReportIcon = () => (
  <BaseIcon 
    color="var(--color-danger)" 
    ariaLabel="Report overview module icon"
    title="Report Overview"
  >
    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--icon-bg-color)"/>
    <rect x="12" y="12" width="24" height="24" rx="2" fill="var(--icon-color)"/>
    <path d="M16 20L20 24L28 16" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </BaseIcon>
);

/**
 * Interface for dashboard module configuration
 */
export interface DashboardModule {
  /** Unique identifier for the module */
  id: string;
  /** Display title for the module */
  title: string;
  /** React component icon for the module */
  icon: React.ReactNode;
  /** Optional navigation path for the module */
  path?: string;
}

/**
 * Configuration array for all dashboard modules
 * Each module includes an icon, title, and optional navigation path
 * Icons use the BaseIcon component with CSS variables for consistent theming
 */
export const dashboardModules: DashboardModule[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  {
    id: 'purchasing',
    title: 'Purchasing',
    icon: <PurchasingIcon />,
    path: '/purchasing'
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <InventoryIcon />,
    path: '/inventory'
  },
  {
    id: 'crm',
    title: 'CRM',
    icon: <CRMIcon />,
    path: '/crm'
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: <SalesIcon />,
    path: '/sales'
  },
  {
    id: 'address-book',
    title: 'Address Book',
    icon: <AddressBookIcon />,
    path: '/address-book'
  },
  {
    id: 'finance',
    title: 'Finance & Banking',
    icon: <FinanceIcon />,
    path: '/finance'
  },
  {
    id: 'project-management',
    title: 'Project Management',
    icon: <ProjectManagementIcon />,
    path: '/projects'
  },
  {
    id: 'activity-management',
    title: 'Activity Management',
    icon: <ActivityManagementIcon />,
    path: '/activities'
  },
  {
    id: 'support-management',
    title: 'Support Management',
    icon: <SupportManagementIcon />,
    path: '/support'
  },
  {
    id: 'notification',
    title: 'Notification',
    icon: <NotificationIcon />,
    path: '/notifications'
  },
  {
    id: 'hrm',
    title: 'HRM',
    icon: <HRMIcon />,
    path: '/hrm'
  },
  {
    id: 'payroll',
    title: 'Payroll Management',
    icon: <PayrollIcon />,
    path: '/payroll'
  },
  {
    id: 'setup',
    title: 'Setup & Overview',
    icon: <SetupIcon />,
    path: '/setup'
  },
  {
    id: 'reports',
    title: 'Report Overview',
    icon: <ReportIcon />,
    path: '/reports'
  }
];