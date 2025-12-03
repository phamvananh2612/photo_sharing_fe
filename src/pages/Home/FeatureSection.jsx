import { Card } from "antd";
import { FiUploadCloud, FiFolder, FiUsers } from "react-icons/fi";

const FeatureSection = () => {
  return (
    <section>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
          Mọi thứ bạn cần để chia sẻ đam mê
        </h2>

        <p className="text-slate-300/80 text-sm md:text-base max-w-2xl mx-auto">
          Nền tảng PhotoShare cung cấp các công cụ mạnh mẽ và một cộng đồng sôi
          nổi để giúp bạn phát triển.
        </p>
      </div>

      {/* 3 Feature Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Feature 1 */}
        <Card
          bordered={false}
          className="bg-[#110023] border border-purple-500/20 shadow-[0_0_25px_rgba(88,28,135,0.7)] p-5"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl text-purple-300">
            <FiUploadCloud />
          </div>

          <h4 className="text-slate-50 text-lg font-semibold mt-4 mb-2">
            Tải lên Dễ dàng
          </h4>

          <p className="text-slate-300/80 text-sm leading-relaxed">
            Chia sẻ nhanh những khoảnh khắc của bạn với tốc độ cao, không giới
            hạn số lượng ảnh.
          </p>
        </Card>

        {/* Feature 2 */}
        <Card
          bordered={false}
          className="bg-[#110023] border border-purple-500/20 shadow-[0_0_25px_rgba(88,28,135,0.7)] p-5"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl text-purple-300">
            <FiFolder />
          </div>

          <h4 className="text-slate-50 text-lg font-semibold mt-4 mb-2">
            Tạo Bộ sưu tập
          </h4>

          <p className="text-slate-300/80 text-sm leading-relaxed">
            Sắp xếp ảnh của bạn vào các album theo chủ đề, dễ tìm kiếm và quản
            lý.
          </p>
        </Card>

        {/* Feature 3 */}
        <Card
          bordered={false}
          className="bg-[#110023] border border-purple-500/20 shadow-[0_0_25px_rgba(88,28,135,0.7)] p-5"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl text-purple-300">
            <FiUsers />
          </div>

          <h4 className="text-slate-50 text-lg font-semibold mt-4 mb-2">
            Kết nối Cộng đồng
          </h4>

          <p className="text-slate-300/80 text-sm leading-relaxed">
            Theo dõi bạn bè, thả tim, bình luận và khám phá những nhiếp ảnh gia
            mà bạn yêu thích.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default FeatureSection;
