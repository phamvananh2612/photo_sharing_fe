import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, HeartOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";

const UserMenuDropdown = ({ handleLogout }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Menu
      className="
        !bg-[#180329]
        !text-white
        backdrop-blur-xl
        !border !border-purple-600/40
        !rounded-xl 
        !shadow-xl !shadow-purple-900/40 
        py-2
        min-w-[190px]
      "
      items={[
        {
          key: "1",
          label: (
            <Link
              to={`/profile/${user?._id}`}
              className="
                flex items-center gap-2 
                px-4 py-2 
                text-sm 
                !text-white 
                hover:!bg-purple-700/40 
                hover:!text-white
                rounded-lg 
                transition
              "
            >
              <UserOutlined className="text-purple-300" />
              <span>Xem hồ sơ</span>
            </Link>
          ),
        },

        {
          key: "3",
          label: (
            <button
              onClick={() => navigate(`/profile/${user?._id}?tab=favorite`)}
              className="
                w-full 
                flex items-center gap-2 
                px-4 py-2 
                text-sm 
                !text-white 
                hover:!bg-purple-700/40 
                hover:!text-white
                rounded-lg 
                transition
              "
            >
              <HeartOutlined className="text-pink-300" />
              <span>Ảnh đã thích</span>
            </button>
          ),
        },

        { type: "divider" },

        {
          key: "4",
          label: (
            <button
              onClick={handleLogout}
              className="
                w-full 
                flex items-center gap-2 
                px-4 py-2
                text-sm 
                !text-red-300 
                hover:!bg-red-800/40 
                rounded-lg 
                transition
              "
            >
              <LogoutOutlined />
              <span>Đăng xuất</span>
            </button>
          ),
        },
      ]}
    />
  );
};

export default UserMenuDropdown;
