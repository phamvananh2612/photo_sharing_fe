// import { Row, Col, Card } from "antd";
// import { Routes, Route, Outlet } from "react-router-dom";
// import UserList from "../../component/UserList";
// import UserDetail from "../../component/UserDetail";
// import "./styles.css";

// const About = () => {
//   return (
//     <div className="about-container">
//       <Row gutter={16}>
//         <Col span={6}>
//           <UserList />
//         </Col>
//         <Col span={18}>
//           <Card
//             title="Chi tiết "
//             variant="borderless"
//             style={{ height: "70vh", overflowY: "auto" }}
//             extra={<a href="#">Thêm ảnh mới</a>}
//           >
//             <Outlet />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default About;
import { useState } from "react";
import { Row, Col, Card, Modal, Select, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import UserList from "../../component/UserList";
import "./styles.css";

const imageOptions = [
  "anh1.jpg",
  "anh2.jpg",
  "anh3.jpg",
  "anh4.jpg",
  "anh5.jpg",
  "anh6.jpg",
  "anh7.jpg",
  "anh8.jpg",
  "anh9.jpg",
  "anh10.jpg",
  "anh11.jpg",
  "anh12.jpg",
  "anh13.jpg",
  "anh14.jpg",
]; // Danh sách ảnh có sẵn trong thư mục images/

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = async () => {
    if (!selectedImage) {
      message.warning("Vui lòng chọn ảnh trước khi tải lên.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/photo/photo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          file_name: selectedImage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Thêm ảnh thành công!");
        setIsModalOpen(false);
        setSelectedImage(null);
      } else {
        message.error(data.message || "Thêm ảnh thất bại.");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi kết nối tới máy chủ.");
    }
  };

  return (
    <div className="about-container">
      <Row gutter={16}>
        <Col span={6}>
          <UserList />
        </Col>
        <Col span={18}>
          <Card
            title="Chi tiết"
            variant="borderless"
            style={{ height: "70vh", overflowY: "auto" }}
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Thêm ảnh mới
              </Button>
            }
          >
            <Outlet />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Chọn ảnh có sẵn"
        open={isModalOpen}
        onOk={handleUpload}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedImage(null);
        }}
        okText="Tải lên"
        cancelText="Hủy"
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn một ảnh từ thư mục images/"
          value={selectedImage}
          onChange={(value) => setSelectedImage(value)}
        >
          {imageOptions.map((img) => (
            <Select.Option key={img} value={img}>
              {img}
            </Select.Option>
          ))}
        </Select>

        {selectedImage && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <img
              src={`/images/${selectedImage}`}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: 200 }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default About;
