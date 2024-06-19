"use client"

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Perks from "./components/Perks";
import Footer from "./components/Footer";
import Support from "./components/Support";
import Features from "./components/Features";

export default function LandingPage() {
  return (
    <div className="body w-full leading-loose">
      <Nav />
      <Hero />
      <main className="w-full">
        <Perks />
        <h5 className="text-coal-black text-lg text-center py-48 leading-loose">
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
