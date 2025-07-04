"use client";
import { useState } from "react";
import { leftMenu, rightContent } from "@/constants/faqs";
import { IconRight } from "../icons";

export default function Faqs({
  className,
  children,
  bg,
}: {
  className?: string;
  bg?: string;
  children?: React.ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(0);

  return (
    <div className={`w-full h-auto py-15  ${className}`}>
      <div className="text-center text-[28px] md:text-[40px] museo font-semibold">
        {children}
      </div>

      <div className="max-w-[1240px] mx-auto h-auto md:h-[712px] flex flex-col md:flex-row gap-6 md:gap-0 justify-between px-4 md:px-0">
        {/* Left Menu */}
        <div className="w-full md:w-99 flex flex-col">
          {leftMenu.map((item, idx) => (
            <div
              key={idx}
              className={`h-auto md:h-18 flex justify-between items-center gap-3 p-5 mb-3 rounded-lg cursor-pointer transition
            ${
              selected === idx
                ? "bg-[#699D99] text-white font-semibold"
                : "bg-[#d5f4e24d] hover:bg-[#eaf6f1] text-[#222] font-semibold"
            }`}
              onClick={() => setSelected(idx)}
            >
              <div className="flex gap-3 items-center w-full">
                <span className="w-7 h-7">{item.icon}</span>
                <span className="text-base md:text-xl museo font-semibold leading-8">
                  {item.title}
                </span>
              </div>
              <span className="w-6 h-6 hidden md:inline">
                <IconRight />
              </span>
            </div>
          ))}
        </div>

        {/* Right Content */}
        <div className="w-full md:w-198 flex flex-col gap-5">
          {rightContent.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg bg-[#f4fbf7] transition ${bg}
            ${open === idx ? "h-auto shadow p-4" : "h-18 p-4"}`}
            >
              <div className="flex justify-between items-start">
                <span className="w-full museo font-semibold text-base md:text-xl mt-1">
                  {item.question}
                </span>
                <div className="mt-1 ml-4">
                  {item.answer && open === idx ? (
                    <button onClick={() => setOpen(-1)}>✕</button>
                  ) : (
                    <button onClick={() => setOpen(idx)}>+</button>
                  )}
                </div>
              </div>
              {item.answer && open === idx && (
                <p className="mt-3 museo text-sm md:text-base font-light">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
