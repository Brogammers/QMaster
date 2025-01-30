import { Button } from "antd";
import Carousel from "../shared/Carousel";
import Image from "next/image";
import HeroQueueImg from "../../../public/HeroQueue.svg";
import HeroManagementImg from "../../../public/HeroManagement.svg";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="container h-screen">
      <div className="row">
        <header className="mt-4 xsm:m-0">
          <Carousel onSlideChange={handleSlideChange}>
            <div className="py-4 text-center flex flex-col items-center gap-16">
              <h1 className="text-4xl xsm:text-6xl xl:text-8xl font-bold">
                Wait Less.
                <br />
                Live More.
              </h1>
              <h2 className="text-lg xsm:text-2xl">
                Effortlessly <span className="font-bold">manage</span> and{" "}
                <span className="font-bold">optimize</span>{" "}
                <span className="double__color--text">wait times</span>
              </h2>
              <div className="flex gap-4">
                <Link
                  href="/business"
                  className={`${
                    activeSlide === 1
                      ? "double__color--btn"
                      : "border-2 border-white hover:bg-white/10"
                  } px-8 py-4 text-white font-bold text-lg rounded-full outline-none transition-colors`}
                >
                  For Businesses
                </Link>
                <Link
                  href="/app-users"
                  className={`${
                    activeSlide === 0
                      ? "double__color--btn"
                      : "border-2 border-white hover:bg-white/10"
                  } px-8 py-4 text-white font-bold text-lg rounded-full outline-none transition-colors`}
                >
                  For App Users
                </Link>
              </div>
              <figure className="w-1/2 max-h-52 flex justify-center items-center">
                <Image src={HeroQueueImg} alt="Queue Image" />
              </figure>
            </div>
            <div className="py-4 text-center flex flex-col items-center gap-16">
              <h1 className="text-4xl xsm:text-6xl xl:text-8xl font-bold">
                Streamline Operations.
                <br />
                Boost Efficiency
              </h1>
              <h2 className="text-lg xsm:text-2xl">
                Enhance <span className="font-bold">customer satisfaction</span>{" "}
                with seamless queue{" "}
                <span className="double__color--text">integration</span>
              </h2>
              <div className="flex gap-4">
                <Link
                  href="/business"
                  className={`${
                    activeSlide === 1
                      ? "double__color--btn"
                      : "border-2 border-white hover:bg-white/10"
                  } px-8 py-4 text-white font-bold text-lg rounded-full outline-none transition-colors`}
                >
                  For Businesses
                </Link>
                <Link
                  href="/app-users"
                  className={`${
                    activeSlide === 0
                      ? "double__color--btn"
                      : "border-2 border-white hover:bg-white/10"
                  } px-8 py-4 text-white font-bold text-lg rounded-full outline-none transition-colors`}
                >
                  For App Users
                </Link>
              </div>
              <figure className="w-1/2 max-h-52 flex justify-center items-center">
                <Image src={HeroManagementImg} alt="Management Image" />
              </figure>
            </div>
          </Carousel>
          {/* <button className="text-center flex items-center">
            <a href="" className="text-center">
              &#9660;
            </a>
          </button> */}
        </header>
      </div>
    </div>
  );
}
