import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  showUpgrade?: boolean;
};

const HeaderAccount = ({ showUpgrade = false }: Props) => {
  return (
    <div className="w-[982px] flex flex-col gap-4">
      <h1 className="font-medium text-[40px]">My Account</h1>
      <div className="w-full flex justify-between items-center">
        <p className="font-light text-xl flex-1 museo">
          You can change your account settings here
        </p>
        {showUpgrade && (
          <Button>
            <Link className="museo" href={"/payment"}>Upgrade to Premium</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderAccount;
