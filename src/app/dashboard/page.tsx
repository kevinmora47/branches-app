'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { FullScreenLoader } from '../../components/ui/LoadingSpinner';
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

  return (
    <div className="min-h-screen p-5">
      {/* Header */}
      <header className="border-b border-gray-300 pb-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {profile?.full_name || user.email}</span>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome to your dashboard.</p>
        </div>

        {/* User Information */}
        <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-white shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Your Profile</h3>
          <div className="grid gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Full Name</p>
              <p className="text-gray-900">{profile?.full_name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
              <p className="text-gray-900">{profile?.email || user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Role</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                {profile?.role?.toUpperCase() || 'USER'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Member Since</p>
              <p className="text-gray-900">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}</p>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-900">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Authentication Status</p>
              <p className="text-green-600 font-medium">✓ Authenticated</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Session Active</p>
              <p className="text-green-600 font-medium">✓ Yes</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Role Verified</p>
              <p className="text-green-600 font-medium">✓ {profile?.role || 'user'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}