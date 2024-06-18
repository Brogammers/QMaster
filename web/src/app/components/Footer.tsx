import Image from "next/image";
import FooterLogo from "../../../public/FooterLogo.svg";

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
            {footerLinks.map()}
          </ul>
        </div>
      </div>
    </footer>
  );
};
