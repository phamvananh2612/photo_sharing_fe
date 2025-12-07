import { useEffect, useState } from "react";
import { message } from "antd";
import { getWishList } from "../../../services/PhotoService";
import { Link } from "react-router-dom";

const WishList = ({ user_id }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getWishList(user_id);
        setPhotos(result.photos || []);
      } catch (e) {
        console.log("Lỗi khi lấy danh sách ảnh: ", e);
        message.error("Lỗi khi lấy danh sách ảnh");
      }
    };
    fetchApi();
  }, [user_id]);
  return (
    <div className="w-full">
      {photos.length === 0 ? (
        <p className="text-gray-400 text-sm">Chưa có bài đăng</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((p) => (
            <div
              key={p._id}
              className="rounded-xl overflow-hidden bg-[#1e0b2c] aspect-square hover:opacity-90 transition"
            >
              <Link to={`/posts/${p._id}`}>
                <img
                  src={p.file_name}
                  alt="Ảnh"
                  className="w-full h-full object-cover object-center"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
