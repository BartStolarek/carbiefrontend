'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

/**
 * Help Page Component
 * 
 * Provides support resources including FAQs, contact form, and additional resources
 * for users who need help with the Carbie app.
 */
export default function HelpPage() {
  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Function to toggle FAQ open/close
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Frequently asked questions with detailed answers
  const faqs = [
    {
      question: "How accurate is the AI food analysis?",
      answer: "The AI-powered analysis provides estimates based on details provided by the user. The more details like weight and ingredients the better the accuracy will be."
    },
    {
      question: "Can I use Carbie without an internet connection?",
      answer: "Carbie requires an internet connection for AI analysis and database access. We're working on offline capabilities for future updates."
    },
    {
      question: "How does the blood glucose timing feature work?",
      answer: "The glucose timing feature estimates when your blood sugar will peak based on the carbohydrate content and glycemic index of the foods you've analyzed, based on average values for the ingredients. This is an estimate and should not replace medical advice."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take your privacy seriously. All data is encrypted and stored securely. We never share your personal information with third parties without your explicit consent."
    },
    {
      question: "Can I export my nutrition data?",
      answer: "Currently, we're working on data export features. This will be available in a future update, allowing you to export your nutrition history and analysis data."
    },
    {
      question: "What devices are supported?",
      answer: "Carbie is currently available for Android devices. We're working on iOS support and will announce when it becomes available."
    },
    {
      question: "How do I delete my account?",
      answer: "When you delete your account, all of your profile and account data will be deleted. Any anonymised prompt history may be kept for analysis. You can delete your account by contacting us via the contact form."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with home link */}
            <div className="flex items-center space-x-3 group">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Carbie</span>
              </Link>
            </div>
            
            {/* Navigation menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
                Features
              </Link>
              <Link href="/help" className="text-green-600 font-medium">
                Help
              </Link>
            </nav>
            
            {/* Download button */}
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

      {/* Main content area */}
      <div className="pt-16">
        {/* Hero section with page title */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Help & Support
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re here to help you make the most of your nutrition journey with Carbie.
            </p>
          </div>
        </section>

        {/* Contact form section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Before sending a contact form, feel free to check the FAQs below. Many common questions are already answered there!
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to the most common questions about Carbie.
              </p>
            </div>

            {/* FAQ list with improved accordion design */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Question header - always visible and clickable */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset rounded-xl"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {/* Animated chevron icon */}
                    <div className="flex-shrink-0">
                      <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Answer content - animated expand/collapse */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> 
          </div>
        </section>

      </div>
    </div>
  );
} 