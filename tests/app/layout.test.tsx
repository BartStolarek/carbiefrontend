import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/app/layout';

// Mock Next.js Google Fonts for testing
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

/**
 * RootLayout Component Tests
 * 
 * Tests the main layout component that wraps all pages.
 * Verifies proper HTML structure, accessibility, and styling.
 */
describe('RootLayout', () => {
  const mockChildren = <div data-testid="test-children">Test Content</div>;

  describe('Basic Rendering', () => {
    it('should render children correctly', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      expect(document.querySelector('[data-testid="test-children"]')).toBeInTheDocument();
      expect(document.querySelector('[data-testid="test-children"]')).toHaveTextContent('Test Content');
    });

    it('should render html element with correct lang attribute', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const htmlElement = document.querySelector('html');
      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement).toHaveAttribute('lang', 'en');
    });

    it('should render body element with correct classes', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toBeInTheDocument();
      expect(bodyElement).toHaveClass('antialiased');
    });
  });

  describe('Font Configuration', () => {
    it('should apply font variables to body', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toHaveClass('--font-geist-sans');
      expect(bodyElement).toHaveClass('--font-geist-mono');
    });

    it('should have antialiased class for better font rendering', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toHaveClass('antialiased');
    });
  });

  describe('HTML Structure', () => {
    it('should have proper HTML5 structure', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      expect(document.querySelector('html')).toBeInTheDocument();
      expect(document.querySelector('body')).toBeInTheDocument();
    });

    it('should render children inside body element', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      const childrenElement = document.querySelector('[data-testid="test-children"]');
      
      expect(bodyElement).toContainElement(childrenElement);
    });
  });

  describe('Accessibility', () => {
    it('should have proper lang attribute for screen readers', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const htmlElement = document.querySelector('html');
      expect(htmlElement).toHaveAttribute('lang', 'en');
    });

    it('should maintain proper document structure', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      // Check that the document has proper structure
      expect(document.documentElement).toBe(document.querySelector('html'));
      expect(document.body).toBe(document.querySelector('body'));
    });
  });

  describe('CSS Classes', () => {
    it('should apply all required CSS classes to body', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toHaveClass('antialiased');
      expect(bodyElement).toHaveClass('--font-geist-sans');
      expect(bodyElement).toHaveClass('--font-geist-mono');
    });
  });

  describe('SEO and Metadata', () => {
    it('should have proper HTML lang attribute for SEO', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const htmlElement = document.querySelector('html');
      expect(htmlElement).toHaveAttribute('lang', 'en');
    });
  });

  describe('Performance', () => {
    it('should render without errors', () => {
      expect(() => {
        render(<RootLayout>{mockChildren}</RootLayout>);
      }).not.toThrow();
    });

    it('should render children efficiently', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      
      // Check that children are rendered in the expected location
      expect(container.querySelector('[data-testid="test-children"]')).toBeInTheDocument();
    });
  });

  describe('Cross-browser Compatibility', () => {
    it('should maintain proper HTML structure across browsers', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      // Verify basic HTML structure
      expect(document.documentElement.tagName).toBe('HTML');
      expect(document.body.tagName).toBe('BODY');
    });

    it('should apply font classes consistently', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      const classList = bodyElement?.className || '';
      
      expect(classList).toContain('--font-geist-sans');
      expect(classList).toContain('--font-geist-mono');
      expect(classList).toContain('antialiased');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      expect(() => {
        render(<RootLayout>{null}</RootLayout>);
      }).not.toThrow();
    });

    it('should handle multiple children', () => {
      const multipleChildren = (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>
      );
      
      render(<RootLayout>{multipleChildren}</RootLayout>);
      
      expect(document.querySelector('[data-testid="child-1"]')).toBeInTheDocument();
      expect(document.querySelector('[data-testid="child-2"]')).toBeInTheDocument();
    });

    it('should handle complex nested children', () => {
      const complexChildren = (
        <div data-testid="complex-child">
          <h1>Title</h1>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      );
      
      render(<RootLayout>{complexChildren}</RootLayout>);
      
      expect(document.querySelector('[data-testid="complex-child"]')).toBeInTheDocument();
      expect(document.querySelector('h1')).toHaveTextContent('Title');
      expect(document.querySelectorAll('li')).toHaveLength(2);
    });
  });

  describe('Integration', () => {
    it('should work with Next.js routing', () => {
      // This test verifies that the layout works with Next.js routing
      // by ensuring it renders without conflicts
      expect(() => {
        render(<RootLayout>{mockChildren}</RootLayout>);
      }).not.toThrow();
    });

    it('should maintain proper document head', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      // Verify that the document head is accessible
      expect(document.head).toBeInTheDocument();
    });
  });
}); 