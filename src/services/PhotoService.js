const { get, post, patch, del } = require("../utils/request");

// Lấy danh sách ảnh của 1 user
// GET /api/users/:userId/photos
export const getPhotos = async (userId) => {
  const result = await get(`api/users/${userId}/photos`);
  return result;
};

// Tạo mới comment cho 1 photo
// POST /api/photos/:photoId/comments
export const createComment = async (photoId, cmt) => {
  const result = await post(`api/photos/${photoId}/comments`, cmt);
  return result;
};

// Xóa 1 ảnh
// DELETE /api/photos/:photoId
export const deletePhoto = async (photoId) => {
  const result = await del(`api/photos/${photoId}`);
  return result;
};

// Xóa 1 comment
// DELETE /api/photos/:photoId/comments/:cmtId
export const deleteComment = async (photoId, cmtId) => {
  const result = await del(`api/photos/${photoId}/comments/${cmtId}`);
  return result;
};

// Cập nhật 1 comment
// PATCH /api/photos/:photoId/comments/:cmtId
export const updateComment = async (photoId, cmtId, cmt) => {
  const result = await patch(`api/photos/${photoId}/comments/${cmtId}`, cmt);
  return result;
};

// hàm xử lý lấy APi tạo mới 1 ảnh
// POST /api/photos
export const uploadPhoto = async (file, caption) => {
  const formData = new FormData();
  formData.append("image", file);
  if (caption) {
    formData.append("caption", caption);
  }

  const result = await post(`api/photos`, formData);
  return result;
};

// hàm xử lý  lấy ra toàn bộ danh sách ảnh
// GET /api/photos
export const getAllPhotos = async () => {
  const result = await get(`api/photos`);
  return result;
};

// hàm xử lý API cập nhật caption của 1 ảnh
export const updateCaption = async (photo_id, newCaption) => {
  const result = await patch(`api/photos/${photo_id}`, newCaption);
  return result;
};
// hàm xử lý APi cập nhật like/unlike khi click vào nút tym
export const toggleLikePhoto = async (photoId) => {
  const result = await patch(`api/photos/${photoId}/like`);
  return result; // result sẽ chứa { message, likesCount, isLiked }
};

// hàm xử lý API lấy ra danh sách ảnh yêu thích
export const getWishList = async (userId) => {
  const result = await get(`api/photos/${userId}/favorite`);
  return result;
};
