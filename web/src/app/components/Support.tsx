import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SupportImg from "../../../public/SupportImage.svg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Support() {

  useEffect(() => {
    AOS.init({
      duration: 200, // Animation duration
      offset: 50,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section data-aos="fade-left" className="double__color--btn py-4">
      <div className="container">
        <div className="row">
          <div data-aos="fade-right" data-aos-duration="800" data-aos-offset="600" className="w-full flex flex-col sm:flex-row items-center sm:justify-between sm:items-start gap-24">
            <div className="w-full sm:w-1/2 flex flex-col gap-8">
              <h3 className="text-6xl sm:text-5xl font-bold leading-normal">
                Need Assistance?
                <br />
                We&apos;re Here to Help! 
              </h3>
              <h4 className="text-3xl mb-4">
                Reach Out Anytime
              </h4>
              <p>
                If you have any questions or need help, you can contact us directly through the feedback feature within our app under the &quot;Account&quot; section, or email us directly at <Link href="mailto:support@qmaster.com">support@qmaster.com</Link>. We&apos;ll respond within 24 hours to make your day easier.
              </p>
            </div>
            <figure className="w-full sm:w-1/2">
              <Image
                src={SupportImg}
                alt="Contact Support Images"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
