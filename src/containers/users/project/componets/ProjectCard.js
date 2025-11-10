"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  id,
  image,
  title,
  group,
  raised,
  goal,
  thumb = false,
}) {
  // ✅ Tính % tiến độ
  const progress = Math.min((raised / goal) * 100, 100);
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/project/${id}`);
  };
  return (
    <div
      onClick={() => handleClick(id)}
      className="bg-white rounded-2xl  hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Ảnh bìa */}
      <div className={`relative w-full ${thumb ? "h-[400px]" : "h-[120px]"}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Nội dung */}
      <div className="p-2 flex flex-col gap-1">
        <h3 className="text-gray-900 font-semibold text-[15px] leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="text-[13px] text-green-700 font-medium">{group}</p>

        {/* Thanh tiến độ */}
        <div className="w-full h-2 bg-gray-200 rounded-full  overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-500 text-[13px] ">
          Đã quyên góp được{" "}
          <span className="font-semibold text-gray-800">
            {typeof raised === "number" ? raised.toLocaleString("vi-VN") : "0"}{" "}
            VND
          </span>
        </p>
      </div>
    </div>
  );
}
