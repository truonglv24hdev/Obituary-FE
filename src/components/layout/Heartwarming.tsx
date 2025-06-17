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
    <div className="w-full max-w[1440px] h-[690px] bg-[#f7fbf8] relative flex flex-col px-[153px] py-10 justify-between">
      {/* Title */}
      <div className="w-[625px] mx-auto h-28 flex-col flex gap-4 text-center">
        <h2 className="font-medium text-[40px] leading-12 tracking-normal h-12">
          Heartwarming user reviews
        </h2>
        <p className="font-light museo text-xl leading-6 tracking-normal h-12">
          Real stories from families who found comfort and connection through
          our platform.
        </p>
      </div>

      <Image
        src="/img/5.png"
        alt="Logo"
        width={86}
        height={69}
        className="absolute left-60 2xl:left-110 top-40 opacity-50"
      />

      {/* Testimonial Content */}
      <div className="w-[838px] mx-auto py-7 px-12 transition-all duration-500 ease-in-out">
        <div className="w-[838px] mx-auto py-7 px-12">
          <div className="w-[742px] h-62">
            <p className="h-27 font-light museo text-xl leading-9">
              {testimonial.quote}
            </p>
            <hr className="my-6 border-gray-300" />
            <div className="text-left w-[200px] h-16 flex flex-col gap-2">
              <p className="text-[28px] leading-8 ml-1 font-medium">{testimonial.name}</p>
              <p className="font-light museo text-xl leading-6">
                {testimonial.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center space-x-2 pt-10">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`rounded-full cursor-pointer transition-all duration-300 ${
              i === current ? "w-5 h-5 bg-green-700" : "w-3 h-3 bg-green-300"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
