import Image from "next/image";
import React from "react";

const steps = [
  {
    title: "Create Your Account",
    description:
      "Sign up with your name and email to get started. It's quick, secure and free to begin.",
    img: "/img/2.png",
    bg: "bg-[#E5F6EC]",
    text: "text-black",
  },
  {
    title: "Build The Tribute Page",
    description:
      "Add photos, stories and memories. Customize the page with memories and milestones.",
    img: "/img/3.png",
    bg: "bg-[#C2DBD4]",
    text: "text-black",
  },
  {
    title: "Share and Celebrate",
    description:
      "Invite family and friends to visit, contribute and leave messages. Celebrate your loved one&apos;s life together.",
    img: "/img/4.png",
    bg: "bg-[#E5F6EC]",
    text: "text-[#1F7023]",
  },
];

const HowItWorks = () => (
  <div className="h-[716px] w-full gap-1 px-39 py-20 flex flex-col">
    <div className="w-[1128px] h-[556px] mx-auto flex flex-col gap-10">
      <div className="w-[625px] h-28 flex flex-col mx-auto gap-4">
        <h2 className="h-12 text-[40px] font-medium leading-12 tracking-normal text-center">
          How it works?
        </h2>
        <p className="h-12 text-xl museo font-light leading-7 tracking-normal text-center ">
          A simple way to honor, remember, and share the story of your loved
          one&apos;s life.
        </p>
      </div>
      <div className="w-[1128px] h-[404px] flex flex-col md:flex-row gap-[45px] justify-center items-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`rounded-xl  w-[346px] h-[404px] flex flex-col items-center py-8 px-6 gap-7 ${step.bg}`}
          >
            <Image
              src={`${step.img}`}
              alt="Logo"
              width={200}
              height={200}
              className="w-[200px] h-[200px]"
            />
            <div className="w-74.5 h-[122px] gap-3 flex flex-col ">
              <h3
                className={`h-7 font-bold text-2xl leading-7 text-center align-middle ${step.text}`}
              >
                {step.title}
              </h3>
              <p
                className={`h-18 font-light museo text-base leading-6 text-center align-middle ${step.text}`}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HowItWorks;
