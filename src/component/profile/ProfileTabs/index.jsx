import { Tabs } from "antd";
import "./styles.css";

import Gallary from "./Gallary";
const ProfileTabs = ({ user_id }) => {
  const items = [
    {
      key: "1",
      label: "Bài đăng",
      children: <Gallary user_id={user_id} />,
    },
    {
      key: "2",
      label: "Yêu thích",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Đã lưu",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div className="w-full lg:col-span-2">
      <div className="border border-purple-800/40 rounded-lg p-10 bg-[#15021e]/60 backdrop-blur-xl text-gray-300 shadow-xl">
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="custom-tabs text-gray-200"
        />
      </div>
    </div>
  );
};

export default ProfileTabs;
