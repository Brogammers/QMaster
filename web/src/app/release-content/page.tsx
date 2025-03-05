"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaDownload, FaImage } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import QMasterLogo from "../../../public/qmaster-logo.svg";
import QMasterTrademark from "../../../public/QMaster-Trademark.svg";
import TextButton from "../shared/TextButton";

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
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-center w-full my-8 flex flex-col items-center justify-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Press & Media
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
                {t(
                  "We've created some guidelines to help you use our brand and assets, including our logo, content and trademarks without having to negotiate legal agreements for each use."
                )}
              </p>
              <TextButton
                text={t("Download our media kit")}
                className="double__color--btn"
                buttonColor=""
                textColor="white"
                textSize="lg"
                paddingX="8"
                paddingY="4"
                borderRadius="full"
                icon={<FaDownload className="w-5 h-5" />}
              />
            </motion.section>
          </div>
        </div>
      </div>

      {/* Main content with white background */}
      <main className="w-full py-16">
        <div className="container">
          <div className="row">
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full space-y-48 mt-0 mb-8"
            >
              {/* Brand Assets Grid */}
              <motion.section
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-0 mb-8"
              >
                {/* Logo Marks */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                  <figure className="aspect-square bg-gradient-to-r from-concrete-turqouise to-ocean-blue rounded-xl flex items-center justify-center mb-4 p-8 border border-gray-100">
                    <Image
                      src={QMasterTrademark}
                      alt="QMaster Logo"
                      className="w-full"
                    />
                  </figure>
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
                  <figure className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-gray-100">
                    <Image
                      src={QMasterLogo}
                      alt="Product Screenshot"
                      className="w-full h-full object-cover"
                    />
                  </figure>
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
                  <figure className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-100 relative overflow-hidden">
                    {/* Guidelines-like background pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--baby-blue)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-10" />

                    {/* Stylized "guidelines" visual */}
                    <div className="relative w-4/5 h-4/5 flex flex-col gap-4">
                      {/* Header bar */}
                      <div className="h-3 w-full bg-ocean-blue rounded-full opacity-80" />

                      {/* Content lines */}
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-lg bg-crystal-blue" />
                        <div className="flex-1 h-2 bg-baby-blue/30 rounded-full" />
                      </div>

                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-lg bg-baby-blue" />
                        <div className="flex-1 h-2 bg-baby-blue/30 rounded-full" />
                      </div>

                      {/* Typography sample */}
                      <div className="mt-4 flex flex-col gap-2">
                        <div className="h-2 w-3/4 bg-ocean-blue/20 rounded-full" />
                        <div className="h-2 w-1/2 bg-ocean-blue/20 rounded-full" />
                      </div>

                      {/* Color palette sample */}
                      <div className="mt-auto flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-ocean-blue" />
                        <div className="w-6 h-6 rounded-full bg-crystal-blue" />
                        <div className="w-6 h-6 rounded-full bg-baby-blue" />
                      </div>
                    </div>
                  </figure>
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
              </motion.section>

              {/* Color Palette Section */}
              <motion.section variants={itemVariants} className="w-full">
                <h2 className="text-3xl font-bold text-coal-black mb-8">
                  Brand Colors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-ocean-blue"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Ocean Blue
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#17222D</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm font-semibold">
                            QMaster Usage:
                          </p>
                          <p className="text-slate-grey text-sm">
                            Primary brand color, used for main backgrounds and
                            navigation
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-slate-grey text-sm font-semibold mb-2">
                          Suggested Uses:
                        </p>
                        <ul className="text-slate-grey text-sm list-disc pl-4">
                          <li>Professional dashboards</li>
                          <li>Header backgrounds</li>
                          <li>Primary navigation</li>
                          <li>Dark mode themes</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-concrete-turqouise"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Concrete Turquoise
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#13404D</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm font-semibold">
                            QMaster Usage:
                          </p>
                          <p className="text-slate-grey text-sm">
                            Secondary background color, used for gradients and
                            cards
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-slate-grey text-sm font-semibold mb-2">
                          Suggested Uses:
                        </p>
                        <ul className="text-slate-grey text-sm list-disc pl-4">
                          <li>Gradient transitions</li>
                          <li>Secondary containers</li>
                          <li>Section backgrounds</li>
                          <li>Depth indicators</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-baby-blue"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Baby Blue
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#1DCDFE</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm font-semibold">
                            QMaster Usage:
                          </p>
                          <p className="text-slate-grey text-sm">
                            Accent color, used for interactive elements and
                            highlights
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-slate-grey text-sm font-semibold mb-2">
                          Suggested Uses:
                        </p>
                        <ul className="text-slate-grey text-sm list-disc pl-4">
                          <li>Call-to-action buttons</li>
                          <li>Active states</li>
                          <li>Progress indicators</li>
                          <li>Important notifications</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-dark-grey"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Dark Grey
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#515151</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm font-semibold">
                            QMaster Usage:
                          </p>
                          <p className="text-slate-grey text-sm">
                            Used for text and form inputs
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-slate-grey text-sm font-semibold mb-2">
                          Suggested Uses:
                        </p>
                        <ul className="text-slate-grey text-sm list-disc pl-4">
                          <li>Body text</li>
                          <li>Form field text</li>
                          <li>Secondary information</li>
                          <li>Subtle UI elements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-off-white"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Off White
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#D9D9D9</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm">
                            Light mode backgrounds and subtle accents
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-lite-grey"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Lite Grey
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#ADADAD</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm">
                            Used for borders and dividers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-lava-red"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Lava Red
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#B41818</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm">
                            Used for error states and destructive actions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="w-16 h-16 rounded-lg mb-4 bg-coal-black"></div>
                        <h3 className="text-lg font-bold text-coal-black mb-1">
                          Coal Black
                        </h3>
                        <p className="text-dark-grey text-sm mb-4">#2F2E41</p>
                        <div className="min-h-[60px]">
                          <p className="text-slate-grey text-sm">
                            Used for deep backgrounds and text
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Typography Section */}
              <motion.section variants={itemVariants} className="w-full">
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
                          style={{ fontFamily: "Jost" }}
                        >
                          Jost
                        </p>
                        <p className="text-dark-grey">
                          Primary font for mobile app
                        </p>
                        <ul className="text-slate-grey text-sm list-disc pl-4 mt-2">
                          <li>Regular weight for body text</li>
                          <li>Bold weight for headings</li>
                          <li>Used in navigation and main content</li>
                        </ul>
                      </div>
                      <div>
                        <p
                          className="text-4xl text-coal-black font-bold mb-2"
                          style={{ fontFamily: "Istok Web" }}
                        >
                          Istok
                        </p>
                        <p className="text-dark-grey">
                          Secondary font for mobile app
                        </p>
                        <ul className="text-slate-grey text-sm list-disc pl-4 mt-2">
                          <li>Used for buttons and CTAs</li>
                          <li>Bold weight for emphasis</li>
                          <li>Interactive elements</li>
                        </ul>
                      </div>
                      <div>
                        <p
                          className="text-4xl text-coal-black font-bold mb-2"
                          style={{ fontFamily: "Inter" }}
                        >
                          Inter
                        </p>
                        <p className="text-dark-grey">Supplementary font</p>
                        <ul className="text-slate-grey text-sm list-disc pl-4 mt-2">
                          <li>Used for specific components</li>
                          <li>Monospace variations</li>
                          <li>Technical content</li>
                        </ul>
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
              </motion.section>

              {/* Usage Guidelines */}
              <motion.section variants={itemVariants} className="w-full">
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
              </motion.section>

              {/* Contact Section */}
              <motion.section
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
                  className="bg-ocean-blue hover:bg-opacity-90 inline-flex items-center justify-center mb-16 px-8 py-4 text-lg font-bold text-white rounded-full transition-all"
                >
                  Contact Media Team
                </a>
              </motion.section>
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
