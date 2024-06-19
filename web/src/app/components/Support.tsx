import Image from "next/image";
import Link from "next/link";
import SupportImg from "../../../public/SupportImage.svg";

export default function Support() {
  return (
    <section className="double__color--btn py-4">
      <div className="container">
        <div className="row">
          <div className="w-full flex justify-between items-start gap-24">
            <div className="w-1/2 flex flex-col gap-8">
              <h3 className="text-5xl font-bold leading-normal">
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
            <figure className="w-1/2">
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
