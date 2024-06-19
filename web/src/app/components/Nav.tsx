import Image from "next/image";
import NavLogo from "../../../public/NavigationLogo.svg";

export default function Nav() {
  return (
    <nav>
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
            <ul className="flex justify-between items-center gap-20">
              <li>
                <a href="" className="text-white text-md font-bold">
                  Download
                </a>
              </li>
              <li>
                <a href="" className="double__color--btn text-white text-md font-bold rounded-full py-3 px-6">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
