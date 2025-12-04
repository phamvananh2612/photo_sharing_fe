import { FiUsers } from "react-icons/fi";
import { Image } from "antd";

const CommunityGallery = ({ photos }) => {
  if (!photos) return null;

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <FiUsers className="text-purple-400 text-xl" />

        <h3 className="text-slate-50 font-semibold text-lg sm:text-xl">
          Khám phá từ Cộng đồng
        </h3>
      </div>

      <p className="text-slate-300/80 mb-4 text-sm sm:text-base">
        Một vài khoảnh khắc nổi bật được chia sẻ bởi người dùng PhotoSharing.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <Image.PreviewGroup>
          {photos.slice(0, 12).map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-black/40 border border-purple-500/20 hover:border-purple-400/60 transition group"
            >
              <Image
                src={photo.file_name}
                alt={`public-${index}`}
                preview={true}
                wrapperClassName="w-full h-full"
                className="!w-full !h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </section>
  );
};

export default CommunityGallery;
