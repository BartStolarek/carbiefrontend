import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: async () => data,
      status: options?.status || 200,
    })),
  },
}));

// Mock nodemailer for testing email functionality
jest.mock('nodemailer');

const mockNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

// Import the route handlers
const { POST, GET, PUT, DELETE } = require('../../../src/app/api/contact/route');

/**
 * Contact API Route Tests
 * 
 * Tests the contact form API endpoint functionality including:
 * - Input validation and error handling
 * - Email sending with nodemailer
 * - HTTP method handling
 * - Error scenarios and edge cases
 */
describe('Contact API Route', () => {
  let mockTransporter: any;
  let mockVerify: jest.Mock;
  let mockSendMail: jest.Mock;

  // Helper function to create test requests
  const createRequest = (body: any): Request => {
    return new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock transporter for email testing
    mockVerify = jest.fn();
    mockSendMail = jest.fn();
    
    mockTransporter = {
      verify: mockVerify,
      sendMail: mockSendMail,
    };
    
    mockNodemailer.createTransport.mockReturnValue(mockTransporter);
  });

  describe('POST /api/contact', () => {
    describe('Input Validation', () => {
      it('should return 400 when name is missing', async () => {
        const request = createRequest({
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('All fields are required');
      });

      it('should return 400 when email is missing', async () => {
        const request = createRequest({
          name: 'Test User',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('All fields are required');
      });

      it('should return 400 when message is missing', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('All fields are required');
      });

      it('should return 400 when all fields are missing', async () => {
        const request = createRequest({});

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('All fields are required');
      });

      it('should return 400 when name is empty string', async () => {
        const request = createRequest({
          name: '',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('All fields are required');
      });

      it('should return 400 when email is empty string', async () => {
        const request = createRequest({
          name: 'Test User',
          email: '',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('All fields are required');
      });

      it('should return 400 when message is empty string', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: '',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('All fields are required');
      });
    });

    describe('Email Validation', () => {
      it('should return 400 for invalid email format', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'invalid-email',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('Invalid email format');
      });

      it('should return 400 for email without domain', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'test@',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('Invalid email format');
      });

      it('should return 400 for email without @ symbol', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'testexample.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('Invalid email format');
      });

      it('should accept valid email formats', async () => {
        mockVerify.mockResolvedValue(undefined);
        mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe('Email sent successfully');
      });
    });

    describe('Email Sending', () => {
      it('should send email with correct data', async () => {
        mockVerify.mockResolvedValue(undefined);
        mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

        const request = createRequest({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message.',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe('Email sent successfully');
        expect(data.messageId).toBe('test-message-id');

        // Verify email was sent with correct parameters
        expect(mockSendMail).toHaveBeenCalledWith({
          from: '"Carbie Contact Form" <test@example.com>',
          to: 'test@example.com',
          subject: 'Contact Form: John Doe',
          text: expect.stringContaining('John Doe'),
          html: expect.stringContaining('John Doe'),
          replyTo: 'john@example.com',
        });
      });

      it('should handle email verification failure', async () => {
        mockVerify.mockRejectedValue({ code: 'EAUTH', message: 'Authentication failed' });

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Authentication failed');
        expect(data.hint).toBe('Check if you need an app-specific password for your email provider');
      });

      it('should handle email sending failure', async () => {
        mockVerify.mockResolvedValue(undefined);
        mockSendMail.mockRejectedValue(new Error('Connection failed'));

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Connection failed');
      });
    });

    describe('Error Handling', () => {
      it('should handle network errors', async () => {
        mockVerify.mockRejectedValue(new Error('Network error'));

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Network error');
      });

      it('should handle timeout errors', async () => {
        mockVerify.mockRejectedValue({ code: 'ETIMEDOUT', message: 'Connection timed out' });

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Connection timed out');
        expect(data.hint).toBe('Check network connectivity and firewall settings');
      });

      it('should handle authentication errors', async () => {
        mockVerify.mockRejectedValue({ code: 'EAUTH', message: 'Invalid credentials' });

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Authentication failed');
        expect(data.hint).toBe('Check if you need an app-specific password for your email provider');
      });
    });
  });

  describe('Unsupported HTTP Methods', () => {
    it('should return 405 for GET requests', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'GET',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.message).toBe('Method not allowed');
    });

    it('should return 405 for PUT requests', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'PUT',
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.message).toBe('Method not allowed');
    });

    it('should return 405 for DELETE requests', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'DELETE',
      });

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.message).toBe('Method not allowed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in form data', async () => {
      mockVerify.mockResolvedValue(undefined);
      mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

      const request = createRequest({
        name: 'José García <script>',
        email: 'test@example.com',
        message: 'Message with "quotes" and <tags>',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Email sent successfully');
    });

    it('should handle very long messages', async () => {
      mockVerify.mockResolvedValue(undefined);
      mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

      const longMessage = 'A'.repeat(10000);
      const request = createRequest({
        name: 'Test User',
        email: 'test@example.com',
        message: longMessage,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Email sent successfully');
    });

    it('should handle unicode characters', async () => {
      mockVerify.mockResolvedValue(undefined);
      mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

      const request = createRequest({
        name: 'José García',
        email: 'test@example.com',
        message: 'Hola señor, ¿cómo está?',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Email sent successfully');
    });
  });
}); 