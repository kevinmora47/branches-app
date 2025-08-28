import { User, Session } from '@supabase/supabase-js';

/**
 * User profile data structure
 */
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'user' | 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
}

/**
 * Authentication context state
 */
export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
}

/**
 * Authentication context methods
 */
export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Sign in form data
 */
export interface SignInData {
  email: string;
  password: string;
}

/**
 * Authentication response from Supabase
 */
export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

/**
 * Form validation errors
 */
export interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

/**
 * Login form state
 */
export interface LoginFormState {
  email: string;
  password: string;
  loading: boolean;
  errors: FormErrors;
}