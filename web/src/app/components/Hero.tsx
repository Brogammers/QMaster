import { Button } from "antd";
import Carousel from "../shared/Carousel";
import Image from "next/image";
import HeroQueueImg from "../../../public/HeroQueue.svg";
import HeroManagementImg from "../../../public/HeroManagement.svg";

export default function Hero() {
  return (
    <div className="container h-screen">
      <div className="row">
        <header>
          <Carousel>
            <div className="py-4 text-center flex flex-col items-center gap-16">
              <h1 className="text-6xl xl:text-8xl font-bold">
                Wait Less.
                <br />
                Live More.
              </h1>
              <h2 className="text-2xl">
                Effortlessly <span className="font-bold">manage</span> and <span className="font-bold">optimize</span> <span className="double__color--text">wait times</span>
              </h2>
              <button className="double__color--btn px-8 py-4 text-white font-bold text-lg rounded-full outline-none">
                Download Now
              </button>
              <figure className="w-1/2 max-h-52 flex justify-center items-center">
                <Image 
                  src={HeroQueueImg}
                  alt="Queue Image"
                />
              </figure>
            </div>
            <div className="py-4 text-center flex flex-col items-center gap-16">
              <h1 className="text-6xl xl:text-8xl font-bold">
                Streamline Operations.
                <br />
                Boost Efficiency
              </h1>
              <h2 className="text-2xl">
                Enhance <span className="font-bold">customer satisfaction</span> with seamless queue <span className="double__color--text">integration</span>
              </h2>
              <button className="double__color--btn px-8 py-4 text-white font-bold text-lg rounded-full outline-none">
                Get Started
              </button>
              <figure className="w-1/2 max-h-52 flex justify-center items-center">
                <Image 
                  src={HeroManagementImg}
                  alt="Managament Image"
                />
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
};
