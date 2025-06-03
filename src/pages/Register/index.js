import { Button, Form, Input, Row, Col, message } from "antd";
import { createUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      const response = await createUser(e);
      console.log(response);
      if (response.ok) {
        message.success("Đăng kí tài khoản thành công");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        message.error("Đăng kí tài khoản thất bại");
      }
    } catch (error) {
      console.log("Lỗi khi tạo mới người dùng", error);
      message.error("Lỗi khi tạo mới người dùng");
    }
  };
  return (
    <>
      <div className="box-login-register register">
        <div className="title">
          <h1>Register</h1>
        </div>
        <div className="form-login-register">
          <Form
            onFinish={handleSubmit}
            name="Register"
            colon={false}
            layout="vertical"
            className="login-register"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Login_name"
                  name="login_name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="First_name"
                  name="first_name"
                  rules={[
                    { required: true, message: "Vui lòng nhập firstname" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Last_name"
                  name="last_name"
                  rules={[
                    { required: true, message: "Vui lòng nhập lastname" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Location" name="location">
                  <Input />
                </Form.Item>

                <Form.Item label="Description" name="description">
                  <Input />
                </Form.Item>

                <Form.Item label="Occupation" name="occupation">
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
