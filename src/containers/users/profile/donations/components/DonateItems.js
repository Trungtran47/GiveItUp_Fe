import React from "react";
import Image from "next/image";
import Utils, { formatNumber } from "@/utils/Utils";

export default function DonateItems({ donate }) {
  const post = donate.post;
  const thumbnail =
    post.images?.find((img) => img.isThumbnail)?.imageUrl ||
    post.images?.[0]?.imageUrl ||
    post.video ||
    "/placeholder.png";

  return (
    <div className=" border-l-4 border-green-500 bg-green-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300  flex flex-row">
      <div className="mt-2 px-4 py-1">
        <div className="text-[16px] font-bold text-green-700">
          Đã ủng hộ: {formatNumber(donate.amount)} VND
        </div>
        <div className="text-[13px] text-gray-600 mt-1">
          {Utils.getDateDayjs(donate.donatedAt, 13)}
        </div>

        <div className="text-[13px] text-gray-600 ">
          Mã: <span className="font-medium">{donate.paymentCode}</span>
        </div>
        {donate.description && (
          <div className="text-[13px] text-gray-600">
            Nội dung: {donate.description}
          </div>
        )}
      </div>
      {/* Nội dung chính */}
      <div className="flex-1 px-4 flex gap-3 items-center  bg-white">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={thumbnail}
            alt={post.title}
            fill
            className="object-cover rounded-l-2xl"
          />
        </div>
        {/* Thông tin bài post nhỏ */}
        <div className="w-full text-gray-500 flex flex-col ">
          <h3 className="text-[16px] font-bold text-gray-900 line-clamp-1">
            {post.title}
          </h3>
          <span className="line-clamp-1 text-[13px] ">
            {post?.description || "Chưa phân loại"}
          </span>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-[13px]">
              {post.category?.categoryName || "Chưa phân loại"}
            </div>
            <div className="text-[13px]">
              {formatNumber(post?.donatedAmount)} VND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
