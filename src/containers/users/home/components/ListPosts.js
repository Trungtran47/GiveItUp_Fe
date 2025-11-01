import PostItem from "@/containers/users/home/components/PostItem";

export default function ListPosts() {
  const post = {
    id: 1,
    image: "/image/img_fb.png",
    title: "Chương trình từ thiện Đông Thượng Âm Bản - Trà Tân 2025",
    group: "Nhóm từ thiện Hand In Hand Việt - Hàn",
    raised: 120000000,
    goal: 200000000,
  };
  const posts = [
    {
      id: 1,
      image: "/image/img_fb.png",
      title: "Chương trình từ thiện Đông Thượng Âm Bản - Trà Tân 2025",
      group: "Nhóm từ thiện Hand In Hand Việt - Hàn",
      raised: 120_000_000,
      goal: 200_000_000,
    },
    {
      id: 2,
      image: "/image/img_fb.png",
      title: "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
      group: "Nhóm SOS Lạng Sơn",
      raised: 350_000_000,
      goal: 500_000_000,
    },
    {
      id: 3,
      image: "/image/img_fb.png",
      title: "Chương trình từ thiện Đông Thượng Âm Bản - Trà Tân 2025",
      group: "Nhóm từ thiện Hand In Hand Việt - Hàn",
      raised: 120_000_000,
      goal: 200_000_000,
    },
    {
      id: 4,
      image: "/image/img_fb.png",
      title: "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
      group: "Nhóm SOS Lạng Sơn",
      raised: 350_000_000,
      goal: 500_000_000,
    },
    // ... thêm các bài khác
  ];
  return (
    <div className="flex flex-col py-10">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Khám phá các hoạt động gây quỹ lấy cảm hứng từ những điều bạn quan tâm
      </h2>
      <div className="flex justify-between">
        <div>hi</div>
        <div>hi</div>
      </div>
      <div className="flex gap-10">
        <div className="flex-1">
          <PostItem key={post.id} {...post} thumb={true} />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
