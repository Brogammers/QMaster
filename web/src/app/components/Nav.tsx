import Image from "next/image";
import NavLogo from "../../../public/NavigationLogo.svg";
import MobileNavLogo from "../../../public/MobileNavLogo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { FaGlobe } from "react-icons/fa";

export default function Nav() {
  const pathname = usePathname();
  const isTransparent = pathname === "/business" || pathname === "/app-users";
  const isComingSoon = pathname === "/coming-soon";
  const { currentLanguage, changeLanguage } = useTranslation();

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
            <ul className="flex justify-between items-center sm:gap-8">
              <li>
                <Link
                  href="/login"
                  className="hidden sm:block border-2 border-white text-white text-md font-bold rounded-full py-3 px-6"
                >
                  {isComingSoon ? "Business Sign Up" : "Business Sign In"}
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hidden sm:block double__color--btn text-white text-md font-bold rounded-full py-3 px-6"
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
          </div>
        </div>
      </div>
    </nav>
  );
}
