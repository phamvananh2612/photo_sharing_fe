import { createContext, useContext, useEffect, useState } from "react";
import { verifySession } from "../services/UserService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // để chặn UI render nháy liên tục

  useEffect(() => {
    const checkSession = async () => {
      const res = await verifySession();
      if (res.valid) {
        setIsLogin(true);
        setUser(res.user);
      } else {
        setIsLogin(false);
        setUser(null);
      }
      setLoading(false);
    };
    checkSession();
  }, []);
  const value = { isLogin, setIsLogin, user, setUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
