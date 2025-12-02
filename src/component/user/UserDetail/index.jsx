import { useState, useEffect } from "react";
import { Card, Descriptions, Button, Modal, Form, Input } from "antd";
import { useParams, Link } from "react-router-dom";
import { getDetailUser } from "../../../services/UserService";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(currentUser);

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
    <>
      <Card
        title="Chi tiết người dùng"
        variant="borderless"
        style={{ height: "70vh", overflowY: "auto" }}
        extra={
          user && currentUser && currentUser._id === user._id ? (
            <Button type="primary" onClick={showModal}>
              Cập nhật
            </Button>
          ) : null
        }
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
            <br />
            <Link to={`/about/post/${user._id}`}>Xem bài viết</Link>
          </>
        ) : (
          <p>Không tìm thấy người dùng.</p>
        )}
      </Card>
      <Modal
        title="Cập nhật thông tin người dùng"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Login name"
            name="login_name"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="First_name"
            name="first_name"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Occupation"
            name="occupation"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserDetail;
