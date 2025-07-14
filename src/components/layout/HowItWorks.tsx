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
  <div className="w-full px-4 py-16 md:px-10 lg:px-20 flex flex-col items-center">
    {/* Header */}
    <div className="max-w-3xl text-center mb-12 px-4">
      <h2 className="text-3xl md:text-4xl font-medium leading-snug mb-4">
        How it works?
      </h2>
      <p className="text-lg museo font-light text-gray-600">
        A simple way to honor, remember, and share the story of your loved
        one&apos;s life.
      </p>
    </div>

    {/* Steps */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1128px]">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`rounded-xl flex flex-col items-center text-center px-6 py-8 gap-6 ${step.bg}`}
        >
          <Image
            src={step.img}
            alt={`Step ${idx + 1}`}
            width={200}
            height={200}
            className="w-[200px] h-[200px]"
          />
          
          <div className="space-y-2">
            <h3 className={`text-2xl font-bold ${step.text}`}>{step.title}</h3>
            <p className={`text-base museo font-light ${step.text}`}>
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HowItWorks;
