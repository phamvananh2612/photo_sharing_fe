import { useState, useEffect } from "react";
import { Modal, Button, Upload, Input, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import UserList from "../../component/user/UserList";
import { uploadPhoto } from "../../services/PhotoService";

const { TextArea } = Input;

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored));
      } catch (e) {
        console.error("Lỗi parse user:", e);
      }
    }
  }, []);

  const getInitial = () => {
    if (!currentUser) return "U";
    const name =
      currentUser.login_name ||
      `${currentUser.last_name || ""} ${currentUser.first_name || ""}`;
    if (!name.trim()) return "U";
    const parts = name.trim().split(" ");
    return parts[parts.length - 1][0].toUpperCase();
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning("Vui lòng chọn ảnh trước khi đăng bài.");
      return;
    }

    try {
      setIsUploading(true);
      const { ok, data } = await uploadPhoto(file, caption);

      if (ok) {
        message.success("Đăng bài thành công!");
        setIsModalOpen(false);
        setFile(null);
        setCaption("");
        setPreviewUrl("");

        // TODO: tuỳ bạn, có thể:
        // - gọi lại API list bài đăng
        // - hoặc dùng context / props để báo cho PostList reload
      } else {
        message.error(data?.message || "Đăng bài thất bại.");
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi đăng bài.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return false; // chặn antd upload tự động
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFile(null);
    setCaption("");
    setPreviewUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0214] via-[#140220] to-[#0b0214] py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: FEED (2 cột) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Composer: tạo bài viết */}
          <div className="bg-[#180329]/80 border border-purple-800/50 rounded-2xl px-4 py-3 shadow-xl shadow-purple-900/30 flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 ring-2 ring-purple-500/60 text-sm font-semibold text-white">
              {getInitial()}
            </div>

            {/* Ô click mở modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 text-left text-sm text-purple-200/80 bg-white/5 hover:bg-white/10 border border-purple-700/40 rounded-full px-4 py-2 transition"
            >
              {currentUser
                ? `${
                    currentUser.first_name || currentUser.login_name
                  }, bạn đang nghĩ gì?`
                : "Bạn đang nghĩ gì?"}
            </button>

            {/* Nút Đăng bài */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 border-none shadow-md shadow-purple-500/40"
            >
              Đăng bài
            </Button>
          </div>

          {/* Danh sách bài đăng (PostCard sẽ render qua Outlet) */}
          <div className="space-y-4">
            <Outlet />
          </div>
        </div>

        {/* Cột phải: danh sách người dùng */}
        <div className="lg:col-span-1">
          <UserList />
        </div>
      </div>

      {/* Modal đăng bài */}
      <Modal
        open={isModalOpen}
        onOk={handleUpload}
        onCancel={handleCloseModal}
        okText={isUploading ? "Đang đăng..." : "Đăng bài"}
        cancelText="Hủy"
        confirmLoading={isUploading}
        centered
        className="custom-modal" // nếu bạn đã có custom-modal.css, tái dùng luôn
        title="Tạo bài viết mới"
      >
        <div className="space-y-4">
          {/* Upload ảnh */}
          <div>
            <p className="text-sm text-purple-100 mb-2">Chọn ảnh</p>
            <Upload
              beforeUpload={handleFileChange}
              maxCount={1}
              accept="image/*"
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                className="border-purple-500/60 text-purple-100 bg-white/5 hover:bg-white/10"
              >
                Chọn ảnh từ máy
              </Button>
            </Upload>

            {previewUrl && (
              <div className="mt-4 flex justify-center">
                <div className="rounded-2xl overflow-hidden border border-purple-700/60 bg-black/40 max-h-64">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 w-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          <div>
            <p className="text-sm text-purple-100 mb-2">Caption</p>
            <TextArea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Nhập mô tả / cảm nghĩ về bức ảnh của bạn..."
              className="!bg-white/5 !border-purple-700/60 !text-white"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Posts;
