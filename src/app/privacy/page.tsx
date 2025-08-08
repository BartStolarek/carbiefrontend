import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/**
 * Privacy Policy Page Component
 * 
 * Static privacy policy page for Carbie with the same theme as the home page.
 * Features the complete privacy policy content with proper formatting.
 */
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />

      {/* Main Content */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: 8th August 2025
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-8">
                Carbie respects your privacy. This policy explains what information we collect, how we use it, and the choices you have.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Carbie Does</h2>
              <p className="text-gray-700 mb-6">
                Carbie lets you enter a text description or upload an image of food or drinks. Your request is sent securely to our servers, where we process it using Claude AI to estimate carbohydrate content, peak blood glucose time, and likely ingredients. Results are sent back to your device in the app.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information you provide</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Account details:</strong> Email and password (your password is securely encrypted and never stored in plain text).</li>
                <li><strong>Prompts:</strong> Text descriptions and, if you choose, images you submit. Images are processed but never stored.</li>
                <li><strong>Optional info</strong> (if you choose to provide it): Age, sex, or general location — stored only on your device to help improve portion size estimates.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information we store</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Claude AI responses and the prompts you send (anonymised so they can&apos;t be linked back to you) for future app improvements and feature development.</li>
                <li>Subscription status (whether your account is active or not). No payment details are stored by us.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information from support requests</h3>
              <p className="text-gray-700 mb-6">
                If you email us or use our website contact form, we collect your email address and message so we can respond. These messages stay in our inbox.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Provide the main Carbie service.</li>
                <li>Improve the app and develop new features.</li>
                <li>Respond to support requests.</li>
                <li>Maintain your subscription status.</li>
              </ul>
              <p className="text-gray-700 mb-6">
                We never sell your personal information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 mb-3">We only share information when necessary to run the service:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>With Claude AI, to process your request and generate results.</li>
                <li>With Google Play Store and RevenueCat, to manage subscriptions.</li>
              </ul>
              <p className="text-gray-700 mb-6">
                These providers have their own privacy policies.
              </p>
              <p className="text-gray-700 mb-6">
                We do not share your personal data with advertisers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>All data sent between your device and our servers is encrypted with HTTPS/TLS.</li>
                <li>Access to your account requires a secure bearer token.</li>
                <li>Passwords are encrypted before storage.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Images are never stored — they are processed in real time and then discarded.</li>
                <li>Claude responses and prompts are stored in anonymised form for as long as needed for app improvements.</li>
                <li>Support emails are kept in our inbox unless you request deletion.</li>
                <li>Optional demographic data is only stored locally on your device and is never sent to us unless you include it in a request.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Choices</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Account deletion:</strong> You can delete your account permanently via our website. This will erase your account data and subscription status but anonymised prompt history may be kept for analysis.</li>
                <li><strong>Contacting us:</strong> You can reach us via the website contact form or email for questions about your data.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Users</h2>
              <p className="text-gray-700 mb-6">
                Our servers are located in Australia. If you use Carbie from another country, your information will be transferred and processed here.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this privacy policy from time to time. If we make significant changes, we&apos;ll notify you in the app or on our website.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this privacy policy, email us at: support@carbie.app
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 