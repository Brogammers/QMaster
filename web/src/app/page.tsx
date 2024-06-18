"use client"

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Perks from "./components/Perks";

export default function LandingPage() {
  return (
    <div className="body w-full">
      <Nav />
      <Hero />
      <main className="w-full">
        <Perks />
        <h5 className="text-lg text-center py-48">
          Join QMaster with just a few clicks
          <br />
          and enjoy <span className="font-bold underline">wait-free</span> customer experiences
        </h5>
      </main>
    </div>
  );
}
