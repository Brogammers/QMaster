"use client";

import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Perks from "./components/Perks";
import Footer from "./components/Footer";
import Support from "./components/Support";
import Features from "./components/Features";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "@/hooks/useTranslation";

export default function LandingPage() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      offset: 200,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="body w-full leading-loose scroll-smooth overflow-x-hidden overflow-y-visible">
      <Nav />
      <Hero />
      <main className="w-full">
        <Perks />
        <h5
          data-aos="fade-up"
          className="text-coal-black text-md xsm:text-lg text-center py-48 leading-loose"
        >
          {t("Join tawabiry with just a few clicks")}
          <br />
          {t("and enjoy")}{" "}
          <span className="font-bold underline">{t("wait-free")}</span>{" "}
          {t("customer experiences")}
        </h5>
        <Features />
        <Support />
      </main>
      <Footer />
    </div>
  );
}
