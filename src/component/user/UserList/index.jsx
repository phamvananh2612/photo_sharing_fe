import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUser } from "../../../services/UserService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getAllUser();
        // console.log(result);
        setUsers(result.users || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng: ", error);
      }
    };
    fetchApi();
  }, []);

  const getInitial = (user) => {
    const fullName =
      user?.login_name || `${user?.last_name || ""} ${user?.first_name || ""}`;
    if (!fullName) return "U";
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1][0].toUpperCase();
  };

  return (
    <div className="bg-[#180329]/80 border border-purple-800/60 rounded-2xl shadow-xl shadow-purple-900/40 px-5 py-4 text-white max-h-[70vh] overflow-y-auto lg:sticky lg:top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-purple-100">
          Gợi ý cho bạn
        </h3>
        <span className="text-sm text-purple-300/80 hover:text-purple-100 cursor-pointer">
          Xem tất cả
        </span>
      </div>

      {/* List users */}
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-between group"
          >
            {/* Avatar + info */}
            <Link
              to={`/profile/${user._id}`}
              className="flex items-center gap-4"
            >
              {/* Avatar */}
              {user.avatar ? (
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-purple-500/60 group-hover:ring-purple-300 transition">
                  <img
                    src={user.avatar}
                    alt={user.login_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 ring-2 ring-purple-500/60 group-hover:ring-purple-300 text-sm font-semibold">
                  {getInitial(user)}
                </div>
              )}

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-base font-medium group-hover:text-purple-100 transition">
                  {user.login_name || "Người dùng"}
                </span>

                {(user.first_name || user.last_name) && (
                  <span className="text-sm text-purple-200/70">
                    {(user.last_name || "") + " " + (user.first_name || "")}
                  </span>
                )}
              </div>
            </Link>

            <Link
              to={`/profile/${user._id}`}
              className="text-sm font-semibold text-purple-300 hover:text-purple-100 transition"
            >
              Xem
            </Link>
          </li>
        ))}

        {users.length === 0 && (
          <li className="text-sm text-purple-200/70">
            Chưa có người dùng nào.
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
