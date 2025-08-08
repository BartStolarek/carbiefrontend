import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Mock nodemailer
jest.mock('nodemailer');

const mockNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

// Import the route handlers
const { POST, GET, PUT, DELETE } = require('../../../../src/app/api/contact/route');

describe('Contact API Route', () => {
  let mockTransporter: any;
  let mockVerify: jest.Mock;
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup mock transporter
    mockVerify = jest.fn();
    mockSendMail = jest.fn();
    
    mockTransporter = {
      verify: mockVerify,
      sendMail: mockSendMail,
    };
    
    mockNodemailer.createTransport.mockReturnValue(mockTransporter);
  });

  describe('POST /api/contact', () => {
    const createRequest = (body: any): NextRequest => {
      return new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    };

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

      it('should return 400 when email format is invalid', async () => {
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

      it('should return 400 when email has no domain', async () => {
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

      it('should return 400 when email has no @ symbol', async () => {
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

      it('should return 400 when email has spaces', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'test @example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('Invalid email format');
      });

      it('should return 400 when email has multiple @ symbols', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'test@example@domain.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.message).toBe('Invalid email format');
      });
    });

    describe('SMTP Configuration', () => {
      it('should create transporter with correct configuration for port 587', () => {
        process.env.SMTP_PORT = '587';
        
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        POST(request);

        expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
          host: 'smtp.test.com',
          port: 587,
          secure: false,
          auth: {
            user: 'test@example.com',
            pass: 'testpassword',
          },
          tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2',
            ciphers: 'SSLv3'
          },
          connectionTimeout: 30000,
          greetingTimeout: 30000,
          socketTimeout: 30000,
          debug: false,
          logger: false,
        });
      });

      it('should create transporter with correct configuration for port 465', () => {
        process.env.SMTP_PORT = '465';
        
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        POST(request);

        expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
          host: 'smtp.test.com',
          port: 465,
          secure: true,
          auth: {
            user: 'test@example.com',
            pass: 'testpassword',
          },
          tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2',
            ciphers: 'SSLv3'
          },
          connectionTimeout: 30000,
          greetingTimeout: 30000,
          socketTimeout: 30000,
          debug: false,
          logger: false,
        });
      });

      it('should use default port when SMTP_PORT is not set', () => {
        delete process.env.SMTP_PORT;
        
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        POST(request);

        expect(mockNodemailer.createTransport).toHaveBeenCalledWith(
          expect.objectContaining({
            port: 587,
          })
        );
      });

      it('should use default host when SMTP_HOST is not set', () => {
        delete process.env.SMTP_HOST;
        
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        POST(request);

        expect(mockNodemailer.createTransport).toHaveBeenCalledWith(
          expect.objectContaining({
            host: 'smtp.zoho.com.au',
          })
        );
      });
    });

    describe('SMTP Verification', () => {
      it('should return 500 when SMTP verification fails with Invalid login', async () => {
        mockVerify.mockRejectedValue(new Error('Invalid login'));

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Email authentication failed. Please check if app-specific password is configured in Zoho.');
        expect(data.hint).toBe('You may need to generate an app-specific password in Zoho Mail settings');
      });

      it('should throw error when SMTP verification fails with other errors', async () => {
        const verifyError = new Error('Connection timeout');
        mockVerify.mockRejectedValue(verifyError);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        await expect(POST(request)).rejects.toThrow('Connection timeout');
      });

      it('should proceed when SMTP verification succeeds', async () => {
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
        expect(data.messageId).toBe('test-message-id');
      });
    });

    describe('Email Sending', () => {
      beforeEach(() => {
        mockVerify.mockResolvedValue(undefined);
      });

      it('should send email with correct parameters', async () => {
        mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message content',
        });

        await POST(request);

        expect(mockSendMail).toHaveBeenCalledWith({
          from: '"Carbie Contact Form" <test@example.com>',
          to: 'test@example.com',
          subject: 'Contact Form: Test User',
          text: expect.stringContaining('Name: Test User'),
          html: expect.stringContaining('Test User'),
          replyTo: 'test@example.com',
        });
      });

      it('should handle special characters in name and message', async () => {
        mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

        const request = createRequest({
          name: 'Test User <script>alert("xss")</script>',
          email: 'test@example.com',
          message: 'Message with "quotes" and <html> tags',
        });

        await POST(request);

        expect(mockSendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            subject: 'Contact Form: Test User <script>alert("xss")</script>',
            text: expect.stringContaining('Test User <script>alert("xss")</script>'),
            html: expect.stringContaining('Test User &lt;script&gt;alert("xss")&lt;/script&gt;'),
          })
        );
      });

      it('should handle long messages', async () => {
        mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

        const longMessage = 'A'.repeat(10000);
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: longMessage,
        });

        await POST(request);

        expect(mockSendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            text: expect.stringContaining(longMessage),
            html: expect.stringContaining(longMessage),
          })
        );
      });

      it('should handle unicode characters', async () => {
        mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

        const request = createRequest({
          name: 'José García',
          email: 'test@example.com',
          message: 'Hola señor, ¿cómo está?',
        });

        await POST(request);

        expect(mockSendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            subject: 'Contact Form: José García',
            text: expect.stringContaining('José García'),
            html: expect.stringContaining('José García'),
          })
        );
      });
    });

    describe('Error Handling', () => {
      beforeEach(() => {
        mockVerify.mockResolvedValue(undefined);
      });

      it('should handle EAUTH error code', async () => {
        const error = new Error('Authentication failed');
        (error as any).code = 'EAUTH';
        mockSendMail.mockRejectedValue(error);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Authentication failed');
        expect(data.hint).toBe('Check if you need an app-specific password for Zoho');
        expect(data.code).toBe('EAUTH');
      });

      it('should handle responseCode 535', async () => {
        const error = new Error('Authentication failed');
        (error as any).responseCode = 535;
        mockSendMail.mockRejectedValue(error);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Authentication failed');
        expect(data.hint).toBe('Check if you need an app-specific password for Zoho');
      });

      it('should handle ECONNECTION error code', async () => {
        const error = new Error('Connection failed');
        (error as any).code = 'ECONNECTION';
        mockSendMail.mockRejectedValue(error);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Connection failed');
        expect(data.hint).toBe('Check SMTP settings and firewall');
        expect(data.code).toBe('ECONNECTION');
      });

      it('should handle ETIMEDOUT error code', async () => {
        const error = new Error('Connection timed out');
        (error as any).code = 'ETIMEDOUT';
        mockSendMail.mockRejectedValue(error);

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
        expect(data.code).toBe('ETIMEDOUT');
      });

      it('should handle ESOCKET error code', async () => {
        const error = new Error('Socket error');
        (error as any).code = 'ESOCKET';
        mockSendMail.mockRejectedValue(error);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Socket error');
        expect(data.hint).toBe('Possible TLS/SSL configuration issue');
        expect(data.code).toBe('ESOCKET');
      });

      it('should handle generic error with message', async () => {
        const error = new Error('Generic error message');
        mockSendMail.mockRejectedValue(error);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Generic error message');
        expect(data.hint).toBe('');
        expect(data.error).toBeUndefined();
      });

      it('should include error details in development mode', async () => {
        const originalNodeEnv = process.env.NODE_ENV;
        Object.defineProperty(process.env, 'NODE_ENV', {
          value: 'development',
          writable: true
        });
        const error = new Error('Development error');
        mockSendMail.mockRejectedValue(error);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error).toBe('Development error');
      });

      it('should handle error without message property', async () => {
        const error = { code: 'UNKNOWN' };
        mockSendMail.mockRejectedValue(error);

        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Failed to send email');
        expect(data.hint).toBe('');
      });
    });

    describe('Success Scenarios', () => {
      beforeEach(() => {
        mockVerify.mockResolvedValue(undefined);
        mockSendMail.mockResolvedValue({ messageId: 'test-message-id-123' });
      });

      it('should return success response with messageId', async () => {
        const request = createRequest({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe('Email sent successfully');
        expect(data.messageId).toBe('test-message-id-123');
      });

      it('should handle request with minimal valid data', async () => {
        const request = createRequest({
          name: 'A',
          email: 'a@b.c',
          message: 'M',
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe('Email sent successfully');
      });
    });
  });

  describe('Unsupported HTTP Methods', () => {
    it('should return 405 for GET requests', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.message).toBe('Method not allowed');
    });

    it('should return 405 for PUT requests', async () => {
      const response = await PUT();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.message).toBe('Method not allowed');
    });

    it('should return 405 for DELETE requests', async () => {
      const response = await DELETE();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.message).toBe('Method not allowed');
    });
  });
}); 