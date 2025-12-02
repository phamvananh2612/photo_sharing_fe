import { useState, useEffect } from "react";
import { Modal, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { updateUser } from "../../../services/UserService";
import "./styles.css";

const EditAvatarModal = ({
  open,
  onClose,
  userId,
  currentAvatar,
  onUpdated,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentAvatar || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setPreview(currentAvatar || "");
      setFile(null);
    }
  }, [open, currentAvatar]);

  const beforeUpload = (file) => {
    const isImg = file.type.startsWith("image/");
    if (!isImg) {
      message.error("Chỉ được upload file ảnh");
      return Upload.LIST_IGNORE;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Ảnh phải nhỏ hơn 5MB");
      return Upload.LIST_IGNORE;
    }

    setFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);

    return false;
  };

  const handleOk = async () => {
    if (!file) {
      message.warning("Vui lòng chọn ảnh");
      return;
    }

    try {
      setLoading(true);

      const res = await updateUser(userId, { avatar: file });
      const updatedUser = res?.data?.user || res?.data || null;

      if (!res.ok) {
        throw new Error(updatedUser?.message || "Cập nhật avatar thất bại");
      }

      message.success("Cập nhật avatar thành công");

      if (updatedUser && onUpdated) {
        onUpdated(updatedUser);
      }

      onClose();
    } catch (err) {
      console.error(err);
      message.error(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="custom-modal"
      open={open}
      title="Đổi ảnh đại diện"
      onOk={handleOk}
      onCancel={onClose}
      okText="Lưu"
      cancelText="Hủy"
      confirmLoading={loading}
      centered
      destroyOnClose
    >
      <div className="flex justify-center">
        <Upload
          listType="picture-circle"
          showUploadList={false}
          beforeUpload={beforeUpload}
          className="!border-none !bg-transparent"
        >
          {preview ? (
            <div className="relative group w-[120px] h-[120px] rounded-full overflow-hidden cursor-pointer">
              {/* Ảnh preview mờ */}
              <img
                src={preview}
                alt="avatar"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity"
              />
              {/* Overlay Upload */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                {loading ? (
                  <LoadingOutlined style={{ fontSize: 24 }} />
                ) : (
                  <PlusOutlined style={{ fontSize: 24 }} />
                )}
                <div className="text-xs mt-1">Tải ảnh lên</div>
              </div>
            </div>
          ) : (
            <div className="w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center bg-white/10 text-white cursor-pointer">
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="text-xs mt-2">Chọn ảnh</div>
            </div>
          )}
        </Upload>
      </div>
    </Modal>
  );
};

export default EditAvatarModal;
