import React from "react";
import Link from "next/link";
import { useUserProfile } from "../hook/getInFo";

const Information = () => {
  const user = useUserProfile();
  if (!user) return <div>Loading...</div>;
  return (
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
          <div className="mt-1 text-sm text-gray-900">{user.first_name}</div>
          <div className="border-b border-gray-300 mt-2"></div>
        </div>

        {/* Last Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
        </div>
        <div className="col-span-1">
          <div className="mt-1 text-sm text-gray-900">{user.last_name}</div>
          <div className="border-b border-gray-300 mt-2"></div>
        </div>

        {/* Email Address */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
        </div>
        <div className="col-span-1">
          <div className="mt-1 text-sm text-gray-900">{user.email}</div>
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
          <div className="mt-1 text-sm text-gray-900">{user.address}</div>
          <div className="border-b border-gray-300 mt-2"></div>
        </div>

        {/* Country */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
        </div>
        <div className="col-span-1">
          <div className="mt-1 text-sm text-gray-900">{user.country}</div>
          <div className="border-b border-gray-300 mt-2"></div>
        </div>

        {/* Post Code */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Post Code
          </label>
        </div>
        <div className="col-span-1">
          <div className="mt-1 text-sm text-gray-900">{user.code}</div>
          <div className="border-b border-gray-300 mt-2"></div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-6 text-right">
        <Link
          href="/account/edit"
          className="h-11 w-21 inline-flex items-center justify-center text-center border text-base font-light rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Information;
