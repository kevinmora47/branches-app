import { supabase } from './supabase';
import { Database } from './supabase';
import { User, AuthError, Session } from '@supabase/supabase-js';

type UserProfile = Database['public']['Tables']['users']['Row'];

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

/**
 * Service class for handling authentication operations with Supabase
 */
export class AuthService {
  /**
   * Sign in an existing user
   * @param data - Sign in data containing email and password
   * @returns Promise resolving to authentication response with user, session, and error
   */
  static async signIn(data: SignInData): Promise<AuthResponse> {
    const { email, password } = data;
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return {
        user: authData.user,
        session: authData.session,
        error
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error as AuthError
      };
    }
  }
  
  /**
   * Sign out the current user - local only to avoid ERR_ABORTED errors
   * @returns Promise resolving to object with error (always null for local signout)
   */
  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      // Clear local session storage directly to avoid network issues
      if (typeof window !== 'undefined') {
        // Clear Supabase session from localStorage
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('sb-') || key.includes('supabase')) {
            localStorage.removeItem(key);
          }
        });
        
        // Clear sessionStorage as well
        const sessionKeys = Object.keys(sessionStorage);
        sessionKeys.forEach(key => {
          if (key.startsWith('sb-') || key.includes('supabase')) {
            sessionStorage.removeItem(key);
          }
        });
      }
      
      // Attempt Supabase signOut in background without waiting
      // This prevents ERR_ABORTED but still notifies Supabase when possible
      supabase.auth.signOut().catch(() => {
        // Silently ignore errors - local signout is sufficient
      });
      
      return { error: null };
    } catch (error) {
      console.warn('Local sign out error:', error);
      return { error: null };
    }
  }
  
  /**
   * Get the current user session
   * @returns Promise resolving to session data
   */
  static async getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
  

  
  /**
   * Get user profile by user ID, creating one if it doesn't exist
   * @param userId - The user's unique identifier
   * @returns User profile data or null if not found
   */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // First try to get existing profile
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      // If profile exists, return it
      if (data && !error) {
        return data;
      }
      
      // If profile doesn't exist (PGRST116 error), create it
      if (error && error.code === 'PGRST116') {
        console.log('User profile not found, creating new profile for user:', userId);
        return await this.createUserProfile(userId);
      }
      
      // For other errors, log and return null
      if (error) {
        console.error('Failed to fetch user profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      // Handle network errors (including ERR_ABORTED)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('Network request aborted or failed (likely due to navigation)');
        return null;
      }
      
      console.error('Unexpected error fetching user profile:', error);
      return null;
    }
  }
  
  /**
   * Create a new user profile
   * @param userId - The user's unique identifier
   * @returns Newly created user profile data or null if creation fails
   */
  static async createUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // Get user info from auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || user.id !== userId) {
        console.error('User not found or ID mismatch');
        return null;
      }
      
      // Create profile record
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          role: 'user'
        })
        .select()
        .single();
      
      if (error) {
        // If duplicate key error (profile already exists), try to fetch it
        if (error.code === '23505') {
          console.log('Profile already exists, fetching existing profile for user:', userId);
          const { data: existingData, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (existingData && !fetchError) {
            console.log('✅ Retrieved existing user profile');
            return existingData;
          }
          
          console.error('Failed to fetch existing profile:', fetchError);
          return null;
        }
        
        console.error('Failed to create user profile:', error);
        return null;
      }
      
      console.log('✅ User profile created successfully');
      return data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  }
  
  /**
   * Listen to auth state changes
   * @param callback - Function to call when auth state changes
   * @returns Subscription object to unsubscribe from auth state changes
   */
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}