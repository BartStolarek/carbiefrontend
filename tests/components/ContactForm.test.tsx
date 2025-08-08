import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '@/components/ContactForm';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

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

    it('should handle unicode characters', () => {
      render(<ContactForm />);
      
      const messageInput = screen.getByLabelText(/message/i);
      fireEvent.change(messageInput, { target: { value: 'Hola señor, ¿cómo está?' } });
      
      expect(messageInput).toHaveValue('Hola señor, ¿cómo está?');
    });
  });

  describe('Form Submission - Success', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Email sent successfully' }),
      } as Response);
    });

    it('should submit form with correct data', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello world',
          }),
        });
      });
    });

    it('should show loading state during submission', async () => {
      // Mock a delayed response
      mockFetch.mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ message: 'Email sent successfully' }),
          } as Response), 100)
        )
      );

      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      // Check loading state
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('should show success message after successful submission', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
        expect(screen.getByText(/we'll get back to you as soon as possible/i)).toBeInTheDocument();
      });
    });

    it('should clear form fields after successful submission', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(messageInput).toHaveValue('');
      });
    });

    it('should re-enable submit button after successful submission', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
        expect(screen.getByText(/send message/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission - Error', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Validation error' }),
      } as Response);
    });

    it('should show error message when API returns error', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
        expect(screen.getByText(/please try again or contact us directly/i)).toBeInTheDocument();
      });
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
      });
    });

    it('should re-enable submit button after error', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
        expect(screen.getByText(/send message/i)).toBeInTheDocument();
      });
    });

    it('should preserve form data after error', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(nameInput).toHaveValue('John Doe');
        expect(emailInput).toHaveValue('john@example.com');
        expect(messageInput).toHaveValue('Hello world');
      });
    });
  });

  describe('Form Validation', () => {
    it('should prevent submission with empty fields', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitButton);

      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should prevent submission with partial data', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.click(submitButton);

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('UI States', () => {
    it('should show loading spinner during submission', async () => {
      mockFetch.mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ message: 'Email sent successfully' }),
          } as Response), 100)
        )
      );

      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
    });

    it('should show success icon in success message', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const successIcon = screen.getByText(/message sent successfully/i).closest('div')?.querySelector('svg');
        expect(successIcon).toBeInTheDocument();
      });
    });

    it('should show error icon in error message', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Validation error' }),
      } as Response);

      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const errorIcon = screen.getByText(/failed to send message/i).closest('div')?.querySelector('svg');
        expect(errorIcon).toBeInTheDocument();
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

    it('should have proper button text', () => {
      render(<ContactForm />);
      
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should disable button during submission', async () => {
      mockFetch.mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ message: 'Email sent successfully' }),
          } as Response), 100)
        )
      );

      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      fireEvent.click(submitButton);

      expect(submitButton).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid form submissions', async () => {
      mockFetch.mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ message: 'Email sent successfully' }),
          } as Response), 100)
        )
      );

      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
      
      // Click multiple times rapidly
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      // Should only make one API call
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle very large message content', async () => {
      render(<ContactForm />);
      
      const messageInput = screen.getByLabelText(/message/i);
      const largeMessage = 'A'.repeat(10000);
      fireEvent.change(messageInput, { target: { value: largeMessage } });
      
      expect(messageInput).toHaveValue(largeMessage);
    });

    it('should handle form submission with minimal data', async () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'A' } });
      fireEvent.change(emailInput, { target: { value: 'a@b.c' } });
      fireEvent.change(messageInput, { target: { value: 'M' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'A',
            email: 'a@b.c',
            message: 'M',
          }),
        });
      });
    });
  });
}); 