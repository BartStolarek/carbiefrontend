import React from 'react';
import Link from 'next/link';

/**
 * Header Component
 * 
 * Fixed navigation header with logo, navigation links, and download button.
 * Features a backdrop blur effect and smooth hover transitions.
 */
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Carbie</span>
          </Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link href="/#features" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
              Features
            </Link>
            <a href="/help" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
              Help
            </a>
          </nav>
          
          {/* Download Button */}
          <Link
            href="/#download"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <span>Download</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 