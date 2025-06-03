import { useState, useEffect } from "react";
import { Card, Descriptions, Spin } from "antd";
import { useParams, Link } from "react-router-dom";
import { getDetailUser } from "../../services/UserService";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getDetailUser(id);
        setUser(result);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết người dùng:", error);
      }
    };
    fetchApi();
  }, [id]);

  return (
    <Card
      title="Chi tiết người dùng"
      variant="borderless"
      style={{ height: "70vh", overflowY: "auto" }}
    >
      {user ? (
        <>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{user._id}</Descriptions.Item>
            <Descriptions.Item label="Login name">
              {user.login_name}
            </Descriptions.Item>
            <Descriptions.Item label="First name">
              {user.first_name}
            </Descriptions.Item>
            <Descriptions.Item label="Last name">
              {user.last_name}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {user.location}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {user.description}
            </Descriptions.Item>
            <Descriptions.Item label="Occupation">
              {user.occupation}
            </Descriptions.Item>
          </Descriptions>
          <Link to={`/about/photos/${user._id}`}>Bộ sưu tập</Link>
        </>
      ) : (
        <p>Không tìm thấy người dùng.</p>
      )}
    </Card>
  );
};

export default UserDetail;
