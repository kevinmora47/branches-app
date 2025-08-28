import { FormErrors } from '../types/auth';

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
}

/**
 * Validate password
 * @param password - Password to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  return undefined;
}

/**
 * Validate login form data
 * @param email - Email address
 * @param password - Password
 * @returns Object containing validation errors
 */
export function validateLoginForm(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }
  
  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  return errors;
}

/**
 * Check if form has any validation errors
 * @param errors - Form errors object
 * @returns True if there are errors, false otherwise
 */
export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Get the first error message from form errors
 * @param errors - Form errors object
 * @returns First error message or undefined
 */
export function getFirstError(errors: FormErrors): string | undefined {
  const errorKeys = Object.keys(errors) as (keyof FormErrors)[];
  if (errorKeys.length === 0) return undefined;
  
  return errors[errorKeys[0]];
}