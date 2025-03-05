"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaDownload, FaImage } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import QMasterLogo from "../../../public/qmaster-logo.svg";
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
        <div className="container">
          <div className="row">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-center w-full"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Press & Media
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
                {t(
                  "We've created some guidelines to help you use our brand and assets, including our logo, content and trademarks without having to negotiate legal agreements for each use."
                )}
              </p>
              <button className="bg-ocean-blue hover:bg-opacity-90 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full transition-all gap-2">
                <FaDownload className="w-5 h-5" />
                {t("Download our media kit")}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content with white background */}
      <main className="w-full py-16">
        <div className="container">
          <div className="row">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full space-y-16"
            >
              {/* Brand Assets Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
              >
                {/* Logo Marks */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                  <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                    <Image
                      src={QMasterLogo}
                      alt="QMaster Logo"
                      className="w-24 h-24"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-coal-black mb-2">
                    Logo Marks
                  </h3>
                  <p className="text-dark-grey mb-4">
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
                    <Image
                      src={QMasterLogo}
                      alt="Product Screenshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-coal-black mb-2">
                    Product Screens
                  </h3>
                  <p className="text-dark-grey mb-4">
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
                    <Image
                      src={QMasterLogo}
                      alt="Brand Guidelines"
                      className="w-24 h-24"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-coal-black mb-2">
                    Brand Guidelines
                  </h3>
                  <p className="text-dark-grey mb-4">
                    Complete guide to using our brand elements
                  </p>
                  <button className="flex items-center gap-2 text-ocean-blue hover:text-baby-blue transition-colors">
                    <FaDownload className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </motion.div>

              {/* Color Palette Section */}
              <motion.div variants={itemVariants} className="w-full">
                <h2 className="text-3xl font-bold text-coal-black mb-8">
                  Brand Colors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-ocean-blue"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Ocean Blue
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#17222D</p>
                    <p className="text-slate-grey text-sm">
                      Primary brand color, used for main backgrounds and
                      navigation
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-concrete-turqouise"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Concrete Turquoise
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#13404D</p>
                    <p className="text-slate-grey text-sm">
                      Secondary background color, used for gradients and cards
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-baby-blue"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Baby Blue
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#1DCDFE</p>
                    <p className="text-slate-grey text-sm">
                      Accent color, used for interactive elements and highlights
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-dark-grey"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Dark Grey
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#515151</p>
                    <p className="text-slate-grey text-sm">
                      Used for text and form inputs
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-off-white"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Off White
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#D9D9D9</p>
                    <p className="text-slate-grey text-sm">
                      Light mode backgrounds and subtle accents
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-lite-grey"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Lite Grey
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#ADADAD</p>
                    <p className="text-slate-grey text-sm">
                      Used for borders and dividers
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-lava-red"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Lava Red
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#B41818</p>
                    <p className="text-slate-grey text-sm">
                      Used for error states and destructive actions
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-lg mb-4 bg-coal-black"></div>
                    <h3 className="text-lg font-bold text-coal-black mb-1">
                      Coal Black
                    </h3>
                    <p className="text-dark-grey text-sm mb-2">#2F2E41</p>
                    <p className="text-slate-grey text-sm">
                      Used for deep backgrounds and text
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Typography Section */}
              <motion.div variants={itemVariants} className="w-full">
                <h2 className="text-3xl font-bold text-coal-black mb-8">
                  Typography
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-coal-black mb-6">
                      Primary Fonts
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <p
                          className="text-4xl text-coal-black font-bold mb-2"
                          style={{ fontFamily: "Inter" }}
                        >
                          Inter
                        </p>
                        <p className="text-dark-grey">
                          Primary font for web interfaces
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-4xl text-coal-black font-bold mb-2"
                          style={{ fontFamily: "Jost" }}
                        >
                          Jost
                        </p>
                        <p className="text-dark-grey">
                          Used for mobile app headings
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-4xl text-coal-black font-bold mb-2"
                          style={{ fontFamily: "Istok Web" }}
                        >
                          Istok
                        </p>
                        <p className="text-dark-grey">
                          Used for mobile app buttons
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-gray-50 rounded-2xl p-8 shadow-sm mb-8">
                      <h3 className="text-xl font-bold text-coal-black mb-6">
                        Font Weights
                      </h3>
                      <div className="space-y-4">
                        <p className="text-coal-black font-bold text-xl">
                          Bold (700)
                        </p>
                        <p className="text-coal-black font-semibold text-xl">
                          Semibold (600)
                        </p>
                        <p className="text-coal-black font-medium text-xl">
                          Medium (500)
                        </p>
                        <p className="text-coal-black text-xl">Regular (400)</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                      <h3 className="text-xl font-bold text-coal-black mb-6">
                        Font Sizes
                      </h3>
                      <div className="space-y-4">
                        <p className="text-3xl text-coal-black">
                          Heading Large - 28px
                        </p>
                        <p className="text-2xl text-coal-black">
                          Heading Medium - 24px
                        </p>
                        <p className="text-xl text-coal-black">
                          Heading Small - 20px
                        </p>
                        <p className="text-base text-coal-black">
                          Body Text - 16px
                        </p>
                        <p className="text-sm text-coal-black">
                          Small Text - 14px
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Usage Guidelines */}
              <motion.div variants={itemVariants} className="w-full">
                <h2 className="text-3xl font-bold text-coal-black mb-8">
                  Usage Guidelines
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-coal-black mb-4">
                      Do&apos;s
                    </h3>
                    <ul className="space-y-3 text-dark-grey">
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
                    <ul className="space-y-3 text-dark-grey">
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
              <motion.div
                variants={itemVariants}
                className="w-full text-center"
              >
                <h2 className="text-3xl font-bold text-coal-black mb-6">
                  Need Something Else?
                </h2>
                <p className="text-dark-grey mb-8">
                  For press inquiries or additional assets, please contact our
                  media team
                </p>
                <a
                  href="mailto:media@qmaster.com"
                  className="bg-ocean-blue hover:bg-opacity-90 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full transition-all"
                >
                  Contact Media Team
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
