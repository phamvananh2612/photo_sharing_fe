import { Button, Form, Input, message } from "antd";
import { checkUser } from "../../services/UserService";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUser } = useAuth();

  const handleSubmit = async (e) => {
    console.log(e);
    try {
      const response = await checkUser(e);
      const user = response.data.user;

      if (response.ok) {
        setIsLogin(true);
        setUser(user);
        message.success(response.data.message);
        setTimeout(() => navigate("/feed"), 1500);
      } else {
        setIsLogin(false);
        message.error(response.data.message);
      }
    } catch (error) {
      console.log("Đăng nhập không thành công");
      setIsLogin(false);
      message.error("Đăng nhập không thành công");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex bg-[#0b071c] text-white">
          {/* cột trái */}
          <div className="hidden md:block w-1/2 relative">
            <img
              src="https://i.pinimg.com/1200x/17/12/1e/17121ead6865c8b7a560db65186ab7d7.jpg"
              alt="cover"
              className="w-full h-[90vh] object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            <div className="absolute bottom-10 left-10 max-w-md">
              <h1 className="text-3xl font-bold mb-3">
                Lưu giữ khoảnh khắc, Chia sẻ đam mê.
              </h1>
              <p className="opacity-80">
                Tham gia cộng đồng nhiếp ảnh và khám phá câu chuyện qua từng bức
                ảnh.
              </p>
            </div>
          </div>

          {/* cột phải */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 min-h-[90vh] md:min-h-0">
            <div className="w-full max-w-sm">
              <h2 className="text-4xl font-bold mb-6">Chào mừng trở lại!</h2>

              <Form
                onFinish={handleSubmit}
                name="Login"
                colon={false}
                layout="vertical"
                className="space-y-2"
              >
                <Form.Item
                  label={<span className="text-white">Email or username</span>}
                  name="login_name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email hoặc username",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email của bạn" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white">Mật khẩu</span>}
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                >
                  <Input.Password placeholder="Nhập mật khẩu của bạn" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="!mt-7 !h-11 !bg-[#6a4cff] hover:!bg-[#7b5fff] !border-none !text-white"
                  block
                >
                  Đăng nhập
                </Button>

                <p className="text-center mt-4 text-sm text-white">
                  Bạn chưa có tài khoản?{" "}
                  <Link to="/register" className="text-[#7b5fff] font-medium">
                    Đăng ký ngay
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
