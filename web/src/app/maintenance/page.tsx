"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaTools, FaClock, FaRedo } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MaintenancePage() {
  const [maintenanceDuration, setMaintenanceDuration] = useState({
    hours: 2,
    minutes: 0,
    displayText: "2 hours",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchMaintenanceDuration = () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS || "";

    axios
      .get(url)
      .then((response) => {
        if (response.data && response.data.maintenanceDuration !== undefined) {
          const totalMinutes = response.data.maintenanceDuration;
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;

          let displayText = "";
          if (hours > 0 && minutes > 0) {
            displayText = `${hours} hour${
              hours > 1 ? "s" : ""
            } and ${minutes} minute${minutes > 1 ? "s" : ""}`;
          } else if (hours > 0) {
            displayText = `${hours} hour${hours > 1 ? "s" : ""}`;
          } else if (minutes > 0) {
            displayText = `${minutes} minute${minutes > 1 ? "s" : ""}`;
          } else {
            displayText = "a short time"; // Fallback if no duration is set
          }

          setMaintenanceDuration({
            hours,
            minutes,
            displayText,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch maintenance duration:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Initial fetch
    setIsLoading(true);
    fetchMaintenanceDuration();

    // Set up polling every 30 seconds to check for updates
    const intervalId = setInterval(() => {
      fetchMaintenanceDuration();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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

  return (
    <div className="w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible relative min-h-screen bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black">
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
                    <FaTools className="w-20 h-20 text-baby-blue mx-auto" />
                  </motion.div>

                  <motion.h1
                    className="text-4xl xsm:text-6xl xl:text-8xl font-bold text-white mb-8"
                    variants={itemVariants}
                  >
                    Under Maintenance
                  </motion.h1>

                  <motion.p
                    className="text-xl text-white/90 mb-12"
                    variants={itemVariants}
                  >
                    We&apos;re currently improving our system to serve you
                    better.
                    <br />
                    Please check back soon!
                  </motion.p>

                  <motion.div
                    className="flex flex-col gap-6 items-center"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-4 text-white/80">
                      <FaClock className="w-5 h-5" />
                      <span>
                        {isLoading
                          ? "Estimating downtime..."
                          : `Estimated downtime: ${maintenanceDuration.displayText}`}
                      </span>
                    </div>

                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <button
                        onClick={() => {
                          setIsLoading(true);
                          fetchMaintenanceDuration();
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-baby-blue/20 rounded-full text-baby-blue hover:bg-baby-blue/30 transition-all"
                      >
                        <FaRedo className="w-4 h-4" />
                        <span>Refresh</span>
                      </button>
                    </motion.div>
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
