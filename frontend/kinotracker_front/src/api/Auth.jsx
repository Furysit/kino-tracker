import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    const storedExpires = localStorage.getItem("token_expires");

    if (stored && storedExpires && new Date().getTime() < Number(storedExpires)) {
      setToken(stored);
      setExpiresAt(Number(storedExpires));
      scheduleLogout(Number(storedExpires) - new Date().getTime());
    } else {
      clearToken();
    }
    setLoading(false);
  }, []);

  const clearToken = () => {
    setToken(null);
    setExpiresAt(null);
    localStorage.removeItem("token");
    localStorage.removeItem("token_expires");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const scheduleLogout = (ms) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clearToken();
    }, ms);
  };

  const saveToken = (t, ttlMinutes) => {
  const ttlMs = ttlMinutes * 60_000; 
  const expires = new Date().getTime() + ttlMs;
  setToken(t);
  setExpiresAt(expires);
  localStorage.setItem("token", t);
  localStorage.setItem("token_expires", expires.toString());
  scheduleLogout(ttlMs);
};

  const logout = () => clearToken();

  const getTTL = () => {
    if (!expiresAt) return 0;
    return Math.max(0, expiresAt - new Date().getTime());
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout, getTTL }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
