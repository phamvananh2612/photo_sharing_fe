import { useNavigate, NavLink, Link } from "react-router-dom";
import { logoutUser } from "../../services/UserService";
import { Dropdown, Avatar } from "antd";
import UserMenuDropdown from "./UserMenuDropdown";
import { useAuth } from "../../contexts/AuthContext";

const HeaderCustom = () => {
  const navigate = useNavigate();
  const { isLogin, user, setIsLogin, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLogin(false);
      setUser(null);
      navigate("/login");
    }
  };

  const getInitial = (fullName) => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1][0].toUpperCase();
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#0b0214] via-[#15021e] to-[#0b0214] text-white shadow-[0_2px_4px_-1px_purple-900/30]">
      <div className="h-16 flex justify-between items-center">
        <Link
          to={isLogin ? "/feed" : "/"}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <img
              src="https://i.pinimg.com/1200x/8d/10/18/8d1018c09f1d87a58269cb8a4c060632.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/60 group-hover:ring-purple-300 transition"
            />
          </div>
          <span className="font-semibold text-xl tracking-wide group-hover:text-purple-200 transition">
            PhotoSharing
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {!isLogin || !user ? (
            <>
              <NavLink
                to="/login"
                className="text-sm font-medium text-purple-100 hover:text-purple-300 transition"
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                className="text-sm font-medium text-purple-100 hover:text-purple-300 transition"
              >
                Đăng kí
              </NavLink>
            </>
          ) : (
            <>
              <span className="hidden sm:inline font-medium text-sm text-purple-100">
                Hi{" "}
                <span className="text-purple-300">
                  {user?.first_name || user?.full_name}
                </span>
              </span>

              <Dropdown
                overlay={<UserMenuDropdown handleLogout={handleLogout} />}
                trigger={["click"]}
                placement="bottomRight"
              >
                {user?.avatar ? (
                  <Avatar
                    size={40}
                    src={user.avatar}
                    className="cursor-pointer ring-2 ring-purple-500/60 hover:ring-purple-300 transition"
                  />
                ) : (
                  <Avatar
                    size={40}
                    className="cursor-pointer bg-gradient-to-br from-purple-600 to-indigo-700 ring-2 ring-purple-500/60 hover:ring-purple-300 transition"
                  >
                    {getInitial(user?.full_name || user?.first_name)}
                  </Avatar>
                )}
              </Dropdown>
            </>
          )}
        </nav>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-300/60 to-transparent"></div>
    </div>
  );
};

export default HeaderCustom;
