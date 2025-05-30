import React from "react";
import SignIn from "@/components/signIn/SignIn";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href={"/"} className="h-27 flex items-center ml-10">
        <Image src={"/img/image.png"} width={141} height={60} alt="logo" />
      </Link>
      <SignIn />
    </div>
  );
};

export default page;
