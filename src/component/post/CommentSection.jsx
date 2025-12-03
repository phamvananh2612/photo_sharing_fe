import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Divider, Avatar } from "antd";
import ActionMenu from "../common/ActionMenu";
import "./styles.css";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const CommentSection = ({
  post,
  currentUserId,
  getUserName,
  getUserAvatar,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [editing, setEditing] = useState({}); // { [cmtId]: string }
  const [editingId, setEditingId] = useState(null); // id comment đang mở form sửa

  const formatTime = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return "";
    }
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    onAddComment(post._id, newComment);
    setNewComment("");
  };

  const handleChangeEdit = (cmtId, value) => {
    setEditing((prev) => ({ ...prev, [cmtId]: value }));
  };

  const handleSubmitEdit = (cmtId) => {
    const value = editing[cmtId];
    if (!value?.trim()) return;
    onUpdateComment(post._id, cmtId, value);
    setEditingId(null); // đóng form sửa sau khi cập nhật
  };

  const handleDeleteCommentClick = (cmtId) => {
    onDeleteComment(post._id, cmtId);
  };

  const handleOpenEdit = (cmt) => {
    setEditingId(cmt._id);
    setEditing((prev) => ({
      ...prev,
      [cmt._id]: cmt.comment, // fill sẵn nội dung cũ
    }));
  };

  // popover action cho từng comment
  const renderPopoverContent = (cmt) => (
    <ActionMenu
      className="min-w-[150px]"
      items={[
        {
          key: "edit-comment",
          label: "Chỉnh sửa",
          icon: <EditOutlined className="text-purple-300" />,
          onClick: () => handleOpenEdit(cmt),
          danger: false,
        },
        {
          key: "delete-comment",
          label: "Xóa bình luận",
          icon: <DeleteOutlined />,
          onClick: () => handleDeleteCommentClick(cmt._id),
          danger: true,
        },
      ]}
    />
  );

  return (
    <>
      {/* list comment */}
      <Divider className="!my-2 !border-purple-800/60" />
      <div className="px-4 pb-3">
        <h3 className="!text-xs text-purple-200/80 font-semibold">Bình luận</h3>

        {post.comments && post.comments.length > 0 ? (
          <div className="mt-2 max-h-52 overflow-y-auto space-y-3 pr-1">
            {post.comments.map((cmt) => {
              const name =
                (getUserName && getUserName(cmt.user_id)) || "Người dùng";

              const avatarUrl =
                (getUserAvatar && getUserAvatar(cmt.user_id)) || null;

              const initial = name.charAt(0).toUpperCase();

              const editValue = editing[cmt._id] ?? "";
              const isOwner = currentUserId && currentUserId === cmt.user_id; // chỉ show 3 chấm nếu là cmt của mình

              return (
                <div
                  key={cmt._id}
                  className="bg-white/5 border border-purple-800/40 rounded-xl px-3 py-2 relative"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start gap-2">
                      <Link to={`/profile/${cmt.user_id}`}>
                        {avatarUrl ? (
                          <Avatar
                            src={avatarUrl}
                            size={40}
                            className="ring-2 ring-purple-500/60"
                          />
                        ) : (
                          <Avatar
                            size={40}
                            className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white ring-2 ring-purple-500/60"
                          >
                            {initial}
                          </Avatar>
                        )}
                      </Link>

                      <div className="flex flex-col">
                        <Link to={`/profile/${cmt.user_id}`}>
                          {" "}
                          <h4 className="!text-sm font-semibold text-purple-100">
                            {name}
                          </h4>
                        </Link>

                        <h4 className="!text-[14px] text-purple-300/80 mt-0.5">
                          {cmt.comment}
                        </h4>
                      </div>
                    </div>

                    {isOwner && (
                      <Popover
                        content={renderPopoverContent(cmt)}
                        trigger="click"
                        placement="bottomRight"
                        overlayClassName="custom-popover"
                      >
                        <button className="p-1 rounded-full hover:bg-white/10 transition">
                          <HiDotsHorizontal className="text-purple-200 text-lg" />
                        </button>
                      </Popover>
                    )}
                  </div>

                  {editingId === cmt._id && (
                    <div className="mt-2 flex gap-2">
                      <TextArea
                        rows={1}
                        placeholder="Sửa bình luận..."
                        value={editValue}
                        onChange={(e) =>
                          handleChangeEdit(cmt._id, e.target.value)
                        }
                        className="!bg-[#0b0214] !border-purple-700/60 !text-white"
                      />
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-500/50 text-white rounded-full shadow-lg shadow-purple-900/50 flex items-center justify-center"
                        size="small"
                        onClick={() => handleSubmitEdit(cmt._id)}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-2">
            <h4 className="!text-xs text-purple-200/70">
              Chưa có bình luận nào.
            </h4>
          </div>
        )}
      </div>

      {/* form nhập comment */}
      <Divider className="!my-2 !border-purple-800/60" />
      <div className="px-4 pb-4">
        <div className="flex gap-2 items-start">
          <TextArea
            rows={2}
            placeholder={`Viết bình luận của bạn ....`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="!bg-[#0b0214] !border-purple-700/60 !text-white placeholder-slate-300 rounded-2xl p-3"
          />
          <Button
            onClick={handleSubmitComment}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-500/50 text-white rounded-full shadow-lg shadow-purple-900/50 flex items-center justify-center"
            size="middle"
          >
            <IoIosSend size={18} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
