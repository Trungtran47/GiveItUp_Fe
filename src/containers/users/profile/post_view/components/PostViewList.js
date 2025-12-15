import ItempostsProfile from "@/containers/users/profile/favorites/components/ItemPostProfile";
import Utils from "@/utils/Utils";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

export default function PostViewList({ posts }) {
  const [selectedDate, setSelectedDate] = useState(null); // null = tất cả ngày

  // Nhóm posts theo ngày
  const groupedPosts = useMemo(() => {
    const groups = {};

    (posts || []).forEach((post) => {
      const dateKey = dayjs(post.viewAt).format("YYYY-MM-DD");
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(post);
    });

    // Sắp xếp ngày từ mới -> cũ
    const sortedGroups = Object.keys(groups)
      .sort((a, b) => dayjs(b).unix() - dayjs(a).unix())
      .reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {});

    return sortedGroups;
  }, [posts]);

  // Lọc theo ngày nếu chọn
  const displayGroups = selectedDate
    ? { [selectedDate]: groupedPosts[selectedDate] || [] }
    : groupedPosts;

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="space-y-6">
      {/* Chọn ngày */}
      <div>
        <input
          type="date"
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value || null)}
          className="border px-2 py-1 rounded text-gray-700"
        />
      </div>

      {/* Render grouped posts */}
      <div className="space-y-6 max-h-[87vh] overflow-y-auto scroll-white">
        {Object.keys(displayGroups).map((date) => (
          <div key={date} className="pb-4">
            <h2 className="flex items-center text-xl font-semibold mb-2 text-gray-800">
              <span>
                {date === today ? "Hôm nay" : Utils.getDateDayjs(date)}
              </span>
              <span className="flex-1 border-b border-gray-400 ml-2"></span>
            </h2>

            <div className="space-y-3">
              {displayGroups[date].map((post) => (
                <ItempostsProfile
                  key={post.id}
                  posts={post}
                  isFavorite={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
