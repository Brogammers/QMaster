import Image from "next/image";
import FooterLogo from "../../../public/FooterLogo.svg";
import { footerLinks } from "../../../constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <figure>
            <Image
              src={FooterLogo}
              alt="QMaster Footer Logo"
            />
          </figure>
          <ul>
            {footerLinks.map((item) => (
              <div key={item.title} className="footer__link">
                <h3 className="font-bold">{item.title}</h3>
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
        </div>
      </div>
    </footer>
  );
};
