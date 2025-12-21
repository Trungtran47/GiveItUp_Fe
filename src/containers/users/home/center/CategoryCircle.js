"use client";
import Image from "next/image";

export default function CategoryCircle({ title, image, index }) {
  const gradientId = `green-gradient-${index}`;
  return (
    <div
      className="group relative flex flex-col items-center justify-center cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* 1. CONTAINER TỔNG (Kích thước khung chứa) */}
      <div className="relative w-34 h-34 md:w-40 md:h-40 flex items-center justify-center">
        {/* 2. SVG BORDER LAYER (Thay thế cho border-dashed của CSS) 
            - animate-spin-border: Xoay tròn khi load.
            - group-hover:rotate-180: Xoay thêm khi hover.
        */}
        {/* SVG BORDER */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin-border transition-transform duration-700 ease-in-out group-hover:rotate-[180deg]"
          viewBox="0 0 100 100"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#017C18" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#017C18" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#017C18" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* 2. Áp dụng Gradient vào Stroke bằng cú pháp url(#id) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`url(#${gradientId})`} // <-- Gọi ID gradient ở đây
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeDasharray="10 10"
            className="opacity-100" // Đảm bảo class này là 100 để thấy rõ gradient
          />
        </svg>

        {/* 3. IMAGE LAYER (Ảnh bên trong) */}
        <div
          className="relative w-26 h-26 md:w-30 md:h-30 rounded-full overflow-hidden shadow-md animate-pop-in bg-white transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      </div>

      {/* Label Title */}
      <div className=" bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm  z-10 animate-pop-in transition-transform duration-300 group-hover:-translate-y-1">
        <p className="text-gray-700 text-sm md:text-base font-bold whitespace-nowrap">
          {title}
        </p>
      </div>
    </div>
  );
}
