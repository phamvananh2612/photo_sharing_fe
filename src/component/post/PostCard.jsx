import CommentSection from "./CommentSection";
import { formatTime } from "../../utils/formatTime";
import { useState } from "react";
import { Card, Avatar, Button, Input, Popover, Modal } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ActionMenu from "../common/ActionMenu";
import "./styles.css";

const { TextArea } = Input;

const PostCard = ({
  post,
  currentUserId,
  getUserName,
  getUserAvatar,
  onDeletePost,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onUpdateCaption,
}) => {
  const isOwner = currentUserId && currentUserId === post.user_id;
  const [isEditCaptionOpen, setIsEditCaptionOpen] = useState(false);
  const [captionValue, setCaptionValue] = useState(post.caption || "");
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

  const renderOwnerAvatar = () => {
    const displayName =
      (getUserName && getUserName(post.user_id)) || "Người dùng";
    const avatarUrl = (getUserAvatar && getUserAvatar(post.user_id)) || null;
    const initial = displayName.charAt(0).toUpperCase();

    if (avatarUrl) {
      return (
        <Avatar
          src={avatarUrl}
          size={40}
          className="ring-2 ring-purple-500/60"
        />
      );
    }

    return (
      <Avatar
        size={40}
        style={{
          background:
            "linear-gradient(135deg, rgba(147,51,234,1) 0%, rgba(79,70,229,1) 100%)",
        }}
      >
        {initial}
      </Avatar>
    );
  };

  const ownerName =
    (getUserName && getUserName(post.user_id)) || "Người dùng ẩn danh";

  return (
    <Card
      bordered={false}
      className="bg-[#180329]/80 border border-purple-800/40 rounded-2xl shadow-xl shadow-purple-900/30 text-white overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {renderOwnerAvatar()}
          <div className="flex flex-col gap-1">
            <h2 className="!text-white !text-sm font-semibold">{ownerName}</h2>
            <br />
            <h3 className="!text-xs text-purple-200/70">
              {formatTime(post.date_time)}
            </h3>
          </div>
        </div>

        {isOwner && (
          <Popover
            content={popoverContent}
            trigger="click"
            placement="bottomRight"
            overlayClassName="custom-popover"
          >
            <Button
              type="text"
              className="
        !p-1.5
        hover:bg-white/5
        rounded-full
        flex items-center justify-center
      "
            >
              <MoreOutlined className="text-purple-200 text-lg" />
            </Button>
          </Popover>
        )}
      </div>

      <div className="bg-black">
        <img
          src={post.file_name}
          alt="post"
          className="w-full max-h-[550px] object-contain bg-black"
        />
      </div>

      <div className="px-4 py-3">
        {post.caption && post.caption.trim() ? (
          <h2 className="!text-sm text-purple-100">{post.caption}</h2>
        ) : (
          <h2 className="!text-sm text-purple-300/60 italic">
            (Không có mô tả)
          </h2>
        )}
      </div>

      <CommentSection
        post={post}
        currentUserId={currentUserId}
        getUserName={getUserName}
        getUserAvatar={getUserAvatar}
        onAddComment={onAddComment}
        onUpdateComment={onUpdateComment}
        onDeleteComment={onDeleteComment}
      />

      <Modal
        open={isEditCaptionOpen}
        onOk={handleSaveCaption}
        onCancel={() => setIsEditCaptionOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        centered
        className="custom-modal"
        title="Chỉnh sửa caption"
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
