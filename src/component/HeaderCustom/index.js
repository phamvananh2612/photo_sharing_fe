import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { NavLink, Link } from "react-router-dom";
import { logoutUser } from "../../services/UserService";
const HeaderCustomer = () => {
  const [user, setUser] = useState({});
  const isLogin = localStorage.getItem("isLogin") === "true";
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (isLogin && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [isLogin]);

  console.log(isLogin);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("user"); // xóa luôn user khỏi localStorage
    setUser(null); // cập nhật lại state => component re-render
    const result = await logoutUser();
    console.log(result);
    navigate("/login");
  };

  return (
    <>
      <div className="header-custom">
        <Link to="/">
          <div className="logo-box">
            <img className="img-logo" src="/logo.png" alt="Ảnh logo" />
            <span style={{ color: "#fff" }}>Vanh</span>
          </div>
        </Link>
        <div className="menu-box">
          {isLogin && user ? (
            <>
              <NavLink to="/about">
                <span style={{ color: "#fff" }}>About</span>
              </NavLink>
              <span style={{ color: "#fff" }}>Hi {user?.first_name}</span>
              <NavLink to="#" onClick={handleLogout}>
                <span style={{ color: "#fff" }}>Logout</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <span style={{ color: "#fff" }}>Login</span>
              </NavLink>
              <NavLink to="/register">
                <span style={{ color: "#fff" }}>Regiter</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default HeaderCustomer;
