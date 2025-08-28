'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { AuthService, SignInData } from '../lib/authService';
import { Database } from '../lib/supabase';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    let abortController = new AbortController();

    async function initializeAuth() {
      try {
        // Get current session
        const currentSession = await AuthService.getCurrentSession();
        
        if (mounted && !abortController.signal.aborted) {
          setSession(currentSession);
          
          if (currentSession?.user) {
            setUser(currentSession.user);
            
            // Get user profile with error handling for aborted requests
            try {
              const userProfile = await AuthService.getUserProfile(currentSession.user.id);
              if (mounted && !abortController.signal.aborted && !isSigningOut) {
                setProfile(userProfile);
              }
            } catch (profileError) {
              // Silently handle profile fetch errors (likely due to navigation)
              if (!abortController.signal.aborted && !isSigningOut) {
                console.warn('Profile fetch failed (likely due to navigation):', profileError);
              }
            }
          }
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Error initializing auth:', error);
        }
      } finally {
        if (mounted && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        if (!mounted || abortController.signal.aborted) return;
        
        try {
          console.log('Auth state changed:', event, session?.user?.email);
          
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user && !isSigningOut) {
            // Get user profile with error handling for aborted requests
            try {
              const userProfile = await AuthService.getUserProfile(session.user.id);
              if (mounted && !abortController.signal.aborted && !isSigningOut) {
                setProfile(userProfile);
              }
            } catch (profileError) {
              // Silently handle profile fetch errors (likely due to navigation)
              if (!abortController.signal.aborted && !isSigningOut) {
                console.warn('Profile fetch failed (likely due to navigation):', profileError);
              }
            }
          } else {
            setProfile(null);
          }
          
          if (!abortController.signal.aborted && !isSigningOut) {
            setLoading(false);
          }
        } catch (error) {
          if (!abortController.signal.aborted && !isSigningOut) {
            console.error('Error handling auth state change:', error);
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      abortController.abort();
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (data: SignInData): Promise<{ error: string | null }> => {
    try {
      setLoading(true);
      const { error } = await AuthService.signIn(data);
      
      if (error) {
        // Handle specific authentication errors
        switch (error.message) {
          case 'Invalid login credentials':
            return { error: 'Incorrect email or password. Please check your credentials and try again.' };
          case 'Email not confirmed':
            return { error: 'Please check your email and click the confirmation link before signing in.' };
          case 'Too many requests':
            return { error: 'Too many login attempts. Please wait a few minutes before trying again.' };
          case 'User not found':
            return { error: 'No account found with this email address.' };
          default:
            // For any other error, show a user-friendly message
            return { error: 'Unable to sign in. Please check your email and password and try again.' };
        }
      }
      
      return { error: null };
    } catch {
      return { error: 'An unexpected error occurred during sign in' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setIsSigningOut(true);
      setLoading(true);
      
      // Clear local state immediately to prevent UI issues
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Skip Supabase signOut call to prevent ERR_ABORTED during navigation
      // The full page redirect will clear the session anyway
      console.log('User signed out locally');
    } catch (error) {
      console.warn('Sign out error (user is still logged out locally):', error);
      // Local state is already cleared, so user is effectively signed out
    } finally {
      setLoading(false);
      setIsSigningOut(false); // Reset the signing out flag
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Higher-order component for protecting routes
 * @param Component - The component to protect
 * @returns Protected component that requires authentication
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
        </div>
      );
    }

    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Authentication Required</h2>
            <p className="text-gray-600">Please sign in to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}