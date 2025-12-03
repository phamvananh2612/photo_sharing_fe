import { Button } from "antd";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[40vh] rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(168,85,247,0.4)] bg-black">
      {/* Background image */}
      <img
        src="https://i.pinimg.com/1200x/3f/4d/b4/3f4db4dafa0d0df956a2e5b3e679204f.jpg"
        alt="Hero Cover"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Content */}
      <div className="flex justify-center items-center">
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 h-full">
          <h1 className="mb-4 text-3xl md:text-5xl font-bold text-slate-50 drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]">
            Lưu giữ & Chia sẻ Khoảnh khắc
          </h1>

          <p className="text-slate-200/90 max-w-xl text-sm md:text-lg mb-8">
            Tải lên, khám phá và tương tác với những bức ảnh đẹp khắp nơi trên
            thế giới.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              type="primary"
              className="!h-10 !rounded-full !px-6 !bg-purple-600 hover:!bg-purple-500 border-none shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            >
              Đăng ký ngay
            </Button>

            <Button
              ghost
              className="!h-10 !rounded-full !px-6 !text-slate-100 !border-purple-400/60 hover:!bg-purple-600/20"
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
