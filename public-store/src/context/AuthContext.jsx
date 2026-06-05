import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { loginClient, registerClient } from "../services/api.js";

const AuthContext = createContext(null);

const readStoredAuth = () => {
  const token = localStorage.getItem("clientToken");
  const user = localStorage.getItem("clientUser");

  try {
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientUser");
    return { token: null, user: null };
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session load is synchronous on client mounting
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginClient(credentials);
    localStorage.setItem("clientToken", data.token);
    localStorage.setItem("clientUser", JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  };

  const register = async (userData) => {
    const data = await registerClient(userData);
    localStorage.setItem("clientToken", data.token);
    localStorage.setItem("clientUser", JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  };

  const logout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientUser");
    setAuth({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(auth.token),
      token: auth.token,
      user: auth.user,
      loading,
      login,
      register,
      logout,
    }),
    [auth, loading]
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
