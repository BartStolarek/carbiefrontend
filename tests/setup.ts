import '@testing-library/jest-dom';

/**
 * Test Setup Configuration
 * 
 * This file configures the testing environment with necessary mocks
 * and environment variables for consistent test execution.
 */

// Mock environment variables for testing
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_USER = 'test@example.com';
process.env.SMTP_PASS = 'testpassword';
process.env.SMTP_FROM = 'test@example.com';
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// Mock fetch API for testing HTTP requests
global.fetch = jest.fn();

// Mock Next.js navigation components
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Next.js Google Fonts
jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
    style: { fontFamily: 'var(--font-geist-sans)' },
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
    style: { fontFamily: 'var(--font-geist-mono)' },
  }),
}));

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: async () => data,
      status: options?.status || 200,
    })),
  },
}));

// Ensure Request and Response are available in the test environment
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(url: string, options?: any) {
      this.url = url;
      this.method = options?.method || 'GET';
      this.body = options?.body;
      this.headers = new Headers(options?.headers);
    }
    
    url: string;
    method: string;
    body: any;
    headers: Headers;
    
    async json() {
      if (typeof this.body === 'string') {
        return JSON.parse(this.body);
      }
      return this.body;
    }
  } as any;
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body?: any, options?: any) {
      this.body = body;
      this.status = options?.status || 200;
      this.headers = new Headers(options?.headers);
    }
    
    body: any;
    status: number;
    headers: Headers;
    
    async json() {
      if (typeof this.body === 'string') {
        return JSON.parse(this.body);
      }
      return this.body;
    }
  } as any;
} 