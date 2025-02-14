"use client";

import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaChartLine,
  FaClock,
  FaUsers,
  FaStore,
  FaBell,
  FaChartBar,
} from "react-icons/fa";

export default function BusinessPage() {
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
        {/* Hero Section - Updated to match main landing page style */}
        <section className="min-h-screen my-0 pt-20 flex items-center justify-center bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />
          <div className="container">
            <div className="row">
              <div className="z-[1000px] max-w-4xl mx-auto text-center px-4">
                <h1
                  data-aos="fade-up"
                  className="text-4xl md:text-4xl xsm:text-6xl xl:text-8xl font-bold text-white mb-6 md:mb-8"
                >
                  Effortless Queue Management.
                  <br />
                  <span className="double__color--text">
                    Redefining What&apos;s Possible.
                  </span>
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="text-base md:text-xl text-white/90 mb-8 md:mb-12"
                >
                  QMaster transforms customer flow with smart queue management,
                  powered by advanced technology and hands-on support, ensuring
                  efficiency, control, and full transparency.
                </p>
                <Link
                  href="/login"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-offset="0"
                  className="double__color--btn inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full hover:opacity-90 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid - Updated with consistent spacing */}
        <section>
          <div className="container">
            <div className="row">
              <h2
                data-aos="fade-up"
                className="text-4xl font-bold text-center text-white sm:text-coal-black mb-16"
              >
                Smart Features for Modern Businesses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-8 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center mb-6">
                    <FaChartLine className="w-6 h-6 text-baby-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Smart Analytics</h3>
                  <p className="text-coal-black">
                    Real-time insights into queue performance, wait times, and
                    customer flow to optimize your operations.
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
                  <h3 className="text-xl font-bold mb-4">
                    Automated Notifications
                  </h3>
                  <p className="text-coal-black">
                    Keep customers informed with automated updates about their
                    queue status and estimated wait times.
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="p-8 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-baby-blue/10 rounded-lg flex items-center justify-center mb-6">
                    <FaChartBar className="w-6 h-6 text-baby-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Capacity Management
                  </h3>
                  <p className="text-coal-black">
                    Optimize your space and staff allocation with real-time
                    capacity tracking and forecasting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Updated with gradient */}
        <section className="bg-gradient-to-b from-white to-gray-50">
          <div className="container">
            <div className="row">
              <h2
                data-aos="fade-up"
                className="text-4xl font-bold text-center text-coal-black mb-16"
              >
                Proven Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="text-center"
                >
                  <h3 className="text-5xl font-bold text-baby-blue mb-4">
                    +40%
                  </h3>
                  <p className="text-lg text-coal-black">
                    Customer Satisfaction
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="text-center"
                >
                  <h3 className="text-5xl font-bold text-baby-blue mb-4">
                    -65%
                  </h3>
                  <p className="text-lg text-coal-black">Wait Time Reduction</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="text-center"
                >
                  <h3 className="text-5xl font-bold text-baby-blue mb-4">
                    2.5x
                  </h3>
                  <p className="text-lg text-coal-black">
                    Operational Efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Steps - Updated spacing */}
        <section>
          <div className="container">
            <div className="row">
              <h2
                data-aos="fade-up"
                className="text-4xl font-bold text-center text-coal-black mb-16"
              >
                Get Started in Minutes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-baby-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sign Up</h3>
                  <p className="text-coal-black">
                    Create your business account and customize your settings
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-baby-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Configure</h3>
                  <p className="text-coal-black">
                    Set up your services and notification preferences
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-baby-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Launch</h3>
                  <p className="text-coal-black">
                    Start managing queues and delighting customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Updated to match main landing page */}
        <section className="mt-0 mb-24 py-24 bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />
          <div className="container relative z-10">
            <div className="row">
              <div className="max-w-3xl mx-auto text-center">
                <h2
                  data-aos="fade-up"
                  className="text-4xl font-bold text-white mb-8"
                >
                  Ready to Transform Your Queue Management?
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="text-xl text-white/90 mb-12"
                >
                  Join thousands of businesses already using QMaster to optimize
                  their operations and delight customers.
                </p>
                <Link
                  href="/login"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="double__color--btn inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full hover:opacity-90 transition-all"
                >
                  Get Started Now
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
