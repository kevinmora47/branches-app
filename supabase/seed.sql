-- Simple seed file for login-only functionality
-- No sample data needed for basic authentication

-- This file is kept minimal as we only need user authentication
-- Users will be created through the authentication system
-- The handle_new_user() trigger will automatically create user records

-- Optional: Create a sample admin user function (to be called manually if needed)
CREATE OR REPLACE FUNCTION create_sample_admin(admin_email TEXT, admin_password TEXT)
RETURNS TEXT AS $$
BEGIN
    -- This function can be used to create an admin user manually
    -- It should be called from the Supabase dashboard or CLI
    RETURN 'Use Supabase Auth to create users. Set role to admin in users table after creation.';
END;
$$ LANGUAGE plpgsql;

-- Note: To create an admin user:
-- 1. Sign up through the application
-- 2. Update the user's role in the database: UPDATE public.users SET role = 'admin' WHERE email = 'admin@example.com';