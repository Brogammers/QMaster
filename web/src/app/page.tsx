"use client"

import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Perks from "./components/Perks";
import Footer from "./components/Footer";
import Support from "./components/Support";
import Features from "./components/Features";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage() {

  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      offset: 200,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="body w-full leading-loose overflow-x-hidden">
      <Nav />
      <Hero />
      <main className="w-full">
        <Perks />
        <h5 data-aos="fade-up" className="text-coal-black text-lg text-center py-48 leading-loose">
          Join QMaster with just a few clicks
          <br />
          and enjoy <span className="font-bold underline">wait-free</span> customer experiences
        </h5>
        <Features />
        <Support />
      </main>
      <Footer />
    </div>
  );
}
