"use client";

import { useEffect } from "react";
import { isTokenExpired, useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, logout } = useAuth();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token]);

  return <>{children}</>;
};
