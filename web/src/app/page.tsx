"use client"

import Hero from "./components/Hero";
import Nav from "./components/Nav";

export default function LandingPage() {
  return (
    <div className="body w-full">
      <Nav />
      <Hero />
    </div>
  );
}
