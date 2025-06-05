const { get, post, patch, del } = require("../utils/request");

// hàm xử lý lấy danh sách sảnh của 1 người dùng
export const getPhotos = async (userId) => {
  const result = await get(`photo/api/photos/${userId}`);
  return result;
};

// hàm xử lý tạo mới comment
export const createComment = async (photoId, cmt) => {
  const result = await post(`photo/commentsOfPhoto/${photoId}`, cmt);
  return result;
};
