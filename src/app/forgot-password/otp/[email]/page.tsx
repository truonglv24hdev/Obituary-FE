import Otp from '@/components/forgot-password/Otp';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <div>
      <Link href={"/"} className="h-27 flex items-center ml-10">
        <Image src={"/img/image.png"} width={141} height={60} alt="logo" />
      </Link>
      <Otp/>
    </div>
  );
}

export default page