const { get, post, patch, del } = require("../utils/request");

// hàm xử lý lấy danh sách bài viết
export const getPost = async () => {
  const result = await get("post/post/list");
  return result;
};
