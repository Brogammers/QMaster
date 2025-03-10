"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import FooterLogo from "../../../public/FooterLogo.svg";
import { footerLinks, StoreBadges } from "../../../constants";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  const isSpecialPage =
    pathname === "/coming-soon" ||
    pathname === "/maintenance" ||
    pathname === "/unauthorized";
    
  const textColorClass = isSpecialPage ? "text-white" : "text-coal-black";

  const isExternalLink = (url: string) => {
    return url.startsWith("http") || url.startsWith("https");
  };

  return (
    <footer className={textColorClass}>
      <div className="container">
        <div className="row">
          <div className="mb-24 flex flex-col gap-16 items-start xsm:items-center sm:gap-0 sm:flex-row justify-between sm:items-start">
            <figure>
              <Link href="#nav">
                <Image src={FooterLogo} alt="QMaster Footer Logo" />
              </Link>
            </figure>
            <ul className="pl-4 xsm:pl-0 flex flex-col xsm:flex-row justify-between items-start gap-16">
              {footerLinks.map((item) => (
                <div key={item.title} className="footer__link">
                  <h3 className="font-bold mb-4">{item.title}</h3>
                  <div className="flex flex-col gap-5">
                    {item.links.map((link) => (
                      <Link
                        key={link.title}
                        href={link.url}
                        className={`${
                          (link.title === "Facebook" ||
                            link.title === "Instagram" ||
                            link.title === "Twitter") &&
                          "cursor-not-allowed"
                        }`}
                        {...(isExternalLink(link.url) && { target: "_blank" })}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </ul>
            <ul className="flex flex-col justify-start items-center gap-4">
              {StoreBadges.map((StoreBadge, index) => (
                <li key={index}>
                  <Link
                    href={StoreBadge.url}
                    {...(isExternalLink(StoreBadge.url) && {
                      target: "_blank",
                    })}
                  >
                    <Image
                      src={StoreBadge.icon}
                      alt={StoreBadge.name}
                      width={160}
                      height={51}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <h6 className="text-sm text-center xsm:text-start">
            All rights reserved &ndash; {new Date().getFullYear()} &copy;
            QMaster
          </h6>
        </div>
      </div>
    </footer>
  );
}
