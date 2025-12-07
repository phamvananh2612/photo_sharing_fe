import { createContext, useContext, useState } from "react";
import { message } from "antd";
import {
  getAllPhotos,
  uploadPhoto as uploadPhotoApi,
  deletePhoto as deletePhotoApi,
  toggleLikePhoto as toggleLikePhotoApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  updateCaption as updateCaptionApi,
  getPhotoById,
} from "../services/PhotoService";

const PhotoContext = createContext();

export const usePhotoContext = () => {
  const ctx = useContext(PhotoContext);
  if (!ctx) {
    throw new Error("usePhotoContext phải được dùng bên trong <PhotoProvider>");
  }
  return ctx;
};

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy toàn bộ ảnh
  const fetchAllPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getAllPhotos();
      setPhotos(res.photos || []);
    } catch (e) {
      console.error("Lỗi khi lấy danh sách bài: ", e);
      setError("Lỗi khi lấy danh sách bài");
      message.error("Lỗi khi lấy danh sách ảnh");
    } finally {
      setIsLoading(false);
    }
  };

  // Upload ảnh + caption
  const uploadPhoto = async (file, caption) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await uploadPhotoApi(file, caption);
      const data = res?.data;
      if (data && data.photo) {
        setPhotos((prev) => [data.photo, ...prev]);
        message.success(data.message || "Đăng ảnh thành công");
      } else {
        console.warn("uploadPhoto: API không trả photo", res);
        message.error(data?.message || "Không thể đăng ảnh");
      }
    } catch (e) {
      console.error("Lỗi khi upload ảnh:", e);
      setError("Lỗi khi upload ảnh");
      message.error("Lỗi khi upload ảnh");
    } finally {
      setIsLoading(false);
    }
  };

  // Xoá ảnh
  const deletePhoto = async (photoId) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await deletePhotoApi(photoId);
      setPhotos((prev) => prev.filter((p) => p._id !== photoId));
      message.success(res?.message || "Xóa ảnh thành công");
    } catch (err) {
      console.error("Lỗi khi xoá ảnh:", err);
      setError("Lỗi khi xoá ảnh");
      message.error("Lỗi khi xoá ảnh");
    } finally {
      setIsLoading(false);
    }
  };

  // Like / Unlike ảnh
  const toggleLike = async (photoId) => {
    try {
      const res = await toggleLikePhotoApi(photoId);
      const data = res?.data;

      if (data && data.photo) {
        const updated = data.photo;

        setPhotos((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );

        // Hiển thị message từ BE (Liked / Unliked)
        if (data.message) {
          if (data.message === "Liked") {
            // message.success("Đã tym ảnh này");
          } else if (data.message === "Unliked") {
            // message.success("Đã bỏ tym ảnh này");
          } else {
            message.error(data.message);
          }
        }
      } else {
        console.warn("toggleLike: API không trả photo", res);
        message.error("Không thể cập nhật trạng thái tym ảnh");
      }
    } catch (err) {
      console.error("Lỗi khi like/unlike ảnh:", err);
      message.error("Lỗi khi tym ảnh, thử lại sau");
    }
  };

  // Thêm comment
  const addComment = async (photoId, commentContent) => {
    try {
      const res = await createCommentApi(photoId, commentContent);
      const data = res?.data;

      if (data && data.photo) {
        const updated = data.photo;
        setPhotos((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
        message.success(data.message || "Bình luận của bạn đã được gửi đi");
      } else {
        console.warn("addComment: API không trả photo", res);
        message.error(data?.message || "Không thể thêm bình luận");
      }
    } catch (err) {
      console.error("Lỗi khi thêm bình luận:", err);
      message.error("Lỗi khi thêm bình luận");
      throw err;
    }
  };

  // cập nhật comment
  const updateComment = async (photoId, commentId, newContent) => {
    try {
      const res = await updateCommentApi(photoId, commentId, newContent);
      const data = res?.data;

      console.log("updateComment response:", res);

      if (data && data.photo) {
        const updated = data.photo;

        setPhotos((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );

        message.success(data.message || "Cập nhật bình luận thành công");
      } else {
        console.warn("updateComment: API không trả photo", res);
        message.error(data?.message || "Không thể cập nhật bình luận");
      }
    } catch (err) {
      console.error("Lỗi khi sửa bình luận:", err);
      message.error("Lỗi khi sửa bình luận");
      throw err;
    }
  };

  // Xoá comment
  const deleteComment = async (photoId, commentId) => {
    try {
      const res = await deleteCommentApi(photoId, commentId);

      setPhotos((prev) =>
        prev.map((p) => {
          if (p._id !== photoId) return p;
          const safeComments = Array.isArray(p.comments) ? p.comments : [];
          return {
            ...p,
            comments: safeComments.filter((c) => c._id !== commentId),
          };
        })
      );

      message.success(res?.message || "Xóa cmt thành công");
    } catch (err) {
      console.error("Lỗi khi xoá bình luận:", err);
      message.error("Lỗi khi xoá bình luận");
      throw err;
    }
  };

  //  Cập nhật caption
  const updateCaption = async (photoId, newCaption) => {
    try {
      const res = await updateCaptionApi(photoId, newCaption);
      if (res && res.photo) {
        const updated = res.photo;
        setPhotos((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
        message.success(res.message || "Cập nhật caption thành công");
      } else {
        console.warn("updateCaption: API không trả photo");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật caption:", err);
      message.error("Lỗi khi cập nhật caption");
      throw err;
    }
  };

  // Hỗ trợ PostDetail
  const getPhotoByIdLocal = (photoId) => photos.find((p) => p._id === photoId);

  const ensurePhoto = async (photoId) => {
    const local = getPhotoByIdLocal(photoId);
    if (local) return local;

    try {
      const res = await getPhotoById(photoId);
      if (res && res.photo) {
        const fetched = res.photo;
        setPhotos((prev) => {
          const exists = prev.some((p) => p._id === fetched._id);
          if (exists) {
            return prev.map((p) => (p._id === fetched._id ? fetched : p));
          }
          return [fetched, ...prev];
        });
        return fetched;
      } else {
        message.error("Không tìm thấy ảnh");
        return null;
      }
    } catch (err) {
      console.error("Lỗi khi lấy ảnh theo id:", err);
      message.error("Lỗi khi tải ảnh");
      return null;
    }
  };

  const value = {
    photos,
    isLoading,
    error,
    fetchAllPhotos,
    uploadPhoto,
    deletePhoto,
    toggleLike,
    addComment,
    updateComment,
    deleteComment,
    updateCaption,
    getPhotoByIdLocal,
    ensurePhoto,
  };

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};
