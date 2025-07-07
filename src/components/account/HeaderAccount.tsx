import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  showUpgrade?: boolean;
};

const HeaderAccount = ({ showUpgrade = false }: Props) => {
  return (
    <div className="w-full max-w-[982px] flex flex-col gap-4">
      <h1 className="font-medium text-[32px] md:text-[40px]">My Account</h1>
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="font-light text-lg md:text-xl flex-1 museo">
          You can change your account settings here
        </p>
        {showUpgrade && (
          <Button className="self-start md:self-auto">
            <Link className="museo" href={"/payment"}>
              Upgrade to Premium
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderAccount;
