"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaDownload, FaImage } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";

export default function ReleaseContentPage() {
  const { t, isRTL } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const colorPalette = [
    {
      name: "Ocean Blue",
      hex: "#17222D",
      usage: "Primary brand color, backgrounds in dark mode",
      class: "bg-ocean-blue",
    },
    {
      name: "Crystal Blue",
      hex: "#34F5C5",
      usage: "Accent color, buttons, active states",
      class: "bg-crystal-blue",
    },
    {
      name: "Baby Blue",
      hex: "#1DCDFE",
      usage: "Secondary accent, links, icons",
      class: "bg-baby-blue",
    },
    {
      name: "Concrete Turquoise",
      hex: "#13404D",
      usage: "Secondary backgrounds, card backgrounds",
      class: "bg-concrete-turqouise",
    },
  ];

  return (
    <div className="w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible bg-white">
      {/* Header with gradient background including Nav */}
      <div className="bg-gradient-to-r from-ocean-blue to-concrete-turqouise">
        <Nav />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t(
                "We've created some guidelines to help you use our brand and assets, including our logo, content and trademarks without having to negotiate legal agreements for each use."
              )}
            </p>
            {/* Download Kit Button */}
            <button className="bg-ocean-blue hover:bg-opacity-90 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full transition-all gap-2">
              <FaDownload className="w-5 h-5" />
              {t("Download our media kit")}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main content with white background */}
      <main className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Brand Assets Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Logo Marks */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                <img src="/logo.svg" alt="QMaster Logo" className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold text-coal-black mb-2">
                Logo Marks
              </h3>
              <p className="text-gray-600 mb-4">
                Download our logo in various formats and sizes
              </p>
              <button className="flex items-center gap-2 text-ocean-blue hover:text-baby-blue transition-colors">
                <FaDownload className="w-4 h-4" />
                <span>Download logos</span>
              </button>
            </div>

            {/* Product Screenshots */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-gray-100">
                <img
                  src="/app-preview.png"
                  alt="Product Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-coal-black mb-2">
                Product Screens
              </h3>
              <p className="text-gray-600 mb-4">
                High-resolution screenshots of our platform
              </p>
              <button className="flex items-center gap-2 text-ocean-blue hover:text-baby-blue transition-colors">
                <FaImage className="w-4 h-4" />
                <span>View gallery</span>
              </button>
            </div>

            {/* Brand Guidelines */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                <img
                  src="/brand-guidelines.svg"
                  alt="Brand Guidelines"
                  className="w-24 h-24"
                />
              </div>
              <h3 className="text-xl font-bold text-coal-black mb-2">
                Brand Guidelines
              </h3>
              <p className="text-gray-600 mb-4">
                Complete guide to using our brand elements
              </p>
              <button className="flex items-center gap-2 text-ocean-blue hover:text-baby-blue transition-colors">
                <FaDownload className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </motion.div>

          {/* Color Palette Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-coal-black">
              Color Palette
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colorPalette.map((color) => (
                <div
                  key={color.name}
                  className="bg-gray-50 rounded-xl p-6 shadow-sm"
                >
                  <div
                    className={`w-16 h-16 rounded-lg mb-4 ${color.class}`}
                  ></div>
                  <h3 className="text-lg font-bold text-coal-black mb-1">
                    {color.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{color.hex}</p>
                  <p className="text-gray-500 text-sm">{color.usage}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Typography Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-coal-black">Typography</h2>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-coal-black mb-4">
                    Primary Font
                  </h3>
                  <p className="text-6xl text-coal-black font-bold mb-4">Aa</p>
                  <p className="text-gray-600">
                    Inter
                    <br />
                    <span className="text-gray-500">
                      Used for headings and body text
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-coal-black mb-4">
                    Weights
                  </h3>
                  <div className="space-y-4">
                    <p className="text-coal-black font-bold">Bold (700)</p>
                    <p className="text-coal-black font-semibold">
                      Semibold (600)
                    </p>
                    <p className="text-coal-black font-medium">Medium (500)</p>
                    <p className="text-coal-black">Regular (400)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Usage Guidelines */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-coal-black">
              Usage Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-coal-black mb-4">
                  Do&apos;s
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Use our official logo files
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Maintain minimum clear space
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Use approved color combinations
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-coal-black mb-4">
                  Don&apos;ts
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span>
                    Modify or distort the logo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span>
                    Use unapproved colors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span>
                    Add effects or shadows
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-coal-black mb-6">
              Need Something Else?
            </h2>
            <p className="text-gray-600 mb-8">
              For press inquiries or additional assets, please contact our media
              team
            </p>
            <a
              href="mailto:press@qmaster.com"
              className="bg-ocean-blue hover:bg-opacity-90 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full transition-all"
            >
              Contact Media Team
            </a>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
