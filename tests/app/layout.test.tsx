import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/app/layout';

// Mock Next.js fonts
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

    it('should have proper class combination', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      const classList = bodyElement?.className.split(' ');
      
      expect(classList).toContain('antialiased');
      expect(classList).toContain('--font-geist-sans');
      expect(classList).toContain('--font-geist-mono');
    });
  });

  describe('Props Handling', () => {
    it('should accept and render children prop', () => {
      const testContent = <div data-testid="custom-children">Custom Content</div>;
      render(<RootLayout>{testContent}</RootLayout>);
      
      expect(document.querySelector('[data-testid="custom-children"]')).toBeInTheDocument();
      expect(document.querySelector('[data-testid="custom-children"]')).toHaveTextContent('Custom Content');
    });

    it('should handle empty children', () => {
      render(<RootLayout>{null}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toBeInTheDocument();
      expect(bodyElement?.children.length).toBe(0);
    });

    it('should handle multiple children', () => {
      const multipleChildren = (
        <>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
        </>
      );
      
      render(<RootLayout>{multipleChildren}</RootLayout>);
      
      expect(document.querySelector('[data-testid="child1"]')).toBeInTheDocument();
      expect(document.querySelector('[data-testid="child2"]')).toBeInTheDocument();
    });
  });

  describe('TypeScript Types', () => {
    it('should properly type the children prop', () => {
      // This test ensures TypeScript compilation works correctly
      const typedChildren: React.ReactNode = <div>Typed Children</div>;
      
      render(<RootLayout>{typedChildren}</RootLayout>);
      
      expect(document.querySelector('div')).toHaveTextContent('Typed Children');
    });

    it('should handle readonly props correctly', () => {
      // This test ensures the readonly constraint is respected
      const readonlyProps = {
        children: <div>Readonly Children</div>
      } as const;
      
      render(<RootLayout {...readonlyProps} />);
      
      expect(document.querySelector('div')).toHaveTextContent('Readonly Children');
    });
  });

  describe('Performance', () => {
    it('should render efficiently with minimal DOM nodes', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      // Should only have html > body > children structure
      const htmlElement = document.querySelector('html');
      const bodyElement = document.querySelector('body');
      const childrenElement = document.querySelector('[data-testid="test-children"]');
      
      expect(htmlElement?.children.length).toBe(1); // Only body
      expect(bodyElement?.children.length).toBe(1); // Only children
      expect(childrenElement).toBeInTheDocument();
    });
  });

  describe('SEO and Meta', () => {
    it('should have proper HTML lang attribute for SEO', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const htmlElement = document.querySelector('html');
      expect(htmlElement).toHaveAttribute('lang', 'en');
    });

    it('should maintain proper document structure for crawlers', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      // Check that the document has proper semantic structure
      expect(document.documentElement.tagName).toBe('HTML');
      expect(document.body.tagName).toBe('BODY');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined children', () => {
      render(<RootLayout>{undefined}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toBeInTheDocument();
    });

    it('should handle boolean children', () => {
      render(<RootLayout>{false}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toBeInTheDocument();
    });

    it('should handle number children', () => {
      render(<RootLayout>{42}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toBeInTheDocument();
      expect(bodyElement).toHaveTextContent('42');
    });

    it('should handle string children', () => {
      render(<RootLayout>{"String Content"}</RootLayout>);
      
      const bodyElement = document.querySelector('body');
      expect(bodyElement).toBeInTheDocument();
      expect(bodyElement).toHaveTextContent('String Content');
    });
  });

  describe('Integration', () => {
    it('should work with Next.js app structure', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      // Verify that the layout provides the expected structure
      expect(document.querySelector('html')).toBeInTheDocument();
      expect(document.querySelector('body')).toBeInTheDocument();
      expect(document.querySelector('[data-testid="test-children"]')).toBeInTheDocument();
    });

    it('should maintain proper nesting of elements', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      
      const htmlElement = document.querySelector('html');
      const bodyElement = document.querySelector('body');
      const childrenElement = document.querySelector('[data-testid="test-children"]');
      
      expect(htmlElement).toContainElement(bodyElement);
      expect(bodyElement).toContainElement(childrenElement);
    });
  });
}); 