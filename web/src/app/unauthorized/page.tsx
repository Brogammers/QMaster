"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import { FaLock, FaHome, FaSignInAlt } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const { t, isRTL } = useTranslation();
  const router = useRouter();

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

  const iconVariants = {
    shake: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible relative min-h-screen bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--baby-blue)_1px,_transparent_1px)] bg-[length:40px_40px]"
        />
      </div>

      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />

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
                    variants={iconVariants}
                    animate="shake"
                  >
                    <FaLock className="w-20 h-20 text-baby-blue mx-auto" />
                  </motion.div>

                  <motion.h1
                    className="text-4xl xsm:text-6xl xl:text-8xl font-bold text-white mb-8"
                    variants={itemVariants}
                  >
                    401
                    <br />
                    <span className="double__color--text">
                      {t("Unauthorized Access")}
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-xl text-white/90 mb-12"
                    variants={itemVariants}
                  >
                    {t("Sorry! You don't have permission to access this page.")}
                    <br />
                    {t(
                      "Please sign in or contact support if you think this is a mistake."
                    )}
                  </motion.p>

                  <motion.div
                    className="flex flex-col gap-6 items-center"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-4 text-white/80">
                      <FaSignInAlt className="w-5 h-5" />
                      <span>{t("Sign in to access this page")}</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                      <Link
                        href="/login"
                        className="double__color--btn inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full hover:opacity-90 transition-all gap-2"
                      >
                        <FaSignInAlt className="w-5 h-5" />
                        {t("Business Sign In")}
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-4 bg-baby-blue/20 rounded-full text-baby-blue hover:bg-baby-blue/30 transition-all"
                      >
                        <FaHome className="w-5 h-5" />
                        {t("Go Home")}
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
