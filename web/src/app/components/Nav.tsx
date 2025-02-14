import Image from "next/image";
import NavLogo from "../../../public/NavigationLogo.svg";
import MobileNavLogo from "../../../public/MobileNavLogo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { FaGlobe } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const isTransparent = pathname === "/business" || pathname === "/app-users";
  const isComingSoon = pathname === "/coming-soon";
  const { currentLanguage, changeLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === "ar" ? "en" : "ar";
    changeLanguage(newLang);
  };

  return (
    <nav
      className={`${isTransparent ? "absolute top-0 left-0 right-0 z-50" : ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="w-full flex justify-between items-center py-4">
            <Link href="/">
              <figure>
                <Image
                  src={NavLogo}
                  alt="QMaster Logo"
                  width={200}
                  className="hidden sm:block"
                />
                <Image
                  src={MobileNavLogo}
                  alt="QMaster Logo"
                  width={49.78}
                  className="block sm:hidden"
                />
              </figure>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden sm:flex justify-between items-center sm:gap-8">
              <li>
                <Link
                  href="/login"
                  className="border-2 border-white text-white text-md font-bold rounded-full py-3 px-6"
                >
                  {isComingSoon ? "Business Sign Up" : "Business Sign In"}
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="double__color--btn text-white text-md font-bold rounded-full py-3 px-6"
                >
                  {isComingSoon ? "Presave App" : "Download the App"}
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleLanguage}
                  className="border-2 border-baby-blue flex items-center gap-2 px-4 py-2 bg-transparent rounded-full text-baby-blue hover:bg-white hover:text-baby-blue transition-colors"
                >
                  <FaGlobe className="w-4 h-4" />
                  <span className="font-medium">
                    {currentLanguage === "ar" ? "EN" : "عربي"}
                  </span>
                </button>
              </li>
            </ul>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
            >
              <span
                className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
                }`}
              />
            </button>

            {/* Mobile Menu Overlay */}
            <div
              className={`fixed inset-0 w-screen h-screen touch-none bg-black/95 z-40 transition-all duration-300 sm:hidden ${
                isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div className="flex items-center justify-center w-full h-full px-4">
                <ul className="flex flex-col items-center justify-center gap-8 w-full max-w-sm">
                  <li className="w-full text-center">
                    <Link
                      href="/login"
                      className="inline-block w-full text-white text-xl font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {isComingSoon ? "Business Sign Up" : "Business Sign In"}
                    </Link>
                  </li>
                  <li className="w-full text-center">
                    <Link
                      href=""
                      className="inline-block w-full text-white text-xl font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {isComingSoon ? "Presave App" : "Download the App"}
                    </Link>
                  </li>
                  <li className="w-full flex justify-center">
                    <button
                      onClick={() => {
                        toggleLanguage();
                        setIsMenuOpen(false);
                      }}
                      className="border-2 border-baby-blue flex items-center gap-2 px-4 py-2 bg-transparent rounded-full text-baby-blue hover:bg-white hover:text-baby-blue transition-colors"
                    >
                      <FaGlobe className="w-4 h-4" />
                      <span className="font-medium">
                        {currentLanguage === "ar" ? "EN" : "عربي"}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
