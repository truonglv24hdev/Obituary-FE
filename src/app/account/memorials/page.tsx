import React, { Suspense } from "react";
import MemorialsWrapper from "@/components/account/MemorialsWrapper";
import Heading from "@/components/layout/Heading";

export default function MemorialsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Heading className="bg-[#699D99]" />
      <MemorialsWrapper />
    </Suspense>
  );
}