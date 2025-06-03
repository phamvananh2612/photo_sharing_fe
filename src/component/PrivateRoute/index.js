import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
  const isLogin = localStorage.getItem("isLogin") === "true";
  console.log(isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
