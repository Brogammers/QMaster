"use client";

import { motion } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Link from "next/link";
import { FaQuestionCircle, FaHome, FaRedo } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import NotFoundImage from '../../public/404.svg'
import Image from 'next/image'

export default function NotFoundPage() {
  const { t, isRTL } = useTranslation();
  const router = useRouter()
  const [entity, setEntity] = useState<string>('')

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
    rotate: {
      rotate: [0, -45, 45, -45, 45, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    // Get entity from URL path
    const pathParts = window.location.pathname.split('/')
    const entityFromPath = pathParts[1]
    setEntity(entityFromPath)
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

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
                    animate="rotate"
                  >
                    <FaQuestionCircle className="w-20 h-20 text-baby-blue mx-auto" />
                  </motion.div>

                  <motion.h1
                    className="text-4xl xsm:text-6xl xl:text-8xl font-bold text-white mb-8"
                    variants={itemVariants}
                  >
                    404
                    <br />
                    <span className="double__color--text">
                      {t("Page Not Found")}
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-xl text-white/90 mb-12"
                    variants={itemVariants}
                  >
                    {t("Oops! The page you're looking for doesn't exist.")}
                    <br />
                    {t("Let's get you back on track!")}
                  </motion.p>

                  <motion.div
                    className="flex flex-col gap-6 items-center"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-4 text-white/80">
                      <FaHome className="w-5 h-5" />
                      <span>{t("Try going back to our homepage")}</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                      <Link
                        href="/"
                        className="double__color--btn inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full hover:opacity-90 transition-all gap-2"
                      >
                        <FaHome className="w-5 h-5" />
                        {t("Go Home")}
                      </Link>
                      <motion.button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-8 py-4 bg-baby-blue/20 rounded-full text-baby-blue hover:bg-baby-blue/30 transition-all"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <FaRedo className="w-5 h-5" />
                        {t("Refresh")}
                      </motion.button>
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
