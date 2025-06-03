import { Button, Form, Input, message } from "antd";
import { checkUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(e);
    try {
      const response = await checkUser(e);
      console.log(response);
      const user = response.data.user;
      if (response.ok) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("user", JSON.stringify(user));
        message.success(response.data.message);
        setTimeout(() => {
          console.log("Chuyển trang sau 1.5s");
          navigate("/");
        }, 1500);
      } else {
        localStorage.setItem("isLogin", "false");
        message.error(response.data.message);
      }
    } catch (error) {
      console.log("Đăng nhập không thành công");
      localStorage.setItem("isLogin", "false");
      message.error("Đăng nhập không thành công");
    }
  };
  return (
    <>
      <div className="box-login-register login">
        <div className="title">
          <h1>Login</h1>
        </div>
        <div className="form-login-register">
          <Form
            onFinish={handleSubmit}
            name="Login"
            colon={false}
            layout="vertical"
            className="login-register"
          >
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
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/register">
                <p style={{ color: "#031d34" }}>
                  Bạn chưa có tài khoản? Đăng kí ngay
                </p>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
