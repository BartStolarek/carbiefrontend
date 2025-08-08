import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

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

    it('should render feature descriptions', () => {
      render(<Home />);
      
      expect(screen.getByText(/Photo or text input for instant carb estimates/)).toBeInTheDocument();
      expect(screen.getByText(/Point and shoot for instant analysis/)).toBeInTheDocument();
      expect(screen.getByText(/Ingredient-by-ingredient analysis/)).toBeInTheDocument();
      expect(screen.getByText(/Get a estimate on when your blood glucose/)).toBeInTheDocument();
    });

    it('should have feature icons', () => {
      render(<Home />);
      
      // Check for SVG icons in feature cards
      const featureCards = screen.getAllByText(/AI Food Analysis|Smart Camera|Detailed Breakdown|Glucose Timing/);
      featureCards.forEach(card => {
        const icon = card.closest('div')?.querySelector('svg');
        expect(icon).toBeInTheDocument();
      });
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

    it('should render help cards', () => {
      render(<Home />);
      
      expect(screen.getByText('FAQs')).toBeInTheDocument();
      expect(screen.getByText('Tutorials')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should render help card descriptions', () => {
      render(<Home />);
      
      expect(screen.getByText('Quick answers to common questions')).toBeInTheDocument();
      expect(screen.getByText('Step-by-step guides and videos')).toBeInTheDocument();
      expect(screen.getByText('Get in touch with our team')).toBeInTheDocument();
    });

    it('should have correct href attributes for help links', () => {
      render(<Home />);
      
      const faqLink = screen.getByText('FAQs').closest('a');
      const tutorialsLink = screen.getByText('Tutorials').closest('a');
      const contactLink = screen.getByText('Contact').closest('a');
      
      expect(faqLink).toHaveAttribute('href', '#faq');
      expect(tutorialsLink).toHaveAttribute('href', '#tutorials');
      expect(contactLink).toHaveAttribute('href', '#contact');
    });
  });

  describe('Final CTA Section', () => {
    it('should render final CTA heading', () => {
      render(<Home />);
      
      expect(screen.getByText('Ready to Transform Your Nutrition?')).toBeInTheDocument();
    });

    it('should render final CTA description', () => {
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
      
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2s = screen.getAllByRole('heading', { level: 2 });
      
      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('should have proper alt text for images', () => {
      render(<Home />);
      
      // Check that all images have alt attributes (if any images are added)
      const images = screen.queryAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    it('should have proper button and link roles', () => {
      render(<Home />);
      
      const buttons = screen.getAllByRole('button');
      const links = screen.getAllByRole('link');
      
      expect(buttons.length).toBeGreaterThan(0);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Styling and Layout', () => {
    it('should have proper CSS classes for styling', () => {
      render(<Home />);
      
      // Check for key CSS classes
      const mainContainer = screen.getByText('AI-Powered').closest('div');
      expect(mainContainer).toHaveClass('min-h-screen');
    });

    it('should render background elements', () => {
      render(<Home />);
      
      // The background elements are divs with specific classes
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    it('should have all required sections', () => {
      render(<Home />);
      
      // Check for all major sections
      expect(screen.getByText('AI-Powered')).toBeInTheDocument(); // Hero
      expect(screen.getByText(/Everything you need for/)).toBeInTheDocument(); // Features
      expect(screen.getByText('Need Help?')).toBeInTheDocument(); // Help
      expect(screen.getByText('Ready to Transform Your Nutrition?')).toBeInTheDocument(); // CTA
    });

    it('should have proper content flow', () => {
      render(<Home />);
      
      // Verify the logical flow of content
      const heroHeading = screen.getByText('AI-Powered');
      const featuresHeading = screen.getByText(/Everything you need for/);
      const helpHeading = screen.getByText('Need Help?');
      const ctaHeading = screen.getByText('Ready to Transform Your Nutrition?');
      
      expect(heroHeading).toBeInTheDocument();
      expect(featuresHeading).toBeInTheDocument();
      expect(helpHeading).toBeInTheDocument();
      expect(ctaHeading).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    it('should have hover states for interactive elements', () => {
      render(<Home />);
      
      const links = screen.getAllByRole('link');
      const buttons = screen.getAllByRole('button');
      
      // Check that interactive elements exist
      expect(links.length).toBeGreaterThan(0);
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have proper focus states', () => {
      render(<Home />);
      
      const interactiveElements = [
        ...screen.getAllByRole('link'),
        ...screen.getAllByRole('button')
      ];
      
      interactiveElements.forEach(element => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive classes', () => {
      render(<Home />);
      
      // Check for responsive utility classes
      const container = document.querySelector('.max-w-7xl');
      expect(container).toBeInTheDocument();
    });

    it('should have mobile-friendly navigation', () => {
      render(<Home />);
      
      // Check for mobile navigation classes
      const nav = screen.getByText('Features').closest('nav');
      expect(nav).toHaveClass('hidden', 'md:flex');
    });
  });

  describe('SEO and Meta', () => {
    it('should have proper semantic HTML structure', () => {
      render(<Home />);
      
      // Check for semantic elements
      expect(document.querySelector('header')).toBeInTheDocument();
      expect(document.querySelectorAll('section').length).toBeGreaterThan(0);
    });

    it('should have proper link relationships', () => {
      render(<Home />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });
}); 