"use client";
import { useState } from "react";
import { leftMenu, rightContent } from "@/constants/faqs";
import { IconRight } from "../icons";

export default function Faqs({
  className,
  children,
  bg
}: {
  className?: string;
  bg?: string;
  children?: React.ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(0);

  return (
    <div className={`w-full h-[1000px] top-[488px] py-15 ${className}`}>
      <div className="text-center text-[40px] museo font-semibold mb-5">{children}</div>
      <div className="max-w-[1240px] mx-auto h-[712px] flex justify-between">
        {/* Left Menu */}
        <div className="w-99 flex flex-col gap-2">
          {leftMenu.map((item, idx) => (
            <div
              key={idx}
              className={`h-18 flex justify-between items-center gap-3 p-5 mb-3 rounded-lg cursor-pointer transition
              ${
                selected === idx
                  ? "bg-[#699D99] text-white font-semibold"
                  : "bg-[#d5f4e24d] hover:bg-[#eaf6f1] text-[#222] font-semibold"
              }`}
              onClick={() => setSelected(idx)}
            >
              <div className="w-[266px] h-8 flex gap-3 items-center">
                <span className="w-7 h-7">{item.icon}</span>
                <span className="text-xl museo font-semibold leading-8">
                  {item.title}
                </span>
              </div>
              <span className="w-6 h-6">
                <IconRight />
              </span>
            </div>
          ))}
        </div>

        {/* Right Content */}
        <div className="w-198 h-127 flex flex-col gap-5">
          {rightContent.map((item, idx) => (
            <div
              key={idx}
              className={` rounded-lg bg-[#f4fbf7] transition ${bg}
              ${open === idx ? "h-[140px] flex flex-col  shadow" : "h-18"}`}
            >
              <div className="flex  justify-between">
                <span className="w-[220px] museo h-8 font-semibold text-xl mt-6 ml-6">
                  {item.question}
                </span>
                <div className="mt-6 w-6 h-6">
                  {item.answer && open === idx ? (
                    <button onClick={() => setOpen(-1)}>✕</button>
                  ) : (
                    <button onClick={() => setOpen(idx)}>+</button>
                  )}
                </div>
              </div>
              {item.answer && open === idx && (
                <p className="w-[744px] museo h-12 mt-2 ml-6 text-base font-light">
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
