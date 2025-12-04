import { useEffect, useState } from "react";
import { message, Image } from "antd";
import { getWishList } from "../../../services/PhotoService";

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
        <Image.PreviewGroup>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((p) => (
              <div
                key={p._id}
                className="rounded-xl overflow-hidden bg-[#1e0b2c] aspect-square hover:opacity-90 transition"
              >
                <Image
                  src={p.file_name}
                  alt="photo"
                  preview={{ mask: "Xem ảnh" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  rootClassName="!h-full !w-full"
                />
              </div>
            ))}
          </div>
        </Image.PreviewGroup>
      )}
    </div>
  );
};

export default WishList;
