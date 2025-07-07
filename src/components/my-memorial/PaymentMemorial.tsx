import React from "react";
import HeaderMemorial from "./HeaderMemorial";
import PaymentPlan from "../common/PaymentPlan";

const PaymentMemorial = ({ id }: { id: string }) => {
  return (
    <div className="w-full max-w-[1500px] mx-auto h-auto px-4 md:px-[229px] py-10 md:py-20 flex flex-col gap-10 md:gap-13">
      <HeaderMemorial />
      <div className="p-4 md:p-8 rounded-lg">
        <h2 className="text-xl md:text-2xl font-light mb-6">
          Choose your payment plan:
        </h2>
        <PaymentPlan id={id} />
      </div>
    </div>
  );
};

export default PaymentMemorial;