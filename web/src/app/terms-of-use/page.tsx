"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible bg-white">
      {/* Header with gradient background including Nav */}
      <div className="bg-gradient-to-r from-ocean-blue to-concrete-turqouise">
        <Nav />
        <div className="container">
          <div className="row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center w-full py-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Terms of Use
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Please read these terms carefully before using our services
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="w-full py-16">
        <div className="container">
          <div className="row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
                <section className="mt-0 space-y-6">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing and using QMaster&apos;s services, you agree to
                    be bound by these Terms of Use, our Privacy Policy, and any
                    additional terms and conditions that may apply. These terms
                    constitute a legally binding agreement between you and
                    QMaster.
                  </p>
                </section>

                <section className="space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    2. Service Description
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      QMaster provides queue management and business
                      optimization services through:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Digital queue management systems</li>
                      <li>Business analytics and reporting tools</li>
                      <li>Customer feedback collection and analysis</li>
                      <li>Online store management capabilities</li>
                      <li>Appointment scheduling services</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-8 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-6">
                    3. User Categories and Obligations
                  </h2>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-coal-black">
                        3.1 Business Users
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Business users must:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Provide accurate business information</li>
                        <li>Maintain confidentiality of account credentials</li>
                        <li>Comply with local business regulations</li>
                        <li>Properly handle customer data and privacy</li>
                        <li>Ensure accurate queue and service management</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-coal-black">
                        3.2 End Users (Customers)
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        End users must:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Provide accurate personal information</li>
                        <li>Use the service responsibly</li>
                        <li>Respect queue positions and business policies</li>
                        <li>Not manipulate or abuse the queuing system</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    4. E-commerce Terms
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      For businesses using our e-commerce features:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Must comply with Egyptian e-commerce regulations</li>
                      <li>Responsible for product accuracy and availability</li>
                      <li>
                        Must handle customer data according to GDPR and local
                        laws
                      </li>
                      <li>Responsible for product delivery and quality</li>
                      <li>Must maintain accurate pricing and inventory</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    5. Data Usage and Privacy
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We collect and process data in accordance with our Privacy
                    Policy and applicable data protection laws. Users grant
                    QMaster the right to collect, store, and analyze usage data
                    for service improvement and analytics purposes.
                  </p>
                </section>

                <section className="space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    6. Intellectual Property
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    All QMaster content, features, and functionality are owned
                    by QMaster and protected by international copyright,
                    trademark, and other intellectual property laws.
                  </p>
                </section>

                <section className="space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    7. Limitation of Liability
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    QMaster is not liable for any indirect, incidental, special,
                    consequential, or punitive damages resulting from your use
                    of our services.
                  </p>
                </section>

                <section className="space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    8. Termination
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to terminate or suspend access to our
                    services immediately, without prior notice or liability, for
                    any reason whatsoever.
                  </p>
                </section>

                <section className="space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    9. Changes to Terms
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify these terms at any time. We
                    will notify users of any material changes via email or
                    through our platform.
                  </p>
                </section>

                <section className="mb-0 space-y-6 mt-12">
                  <h2 className="text-2xl font-semibold text-ocean-blue mb-4">
                    10. Contact Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    For any questions about these Terms of Use, please contact
                    us at support@qmaster.com
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
