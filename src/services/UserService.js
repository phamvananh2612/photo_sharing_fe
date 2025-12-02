const { get, post, patch } = require("../utils/request");

// Lấy toàn bộ danh sách người dùng
// GET /api/users
export const getAllUser = async () => {
  const result = await get("api/users");
  return result;
};

// Lấy chi tiết 1 người dùng
// GET /api/users/:id
export const getDetailUser = async (id) => {
  const result = await get(`api/users/${id}`);
  return result;
};

// Đăng ký (tạo mới user)
// POST /api/users
export const createUser = async (options) => {
  const result = await post("api/users", options);
  return result;
};

// Đăng nhập
// POST /api/auth/login
export const checkUser = async (options) => {
  const result = await post("api/auth/login", options);
  return result;
};

// Đăng xuất
// POST /api/auth/logout
export const logoutUser = async () => {
  const result = await post("api/auth/logout");
  return result;
};

// Update infor user
// PATCH /api/user/:userId
export const updateUser = async (id, options = {}) => {
  const formData = new FormData();

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return await patch(`api/users/${id}`, formData);
};
