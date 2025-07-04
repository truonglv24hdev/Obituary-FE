"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SetPasswordDialog({
  trigger,
  onSave,
  title,
  defaultOpen = false,
}: {
  trigger?: React.ReactNode; // ✅ sửa tại đây
  onSave?: (password: string) => void;
  title: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const passwordRef = useRef<HTMLInputElement>(null);
  const isValid = password && password === confirmPassword;

  useEffect(() => {
    if (open && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ✅ chỉ render nếu có trigger */}
      {trigger && <div onClick={() => setOpen(true)}>{trigger}</div>}

      <DialogContent className="w-[620px] rounded-2xl p-8 gap-5">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Password input */}
          <div className="flex flex-col gap-2">
            <h2 className="h-5 museo text-base font-light text-[#444444]">
              Password
            </h2>
            <div className="relative">
              <Input
                ref={passwordRef}
                type={showPass ? "password" : "text"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 h-12 border-2 border-dashed border-[#00000080]/50 placeholder:text-black"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {/* Confirm input */}
          <div className="flex flex-col gap-2">
            <h2 className="h-5 museo text-base font-light text-[#444444]">
              Confirm password
            </h2>
            <div className="relative">
              <Input
                type={showConfirm ? "password" : "text"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10 h-12 border-2 border-dashed border-[#00000080]/50 placeholder:text-black"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end mt-4">
          <Button
            disabled={!isValid}
            className={`w-[125px] h-11 rounded text-base font-light museo ${
              isValid ? "text-white bg-[#699D99]" : "text-black/80 bg-[#EEEEEE]"
            }`}
            onClick={() => {
              onSave?.(password);
              setOpen(false);
              setPassword("");
              setConfirmPassword("");
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
