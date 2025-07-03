"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { resendLink, sendLink, sendOtp } from "@/lib/authAPI";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;

const Otp = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(60 * 60);
  const [resendActive, setResendActive] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendActive(true);
    }
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  const sendOTP = async () => {
    const result = await resendLink(email);
    if (result == 2) {
      setTimer(60 * 60);
    }
  };

  const handleResend = async () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(60 * 60);
    setResendActive(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    const result = await sendOtp(email, enteredOtp);
    if (result.code == 2) {
      router.push(`/reset-password/${email}`);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="h-200 flex items-center justify-center bg-white relative gap-1">
      <div className="bg-white shadow-lg border rounded-lg px-8 py-9 w-[539px] h-[437px] z-10 flex flex-col gap-8">
        <h2 className="h-12 text-[40px] font-serif font-medium">
          OTP Verification
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 items-center"
        >
          <div className="flex w-[475px] flex-col gap-3">
            <div className="flex gap-3 h-14">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  placeholder="•" // dấu chấm tròn to
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`
                w-[67px] h-14 text-2xl font-bold text-center border rounded 
                focus:outline-none focus:ring-2 focus:ring-green-200 
                placeholder-gray-400 
                ${digit ? "border-[#699D99]" : "border-gray-300"} 
                placeholder:text-3xl placeholder:text-black placeholder:font-bold placeholder:text-center
              `}
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            <div className="text-2xl mx-auto font-bold text-black">
              {formatTime(timer)}
            </div>
            <button
              type="button"
              className="text-[#00000099] text-base font-medium"
              onClick={handleResend}
              disabled={!resendActive}
            >
              Resend code
            </button>
          </div>
          <Button
            type="submit"
            className="w-[475px] h-[56px] museo bg-[#699D99] text-white py-2 rounded font-medium text-xl"
          >
            Verify
          </Button>
        </form>
        <div className="text-center text-lg">
          Didn&apos;t receive the OTP?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline bg-transparent p-0 m-0 inline"
            onClick={sendOTP}
            // disabled={!resendActive}
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
