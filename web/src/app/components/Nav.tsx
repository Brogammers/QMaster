import Image from "next/image";
import NavLogo from "../../../public/NavigationLogo.svg";
import MobileNavLogo from "../../../public/MobileNavLogo.svg";
import Link from "next/link";

export default function Nav() {
  return (
    <nav id="nav">
      <div className="container">
        <div className="row">
          <div className="w-full flex justify-between items-center">
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
                  Business Sign In
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hidden sm:block double__color--btn text-white text-md font-bold rounded-full py-3 px-6"
                >
                  Download the App
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
