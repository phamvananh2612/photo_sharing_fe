import { useState, useEffect } from "react";
import { Modal, Button, Upload, Input, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import UserList from "../../component/user/UserList";
import { motion } from "framer-motion";
import PostCard from "../../component/post/PostCard";
import { useAuth } from "../../contexts/AuthContext";
import { usePhotoContext } from "../../contexts/PhotoContext";

const { TextArea } = Input;

const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const {
    photos,
    fetchAllPhotos,
    uploadPhoto,
    deletePhoto,
    addComment,
    updateComment,
    deleteComment,
    updateCaption,
  } = usePhotoContext();

  // Load user hiện tại
  const { user: currentUser } = useAuth();

  // Load tất cả bài đăng
  useEffect(() => {
    fetchAllPhotos();
  }, [fetchAllPhotos]);

  const getInitial = () => {
    if (!currentUser) return "U";
    const name =
      currentUser.login_name ||
      `${currentUser.last_name || ""} ${currentUser.first_name || ""}`;
    if (!name.trim()) return "U";
    const parts = name.trim().split(" ");
    return parts[parts.length - 1][0].toUpperCase();
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      message.warning("Vui lòng chọn ảnh.");
      return;
    }

    setIsUploading(true);
    try {
      await uploadPhoto(file, caption);
      setIsModalOpen(false);
      setFile(null);
      setCaption("");
      setPreviewUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectFile = (file) => {
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    return false;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFile(null);
    setPreviewUrl("");
    setCaption("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen bg-gradient-to-b from-[#0b0214] via-[#140220] to-[#0b0214] py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feed chính */}
          <div className="lg:col-span-2 space-y-6">
            {/* Composer đăng bài */}
            <div className="bg-[#180329]/80 border border-purple-800/50 rounded-2xl px-5 py-4 shadow-xl shadow-purple-900/30 flex items-center gap-3">
              {/* Avatar user */}
              <div className="w-11 h-11">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="avatar"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/60"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-sm font-bold ring-2 ring-purple-500/60 text-white">
                    {getInitial()}
                  </div>
                )}
              </div>

              {/* Ô mở modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 text-left text-purple-200/80 text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-purple-700/40 transition"
              >
                {currentUser
                  ? `${
                      currentUser.first_name || currentUser.login_name
                    }, bạn đang nghĩ gì?`
                  : "Bạn đang nghĩ gì?"}
              </button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-500 border-none shadow-purple-600/40"
              >
                Đăng
              </Button>
            </div>

            {/* Feed bài đăng = PostCard */}
            {photos && photos.filter(Boolean).length > 0 ? (
              photos
                .filter(Boolean)
                .map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    currentUserId={currentUser?._id}
                    onDeletePost={deletePhoto}
                    onAddComment={addComment}
                    onUpdateComment={updateComment}
                    onDeleteComment={deleteComment}
                    onUpdateCaption={updateCaption}
                  />
                ))
            ) : (
              <p className="text-purple-300/70">Chưa có bài đăng nào.</p>
            )}
          </div>

          {/* Danh sách người dùng */}
          <div className="lg:col-span-1">
            <UserList />
          </div>
        </div>

        {/* Modal đăng bài */}
        <Modal
          open={isModalOpen}
          onOk={handleUploadPhoto}
          onCancel={handleCloseModal}
          okText={isUploading ? "Đang đăng..." : "Đăng bài"}
          cancelText="Hủy"
          confirmLoading={isUploading}
          centered
          className="custom-modal"
          title="Tạo bài viết mới"
        >
          <div className="space-y-4">
            {/* Chọn ảnh */}
            <Upload
              beforeUpload={handleSelectFile}
              maxCount={1}
              accept="image/*"
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                className="border-purple-500/60 text-purple-100 bg-white/5 hover:bg-white/10"
              >
                Chọn ảnh
              </Button>
            </Upload>

            {previewUrl && (
              <div className="rounded-2xl overflow-hidden border border-purple-700/60 bg-black/40 max-h-64">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="max-h-64 w-full object-contain"
                />
              </div>
            )}

            {/* Caption */}
            <TextArea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Viết gì đó về bức ảnh..."
              className="!bg-white/5 !border-purple-700/60 !text-white"
            />
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Feed;
