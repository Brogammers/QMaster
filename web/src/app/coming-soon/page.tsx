"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import { FaRocket, FaBell, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const rocketVariants = {
    hover: {
      y: [0, -10, 0],
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bellVariants = {
    shake: {
      rotate: [0, -15, 15, -15, 15, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    disabled: {
      opacity: 0.5,
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        rotate: {
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        },
      },
    },
    enabled: {
      opacity: 1,
    },
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Add your subscription logic here
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  // Validate email format
  const isValidEmail =
    email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible relative min-h-screen bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black">
      {/* Animated background dots - moved to cover entire page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--baby-blue)_1px,_transparent_1px)] bg-[length:40px_40px]"
        />
      </div>

      {/* Noise texture - moved to cover entire page */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10">
        <Nav />
        <main className="w-full">
          <section className="mt-0 mb-48 min-h-[calc(100vh-160px)] flex items-center justify-center">
            <motion.div
              className="container relative"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="row">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    className="mb-8"
                    variants={rocketVariants}
                    animate="hover"
                  >
                    <FaRocket className="w-20 h-20 text-baby-blue mx-auto" />
                  </motion.div>

                  <motion.h1
                    className="text-4xl xsm:text-6xl xl:text-8xl font-bold text-white mb-8"
                    variants={itemVariants}
                  >
                    Something Amazing is
                    <br />
                    <span className="double__color--text">Coming Soon</span>
                  </motion.h1>

                  <motion.p
                    className="text-xl text-white/90 mb-12"
                    variants={itemVariants}
                  >
                    We&apos;re crafting something special for you.
                    <br />
                    Be the first to know when we launch!
                  </motion.p>

                  <motion.div
                    className="flex flex-col gap-8 items-center"
                    variants={itemVariants}
                  >
                    {/* Notification Form */}
                    <form
                      onSubmit={handleSubscribe}
                      className="w-full max-w-md relative"
                    >
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          placeholder="Enter your email"
                          className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-baby-blue"
                        />
                        <motion.button
                          whileHover={isValidEmail ? { scale: 1.05 } : {}}
                          whileTap={isValidEmail ? { scale: 0.95 } : {}}
                          animate={[
                            isShaking ? "shake" : "",
                            !isValidEmail && isFocused ? "disabled" : "enabled",
                          ]}
                          variants={bellVariants}
                          type="submit"
                          disabled={!isValidEmail}
                          className={`absolute right-2 top-2 p-4 rounded-full transition-all ${
                            isValidEmail
                              ? "bg-baby-blue text-ocean-blue hover:opacity-90 cursor-pointer"
                              : "bg-gray-400 text-gray-600 cursor-not-allowed"
                          }`}
                        >
                          <FaBell className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </form>

                    {/* Success Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isSubscribed ? 1 : 0,
                        y: isSubscribed ? 0 : 10,
                      }}
                      className="flex items-center gap-2 text-baby-blue"
                    >
                      <FaEnvelope className="w-4 h-4" />
                      <span>We&apos;ll notify you when we launch!</span>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                      <Link
                        href="/login"
                        className="double__color--btn inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full hover:opacity-90 transition-all"
                      >
                        Business Sign Up
                      </Link>
                      <Link
                        href="/customer-app"
                        className="bg-white inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-ocean-blue rounded-full hover:bg-opacity-90 transition-colors"
                      >
                        Presave App
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
