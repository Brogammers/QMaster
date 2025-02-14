"use client";

import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaMobile,
  FaBell,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaHistory,
} from "react-icons/fa";

export default function AppUsersPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 200,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="body w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible">
      <Nav />
      <main className="w-full">
        {/* Hero Section - Updated to match main landing page */}
        <section className="min-h-screen my-0 pt-20 flex items-center justify-center bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />
          <div className="container">
            <div className="row">
              <div className="z-[1000px] max-w-4xl mx-auto text-center px-4">
                <h1
                  data-aos="fade-up"
                  className="text-4xl md:text-4xl xsm:text-6xl xl:text-8xl font-bold text-white mb-6 md:mb-8"
                >
                  Your Time Matters.
                  <br />
                  <span className="double__color--text">Queue Smarter.</span>
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="text-base md:text-xl text-white/90 mb-8 md:mb-12"
                >
                  Join millions of users who have transformed their waiting
                  experience. Queue virtually, get real-time updates, and make
                  the most of your time.
                </p>
                <Link
                  href="/customer-app"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-offset="0"
                  className="double__color--btn inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full hover:opacity-90 transition-all"
                >
                  Download Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* App Features - Updated with consistent spacing */}
        <section className="my-0 py-24">
          <div className="container">
            <div className="row">
              <h2
                data-aos="fade-up"
                className="text-4xl font-bold text-center text-white sm:text-coal-black mb-16"
              >
                Everything You Need in One App
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-8 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center mb-6">
                    <FaMobile className="w-6 h-6 text-baby-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Virtual Queuing</h3>
                  <p className="text-coal-black">
                    Join queues from anywhere using your smartphone. No more
                    standing in physical lines.
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="p-8 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center mb-6">
                    <FaBell className="w-6 h-6 text-baby-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Real-time Updates</h3>
                  <p className="text-coal-black">
                    Receive notifications about your queue status and when
                    it&apos;s almost your turn.
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="p-8 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center mb-6">
                    <FaClock className="w-6 h-6 text-baby-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Wait Time Estimates
                  </h3>
                  <p className="text-coal-black">
                    See accurate wait time predictions and plan your visit
                    accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Updated with gradient and mobile responsiveness */}
        <section className="bg-gradient-to-b from-white to-gray-50">
          <div className="container">
            <div className="row">
              <h2
                data-aos="fade-up"
                className="text-4xl font-bold text-center text-coal-black mb-16"
              >
                Why Use QMaster?
              </h2>
              <div className="w-full flex flex-wrap max-w-5xl mx-auto">
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="w-full md:w-1/3 px-4 mb-8 md:mb-0"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="w-6 h-6 text-baby-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl text-ocean-blue font-bold mb-2">
                        Discover Places
                      </h3>
                      <p className="text-coal-black">
                        Find and explore businesses near you that offer virtual
                        queuing through QMaster.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="w-full md:w-1/3 px-4 mb-8 md:mb-0"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaStar className="w-6 h-6 text-baby-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl text-coal-black font-bold mb-2">
                        Rate Experiences
                      </h3>
                      <p className="text-coal-black">
                        Share your feedback and help improve service quality for
                        everyone.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="w-full md:w-1/3 px-4"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaHistory className="w-6 h-6 text-baby-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl text-coal-black font-bold mb-2">
                        Queue History
                      </h3>
                      <p className="text-coal-black">
                        Access your complete queue history and favorite places
                        for quick access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA - Updated to match main landing page */}
        <section className="mt-0 mb-24 py-24 bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />
          <div className="container relative z-10">
            <div className="row">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                  Ready to Transform Your Waiting Experience?
                </h2>
                <p className="text-xl text-white/90 mb-12">
                  Join millions of users who have already discovered the power
                  of virtual queuing with QMaster.
                </p>
                <Link
                  href="/customer-app"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-ocean-blue bg-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Download the App
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}