// app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.role === "ADMIN") {
        setIsAuthorized(true);
      } else {
        router.push("/sign-in"); 
      }
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/sign-in");
    }
  }, [router]);

  if (isAuthorized === null) return <div>Loading...</div>;

  return <main>{children}</main>;
};

export default Layout;
