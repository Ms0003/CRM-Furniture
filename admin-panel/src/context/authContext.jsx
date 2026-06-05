import { createContext, useContext, useMemo, useState } from "react";
import { loginAdmin } from "../services/api.js";

const AuthContext = createContext(null);

const readStoredAuth = () => {
  const token = localStorage.getItem("adminToken");
  const user = localStorage.getItem("adminUser");

  try {
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    return { token: null, user: null };
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  const login = async (credentials) => {
    const data = await loginAdmin(credentials);

    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminUser", JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAuth({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(auth.token),
      token: auth.token,
      user: auth.user,
      login,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
