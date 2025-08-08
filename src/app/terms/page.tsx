import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/**
 * Terms of Use Page Component
 * 
 * Static terms of use page for Carbie with the same theme as the home page.
 * Features the complete terms of use content with proper formatting.
 */
export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />

      {/* Main Content */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Use
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: 8th August 2025
            </p>
          </div>

          {/* Terms of Use Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-8">
                These Terms of Use (&quot;Terms&quot;) explain how you can use Carbie. By using the app, you agree to these Terms. If you don&apos;t agree, please don&apos;t use the app.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Carbie Does</h2>
              <p className="text-gray-700 mb-3">Carbie lets you describe or upload an image of food/drinks and get an AI-generated estimate of:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Carbohydrate content</li>
                <li>Peak blood glucose time</li>
                <li>Likely ingredients</li>
              </ul>
              <p className="text-gray-700 mb-6">
                The information is provided for general informational purposes only.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Not Medical Advice</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Carbie is not a medical device and does not provide professional medical advice, diagnosis, or treatment.</li>
                <li>Always confirm health-related information with a qualified healthcare provider.</li>
                <li>Never ignore medical advice because of something you saw in Carbie.</li>
                <li>All estimates are based on AI processing and may be inaccurate or incomplete.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Who Can Use Carbie</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>You must be at least 13 years old to create an account.</li>
                <li>If you are under the age where you can legally consent to data collection in your region, a parent or guardian must agree to these Terms for you.</li>
                <li>You are responsible for keeping your account login details secure.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscriptions & Payments</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>All subscription purchases are handled by Google Play Store and RevenueCat.</li>
                <li>We do not process or store your payment information.</li>
                <li>You can manage or cancel your subscription through the Google Play Store at any time.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Content</h2>
              <p className="text-gray-700 mb-3">When you send a text prompt or image to Carbie:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>You give us permission to process it and send it to Claude AI to generate a result.</li>
                <li>Images are processed in real-time and never stored.</li>
                <li>Text prompts and AI results may be stored in anonymised form to help improve the app.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use</h2>
              <p className="text-gray-700 mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Use Carbie for illegal purposes.</li>
                <li>Upload images or text that are offensive, harmful, or unrelated to food/drinks.</li>
                <li>Try to reverse-engineer, disrupt, or damage our services or servers.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Account Deletion</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>You can permanently delete your account from our website.</li>
                <li>Account deletion erases your account data and subscription status, but anonymised usage data may be retained for app improvements.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Carbie is provided &quot;as is&quot; and &quot;as available.&quot;</li>
                <li>We do not guarantee uninterrupted service, error-free results, or perfect accuracy.</li>
                <li>We may update, pause, or stop the service at any time without notice.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-3">To the maximum extent permitted by law:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>We are not responsible for any loss, injury, or damage (including health consequences) that may result from using Carbie.</li>
                <li>You use Carbie entirely at your own risk.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to These Terms</h2>
              <p className="text-gray-700 mb-6">
                We may update these Terms at any time. If we make significant changes, we&apos;ll notify you in the app or on our website.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about these Terms, contact us at: support@carbie.app
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 