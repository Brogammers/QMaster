"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Nav />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-ocean-blue mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-800">
                  1.1 Business Users
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Business registration information</li>
                  <li>Contact details and addresses</li>
                  <li>Payment and banking information</li>
                  <li>Business operation data</li>
                  <li>Employee information</li>
                  <li>Service usage statistics</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800">
                  1.2 End Users
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and contact information</li>
                  <li>Queue and appointment history</li>
                  <li>Service preferences</li>
                  <li>Feedback and ratings</li>
                  <li>Device and location data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                2. How We Use Your Information
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  We use collected information to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Process payments and transactions</li>
                  <li>Send service notifications and updates</li>
                  <li>Analyze service usage and trends</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                3. Data Protection
              </h2>
              <p className="leading-relaxed">
                We implement robust security measures to protect your data,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
                <li>Employee data handling training</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                4. Data Sharing
              </h2>
              <p className="leading-relaxed">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Service providers and partners</li>
                <li>Payment processors</li>
                <li>Analytics providers</li>
                <li>Legal authorities when required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                5. Your Rights
              </h2>
              <p className="leading-relaxed">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience and collect usage data. You can control cookie
                preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                7. Children&apos;s Privacy
              </h2>
              <p className="leading-relaxed">
                Our services are not intended for children under 13. We do not
                knowingly collect or maintain information from children under
                13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                8. International Data Transfers
              </h2>
              <p className="leading-relaxed">
                We may transfer data internationally in compliance with
                applicable data protection laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                9. Changes to Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this policy periodically. We will notify you of
                any material changes via email or through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-baby-blue mb-4">
                10. Contact Us
              </h2>
              <p className="leading-relaxed">
                For privacy-related inquiries, please contact our Data
                Protection Officer at privacy@qmaster.com
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
