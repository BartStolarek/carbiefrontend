import React from 'react';

/**
 * Home Page Component
 * 
 * The main landing page for Carbie - an AI-powered nutrition assistant app.
 * Features sections include: hero, features, help & support, and call-to-action.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Carbie</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
                Features
              </a>
              <a href="/help" className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
                Help
              </a>
            </nav>
            
            {/* Download Button */}
            <a
              href="#download"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span>Download</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Main introduction */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Decorative background elements */}
        <div className="absolute top-32 left-10 w-16 h-16 bg-green-200 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-green-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-green-400 rounded-full opacity-25"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              AI-Powered
              <span className="block text-green-600">Nutrition Assistant</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
              Transform your nutrition journey with instant carb analysis. Simply point your camera 
              or describe your meal for accurate, real-time insights.
            </p>
            
            {/* Call to action button */}
            <div className="flex justify-center items-center pt-4">
              <a
                href="#download"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span>Download on Play Store</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - App capabilities */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for
              <span className="text-green-600"> smart nutrition</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to give you complete control over your nutrition journey.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Food Analysis Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Food Analysis</h3>
              <p className="text-gray-600 leading-relaxed">Photo or text input for instant carb estimates with advanced machine learning precision.</p>
            </div>

            {/* Smart Camera Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Camera</h3>
              <p className="text-gray-600 leading-relaxed">Point and shoot for instant analysis with advanced image recognition technology.</p>
            </div>

            {/* Detailed Breakdown Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Breakdown</h3>
              <p className="text-gray-600 leading-relaxed">Ingredient-by-ingredient analysis with carb ranges and nutritional insights.</p>
            </div>

            {/* Blood Glucose Timing Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Glucose Timing</h3>
              <p className="text-gray-600 leading-relaxed">Get an estimate on when your blood glucose will peak from individual ingredients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Help & Support Section */}
      <section id="help" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Help?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Get the support you need to make the most of your nutrition journey.
          </p>

          {/* Support options grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* FAQs */}
            <a href="#faq" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-green-200 transition-colors duration-300">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">FAQs</h3>
              <p className="text-gray-600 text-sm">Quick answers to common questions</p>
            </a>

            {/* Tutorials */}
            <a href="#tutorials" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-green-200 transition-colors duration-300">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tutorials</h3>
              <p className="text-gray-600 text-sm">Step-by-step guides and videos</p>
            </a>

            {/* Contact */}
            <a href="#contact" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-green-200 transition-colors duration-300">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
              <p className="text-gray-600 text-sm">Get in touch with our team</p>
            </a>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Nutrition?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their nutrition with Carbie.
          </p>
          <a
            href="#download"
            className="bg-white text-green-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <span>Download Carbie Today</span>
          </a>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/5 rounded-full"></div>
      </section>
    </div>
  );
}