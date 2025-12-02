import { Card, Avatar } from "antd";
import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditTextFieldModal from "../Update/EditTextFieldModal";
import EditAvatarModal from "../Update/EditAvatarModal";
const ProfileInfor = ({ user, onUserUpdated }) => {
  const [editConfig, setEditConfig] = useState({
    open: false,
    field: "",
    label: "",
    value: "",
    isTextarea: false,
  });
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  // Chuẩn hóa dữ liệu
  const firstName = user.first_name || "";
  const lastName = user.last_name || "";
  const loginName = user.login_name || "";
  const fullName = `${lastName} ${firstName}`.trim() || "";
  const email = user.email || "Chưa cập nhật";
  const location = user.location || "Chưa cập nhật";
  const occupation = user.occupation || "Chưa cập nhật";
  const description = user.description || "Chưa cập nhật";

  const initial =
    lastName?.charAt(0)?.toUpperCase() ||
    firstName?.charAt(0)?.toUpperCase() ||
    "U";

  const profileFields = [
    { key: "last_name", label: "Họ", value: lastName },
    { key: "first_name", label: "Tên", value: firstName },
    { key: "location", label: "Địa điểm", value: location },
    { key: "occupation", label: "Nghề nghiệp", value: occupation },
    { key: "email", label: "Email", value: email },
  ];

  const openEditField = ({ field, label, value, isTextarea = false }) => {
    setEditConfig({
      open: true,
      field,
      label,
      value,
      isTextarea,
    });
  };
  const closeEditField = () => {
    setEditConfig((prev) => ({ ...prev, open: false }));
  };
  const handleUserUpdated = (newUser) => {
    onUserUpdated && onUserUpdated(newUser);
  };

  return (
    <div className="w-full">
      <Card className="bg-[#180329]/70 backdrop-blur-xl border border-purple-800/40 shadow-xl p-6 text-white transition-all duration-300 hover:shadow-purple-900/30">
        <div className="flex flex-col items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            {user.avatar ? (
              <Avatar
                src={user.avatar}
                size={130}
                className="shadow-lg ring-2 ring-purple-500/40 rounded-full"
              />
            ) : (
              <Avatar
                size={130}
                className="shadow-lg bg-gradient-to-br from-purple-600 to-indigo-800 ring-4 ring-purple-500/40 !text-4xl !font-bold"
              >
                {initial}
              </Avatar>
            )}

            <span
              className="absolute bottom-2 right-2 bg-purple-700/80 p-2 rounded-full text-white text-xs cursor-pointer hover:bg-purple-500 transition"
              onClick={() => setOpenAvatarModal(true)}
            >
              <CameraOutlined />
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-wide flex items-center">
            {loginName || "Chưa có tên"}
            <EditOutlined
              className="text-purple-300/70 hover:text-white cursor-pointer"
              onClick={() =>
                openEditField({
                  field: "login_name",
                  label: "Tên đăng nhập",
                  value: loginName,
                })
              }
            />
          </h2>

          <p className="text-gray-300 text-center text-sm min-h-[40px] flex items-center ">
            {description}
            <EditOutlined
              className="text-purple-300/70 hover:text-white cursor-pointer"
              onClick={() =>
                openEditField({
                  field: "description",
                  label: "Mô tả",
                  value: description,
                  isTextarea: true,
                })
              }
            />
          </p>

          <div className="w-full space-y-1 mt-4">
            {profileFields.map((field) => (
              <div
                key={field.key}
                className="relative flex justify-between items-center bg-white/5 border border-purple-700/40 rounded-2xl px-4 py-3 hover:bg-white/10 transition"
              >
                <span className="text-xs text-purple-200/70">
                  {field.label}
                </span>
                <span className="text-sm text-white font-medium text-right flex-1 mr-7">
                  {field.value}
                </span>

                <span
                  className="absolute top-3 right-3 text-purple-300/70 hover:text-white cursor-pointer text-xs"
                  onClick={() =>
                    openEditField({
                      field: field.key,
                      label: field.label,
                      value: field.value,
                    })
                  }
                >
                  <EditOutlined />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Modal dùng chung cho mọi field text */}
      <EditTextFieldModal
        open={editConfig.open}
        onClose={closeEditField}
        userId={user._id}
        field={editConfig.field}
        label={editConfig.label || ""}
        initialValue={editConfig.value}
        isTextarea={editConfig.isTextarea}
        onUpdated={handleUserUpdated}
      />
      {/* Modal dùng cho avt */}
      <EditAvatarModal
        open={openAvatarModal}
        onClose={() => setOpenAvatarModal(false)}
        userId={user._id}
        currentAvatar={user.avatar}
        onUpdated={onUserUpdated}
      />
    </div>
  );
};

export default ProfileInfor;
