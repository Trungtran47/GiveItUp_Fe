import { useState } from "react";
import Image from "next/image";

export default function MediaCarousel({ images = [], video }) {
  // Gộp media: ảnh trước, video cuối
  const media = [
    ...images.map((img) => ({
      type: "image",
      url: img.imageUrl,
      id: img.id,
    })),
    ...(video
      ? [
          {
            type: "video",
            url: video,
            id: "video",
          },
        ]
      : []),
  ];

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === media.length - 1 ? 0 : i + 1));

  const current = media[index];

  return (
    <div className="relative w-full max-w-[960px] h-[420px] mx-auto">
      {/* ẢNH HOẶC VIDEO */}
      <figure className="w-full h-auto max-h-[420px] overflow-hidden rounded-xl">
        {current?.type === "image" ? (
          <Image
            src={current?.url}
            alt="post-media"
            width={960}
            height={540}
            className="w-full h-auto object-cover"
            priority
          />
        ) : (
          <video
            src={current?.url}
            controls
            className="w-full max-h-[420px] object-cover rounded-xl"
          />
        )}
      </figure>

      {/* Nút prev */}
      {media.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black px-3 py-2 rounded-full shadow cursor-pointer"
        >
          ◀
        </button>
      )}

      {/* Nút next */}
      {media.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black px-3 py-2 rounded-full shadow cursor-pointer"
        >
          ▶
        </button>
      )}

      {/* Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {media.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
