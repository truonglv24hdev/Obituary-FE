import React from "react";
import HeaderMemorial from "./HeaderMemorial";
import PaymentPlan from "../common/PaymentPlan";

const PaymentMemorial = () => {
  return (
    <div className="w-[1500px] h-[1170px] px-[229px] py-20 flex flex-col gap-13">
      <HeaderMemorial />
      <div className="p-8 rounded-lg">
        <h2 className="text-2xl font-light mb-6">Choose your payment plan:</h2>
        <PaymentPlan />
      </div>
    </div>
  );
};

export default PaymentMemorial;
