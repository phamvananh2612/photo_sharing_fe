const { get, post, patch, del } = require("../utils/request");

// hàm xử lý lấy toàn bộ danh sách người dùng
export const getAllUser = async () => {
  const result = await get("user/list");
  return result;
};

// hàm xử lý lấy danh sách chi tiết 1 người dùng
export const getDetailUser = async (id) => {
  const result = await get(`user/${id}`);
  return result;
};

// hàm xử lý đăng kí
export const createUser = async (options) => {
  const result = await post("user", options);
  return result;
};

// hàm xử lý đăng nhập
export const checkUser = async (options) => {
  const result = await post("admin/login", options);
  return result;
};

// hàm xử lý đăng xuất
export const logoutUser = async () => {
  const result = await post("admin/logout");
  return result;
};
