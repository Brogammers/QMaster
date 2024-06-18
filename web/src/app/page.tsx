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
      </main>
    </div>
  );
}
