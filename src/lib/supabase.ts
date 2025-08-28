import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo_anon_key'

// For development/demo purposes, create a mock client if using demo values
if (supabaseUrl === 'https://demo.supabase.co' || supabaseAnonKey === 'demo_anon_key') {
  console.warn('Using demo Supabase configuration. Please set up proper environment variables for production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'user' | 'manager'
          phone: string | null
          address: string | null
          date_of_birth: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'user' | 'manager'
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'user' | 'manager'
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          created_at?: string
          updated_at?: string
        }
      }

    }
  }
}