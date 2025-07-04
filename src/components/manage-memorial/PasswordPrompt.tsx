"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

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
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="bg-white w-[620px] h-[248px] p-8 flex flex-col gap-10 rounded-2xl border border-gray-300">
          <h2 className="h-10 text-[32px] font-medium">
            Tribute Chapters says
          </h2>
          <div className="text-base museo font-light h-5">{errorMessage}</div>
          <div className="flex justify-end">
            <Button
              className="h-11 rounded bg-[#699D99] px-7 py-2 text-base museo font-light"
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
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[620px]  p-8 flex flex-col gap-10 rounded-2xl border-gray-300">
        <h2 className="h-10 text-[32px] font-medium">Tribute Chapters says</h2>
        <div className="flex flex-col gap-3">
          <label className="block text-base font-light museo">
            Enter preview password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "password" : "text"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 h-12 border-2 border-dashed border-[#00000080]/50 placeholder:text-black"
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
            className="cursor-pointer flex justify-end text-base font-light museo text-blue-500 hover:underline float-right"
          >
            Forgot Password?
          </div>
        </div>
        <div className="h-11 flex justify-end gap-5">
          <Button
            className="h-11 w-[107px] border text-base museo font-light bg-white text-black border-black px-7 py-2 rounded"
            onClick={() => setPassword("")}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(password)}
            className="bg-[#699D99] h-11 w-[125px] text-white px-7 py-2 rounded text-base museo font-light"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
