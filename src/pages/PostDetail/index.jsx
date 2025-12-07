import { useEffect, useState } from "react";
import {
  Image,
  Avatar,
  Spin,
  message,
  Button,
  Modal,
  Input,
  Popover,
} from "antd";
import { useParams, Link } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";
import CommentSection from "../../component/post/CommentSection";
import { useAuth } from "../../contexts/AuthContext";
import {
  HeartOutlined,
  HeartFilled,
  MoreOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { usePhotoContext } from "../../contexts/PhotoContext";
import ActionMenu from "../../component/common/ActionMenu";

const PostDetail = () => {
  const { photoId } = useParams();
  const { user: currentUser } = useAuth();
  const currentUserId = currentUser?._id;

  const {
    getPhotoByIdLocal,
    ensurePhoto,
    toggleLike,
    addComment,
    updateComment,
    deleteComment,
    updateCaption,
  } = usePhotoContext();

  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [isEditCaptionOpen, setIsEditCaptionOpen] = useState(false);
  const [captionValue, setCaptionValue] = useState("");

  const photo = getPhotoByIdLocal(photoId);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      if (!photoId) return;
      setLoading(true);
      try {
        await ensurePhoto(photoId);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        message.error("Không thể tải bài viết");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (!photo) {
      fetchData();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [photoId, photo, ensurePhoto]);

  useEffect(() => {
    setCaptionValue(photo?.caption || "");
  }, [photo?.caption]);

  const handleOpenEditCaption = () => {
    setCaptionValue(photo.caption || "");
    setIsEditCaptionOpen(true);
  };

  const handleSaveCaption = () => {
    if (!captionValue.trim()) return;
    updateCaption(photo._id, captionValue);
    setIsEditCaptionOpen(false);
  };

  const popoverContent = (
    <ActionMenu
      className="min-w-[140px]"
      items={[
        {
          key: "edit-caption",
          label: "Chỉnh sửa caption",
          icon: <EditOutlined className="text-purple-300" />,
          onClick: handleOpenEditCaption,
          danger: false,
        },
      ]}
    />
  );

  let likesCount = 0;
  let isLiked = false;

  if (photo) {
    likesCount =
      typeof photo.likesCount === "number"
        ? photo.likesCount
        : Array.isArray(photo.likes)
        ? photo.likes.length
        : 0;

    isLiked =
      Array.isArray(photo?.likes) && currentUserId
        ? photo.likes.some(
            (id) => id && id.toString() === currentUserId.toString()
          )
        : false;
  }

  const handleToggleLike = async () => {
    if (!photo) return;

    if (!currentUserId) {
      message.warning("Bạn cần đăng nhập để thích ảnh");
      return;
    }

    setIsLiking(true);
    try {
      await toggleLike(photo._id);
    } catch (error) {
      console.log("Lỗi khi like ảnh: ", error);
      message.error("Có lỗi khi thực hiện thao tác thích ảnh");
    } finally {
      setIsLiking(false);
    }
  };

  if (loading && !photo) {
    return (
      <div className="min-h-screen bg-[#0b0214] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-[#0b0214] flex items-center justify-center text-white">
        Không tìm thấy bài viết.
      </div>
    );
  }

  const author = photo.user || photo.user_id || {};
  const ownerId =
    typeof photo.user_id === "string" ? photo.user_id : photo.user_id?._id;

  const authorId =
    author._id ||
    (typeof photo.user_id === "string" ? photo.user_id : photo.user_id?._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen bg-[#0b0214] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-[#140220]/60 border border-purple-800/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* LEFT IMAGE */}
          <div className="flex items-center justify-center bg-black max-h-[90vh] p-4">
            <Image
              src={photo.file_name}
              alt="post"
              className="rounded-lg shadow-xl"
              preview={true}
              style={{ maxHeight: "85vh", objectFit: "contain" }}
            />
          </div>

          <div className="flex flex-col bg-[#0b0214]/90 h-full max-h-[90vh] border-l border-purple-800/40">
            {/* Header*/}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-purple-900/50 bg-[#12011b]/80 sticky top-0 z-10 relative">
              {author.avatar ? (
                <Avatar src={author.avatar} size={44} />
              ) : (
                <Avatar size={44} style={{ background: "#6633cc" }}>
                  {(author.login_name || "U").charAt(0).toUpperCase()}
                </Avatar>
              )}

              <div className="flex flex-col">
                {authorId ? (
                  <Link to={`/profile/${authorId}`}>
                    <span className="text-white text-sm font-semibold hover:text-purple-300">
                      {author.login_name || "Người dùng"}
                    </span>
                  </Link>
                ) : (
                  <span className="text-white text-sm font-semibold">
                    {author.login_name || "Người dùng"}
                  </span>
                )}
                <span className="text-xs text-purple-400">
                  {formatTime(photo.date_time)}
                </span>
              </div>

              {currentUserId && currentUserId === ownerId && (
                <Popover
                  content={popoverContent}
                  trigger="click"
                  placement="bottomRight"
                  overlayClassName="custom-popover"
                >
                  <Button
                    type="text"
                    shape="circle"
                    icon={<MoreOutlined className="text-purple-200" />}
                    className="!border-none hover:!bg-white/10 absolute right-2 top-2"
                  />
                </Popover>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Caption */}
              <div>
                <h2 className="text-purple-100 text-base font-semibold mb-1">
                  {captionValue.trim() ? captionValue : "Không có caption"}
                </h2>
              </div>

              {/* toggle like */}
              <div className="flex items-center gap-3 text-purple-200 text-sm">
                <Button
                  type="text"
                  onClick={handleToggleLike}
                  loading={isLiking}
                  className="!text-purple-200 hover:!bg-white/5 flex items-center gap-1 !px-3 !py-1 rounded-full border border-purple-700/40"
                  icon={
                    isLiked ? (
                      <HeartFilled style={{ color: "#ef4444", fontSize: 20 }} />
                    ) : (
                      <HeartOutlined style={{ fontSize: 20 }} />
                    )
                  }
                >
                  {likesCount}
                </Button>
                <span>{likesCount} lượt thích</span>
              </div>

              <div className="h-px bg-purple-800/40" />

              {/* comment section */}
              <CommentSection
                post={photo}
                currentUserId={currentUserId}
                onAddComment={addComment}
                onUpdateComment={updateComment}
                onDeleteComment={deleteComment}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isEditCaptionOpen}
        onOk={handleSaveCaption}
        onCancel={() => setIsEditCaptionOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        centered
        title="Chỉnh sửa caption"
        className="custom-modal"
      >
        <Input.TextArea
          rows={3}
          value={captionValue}
          onChange={(e) => setCaptionValue(e.target.value)}
          placeholder="Nhập caption mới..."
          className="!bg-white/5 !border-purple-700/60 !text-white"
        />
      </Modal>
    </motion.div>
  );
};

export default PostDetail;
