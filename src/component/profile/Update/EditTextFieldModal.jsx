import { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { updateUser } from "../../../services/UserService";
import "./styles.css";

const { TextArea } = Input;

const EditTextFieldModal = ({
  open, // boolean: có mở modal không
  onClose, // function: đóng modal
  userId, // id user
  field, // tên field trong DB: "description", "location", "first_name", ...
  label, // label hiển thị: "Mô tả", "Địa điểm", "Họ", ...
  initialValue, // giá trị ban đầu
  isTextarea = false, // true nếu bạn muốn dùng TextArea (vd: description)
  onUpdated, // callback: nhận user mới sau khi update
}) => {
  const [form] = Form.useForm();

  // Khi mở modal thì set lại value cho form
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        value: initialValue || "",
      });
    }
  }, [open, initialValue, form]);

  const handleOk = async () => {
    try {
      const { value } = await form.validateFields();

      // Gọi API updateUser: gửi 1 field
      const res = await updateUser(userId, { [field]: value });
      console.log("API response: ", res);

      // tuỳ BE trả, mình bắt generic:
      const updatedUser = res?.data?.user || res?.data || null;

      if (!res.ok) {
        throw new Error(updatedUser?.message || "Cập nhật thất bại");
      }

      message.success("Cập nhật thành công");

      // gọi callback để Profile cập nhật state user
      if (updatedUser && onUpdated) {
        onUpdated(updatedUser);
      }

      onClose();
    } catch (err) {
      // Nếu lỗi form validate thì err có errorFields, mình không toast nữa
      if (err?.errorFields) return;

      console.error("Lỗi cập nhật:", err);
      message.error(err.message || "Cập nhật thất bại");
    }
  };

  return (
    <Modal
      className="custom-modal"
      open={open}
      title={`Cập nhật ${label.toLowerCase()}`}
      onOk={handleOk}
      onCancel={onClose}
      okText="Lưu"
      cancelText="Hủy"
      centered
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={label}
          name="value"
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${label.toLowerCase()}`,
            },
          ]}
        >
          {isTextarea ? <TextArea rows={4} /> : <Input />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTextFieldModal;
