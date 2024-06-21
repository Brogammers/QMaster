import Image from "next/image";
import NavLogo from "../../../public/NavigationLogo.svg";
import Link from "next/link";

export default function Nav() {
  return (
    <nav id="nav">
      <div className="container">
        <div className="row">
          <div className="w-full flex justify-between items-center">
            <figure>
            <Image
              src={NavLogo}
              alt="QMaster Logo"
              width={200}
            />
            </figure>
            <ul className="flex justify-between items-center sm:gap-20">
              <li>
                <Link 
                  href="" 
                  className="download__btn py-3 px-6 rounded-full sm:p-0 sm:rounded-none text-white text-md font-bold"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link 
                  href="/login" 
                  className="hidden sm:block double__color--btn text-white text-md font-bold rounded-full py-3 px-6"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
