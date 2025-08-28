'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { FullScreenLoader } from '../../components/ui/LoadingSpinner';
import { ModuleCard } from '../../components/ui/ModuleCard';
import { dashboardModules } from '../../data/dashboardModules';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, profile, signOut, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <FullScreenLoader />; // Show loader while redirecting
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      // Add small delay to prevent race condition with auth state changes
      setTimeout(() => {
        router.replace('/');
      }, 100);
    } catch (error) {
      console.error('Error signing out:', error);
      // Still navigate on error to prevent user from being stuck
      setTimeout(() => {
        router.replace('/');
      }, 100);
    }
  };

  const handleModuleClick = (path?: string) => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title-section">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Streamline your business operations with our comprehensive management platform.</p>
          </div>
          <div className="dashboard-header-actions">
            <div className="dashboard-user-info">
              <span className="dashboard-username">{profile?.full_name || user.email}</span>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="dashboard-signout-btn"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-modules-grid">
          {dashboardModules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              icon={module.icon}
              onClick={() => handleModuleClick(module.path)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}