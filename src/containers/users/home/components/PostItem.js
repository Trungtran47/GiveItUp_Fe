"use client";
import { formatNumber } from "@/utils/Utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PostItem({
  id,
  image,
  title,
  group,
  raised,
  goal,
  thumb = false,
}) {
  //  Tính % tiến độ
  const progress = Math.min((raised / goal) * 100, 100);
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/project/${id}`);
  };
  return (
    <div
      className={` ${
        thumb ? "h-[578px]" : "h-[280px]"
      } bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-300 hover:bg-[#F5F5F5] transition-all duration-300 overflow-hidden cursor-pointer
      flex flex-col `}
      onClick={() => handleClick(id)}
    >
      {/* Ảnh bìa */}
      <div className={` relative w-full h-full`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500 "
        />
      </div>

      {/* Nội dung */}
      <div className={`${thumb && "pt-[15px]"} p-2 flex flex-col `}>
        <h3 className="text-gray-900 font-semibold text-[14px] leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="text-[13px] text-green-700 font-medium ">{group}</p>

        {/* Thanh tiến độ */}
        <div className="mt-1 flex flex-col gap-0.5">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-gray-500 text-[13px] flex justify-between">
            Đã quyên góp được:{" "}
            <span className="font-semibold text-gray-800">
              {formatNumber(raised)} VND
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
