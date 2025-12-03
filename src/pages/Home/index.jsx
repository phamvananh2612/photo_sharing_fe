import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import CommunityGallery from "./CommunityGallery";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllPhotos } from "../../services/PhotoService";
import { message } from "antd";

const PublicHome = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPhotos();
        // console.log("API response: ", res);
        if (res && res.photos) {
          setPhotos(res.photos);
        }
      } catch (e) {
        console.log("Lỗi: ", e);
        message.error("Lỗi khi lấy danh sách ảnh");
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="min-h-screen bg-[#050013] text-slate-100">
        <div className="max-w-[95%] mx-auto px-4 pb-16 pt-10">
          <HeroSection />

          <div className="mt-16">
            <FeatureSection />
          </div>

          <div className="mt-16">
            <CommunityGallery photos={photos} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PublicHome;
