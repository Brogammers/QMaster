import { useEffect } from "react";
import Image from "next/image";
import HomeScreenImg from "../../../public/PrototypeOne.svg";
import QueueScreenImg from "../../../public/PrototypeTwo.svg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Perks() {

  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      offset: 200,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section>
      <div className="container">
        <div className="w-full flex items-center  mb-48 xsm:mb-96">
          <div className="row w-1/2">
            <h3 data-aos="fade-right" className="text-3xl xsm:text-4xl sm:text-6xl xl:text-8xl w-1/2 leading-normal font-bold">
              Powerful Account
            </h3>
          </div>
          <Image
            src={HomeScreenImg}
            alt="QMaster App - Home Screen"
            className="phone__mockup absolute right-0"
            data-aos="fade-left"
          />
        </div>
        <div className="w-full flex items-center ">
          <Image
            src={QueueScreenImg}
            alt="QMaster App - Queuing Screen"
            className="phone__mockup absolute left-0"
            data-aos="fade-right"
          />
          <div className="row w-1/2">
            <h3 data-aos="fade-left" className="pl-8 lg:pl-12 xl:pl-16 text-3xl xsm:text-4xl sm:text-6xl xl:text-8xl w-1/2 float-right leading-normal font-bold">
              Seamless Queuing
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
