import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/accountAPI";
import { TUser } from "@/types/type";

export const useUserProfile = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    getProfile()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy profile:", err);
        localStorage.removeItem("token");
        router.replace("/sign-in");
      });
  }, []);

  return user;
};
