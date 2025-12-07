import CommentSection from "./CommentSection";
import { formatTime } from "../../utils/formatTime";
import { useState, useEffect } from "react";
import { Card, Avatar, Button, Input, Popover, Modal } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import ActionMenu from "../common/ActionMenu";
import "./styles.css";
import { usePhotoContext } from "../../contexts/PhotoContext";
import { message } from "antd";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const PostCard = ({
  post,
  currentUserId,
  onDeletePost,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onUpdateCaption,
}) => {
  const { toggleLike } = usePhotoContext();

  const author = post?.user || {};
  const [isEditCaptionOpen, setIsEditCaptionOpen] = useState(false);
  const [captionValue, setCaptionValue] = useState(post?.caption || "");
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    setCaptionValue(post?.caption || "");
  }, [post?.caption]);

  // Tính số tym & trạng thái tym dựa trên post từ Context
  const likesCount =
    post?.likesCount ?? (Array.isArray(post?.likes) ? post.likes.length : 0);

  const isLiked =
    Array.isArray(post?.likes) && currentUserId
      ? post.likes.some(
          (id) => id && id.toString() === currentUserId.toString()
        )
      : false;

  if (!post) {
    return null;
  }

  const handleOpenEditCaption = () => {
    setCaptionValue(post.caption || "");
    setIsEditCaptionOpen(true);
  };

  const handleSaveCaption = () => {
    if (!captionValue.trim()) return;
    if (onUpdateCaption) {
      onUpdateCaption(post._id, captionValue);
    }
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
        {
          key: "delete-post",
          label: "Xóa bài",
          icon: <DeleteOutlined />,
          onClick: () => onDeletePost && onDeletePost(post._id),
          danger: true,
        },
      ]}
    />
  );

  const ownerName =
    author.login_name || author.last_name || "Người dùng ẩn danh";

  const ownerId =
    typeof post.user_id === "string" ? post.user_id : post.user_id?._id;

  const handleToggleLike = async () => {
    if (!currentUserId) {
      message.warning("Bạn cần đăng nhập để thích ảnh");
      return;
    }

    if (!post?._id) return;

    setIsLiking(true);
    try {
      await toggleLike(post._id);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card
      className="bg-[#180329]/80 border border-purple-800/60 rounded-2xl 
      shadow-xl shadow-purple-900/40 overflow-hidden post-card"
      bodyStyle={{ padding: 0 }}
    >
      {/* Header: Avatar + tên + thời gian + menu */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-800/60 bg-black/20">
        <div className="flex items-center gap-3">
          <Avatar
            src={author.avatar}
            size={40}
            style={{
              background:
                "radial-gradient(circle at top, #a855f7, #1e1b4b 60%, #020617)",
              border: "1px solid rgba(168,85,247,0.6)",
            }}
          >
            {!author.avatar &&
              (ownerName ? ownerName.charAt(0).toUpperCase() : "U")}
          </Avatar>

          <div className="flex flex-col gap-1">
            <h2 className="!text-white !text-sm font-semibold">{ownerName}</h2>
            <h3 className="!text-xs text-purple-200/70">
              {formatTime(post.date_time)}
            </h3>
          </div>
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
              className="!border-none hover:!bg-white/10"
            />
          </Popover>
        )}
      </div>

      {/* Ảnh + nút tym nổi */}
      <div className="relative bg-black/60">
        <Link to={`/posts/${post._id}`}>
          <img
            src={post.file_name}
            alt={post.caption || "Ảnh"}
            className="w-full max-h-[580px] object-contain bg-black"
          />
        </Link>

        <Button
          type="text"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleLike();
          }}
          loading={isLiking}
          className="!text-purple-200 hover:!bg-black/40 flex items-center gap-1 !p-2 
             rounded-full absolute bottom-3 right-3 z-10 bg-black/40"
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
      </div>

      {/* Caption */}
      <div className="px-4 py-3">
        {post.caption && post.caption.trim() ? (
          <p className="text-purple-50 text-sm whitespace-pre-line">
            {post.caption}
          </p>
        ) : (
          <p className="text-purple-300/60 italic text-sm">
            Chưa có caption nào cho bức ảnh này.
          </p>
        )}
      </div>

      {/* Comment section */}
      <div className="border-t border-purple-800/60 bg-black/30 px-4 py-3">
        <CommentSection
          post={post}
          currentUserId={currentUserId}
          onAddComment={onAddComment}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
        />
      </div>

      {/* Modal chỉnh caption */}
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
        <TextArea
          rows={3}
          value={captionValue}
          onChange={(e) => setCaptionValue(e.target.value)}
          placeholder="Nhập caption mới..."
          className="!bg-white/5 !border-purple-700/60 !text-white"
        />
      </Modal>
    </Card>
  );
};

export default PostCard;
