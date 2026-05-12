import { useEffect, useState, type ReactNode } from "react";
import { getMyProfile, loginUser, registerUser } from "../api/authService";
import type { LoginInput, RegisterInput, User } from "../types";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const [isInitializing, setInitializing] = useState(
    () => localStorage.getItem("token") !== null,
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    getMyProfile()
      .then((me) => {
        if (!cancelled) {
          setUser(me);
          setInitializing(false);
        }
      })

      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setInitializing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (input: LoginInput) => {
    const { token: newToken } = await loginUser(input);
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const register = async (input: RegisterInput) => {
    await registerUser(input);
    await login({ email: input.email, password: input.password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    token,
    isInitializing,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
