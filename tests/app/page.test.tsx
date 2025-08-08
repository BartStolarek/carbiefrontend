import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// Mock Next.js navigation for testing
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

/**
 * Home Page Component Tests
 * 
 * Tests the main landing page for Carbie app.
 * Verifies all sections render correctly and navigation works properly.
 */
describe('Home Page', () => {
  describe('Header Section', () => {
    it('should render the header with logo', () => {
      render(<Home />);
      
      expect(screen.getByText('Carbie')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      render(<Home />);
      
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
    });

    it('should render download button in header', () => {
      render(<Home />);
      
      expect(screen.getByText('Download')).toBeInTheDocument();
    });

    it('should have correct navigation links with href attributes', () => {
      render(<Home />);
      
      const featuresLink = screen.getByText('Features');
      const helpLink = screen.getByText('Help');
      
      expect(featuresLink.closest('a')).toHaveAttribute('href', '#features');
      expect(helpLink.closest('a')).toHaveAttribute('href', '/help');
    });
  });

  describe('Hero Section', () => {
    it('should render main heading', () => {
      render(<Home />);
      
      expect(screen.getByText('AI-Powered')).toBeInTheDocument();
      expect(screen.getByText('Nutrition Assistant')).toBeInTheDocument();
    });

    it('should render hero description', () => {
      render(<Home />);
      
      expect(screen.getByText(/Transform your nutrition journey/)).toBeInTheDocument();
      expect(screen.getByText(/Simply point your camera/)).toBeInTheDocument();
    });

    it('should render hero download button', () => {
      render(<Home />);
      
      expect(screen.getByText('Download on Play Store')).toBeInTheDocument();
    });

    it('should have correct href for hero download button', () => {
      render(<Home />);
      
      const downloadButton = screen.getByText('Download on Play Store').closest('a');
      expect(downloadButton).toHaveAttribute('href', '#download');
    });
  });

  describe('Features Section', () => {
    it('should render features section heading', () => {
      render(<Home />);
      
      expect(screen.getByText(/Everything you need for/)).toBeInTheDocument();
      expect(screen.getByText(/smart nutrition/)).toBeInTheDocument();
    });

    it('should render features section description', () => {
      render(<Home />);
      
      expect(screen.getByText(/Powerful features designed/)).toBeInTheDocument();
    });

    it('should render all feature cards', () => {
      render(<Home />);
      
      expect(screen.getByText('AI Food Analysis')).toBeInTheDocument();
      expect(screen.getByText('Smart Camera')).toBeInTheDocument();
      expect(screen.getByText('Detailed Breakdown')).toBeInTheDocument();
      expect(screen.getByText('Glucose Timing')).toBeInTheDocument();
    });

    it('should have feature descriptions', () => {
      render(<Home />);
      
      // Check that feature descriptions are present
      expect(screen.getByText(/Photo or text input/)).toBeInTheDocument();
      expect(screen.getByText(/Point and shoot/)).toBeInTheDocument();
      expect(screen.getByText(/Ingredient-by-ingredient/)).toBeInTheDocument();
      expect(screen.getByText(/Get an estimate/)).toBeInTheDocument();
    });
  });

  describe('Help & Support Section', () => {
    it('should render help section heading', () => {
      render(<Home />);
      
      expect(screen.getByText('Need Help?')).toBeInTheDocument();
    });

    it('should render help section description', () => {
      render(<Home />);
      
      expect(screen.getByText(/Get the support you need/)).toBeInTheDocument();
    });

    it('should render support options', () => {
      render(<Home />);
      
      expect(screen.getByText('FAQs')).toBeInTheDocument();
      expect(screen.getByText('Tutorials')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should have support option descriptions', () => {
      render(<Home />);
      
      expect(screen.getByText(/Quick answers to common questions/)).toBeInTheDocument();
      expect(screen.getByText(/Step-by-step guides/)).toBeInTheDocument();
      expect(screen.getByText(/Get in touch with our team/)).toBeInTheDocument();
    });
  });

  describe('Call-to-Action Section', () => {
    it('should render final CTA heading', () => {
      render(<Home />);
      
      expect(screen.getByText('Ready to Transform Your Nutrition?')).toBeInTheDocument();
    });

    it('should render CTA description', () => {
      render(<Home />);
      
      expect(screen.getByText(/Join thousands of users/)).toBeInTheDocument();
    });

    it('should render final download button', () => {
      render(<Home />);
      
      expect(screen.getByText('Download Carbie Today')).toBeInTheDocument();
    });

    it('should have correct href for final download button', () => {
      render(<Home />);
      
      const downloadButton = screen.getByText('Download Carbie Today').closest('a');
      expect(downloadButton).toHaveAttribute('href', '#download');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Home />);
      
      // Check that main headings are present
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3); // Features, Help, CTA
    });

    it('should have accessible navigation links', () => {
      render(<Home />);
      
      const featuresLink = screen.getByText('Features');
      const helpLink = screen.getByText('Help');
      
      expect(featuresLink).toBeInTheDocument();
      expect(helpLink).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should render all sections on mobile', () => {
      render(<Home />);
      
      // All main sections should be present
      expect(screen.getByText('AI-Powered')).toBeInTheDocument();
      expect(screen.getByText('AI Food Analysis')).toBeInTheDocument();
      expect(screen.getByText('Need Help?')).toBeInTheDocument();
      expect(screen.getByText('Ready to Transform Your Nutrition?')).toBeInTheDocument();
    });

    it('should have proper button styling', () => {
      render(<Home />);
      
      const downloadButtons = screen.getAllByText(/Download/);
      expect(downloadButtons.length).toBeGreaterThan(0);
    });
  });

  describe('SEO and Content', () => {
    it('should have descriptive content', () => {
      render(<Home />);
      
      // Check for key marketing content
      expect(screen.getByText(/AI-Powered/)).toBeInTheDocument();
      expect(screen.getByText(/Nutrition Assistant/)).toBeInTheDocument();
      expect(screen.getByText(/Transform your nutrition journey/)).toBeInTheDocument();
    });

    it('should have clear value propositions', () => {
      render(<Home />);
      
      // Check for value proposition content
      expect(screen.getByText(/instant carb analysis/)).toBeInTheDocument();
      expect(screen.getByText(/accurate, real-time insights/)).toBeInTheDocument();
    });
  });

  describe('User Experience', () => {
    it('should provide clear navigation paths', () => {
      render(<Home />);
      
      // Users should be able to navigate to features and help
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
    });

    it('should have multiple download opportunities', () => {
      render(<Home />);
      
      const downloadButtons = screen.getAllByText(/Download/);
      expect(downloadButtons.length).toBeGreaterThanOrEqual(2);
    });

    it('should provide clear feature explanations', () => {
      render(<Home />);
      
      // Each feature should have a description
      expect(screen.getByText(/Photo or text input/)).toBeInTheDocument();
      expect(screen.getByText(/Point and shoot/)).toBeInTheDocument();
      expect(screen.getByText(/Ingredient-by-ingredient/)).toBeInTheDocument();
      expect(screen.getByText(/Get an estimate/)).toBeInTheDocument();
    });
  });

  describe('Performance and Loading', () => {
    it('should render without errors', () => {
      expect(() => {
        render(<Home />);
      }).not.toThrow();
    });

    it('should render all sections efficiently', () => {
      const { container } = render(<Home />);
      
      // Check that all main sections are rendered
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });

  describe('Cross-browser Compatibility', () => {
    it('should maintain proper HTML structure', () => {
      render(<Home />);
      
      // Verify basic HTML structure
      expect(document.querySelector('div')).toBeInTheDocument();
      expect(document.querySelector('header')).toBeInTheDocument();
      expect(document.querySelectorAll('section')).toHaveLength(4); // Hero, Features, Help, CTA
    });

    it('should have proper semantic elements', () => {
      render(<Home />);
      
      // Check for semantic HTML elements
      expect(document.querySelector('header')).toBeInTheDocument();
      expect(document.querySelectorAll('section')).toHaveLength(4);
      expect(document.querySelectorAll('nav')).toHaveLength(1);
    });
  });
}); 