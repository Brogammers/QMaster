"use client"

import { useEffect } from "react";
import Image from "next/image";
import { features } from "../../../constants";
import AOS from "aos";
import "aos/dist/aos.css";
import { AndroidFrame, IPadFrame, IPhoneFrame } from "react-framify";
import FrameSetSSOne from "../../../public/iqueue-1.png";
import FrameSetSSTwo from "../../../public/iqueue-2.png";
import FrameSetSSThree from "../../../public/iqueue-3.png";
import FrameSetSSFour from "../../../public/iqueue-4.png";

export default function Features() {

  const screenshotList = [
    FrameSetSSOne.src,
    FrameSetSSTwo.src,
    FrameSetSSThree.src,
    FrameSetSSFour.src
  ];

  useEffect(() => {
    AOS.init({
      duration: 600, 
      offset: 200,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} data-aos="fade-up" className={`w-full mb-32 flex flex-col sm:flex-row ${index % 2 !== 0 ? "sm:flex-row-reverse" : ""} items-center sm:justify-between sm:items-start md:gap-56`}>
              <figure className="w-full sm:w-1/2 mb-16 sm:mb-0">
                <Image
                  src={feature.image}
                  alt={feature.attribution}
                  width={658}
                  height={504}
                />
              </figure>
              <div className="w-full sm:w-1/2 text-coal-black flex flex-col gap-4 text-center sm:text-start">
                <h4 className="text-2xl font-bold">
                  {feature.title}
                </h4>
                <h5 className="text-2xl font-bold mb-8">
                  {feature.subtitle}
                </h5>
                {feature.paragraphs.map((para, paraIndex) => (
                  <p key={paraIndex} className="leading-loose mb-2">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-24">
            <h5 className="text-4xl font-bold mb-2 text-coal-black text-center">A Sneak Peek of What <span className="text-baby-blue">QMaster Offers.</span></h5>
            <IPhoneFrame 
              screenshotList={screenshotList}
              statusBar={{ mode: "light" }}
              buttonStyles={{
                backgroundColor: "#1DCDFE",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
