import React from "react";
import Image from "next/image";

const Testimonial = () => {
  return (
    <section className="h-[690px]">
      <div className="w-[625px] h-[112px] mx-auto flex flex-col px-4 gap-20">
        <div className="h-28 flex-col flex gap-4 text-center">
          <h2 className="font-medium text-[40px] leading-12 tracking-normal h-12">
            Heartwarming user reviews
          </h2>
          <p className="font-light text-xl leading-6 tracking-normal h-12">
            Real stories from families who found comfort and connection through
            our platform.
          </p>
        </div>

        <Image
          src={"/img/5.png"}
          alt="Logo"
          width={86}
          height={69}
          className="absolute left-100 bottom-[-800]  opacity-50 "
        />

        <div className="rounded-xl w-[838px] h-[306px] py-7 gap-4 tracking-normal">
          <div className="w-[742px] h-62 justify-between">
            <p className=" h-27 font-light text-xl leading-9 ">
              “When my dad passed away this year, I looked for a way to
              immortalize his memory. Tribute Chapters beautifully connects us
              with our loved one’s, and its simplicity is a blessing during
              tough times. Highly recommended.”
            </p>

            <hr className=" my-6 border-gray-300" />

            <div className="text-left w-[193px] h-16">
              <p className="h-8 text-[28px] leading-8">Sarah Connor</p>
              <p className="h-6 font-light text-xl leading-6">California</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 pt-10">
          <span className="w-3 h-3 rounded-full bg-green-300" />
          <span className="w-3 h-3 rounded-full bg-green-300" />
          <span className="w-3 h-3 rounded-full bg-green-700" />
          <span className="w-3 h-3 rounded-full bg-green-300" />
          <span className="w-3 h-3 rounded-full bg-green-300" />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
