"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/constants/heartwarming";

const Testimonial = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  const testimonial = testimonials[current];

  return (
    <div className="w-full h-[600px] md:h-[690px] bg-[#f7fbf8] relative flex flex-col px-4 md:px-[153px] py-10 justify-between">
      {/* Title */}
      <div className="w-full md:w-[625px] mx-auto h-auto flex-col flex gap-4 text-center">
        <h2 className="font-medium text-[28px] md:text-[40px] leading-tight md:leading-12">
          Heartwarming user reviews
        </h2>
        <p className="font-light museo text-base md:text-xl leading-6">
          Real stories from families who found comfort and connection through
          our platform.
        </p>
      </div>

      {/* Image only visible on desktop */}
      <Image
        src="/img/5.png"
        alt="Logo"
        width={86}
        height={69}
        className="hidden md:block absolute left-10 md:left-60 2xl:left-110 top-40 opacity-50"
      />

      {/* Testimonial content */}
      <div className="w-full md:w-[838px] mx-auto py-7 px-4 md:px-12 transition-all duration-500 ease-in-out">
        <div className="w-full md:w-[742px] h-auto">
          <p className="font-light museo text-base md:text-xl leading-7 md:leading-9">
            {testimonial.quote}
          </p>
          <hr className="my-6 border-gray-300" />
          <div className="text-left flex flex-col gap-2">
            <p className="text-xl md:text-[28px] leading-7 md:leading-8 font-medium">
              {testimonial.name}
            </p>
            <p className="font-light museo text-base md:text-xl leading-6">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center space-x-2 pt-10">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`rounded-full cursor-pointer transition-all duration-300 ${
              i === current
                ? "w-4 h-4 md:w-5 md:h-5 bg-green-700"
                : "w-2.5 h-2.5 md:w-3 md:h-3 bg-green-300"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
