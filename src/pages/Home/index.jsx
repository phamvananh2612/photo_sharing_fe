import { useState, useEffect } from "react";
import { Modal, Button, Upload, Input, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import UserList from "../../component/user/UserList";
import { getAllUser } from "../../services/UserService";
import {
  uploadPhoto,
  getAllPhotos,
  createComment,
  deleteComment,
  updateComment,
  deletePhoto,
  updateCaption,
} from "../../services/PhotoService";
import PostCard from "../../component/post/PostCard";

const { TextArea } = Input;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user hiện tại
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  // Load danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUser();
        setUsers(res.users || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // Load tất cả bài đăng
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPhotos();
        setPosts(res.photos || []);
      } catch (err) {
        console.error(err);
        message.error("Lỗi khi tải danh sách bài đăng");
      }
    };
    fetchPosts();
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

  // hàm xác định tên của chủ bài viết
  const getUserName = (userId) => {
    if (!userId && !users.length) return null;
    const u = users.find((user) => user._id === userId);
    if (!u) return null;
    if (u.login_name) return u.login_name;
    const fullName = `${u.last_name || ""} ${u.first_name || ""}`.trim();
    return fullName || "Người dùng";
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      message.warning("Vui lòng chọn ảnh.");
      return;
    }

    setIsUploading(true);
    try {
      const { ok, data } = await uploadPhoto(file, caption);

      if (ok) {
        const newPost = data?.photo;

        if (!newPost) {
          message.warning(
            "Đăng bài thành công nhưng không nhận được dữ liệu ảnh."
          );
        } else {
          setPosts((prev) => [newPost, ...prev]);
        }

        setIsModalOpen(false);
        setFile(null);
        setCaption("");
        setPreviewUrl("");
      } else {
        message.error(data.message || "Đăng bài thất bại.");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi server.");
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

  // ====== HANDLER CHO POSTCARD ======

  const handleDeletePost = async (postId) => {
    try {
      const res = await deletePhoto(postId);
      message.success(res.message || "Xóa bài thành công");
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error(err);
      message.error("Không xóa được bài");
    }
  };

  const handleAddComment = async (postId, content) => {
    if (!content?.trim()) {
      message.warning("Vui lòng nhập nội dung bình luận");
      return;
    }

    try {
      const res = await createComment(postId, { comment: content });
      const data = res?.data ?? res;
      const updatedPost = data?.photo;

      if (updatedPost) {
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? updatedPost : p))
        );
      } else {
        console.warn("createComment không trả photo, fallback refetch");
        const refetch = await getAllPhotos();
        setPosts(refetch.photos || []);
      }

      message.success("Thêm bình luận thành công");
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi thêm bình luận");
    }
  };

  const handleUpdateComment = async (postId, cmtId, newContent) => {
    if (!newContent?.trim()) {
      message.warning("Nội dung bình luận không được trống");
      return;
    }

    try {
      const res = await updateComment(postId, cmtId, { commentUp: newContent });
      const data = res?.data ?? res;
      const updatedPhoto = data?.photo;
      const updatedComment = data?.comment;

      setPosts((prev) =>
        prev.map((p) => {
          if (p._id !== postId) return p;
          if (updatedPhoto) return updatedPhoto;
          const safeComments = Array.isArray(p.comments) ? p.comments : [];
          return {
            ...p,
            comments: safeComments.map((c) => {
              if (c._id !== cmtId) return c;
              if (updatedComment) return updatedComment; // ưu tiên BE
              return { ...c, comment: newContent }; // fallback FE
            }),
          };
        })
      );

      message.success("Cập nhật bình luận thành công");
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi cập nhật bình luận");
    }
  };

  const handleDeleteComment = async (postId, cmtId) => {
    try {
      const res = await deleteComment(postId, cmtId);
      message.success(res.message || "Đã xóa bình luận");
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, comments: p.comments.filter((c) => c._id !== cmtId) }
            : p
        )
      );
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi xóa bình luận");
    }
  };

  const handleUpdateCaption = async (postId, newCaption) => {
    if (!newCaption?.trim()) {
      message.warning("Caption không được để trống");
      return;
    }

    try {
      const res = await updateCaption(postId, { caption: newCaption });
      const updatedPhoto = res?.data?.photo || res?.photo;

      setPosts((prev) =>
        prev.map((p) => {
          if (p._id !== postId) return p;
          if (updatedPhoto) return updatedPhoto;
          return { ...p, caption: newCaption };
        })
      );

      message.success("Cập nhật caption thành công");
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi cập nhật caption");
    }
  };

  return (
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
          {posts && posts.filter(Boolean).length > 0 ? (
            posts
              .filter(Boolean)
              .map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUserId={currentUser?._id}
                  getUserName={getUserName}
                  onDeletePost={handleDeletePost}
                  onAddComment={handleAddComment}
                  onUpdateComment={handleUpdateComment}
                  onDeleteComment={handleDeleteComment}
                  onUpdateCaption={handleUpdateCaption}
                />
              ))
          ) : (
            <p className="text-purple-300/70">Chưa có bài đăng nào.</p>
          )}
        </div>

        {/* Danh sách bài người dùng */}
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
  );
};

export default Home;
