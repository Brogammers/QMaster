"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="body-secondary w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible">
      <Nav />
      <main className="w-full py-24">
        <div className="container">
          <div className="row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <h1 className="text-4xl md:text-5xl font-bold double__color--text mb-16">
                Privacy Policy
              </h1>

              <div className="text-coal-black bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg p-12">
                <section className="mt-0 space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
                    1. Information We Collect
                  </h2>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-coal-black">
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
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-coal-black">
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
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
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

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
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

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
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

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
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

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
                    6. Cookies and Tracking
                  </h2>
                  <p className="leading-relaxed">
                    We use cookies and similar technologies to enhance your
                    experience and collect usage data. You can control cookie
                    preferences through your browser settings.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
                    7. Children&apos;s Privacy
                  </h2>
                  <p className="leading-relaxed">
                    Our services are not intended for children under 13. We do
                    not knowingly collect or maintain information from children
                    under 13.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
                    8. International Data Transfers
                  </h2>
                  <p className="leading-relaxed">
                    We may transfer data internationally in compliance with
                    applicable data protection laws and regulations.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
                    9. Changes to Privacy Policy
                  </h2>
                  <p className="leading-relaxed">
                    We may update this policy periodically. We will notify you
                    of any material changes via email or through our platform.
                  </p>
                </section>

                <section className="mb-0 space-y-6">
                  <h2 className="text-2xl font-semibold text-baby-blue mb-6">
                    10. Contact Us
                  </h2>
                  <p className="leading-relaxed">
                    For privacy-related inquiries, please contact our Data
                    Protection Officer at privacy@qmaster.com
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
