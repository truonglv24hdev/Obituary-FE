import { menuItemsObituary } from "@/constants/obituary";
import React from "react";

const SidebarObituary = () => {
  return (
    <div className="w-70 bg-[rgb(106,153,147)] text-white h-[716px] p-6">
      <h2 className="text-4xl font-medium font-serif mb-8">Edit Memorial</h2>
      <nav className="space-y-15 relative">
        {menuItemsObituary.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-4 relative">
            {/* Connector line */}
            {index !== menuItemsObituary.length - 1 && (
              <div className="absolute left-[8px] top-8 h-12 w-px border-2 border-dotted border-white opacity-60" />
            )}

            {/* Circle icon */}
            <div className="relative z-10 mt-1">
              <div className="w-5 h-5 rounded-full border-2 border-white bg-[#EEF4ED] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6A9993]" />
              </div>
            </div>

            {/* Label */}
            <span className="text-ms mt-0.5">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SidebarObituary;
