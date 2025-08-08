import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '@/components/ContactForm';

// Mock fetch API for testing HTTP requests
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

/**
 * ContactForm Component Tests
 * 
 * Tests the contact form component functionality including:
 * - Form rendering and initial state
 * - User input handling
 * - Form submission and API calls
 * - Success and error states
 * - Accessibility features
 */
describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  describe('Initial Render', () => {
    it('should render all form fields', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should have empty initial values', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });

    it('should have required attributes on all fields', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('required');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('required');
      expect(screen.getByLabelText(/message/i)).toHaveAttribute('required');
    });

    it('should have correct input types', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    });

    it('should have correct placeholder text', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('placeholder', 'Your full name');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('placeholder', 'your.email@example.com');
      expect(screen.getByLabelText(/message/i)).toHaveAttribute('placeholder', 'How can we help you?');
    });
  });

  describe('Form Input Handling', () => {
    it('should update name field when typing', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      expect(nameInput).toHaveValue('John Doe');
    });

    it('should update email field when typing', () => {
      render(<ContactForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      expect(emailInput).toHaveValue('john@example.com');
    });

    it('should update message field when typing', () => {
      render(<ContactForm />);
      
      const messageInput = screen.getByLabelText(/message/i);
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      
      expect(messageInput).toHaveValue('Hello world');
    });

    it('should handle special characters in input', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: 'José García <script>' } });
      
      expect(nameInput).toHaveValue('José García <script>');
    });

    it('should handle very long input', () => {
      render(<ContactForm />);
      
      const messageInput = screen.getByLabelText(/message/i);
      const longMessage = 'A'.repeat(1000);
      fireEvent.change(messageInput, { target: { value: longMessage } });
      
      expect(messageInput).toHaveValue(longMessage);
    });
  });

  describe('Form Submission', () => {
    it('should submit form with correct data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Email sent successfully' }),
      } as Response);

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Test message',
          }),
        });
      });
    });

    it('should show loading state during submission', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      // Check for loading state
      expect(screen.getByText('Sending...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should disable submit button during submission', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitButton);
      
      // Button should be disabled
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Success State', () => {
    it('should show success message after successful submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Email sent successfully' }),
      } as Response);

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
        expect(screen.getByText("We'll get back to you as soon as possible.")).toBeInTheDocument();
      });
    });

    it('should clear form after successful submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Email sent successfully' }),
      } as Response);

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for form to be cleared
      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).toHaveValue('');
        expect(screen.getByLabelText(/email/i)).toHaveValue('');
        expect(screen.getByLabelText(/message/i)).toHaveValue('');
      });
    });
  });

  describe('Error State', () => {
    it('should show error message on network failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText('Failed to send message')).toBeInTheDocument();
        expect(screen.getByText('Please try again or contact us directly.')).toBeInTheDocument();
      });
    });

    it('should show error message on server error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText('Failed to send message')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for all form fields', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('should have proper button role and text', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Send Message');
    });

    it('should have proper form structure', () => {
      render(<ContactForm />);
      
      const form = screen.getByRole('button', { name: /send message/i }).closest('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('User Experience', () => {
    it('should prevent form submission when fields are empty', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Try to submit without filling fields
      fireEvent.click(submitButton);
      
      // Should not make API call
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle form reset after submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Email sent successfully' }),
      } as Response);

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for form to be cleared
      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).toHaveValue('');
        expect(screen.getByLabelText(/email/i)).toHaveValue('');
        expect(screen.getByLabelText(/message/i)).toHaveValue('');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid form submissions', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<ContactForm />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Try to submit multiple times rapidly
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      
      // Should only make one API call
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle empty string inputs', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: '' } });
      
      expect(nameInput).toHaveValue('');
    });
  });
}); 