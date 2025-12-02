import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../../services/UserService";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await createUser(values);

      if (response.ok) {
        message.success("Đăng ký thành công!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        message.error(response.data.message || "Đăng ký thất bại");
      }
    } catch (error) {
      console.log(error);
      message.error("Đăng ký không thành công");
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
        <div className="flex min-h-[90vh] bg-[#0b071c] text-white">
          {/* cột trái */}
          <div className="hidden md:block w-1/2 relative">
            <img
              src="https://i.pinimg.com/1200x/48/1b/24/481b242d42ac90d4d3a7b64ed6fffd32.jpg"
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
          <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16">
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold mb-6">Đăng ký tài khoản</h2>

              <Form
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-2"
              >
                {/* tên đăng nhập */}
                <Form.Item
                  label={<span className="text-white">Tên đăng nhập</span>}
                  name="login_name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập" },
                  ]}
                >
                  <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>

                {/* Họ + Tên */}
                <div className="flex gap-2">
                  {/* Họ */}
                  <Form.Item
                    label={<span className="text-white">Họ</span>}
                    name="last_name"
                    className="flex-1"
                    rules={[{ required: true, message: "Vui lòng nhập họ" }]}
                  >
                    <Input placeholder="Nhập họ" />
                  </Form.Item>

                  {/* Tên */}
                  <Form.Item
                    label={<span className="text-white">Tên</span>}
                    name="first_name"
                    className="flex-1"
                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                  >
                    <Input placeholder="Nhập tên" />
                  </Form.Item>
                </div>

                {/* password */}
                <Form.Item
                  label={<span className="text-white">Mật khẩu</span>}
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="!mt-7 !h-11 !bg-[#6a4cff] hover:!bg-[#7b5fff] !border-none !text-white"
                  block
                >
                  Đăng ký
                </Button>

                <p className="text-center mt-4 text-sm text-white">
                  Bạn đã có tài khoản?{" "}
                  <Link to="/login" className="text-[#7b5fff] font-medium">
                    Đăng nhập ngay
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

export default Register;
