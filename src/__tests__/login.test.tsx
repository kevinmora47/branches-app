import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../app/page'

// Mock useRouter
const mockPush = jest.fn()
const mockReplace = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}))

// Mock AuthContext
const mockSignIn = jest.fn()
const mockSignOut = jest.fn()

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    profile: null,
    session: null,
    loading: false,
    signIn: mockSignIn,
    signOut: mockSignOut,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock the signIn to return an error for testing
mockSignIn.mockResolvedValue({ error: null })

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSignIn.mockClear()
    mockSignOut.mockClear()
  })

  it('renders login form elements', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('validates form inputs correctly', async () => {
    const user = userEvent.setup()
    render(<LoginPage />, { wrapper: TestWrapper })

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Test that inputs accept user input
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
    expect(submitButton).toBeEnabled()
  })

  it('calls signIn with correct credentials on valid form submission', async () => {
    const user = userEvent.setup()
    
    // Mock successful sign in
    mockSignIn.mockResolvedValue({ error: null })

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  it('displays error message on failed login', async () => {
    const user = userEvent.setup()
    
    // Mock failed sign in
    mockSignIn.mockResolvedValue({ error: 'Invalid login credentials' })

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid login credentials/i)).toBeInTheDocument()
    })
  })

  it('disables submit button during loading', async () => {
    const user = userEvent.setup()
    
    // Mock slow sign in
    mockSignIn.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ error: null }), 1000))
    )

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    // Button should be disabled during loading
    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/signing in/i)).toBeInTheDocument()
  })
})