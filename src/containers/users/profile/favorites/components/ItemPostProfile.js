import likeFactory from "@/redux/like/factory";
import Utils from "@/utils/Utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ItempostsProfile({
  posts,
  isFavorite = false,
  getData,
}) {
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/project/${id}`);
  };
  const handleLike = async () => {
    const res = await likeFactory.toggleLike(posts?.id);
    if (res?.code == 200) {
      getData();
    }
  };
  return (
    <div className=" bg-white rounded-lg ">
      <div key={posts.id} className="flex items-center gap-4">
        {/* Hình ảnh */}
        <div className="relative  w-32 h-20 overflow-hidden rounded-lg">
          {posts.images?.find((img) => img.isThumbnail)?.imageUrl && (
            <Image
              src={posts.images.find((img) => img.isThumbnail).imageUrl}
              alt={posts.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        {/* Nội dung */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="text-[16px] font-medium text-gray-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors duration-300"
              onClick={() => handleClick(posts.id)}
            >
              {posts.title}
            </h3>
            <p className="text-[14px] text-gray-500 mt-1 line-clamp-2">
              {posts.description}
            </p>
          </div>

          {/* Footer info */}
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs text-gray-400">
              {posts.category?.categoryName} -{" "}
              {Utils.getDateDayjs(posts.createdAt, 13)}
            </div>
            <div className="flex items-center gap-4  text-[13px] text-gray-400">
              {/* Like */}
              {isFavorite && (
                <div className="flex items-center gap-1" onClick={handleLike}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 cursor-pointer ${
                      posts.liked ? "text-red-500" : ""
                    } hover:w-6 hover:h-6 transition-all duration-300`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  {posts.likeCount}
                </div>
              )}

              {/* View */}
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                  />
                </svg>
                {posts.viewCount}
              </div>
            </div>

            {/* Comment (nếu có) */}
            {/* {posts.commentCount != null && (
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                  />
                </svg>
                {posts.commentCount}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
