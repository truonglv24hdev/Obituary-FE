import Faqs from "@/components/layout/Faqs";
import Heading from "@/components/layout/Heading";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Heading className="bg-[#699D99]" />
      <div className="h-[1094px] flex flex-col gap-10 px-[229px] py-20 ml-40 ">
        <div className="w-[410px] h-22 flex flex-col gap-4">
          <h1 className="h-12 font-medium text-[40px]">My Account</h1>
          <p className="h-6 font-light text-xl">
            You can change your account settings here
          </p>
        </div>

        <div className="w-[982px] h-12 border-b border-gray-200 mb-6">
          <nav className="h-12 flex gap-15">
            <Link
              href="#"
              className=" border-b-1 border-black py-4 px-1 text-xl font-semibold text-black"
              aria-current="page"
            >
              Basic Information
            </Link>
            <Link
              href="#"
              className="border-b-1 border-transparent py-4 px-1 text-xl font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              My Memorials
            </Link>
          </nav>
        </div>

        <div className="bg-green-50 p-6 rounded-lg shadow-sm w-[982px] h-[694px] flex flex-col gap-10">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-10">
            {/* First Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
            </div>
            <div className="col-span-1">
              <div className="mt-1 text-sm text-gray-900">John</div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>

            {/* Last Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
            </div>
            <div className="col-span-1">
              <div className="mt-1 text-sm text-gray-900">Doe</div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>

            {/* Email Address */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
            </div>
            <div className="col-span-1">
              <div className="mt-1 text-sm text-gray-900">
                Johndoe@gmail.com
              </div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <div className="col-span-1">
              <div className="mt-1 text-sm text-gray-900">*********</div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>

            {/* Address */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
            </div>
            <div className="col-span-1">
              <div className="mt-1 text-sm text-gray-900"></div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
            </div>
            <div className="col-span-1">
              <div className="mt-1 text-sm text-gray-900">New York</div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>

            {/* Post Code */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Post Code
              </label>
            </div>
            <div className="col-span-1">
              <div className="mt-1 text-sm text-gray-900"></div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-6 text-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <Faqs/>
    </div>
  );
};

export default page;
