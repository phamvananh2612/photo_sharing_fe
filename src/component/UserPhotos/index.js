import { Card, Divider, Typography, Image } from "antd";
import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPhotos } from "../../services/PhotoService";
import { getAllUser } from "../../services/UserService";

const { Text } = Typography;

const UserPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getPhotos(userId);
      const result2 = await getAllUser();
      console.log(result2.users);
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
  const handleAddComment = (e) => {
    console.log(e);
  };
  const handleComment = (e) => {
    console.log(e);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <h2>Ảnh của người dùng:{getUserById(userId)}</h2>

      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "24px" }} hoverable>
          <Image
            src={require(`../../images/${photo.file_name}`)}
            alt="Ảnh"
            style={{
              maxHeight: 400,
              objectFit: "contain",
              width: "100%",
            }}
          />
          <Divider />
          <Text strong>Đăng lúc:</Text>
          {new Date(photo.date_time).toLocaleString()}
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
                <Divider style={{ marginTop: "10px" }} />
              </div>
            ))
          ) : (
            <Text type="secondary">Chưa có bình luận nào.</Text>
          )}
          {/* Nhập comment  */}
          {/* <div style={{ marginTop: "12px" }}> */}
          {/* <TextArea
              rows={2}
              placeholder="Nhập bình luận..."
              value={commentTexts[photo._id] || ""}
              onChange={handleComment}
            />
            <Button
              type="primary"
              onClick={handleAddComment}
              style={{ marginTop: "8px" }}
            >
              Gửi bình luận
            </Button>
          </div> */}
        </Card>
      ))}
    </div>
  );
};

export default UserPhotos;
