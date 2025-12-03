import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const GuestRoute = () => {
  const { isLogin, loading } = useAuth();

  if (loading) return null;

  return !isLogin ? <Outlet /> : <Navigate to="/" replace />;
};

export default GuestRoute;
