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
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ocean-blue to-baby-blue relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />
          <div className="container">
            <div className="row">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl xsm:text-6xl xl:text-8xl font-bold text-white mb-8">
                  Effortless Queue Management.
                  <br />
                  Redefining What&apos;s Possible.
                </h1>
                <p className="text-xl text-white/90 mb-12">
                  QMaster transforms customer flow with smart queue management,
                  powered by advanced technology and hands-on support, ensuring
                  efficiency, control, and full transparency.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-ocean-blue bg-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="container">
            <div className="row">
              <h2
                data-aos="fade-up"
                className="text-4xl font-bold text-center text-coal-black mb-16"
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
                  <p className="text-gray-600">
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
                  <p className="text-gray-600">
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
                  <p className="text-gray-600">
                    Optimize your space and staff allocation with real-time
                    capacity tracking and forecasting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-b from-white to-sky-50">
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
                  <p className="text-lg text-gray-600">Customer Satisfaction</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="text-center"
                >
                  <h3 className="text-5xl font-bold text-baby-blue mb-4">
                    -65%
                  </h3>
                  <p className="text-lg text-gray-600">Wait Time Reduction</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="text-center"
                >
                  <h3 className="text-5xl font-bold text-baby-blue mb-4">
                    2.5x
                  </h3>
                  <p className="text-lg text-gray-600">
                    Operational Efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Steps */}
        <section className="py-24">
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
                  <p className="text-gray-600">
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
                  <p className="text-gray-600">
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
                  <p className="text-gray-600">
                    Start managing queues and delighting customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-ocean-blue to-baby-blue relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />
          <div className="container relative z-10">
            <div className="row">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                  Ready to Transform Your Queue Management?
                </h2>
                <p className="text-xl text-white/90 mb-12">
                  Join thousands of businesses already using QMaster to optimize
                  their operations and delight customers.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-ocean-blue bg-white rounded-full hover:bg-opacity-90 transition-colors"
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
