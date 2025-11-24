"use client";
import { useState } from "react";
import Image from "next/image";

export default function ZoomableImage({ src, alt, width, height, className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Ảnh hiển thị bình thường */}
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <Image
          src={src || "/images/default.png"}
          alt={alt || "image"}
          width={width || 100}
          height={height || 100}
          className={className}
        />
      </div>

      {/* Modal fullscreen */}
      {isOpen && (
        <div
          className="fixed inset-0 z-5000 flex items-center justify-center bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-h-full max-w-full">
            <Image
              src={src}
              alt={alt || "image"}
              width={1200} // có thể tuỳ chỉnh
              height={1200}
              className="object-contain max-h-screen max-w-screen"
            />
          </div>
        </div>
      )}
    </>
  );
}
