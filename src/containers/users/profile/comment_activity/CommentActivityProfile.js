"use client";

import commentFactory from "@/redux/comment/factory";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CommentActivityProfile() {
  const [dataComments, setDataComments] = useState([]);
  const router = useRouter();
  const getComments = async () => {
    try {
      const response = await commentFactory.getMyComments();
      if (response?.code == 200) {
        setDataComments(response?.result || []);
      }
    } catch (error) {
      console.error("xxx", error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);
  const handleClick = (id) => {
    router.push(`/project/${id}`);
  };
  if (!dataComments || dataComments.length === 0) {
    return (
      <div className=" text-gray-600">Bạn chưa có hoạt động bình luận nào.</div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Lịch sử bình luận</h2>

      {dataComments.map((item) => {
        const post = item.post;
        const thumbnail = post?.images?.find((img) => img.isThumbnail);
        return (
          <div
            key={item.id}
            className="flex gap-2 p-2 bg-white  rounded-xl hover:shadow-md transition"
          >
            {/* Ảnh thumbnail */}
            <Link href={`/project/${post?.id}`}>
              <img
                src={thumbnail?.imageUrl}
                alt="thumbnail"
                className="w-28 h-20 object-cover rounded-lg cursor-pointer"
              />
            </Link>

            <div className="flex-1">
              <h2
                onClick={() => handleClick(post.id)}
                className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition"
              >
                {post?.title}
              </h2>

              {/* Nội dung comment */}
              <p className="text-gray-700 mt-1">{item.content}</p>

              {/* Ngày tạo */}
              <p className="text-gray-500 text-sm mt-1">
                Bình luận vào {new Date(item.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
