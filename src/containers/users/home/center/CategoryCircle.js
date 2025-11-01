"use client";
import Image from "next/image";
import { CommonStyles } from "@/utils/CommonStyles";

export default function CategoryCircle({ title, image, className }) {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-110 cursor-pointer ${className}`}
    >
      <div className="relative w-35 h-35 rounded-full flex items-center justify-center">
        {/* SVG Border động — chỉ xoay khi hover */}
        <div
          className="absolute inset-0 animate-spin-slow group-hover:[animation-play-state:running]"
          style={{ animationPlayState: "paused" }}
        >
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full"
            style={{ transform: "rotate(100deg)" }}
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`${CommonStyles.mainColor}30`} />
                <stop offset="100%" stopColor={`${CommonStyles.mainColor}`} />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="12 12"
            />
          </svg>
        </div>

        <div className="overflow-hidden rounded-full w-30 h-30 relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {/* Label */}
      <span className="absolute -bottom-6 bg-white/80 backdrop-blur-sm text-gray-800 text-sm px-2 py-0.5 rounded shadow-sm">
        {title}
      </span>
    </div>
  );
}
