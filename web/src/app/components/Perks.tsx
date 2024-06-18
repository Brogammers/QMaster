import Image from "next/image";
import HomeScreenImg from "../../../public/PrototypeOne.svg";
import QueueScreenImg from "../../../public/PrototypeTwo.svg";

export default function Perks() {
  return (
    <section>
      <div className="container">
        <div className="w-full flex items-start mb-96">
          <div className="row">
            <h3 className="text-8xl w-1/2">
              Powerful Account
            </h3>
          </div>
          <Image
            src={HomeScreenImg}
            alt="QMaster App - Home Screen"
            className="absolute right-0"
          />
        </div>
        <div className="w-full flex items-start">
          <Image
            src={QueueScreenImg}
            alt="QMaster App - Queuing Screen"
            className="absolute left-0"
          />
          <div className="row">
            <h3 className="pl-16 text-8xl w-1/2 float-right">
              Seamless Queuing
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
