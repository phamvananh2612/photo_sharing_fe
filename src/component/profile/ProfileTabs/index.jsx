import { Tabs } from "antd";
import "./styles.css";

import Gallary from "./Gallary";
import WishList from "./WishList";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileTabs = ({ user_id, activeTab }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      key: "posts",
      label: "Bài đăng",
      children: <Gallary user_id={user_id} />,
    },
    {
      key: "favorite",
      label: "Yêu thích",
      children: <WishList user_id={user_id} />,
    },
  ];

  const handleChange = (key) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", key);

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  return (
    <div className="w-full lg:col-span-2">
      <div className="border border-purple-800/40 rounded-lg p-10 bg-[#15021e]/60 backdrop-blur-xl text-gray-300 shadow-xl">
        <Tabs
          activeKey={activeTab}
          onChange={handleChange}
          items={items}
          className="custom-tabs text-gray-200"
        />
      </div>
    </div>
  );
};

export default ProfileTabs;
