import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const UserMenuDropdown = ({ handleLogout }) => {
  return (
    <Menu
      className="
        !bg-[#180329]        /* nền tím neon, dùng ! để override AntD */
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
              to="/profile"
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
        // {
        //   key: "2",
        //   label: (
        //     <Link
        //       to="/profile/edit"
        //       className="
        //         flex items-center gap-2
        //         px-4 py-2
        //         text-sm
        //         !text-white
        //         hover:!bg-purple-700/40
        //         hover:!text-white
        //         rounded-lg
        //         transition
        //       "
        //     >
        //       <SettingOutlined className="text-purple-300" />
        //       <span>Cập nhật hồ sơ</span>
        //     </Link>
        //   ),
        // },
        {
          key: "3",
          label: (
            <Link
              to="/liked"
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
              <HeartOutlined className="text-pink-300" />
              <span>Ảnh đã thích</span>
            </Link>
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
