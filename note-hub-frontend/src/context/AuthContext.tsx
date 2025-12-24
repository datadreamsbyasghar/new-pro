// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from "react";

type AuthContextType = {
  token: string | null;
  login: (tokenValue: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  function login(tokenValue: string) {
    localStorage.setItem("access_token", tokenValue);
    setToken(tokenValue);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setToken(null);
  }

  // keep state in sync if localStorage changes in another tab
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("access_token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}