import { useEffect, useState } from "react";
import { getDetailUser } from "../../services/UserService";
import ProfileInfor from "../../component/profile/ProfileInfor";
import ProfileTabs from "../../component/profile/ProfileTabs";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id: paramId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: stored } = useAuth();

  useEffect(() => {
    const viewId = paramId || stored?._id;

    if (!viewId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getDetailUser(viewId);
        setUser(res);
      } catch (err) {
        console.error("Lỗi lấy user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [paramId, stored]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0214]">
        <div className="text-white text-lg animate-pulse">
          Đang tải profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0214] text-white">
        Không tìm thấy thông tin người dùng.
      </div>
    );
  }

  const isOwner = !paramId || paramId === stored?._id;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="min-h-screen bg-gradient-to-b from-[#0b0214] via-[#140220] to-[#0b0214] py-10 px-4">
          <div className="max-w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* profile card */}
            <ProfileInfor
              user={user}
              onUserUpdated={isOwner ? setUser : undefined}
              isOwner={isOwner}
            />
            {/* profile Tab */}
            <ProfileTabs user_id={user._id} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
