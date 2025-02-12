"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaTools, FaClock, FaRedo } from "react-icons/fa";

export default function MaintenancePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const iconVariants = {
    rotate: {
      rotate: [0, -45, 45, -45, 45, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible">
      <Nav />
      <main className="w-full">
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-ocean-blue via-concrete-turqouise to-coal-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />
          
          <motion.div 
            className="container relative z-10"
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
                  We&apos;re currently improving our system to serve you better.
                  <br />
                  Please check back soon!
                </motion.p>

                <motion.div 
                  className="flex flex-col gap-6 items-center"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-4 text-white/80">
                    <FaClock className="w-5 h-5" />
                    <span>Estimated downtime: 2 hours</span>
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
                      onClick={() => window.location.reload()}
                      className="flex items-center gap-2 px-6 py-3 bg-baby-blue/20 rounded-full text-baby-blue hover:bg-baby-blue/30 transition-all"
                    >
                      <FaRedo className="w-4 h-4" />
                      <span>Refresh Page</span>
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
  );
} 