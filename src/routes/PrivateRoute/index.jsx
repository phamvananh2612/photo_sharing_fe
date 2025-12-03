import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = () => {
  const { isLogin, loading } = useAuth();
  if (loading) return null;
  console.log(isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
