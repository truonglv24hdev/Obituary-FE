import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/accountAPI";
import { TUser } from "@/types/type";

const Information = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    getProfile()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy profile:", err);
        localStorage.removeItem("token");
        router.replace("/sign-in");
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-sm w-full max-w-[982px] flex flex-col gap-10">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {[
          { label: "First Name", value: user.first_name },
          { label: "Last Name", value: user.last_name },
          { label: "Email Address", value: user.email },
          { label: "Password", value: "*********" },
          { label: "Address", value: user.address },
          { label: "Country", value: user.country },
          { label: "Post Code", value: user.code },
        ].map((item, idx) => (
          <React.Fragment key={idx}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {item.label}
              </label>
            </div>
            <div>
              <div className="mt-1 text-sm text-gray-900">{item.value}</div>
              <div className="border-b border-gray-300 mt-2" />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-6 text-right">
        <Link
          href="/account/edit"
          className="h-11 inline-flex items-center justify-center px-6 text-center border text-base font-light rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Information;
