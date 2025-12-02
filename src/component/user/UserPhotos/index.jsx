import { Card, Divider, Typography, Image, Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createComment,
  deleteComment,
  deletePhoto,
  getPhotos,
  updateComment,
} from "../../../services/PhotoService";
import { getAllUser } from "../../../services/UserService";

const { Text } = Typography;
const { TextArea } = Input;

const UserPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const [commentUpdate, setCommentUpdate] = useState({});
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getPhotos(userId);
      const result2 = await getAllUser();
      setPhotos(result.photos);
      setUsers(result2.users);
    };
    fetchApi();
  }, [userId, photos]);
  const getUserById = (id) => {
    const user = users.find((u) => u._id === id);
    return user
      ? `${user.first_name}` + " " + `${user.last_name}`
      : "Người dùng ẩn danh";
  };
  const handleAddComment = async (photoId) => {
    const comment = commentInput[photoId];
    if (!comment || comment.trim() === "") {
      message.warning("Vui lòng nhập nội dung trước khi bình luận");
      return;
    }
    try {
      const result = await createComment(photoId, { comment: comment });
      console.log(result);
      message.success(result.data.message);
      setPhotos((prev) =>
        prev.map((photo) => (photo._id === photoId ? result.data.photo : photo))
      );

      setCommentInput((prev) => ({
        ...prev,
        [photoId]: "",
      }));
    } catch (error) {
      console.log("lỗi:", error);
      message.error("Lỗi server");
    }
  };
  const handleChange = (photoId, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [photoId]: value,
    }));
  };
  const handleChange2 = (cmtId, value) => {
    setCommentUpdate((prev) => ({
      ...prev,
      [cmtId]: value,
    }));
  };
  const handelDeletePhoto = async (photoId) => {
    const result = await deletePhoto(photoId);
    console.log(result);
    message.success(result.message);
  };
  const handleDeleteComment = async (photoId, cmtId) => {
    const result = await deleteComment(photoId, cmtId);
    console.log(result);
    message.success(result.message);
  };
  const handleUpdateComment = async (photoId, cmtId) => {
    // console.log(photoId, cmtId);
    const cmt = commentUpdate[cmtId];
    const result = await updateComment(photoId, cmtId, { commentUp: cmt });
    console.log(result);
    message.success(result.message);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <h2>Ảnh của người dùng:{getUserById(userId)}</h2>

      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "24px" }} hoverable>
          {/* Ảnh */}
          <Image
            src={photo.file_name}
            alt="Ảnh"
            style={{
              maxHeight: 400,
              objectFit: "contain",
              width: "100%",
            }}
          />
          {/* CAPTION */}
          <Divider />
          <Text strong>Mô tả / Caption:</Text>
          <div style={{ marginTop: 6, marginBottom: 8 }}>
            {photo.caption && photo.caption.trim() !== "" ? (
              <Text>{photo.caption}</Text>
            ) : (
              <Text type="secondary">(Không có mô tả)</Text>
            )}
          </div>
          {/* Thời gian đăng */}
          <Divider />
          <Text strong>Đăng lúc:</Text>{" "}
          {new Date(photo.date_time).toLocaleString()}
          {/* Danh sách bình luận */}
          <Divider />
          <Text strong>Bình luận:</Text>
          {photo.comments.length > 0 ? (
            photo.comments.map((comment) => (
              <div key={comment._id} style={{ marginTop: "12px" }}>
                <Text type="secondary">
                  {new Date(comment.date_time).toLocaleString()}
                </Text>
                <br />
                <Text>
                  Người bình luận:{" "}
                  <Link to={`/about/users/${comment.user_id}`}>
                    {getUserById(comment.user_id)}
                  </Link>
                </Text>
                <br />
                <Text>{comment.comment}</Text>

                {/* Xóa comment */}
                <Button
                  className="btn_del"
                  type="warning"
                  onClick={() => handleDeleteComment(photo._id, comment._id)}
                >
                  Xóa cmt
                </Button>

                {/* Form sửa comment */}
                <div style={{ display: "flex" }}>
                  <TextArea
                    rows={2}
                    placeholder="Sửa bình luận..."
                    value={commentUpdate[comment._id] || ""}
                    onChange={(e) => handleChange2(comment._id, e.target.value)}
                  />
                  <Button
                    type="primary"
                    onClick={() => handleUpdateComment(photo._id, comment._id)}
                    style={{ marginTop: "8px" }}
                  >
                    Cập nhật cmt
                  </Button>
                </div>

                <Divider style={{ marginTop: "10px" }} />
              </div>
            ))
          ) : (
            <Text type="secondary">Chưa có bình luận nào.</Text>
          )}
          {/* Nhập bình luận mới */}
          <div style={{ marginTop: "12px" }}>
            <TextArea
              rows={2}
              placeholder="Nhập bình luận..."
              value={commentInput[photo._id] || ""}
              onChange={(e) => handleChange(photo._id, e.target.value)}
            />
            <Button
              type="primary"
              onClick={() => handleAddComment(photo._id)}
              style={{ marginTop: "8px" }}
            >
              Gửi bình luận
            </Button>
          </div>
          {/* Xóa ảnh */}
          <Divider />
          <Button
            className="btn_del"
            type="warning"
            onClick={() => handelDeletePhoto(photo._id)}
          >
            Xóa ảnh
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default UserPhotos;
