import { useEffect } from "react";
import Image from "next/image";
import { features } from "../../../constants";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Features() {

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
        <div className="row">
        {features.map((feature, index) => (
            <div key={index} data-aos="fade-up" className={`w-full mb-32 flex ${index % 2 !== 0 ? "flex-row-reverse" : "flex-row"} justify-between items-start gap-56`}>
              <figure className="w-1/2">
                <Image
                  src={feature.image}
                  alt={feature.attribution}
                  width={658}
                  height={504}
                />
              </figure>
              <div className="w-1/2 text-coal-black flex flex-col gap-4">
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
        </div>
      </div>
    </section>
  );
};
