const { get, post, patch, del } = require("../utils/request");

// hàm xử lý lấy danh sách sảnh của 1 người dùng
export const getPhotos = async (userId) => {
  const result = await get(`photo/api/photos/${userId}`);
  return result;
};
