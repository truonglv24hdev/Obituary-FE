"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  onSubmit: (password: string) => void;
  errorMessage?: string;
  onClearError?: () => void;
  id: string;
};

const PasswordPrompt = ({
  onSubmit,
  errorMessage,
  onClearError,
  id,
}: Props) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  if (errorMessage) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-[90%] sm:max-w-[620px] h-auto sm:h-[248px] p-5 sm:p-8 flex flex-col gap-8 sm:gap-10 rounded-2xl border border-gray-300">
          <h2 className="text-2xl sm:text-[32px] font-medium">
            Tribute Chapters says
          </h2>
          <div className="text-sm sm:text-base museo font-light">
            {errorMessage}
          </div>
          <div className="flex justify-end">
            <Button
              className="h-10 sm:h-11 rounded bg-[#699D99] px-6 sm:px-7 py-2 text-sm sm:text-base museo font-light"
              onClick={onClearError}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-[90%] sm:max-w-[620px] p-5 sm:p-8 flex flex-col gap-8 sm:gap-10 rounded-2xl border border-gray-300">
        <h2 className="text-2xl sm:text-[32px] font-medium">
          Tribute Chapters says
        </h2>

        <div className="flex flex-col gap-3">
          <label className="block text-sm sm:text-base font-light museo">
            Enter preview password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "password" : "text"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 h-11 sm:h-12 border-2 border-dashed border-[#00000080]/50 placeholder:text-black"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          <div
            onClick={() => {
              localStorage.setItem("memorialId", id);
              router.push("/forgot-password");
            }}
            className="cursor-pointer flex justify-end text-sm sm:text-base font-light museo text-blue-500 hover:underline"
          >
            Forgot Password?
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-5">
          <Link
            href={"/account/memorials"}
            className="h-10 sm:h-11 w-full sm:w-[107px] border text-sm sm:text-base museo font-light bg-white text-black border-black px-5 sm:px-7 py-2 rounded"
          >
            Cancel
          </Link>
          <Button
            onClick={() => onSubmit(password)}
            className="bg-[#699D99] h-10 sm:h-11 w-full sm:w-[125px] text-white px-5 sm:px-7 py-2 rounded text-sm sm:text-base museo font-light"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
