"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

// Interface cho payload giải mã từ JWT
interface DecodedPayload extends JwtPayload {
  id: string;
  email: string;
  role: "ADMIN" | "USER"; // tùy hệ thống bạn mở rộng
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: DecodedPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

// Context mặc định
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Hàm check token hết hạn
export function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (err) {
    return true;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      const decoded = jwtDecode<DecodedPayload>(storedToken);
      setToken(storedToken);
      setUser(decoded);
      setIsAuthenticated(true);
    } else {
      logout();
    }
  }, []);

  const login = (newToken: string) => {
    if (isTokenExpired(newToken)) return;
    const decoded = jwtDecode<DecodedPayload>(newToken);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(decoded);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
