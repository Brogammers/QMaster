import Image from "next/image";
import FooterLogo from "../../../public/FooterLogo.svg";
import { footerLinks, StoreBadges } from "../../../constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="mb-24 flex justify-between items-start">
            <figure>
              <Image
                src={FooterLogo}
                alt="QMaster Footer Logo"
              />
            </figure>
            <ul className="flex justify-between items-start gap-16">
              {footerLinks.map((item) => (
                <div key={item.title} className="footer__link">
                  <h3 className="font-bold mb-4">{item.title}</h3>
                  <div className="flex flex-col gap-5">
                    {item.links.map((link) => (
                      <Link
                        key={link.title}
                        href={link.url}
                        className={`text-gray-500 ${(link.title === "Events" || link.title === "Partnership" || link.title === "Invite a friend") &&  "cursor-not-allowed"}`}
                        {...(!(link.title === "Events" || link.title === "Partnership" || link.title === "Invite a friend") && { target: "_blank" })}
                        // onClick={(e) => {
                        //   e.preventDefault(); 
                        //   handleLinkClick(link);
                        // }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </ul>
            <ul className="flex flex-col justify-start items-center">
              {StoreBadges.map((StoreBadge, index) => (
                <li key={index}>
                  <Link href={StoreBadge.url}>
                    <Image
                      src={`/${StoreBadge.icon}`}
                      alt={StoreBadge.name}
                      width={160}
                      height={51}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <h6 className="text-sm">All rights reserved &ndash; 2024 &copy; QMaster</h6>
        </div>
      </div>
    </footer>
  );
};
