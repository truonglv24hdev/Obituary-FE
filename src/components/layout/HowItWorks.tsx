import Image from "next/image";
import React from "react";

const steps = [
  {
    title: "Create Your Account",
    description:
      "Sign up with your name and email to get started. It's quick, secure and free to begin.",
    img: "/img/2.png",
    bg: "bg-[#E5F6EC]",
  },
  {
    title: "Build The Tribute Page",
    description:
      "Add photos, stories and memories. Customize the page with memories and milestones.",
    img: "/img/3.png",
    bg: "bg-[#C2DBD4]",
  },
  {
    title: "Share and Celebrate",
    description:
      "Invite family and friends to visit, contribute and leave messages. Celebrate your loved one&apos;s life together.",
    img: "/img/4.png",
    bg: "bg-[#E5F6EC]",
  },
];

const HowItWorks = () => (
  <section className="h-[716px] gap-1 px-39 py-20 flex flex-col justify-center items-center">
    <div className="w-156 h-28 gap-4">
      <h2 className="h-12 text-[40px] font-medium leading-12 tracking-normal text-center">
        How it works?
      </h2>
      <p className="h-12 text-xl font-light leading-7 tracking-normal text-center ">
        A simple way to honor, remember, and share the story of your loved
        one&apos;s life.
      </p>
    </div>
    <div className="w-[1128px] h-101 flex flex-col md:flex-row gap-[45px] justify-center items-center">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`rounded-xl  w-[346px] h-101 flex flex-col items-center py-8  ${step.bg}`}
        >
          <Image src={`${step.img}`} alt="Logo" width={200} height={200} className="pb-10" />
          <div className="w-74.5 h-28 gap-3 tracking-normal text-center">
            <h3 className="h-7 font-bold text-2xl leading-7 ">{step.title}</h3>
            <p className="h-18 font-light text-base leading-6 ">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
