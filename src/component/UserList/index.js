import { useState, useEffect } from "react";
import { List, Divider, Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { getAllUser } from "../../services/UserService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getAllUser();
        console.log(result);
        setUsers(result.users || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng: ", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card
        title="Danh sách người dùng"
        variant="borderless"
        style={{ width: 300, height: "70vh", overflowY: "auto" }}
      >
        <List
          dataSource={users}
          renderItem={(item) => (
            <div key={item._id} className="item-user">
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link
                      to={`/about/users/${item._id}`}
                      style={{ width: "100%" }}
                    >
                      {item.login_name}
                    </Link>
                  }
                />
              </List.Item>
              <Divider />
            </div>
          )}
        />
      </Card>
    </>
  );
};

export default UserList;
